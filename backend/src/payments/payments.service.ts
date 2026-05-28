import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, VerifyPaymentDto, CreateSplitDto } from './dto/payment.schema';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly MOCK_SECRET = 'mock_razorpay_secret_key';

  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: string, data: CreateOrderDto) {
    const bundle = await this.prisma.partyBundle.findUnique({ where: { id: data.bundleId } });
    if (!bundle) throw new NotFoundException('Bundle not found');
    if (bundle.status !== 'CHECKOUT_PENDING') throw new BadRequestException('Bundle is not ready for checkout');

    // Create a mock Razorpay order ID
    const razorpayOrderId = `order_mock_${Math.random().toString(36).substring(2, 15)}`;

    const payment = await this.prisma.payment.create({
      data: {
        bundleId: bundle.id,
        razorpayOrderId,
        amount: bundle.totalAmount,
        currency: 'INR',
        status: 'PENDING',
      }
    });

    return {
      paymentId: payment.id,
      razorpayOrderId,
      amount: payment.amount,
      currency: payment.currency,
    };
  }

  async verifyPayment(data: VerifyPaymentDto) {
    // In dev mode, we just accept the payment. We can optionally verify the mock signature.
    // Let's assume the mock client generates a signature: HMAC-SHA256(orderId + "|" + paymentId, secret)
    const expectedSignature = crypto
      .createHmac('sha256', this.MOCK_SECRET)
      .update(data.razorpayOrderId + '|' + data.razorpayPaymentId)
      .digest('hex');

    // If we want strict mock verification:
    // if (expectedSignature !== data.razorpaySignature) {
    //   throw new BadRequestException('Invalid payment signature');
    // }

    const payment = await this.prisma.payment.findUnique({
      where: { razorpayOrderId: data.razorpayOrderId }
    });

    if (!payment) throw new NotFoundException('Payment record not found');
    if (payment.status === 'PAID') return { message: 'Payment already verified' };

    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'PAID',
        razorpayPaymentId: data.razorpayPaymentId,
        paidAt: new Date(),
      }
    });

    if (payment.bundleId) {
      await this.prisma.partyBundle.update({
        where: { id: payment.bundleId },
        data: { status: 'CONFIRMED' }
      });
      // Here we would also dispatch events to create Bookings
      // For now, we'll let the user/system know it's paid
    }

    return { success: true, message: 'Payment successful' };
  }

  async webhook(payload: any, signature: string) {
    // Idempotent webhook handler
    this.logger.log(`Received webhook for order ${payload.payload.payment.entity.order_id}`);
    
    const payment = await this.prisma.payment.findUnique({
      where: { razorpayOrderId: payload.payload.payment.entity.order_id }
    });

    if (payment && payment.status !== 'PAID' && payload.event === 'payment.captured') {
      await this.verifyPayment({
        razorpayOrderId: payment.razorpayOrderId,
        razorpayPaymentId: payload.payload.payment.entity.id,
        razorpaySignature: 'webhook_bypass'
      });
    }

    return { received: true };
  }

  async createSplit(paymentId: string, userId: string, data: CreateSplitDto) {
    const payment = await this.prisma.payment.findUnique({ 
      where: { id: paymentId },
      include: { splits: true, bundle: true }
    });

    if (!payment) throw new NotFoundException('Payment not found');
    if (payment.status === 'PAID') throw new BadRequestException('Payment is already completed');
    if (payment.splits.length > 0) throw new BadRequestException('Split already created for this payment');

    // 2-way 50/50 split
    const splitAmount = payment.amount / 2;
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30); // 30 min expiry

    // Creator's split
    await this.prisma.paymentSplit.create({
      data: {
        paymentId,
        payerEmail: 'initiator@example.com', // In reality, fetch from user
        amount: splitAmount,
        shareToken: uuidv4(),
        expiresAt,
        status: 'PENDING'
      }
    });

    // Co-payer's split
    const coPayerSplit = await this.prisma.paymentSplit.create({
      data: {
        paymentId,
        payerEmail: data.payerEmail,
        payerName: data.payerName,
        payerPhone: data.payerPhone,
        amount: splitAmount,
        shareToken: uuidv4(),
        expiresAt,
        status: 'PENDING'
      }
    });

    // We'd also schedule the BullMQ job here for expiry

    return {
      message: 'Split created',
      coPayerLink: `/pay/${coPayerSplit.shareToken}`,
      expiresAt,
    };
  }

  async getSplitInfo(token: string) {
    const split = await this.prisma.paymentSplit.findUnique({
      where: { shareToken: token },
      include: {
        payment: {
          include: {
            bundle: { select: { title: true, partyDate: true, city: true, occasionType: true } }
          }
        }
      }
    });

    if (!split) throw new NotFoundException('Split link invalid or expired');
    return split;
  }

  async paySplit(token: string) {
    const split = await this.prisma.paymentSplit.findUnique({ where: { shareToken: token } });
    if (!split) throw new NotFoundException('Split link invalid');
    if (split.status === 'PAID') throw new BadRequestException('Already paid');
    if (split.expiresAt < new Date()) throw new BadRequestException('Split payment link expired');

    // Mock payment successful
    const updatedSplit = await this.prisma.paymentSplit.update({
      where: { id: split.id },
      data: {
        status: 'PAID',
        paidAt: new Date(),
        razorpayPaymentId: `pay_mock_${uuidv4().substring(0,8)}`,
      }
    });

    // Check if all splits are paid
    const allSplits = await this.prisma.paymentSplit.findMany({
      where: { paymentId: split.paymentId }
    });

    if (allSplits.every(s => s.status === 'PAID')) {
      await this.prisma.payment.update({
        where: { id: split.paymentId },
        data: { status: 'PAID', paidAt: new Date() }
      });
      // Confirm bundle...
    }

    return updatedSplit;
  }
}

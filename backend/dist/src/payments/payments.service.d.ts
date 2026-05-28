import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, VerifyPaymentDto, CreateSplitDto } from './dto/payment.schema';
export declare class PaymentsService {
    private readonly prisma;
    private readonly logger;
    private readonly MOCK_SECRET;
    constructor(prisma: PrismaService);
    createOrder(userId: string, data: CreateOrderDto): Promise<{
        paymentId: string;
        razorpayOrderId: string;
        amount: number;
        currency: string;
    }>;
    verifyPayment(data: VerifyPaymentDto): Promise<{
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    webhook(payload: any, signature: string): Promise<{
        received: boolean;
    }>;
    createSplit(paymentId: string, userId: string, data: CreateSplitDto): Promise<{
        message: string;
        coPayerLink: string;
        expiresAt: Date;
    }>;
    getSplitInfo(token: string): Promise<{
        payment: {
            bundle: {
                city: string;
                title: string;
                occasionType: string;
                partyDate: Date;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            status: string;
            bundleId: string | null;
            razorpayOrderId: string;
            razorpayPaymentId: string | null;
            amount: number;
            currency: string;
            refundAmount: number | null;
            refundReason: string | null;
            paidAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        status: string;
        expiresAt: Date;
        razorpayOrderId: string | null;
        razorpayPaymentId: string | null;
        payerEmail: string;
        payerName: string | null;
        payerPhone: string | null;
        amount: number;
        paidAt: Date | null;
        paymentId: string;
        shareToken: string;
    }>;
    paySplit(token: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        expiresAt: Date;
        razorpayOrderId: string | null;
        razorpayPaymentId: string | null;
        payerEmail: string;
        payerName: string | null;
        payerPhone: string | null;
        amount: number;
        paidAt: Date | null;
        paymentId: string;
        shareToken: string;
    }>;
}

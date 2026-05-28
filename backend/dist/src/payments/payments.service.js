"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const crypto = __importStar(require("crypto"));
let PaymentsService = PaymentsService_1 = class PaymentsService {
    prisma;
    logger = new common_1.Logger(PaymentsService_1.name);
    MOCK_SECRET = 'mock_razorpay_secret_key';
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(userId, data) {
        const bundle = await this.prisma.partyBundle.findUnique({ where: { id: data.bundleId } });
        if (!bundle)
            throw new common_1.NotFoundException('Bundle not found');
        if (bundle.status !== 'CHECKOUT_PENDING')
            throw new common_1.BadRequestException('Bundle is not ready for checkout');
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
    async verifyPayment(data) {
        const expectedSignature = crypto
            .createHmac('sha256', this.MOCK_SECRET)
            .update(data.razorpayOrderId + '|' + data.razorpayPaymentId)
            .digest('hex');
        const payment = await this.prisma.payment.findUnique({
            where: { razorpayOrderId: data.razorpayOrderId }
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment record not found');
        if (payment.status === 'PAID')
            return { message: 'Payment already verified' };
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
        }
        return { success: true, message: 'Payment successful' };
    }
    async webhook(payload, signature) {
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
    async createSplit(paymentId, userId, data) {
        const payment = await this.prisma.payment.findUnique({
            where: { id: paymentId },
            include: { splits: true, bundle: true }
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        if (payment.status === 'PAID')
            throw new common_1.BadRequestException('Payment is already completed');
        if (payment.splits.length > 0)
            throw new common_1.BadRequestException('Split already created for this payment');
        const splitAmount = payment.amount / 2;
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 30);
        await this.prisma.paymentSplit.create({
            data: {
                paymentId,
                payerEmail: 'initiator@example.com',
                amount: splitAmount,
                shareToken: (0, uuid_1.v4)(),
                expiresAt,
                status: 'PENDING'
            }
        });
        const coPayerSplit = await this.prisma.paymentSplit.create({
            data: {
                paymentId,
                payerEmail: data.payerEmail,
                payerName: data.payerName,
                payerPhone: data.payerPhone,
                amount: splitAmount,
                shareToken: (0, uuid_1.v4)(),
                expiresAt,
                status: 'PENDING'
            }
        });
        return {
            message: 'Split created',
            coPayerLink: `/pay/${coPayerSplit.shareToken}`,
            expiresAt,
        };
    }
    async getSplitInfo(token) {
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
        if (!split)
            throw new common_1.NotFoundException('Split link invalid or expired');
        return split;
    }
    async paySplit(token) {
        const split = await this.prisma.paymentSplit.findUnique({ where: { shareToken: token } });
        if (!split)
            throw new common_1.NotFoundException('Split link invalid');
        if (split.status === 'PAID')
            throw new common_1.BadRequestException('Already paid');
        if (split.expiresAt < new Date())
            throw new common_1.BadRequestException('Split payment link expired');
        const updatedSplit = await this.prisma.paymentSplit.update({
            where: { id: split.id },
            data: {
                status: 'PAID',
                paidAt: new Date(),
                razorpayPaymentId: `pay_mock_${(0, uuid_1.v4)().substring(0, 8)}`,
            }
        });
        const allSplits = await this.prisma.paymentSplit.findMany({
            where: { paymentId: split.paymentId }
        });
        if (allSplits.every(s => s.status === 'PAID')) {
            await this.prisma.payment.update({
                where: { id: split.paymentId },
                data: { status: 'PAID', paidAt: new Date() }
            });
        }
        return updatedSplit;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map
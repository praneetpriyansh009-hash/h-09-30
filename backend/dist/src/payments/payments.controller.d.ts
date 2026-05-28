import { PaymentsService } from './payments.service';
import type { CreateOrderDto, VerifyPaymentDto, CreateSplitDto, PaySplitDto } from './dto/payment.schema';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(req: any, data: CreateOrderDto): Promise<{
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
    webhook(signature: string, payload: Record<string, unknown>): Promise<{
        received: boolean;
    }>;
    createSplit(req: any, id: string, data: CreateSplitDto): Promise<{
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
    paySplit(token: string, _data: PaySplitDto): Promise<{
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

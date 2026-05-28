import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, SubmitReviewDto } from './dto/booking.schema';
export declare class BookingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createFromBundle(userId: string, data: CreateBookingDto): Promise<never[]>;
    cancelBooking(id: string, userId: string): Promise<{
        booking: {
            id: string;
            vendorId: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            guestCount: number;
            status: string;
            totalAmount: number;
            bundleId: string | null;
            bookingDate: Date;
            startTime: string;
            endTime: string | null;
            commissionAmount: number;
            vendorEarning: number;
            vendorNotes: string | null;
            userNotes: string | null;
            bundleItemId: string | null;
            serviceId: string;
        };
        refundAmount: number;
        message: string;
    }>;
    submitReview(id: string, userId: string, data: SubmitReviewDto): Promise<{
        id: string;
        vendorId: string;
        createdAt: Date;
        userId: string;
        rating: number;
        reviewText: string;
        vendorReply: string | null;
        vendorRepliedAt: Date | null;
        isVisible: boolean;
        bookingId: string;
    }>;
}

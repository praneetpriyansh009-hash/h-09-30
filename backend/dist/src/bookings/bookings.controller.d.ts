import { BookingsService } from './bookings.service';
import type { CreateBookingDto, SubmitReviewDto } from './dto/booking.schema';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    createFromBundle(req: any, data: CreateBookingDto): Promise<never[]>;
    cancelBooking(req: any, id: string): Promise<{
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
    submitReview(req: any, id: string, data: SubmitReviewDto): Promise<{
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

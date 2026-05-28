import { PrismaService } from '../prisma/prisma.service';
import type { ReplyReviewDto } from './dto/review.schema';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getVendorReviews(vendorId: string): Promise<({
        user: {
            name: string;
            profilePicUrl: string | null;
        };
    } & {
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
    })[]>;
    replyToReview(reviewId: string, userId: string, data: ReplyReviewDto): Promise<{
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

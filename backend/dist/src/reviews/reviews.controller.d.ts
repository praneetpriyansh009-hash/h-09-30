import { ReviewsService } from './reviews.service';
import type { ReplyReviewDto } from './dto/review.schema';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
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
    replyToReview(req: any, id: string, data: ReplyReviewDto): Promise<{
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

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { ReplyReviewDto } from './dto/review.schema';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getVendorReviews(vendorId: string) {
    return this.prisma.review.findMany({
      where: { vendorId, isVisible: true },
      include: {
        user: { select: { name: true, profilePicUrl: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async replyToReview(reviewId: string, userId: string, data: ReplyReviewDto) {
    const review = await this.prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Review not found');

    const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    if (!vendor || vendor.id !== review.vendorId) {
      throw new ForbiddenException('Not authorized to reply to this review');
    }

    // Schema field is "vendorRepliedAt", not "repliedAt"
    return this.prisma.review.update({
      where: { id: reviewId },
      data: {
        vendorReply: data.replyText,
        vendorRepliedAt: new Date()
      }
    });
  }
}

import { Controller, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { replyReviewSchema } from './dto/review.schema';
import type { ReplyReviewDto } from './dto/review.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Get('vendor/:vendorId')
  getVendorReviews(@Param('vendorId') vendorId: string) {
    return this.reviewsService.getVendorReviews(vendorId);
  }

  @Patch(':id/reply')
  @Roles('VENDOR')
  replyToReview(
    @Request() req: any,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(replyReviewSchema)) data: ReplyReviewDto
  ) {
    return this.reviewsService.replyToReview(id, req.user.sub, data);
  }
}

import { Controller, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { createBookingSchema, submitReviewSchema } from './dto/booking.schema';
import type { CreateBookingDto, SubmitReviewDto } from './dto/booking.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createFromBundle(@Request() req: any, @Body(new ZodValidationPipe(createBookingSchema)) data: CreateBookingDto) {
    return this.bookingsService.createFromBundle(req.user.sub, data);
  }

  @Patch(':id/cancel')
  cancelBooking(@Request() req: any, @Param('id') id: string) {
    return this.bookingsService.cancelBooking(id, req.user.sub);
  }

  @Post(':id/review')
  submitReview(
    @Request() req: any,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(submitReviewSchema)) data: SubmitReviewDto
  ) {
    return this.bookingsService.submitReview(id, req.user.sub, data);
  }
}

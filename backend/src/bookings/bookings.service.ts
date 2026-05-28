import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, SubmitReviewDto } from './dto/booking.schema';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async createFromBundle(userId: string, data: CreateBookingDto) {
    const bundle = await this.prisma.partyBundle.findUnique({
      where: { id: data.bundleId },
      include: {
        items: {
          include: { vendorService: { include: { vendor: true } } }
        }
      }
    });

    if (!bundle) throw new NotFoundException('Bundle not found');
    if (bundle.status !== 'CONFIRMED') throw new BadRequestException('Bundle is not confirmed, cannot create bookings');

    const bookings: any[] = [];

    for (const item of bundle.items) {
      // Calculate commission
      const totalAmount = item.unitPrice * item.quantity;
      const commissionRate = item.vendorService.vendor.commissionRate;
      const commissionAmount = totalAmount * commissionRate;
      const vendorEarning = totalAmount - commissionAmount;

      const booking = await this.prisma.booking.create({
        data: {
          bundleId: bundle.id,
          bundleItemId: item.id,
          userId,
          vendorId: item.vendorService.vendorId,
          serviceId: item.vendorServiceId,
          bookingDate: bundle.partyDate,
          startTime: bundle.partyTime || '12:00', // default if not provided
          guestCount: bundle.guestCount,
          totalAmount,
          commissionAmount,
          vendorEarning,
          status: 'REQUESTED' // Wait for vendor to accept
        }
      });
      bookings.push(booking);
    }

    return bookings;
  }

  async cancelBooking(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.userId !== userId) throw new BadRequestException('Not authorized');
    if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
      throw new BadRequestException('Cannot cancel this booking');
    }

    // Refund logic based on 48h / 24h
    const now = new Date();
    const eventDate = new Date(booking.bookingDate);
    // Rough hour diff
    const hoursDiff = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    let refundPercent = 0;
    if (hoursDiff > 48) {
      refundPercent = 1; // 100%
    } else if (hoursDiff > 24) {
      refundPercent = 0.5; // 50%
    } else {
      refundPercent = 0; // 0%
    }

    const refundAmount = booking.totalAmount * refundPercent;

    const cancelledBooking = await this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });

    // In a real app we'd initiate Razorpay refund here if refundAmount > 0

    return {
      booking: cancelledBooking,
      refundAmount,
      message: `Booking cancelled. Refund: ₹${refundAmount}`
    };
  }

  async submitReview(id: string, userId: string, data: SubmitReviewDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id }
    });

    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.userId !== userId) throw new BadRequestException('Not authorized');
    if (booking.status !== 'COMPLETED') throw new BadRequestException('Can only review completed bookings');

    const review = await this.prisma.review.create({
      data: {
        bookingId: booking.id,
        userId,
        vendorId: booking.vendorId,
        rating: data.rating,
        reviewText: data.reviewText,
      }
    });

    // Update vendor average rating
    const aggregations = await this.prisma.review.aggregate({
      where: { vendorId: booking.vendorId },
      _avg: { rating: true }
    });

    await this.prisma.vendorProfile.update({
      where: { id: booking.vendorId },
      data: { averageRating: aggregations._avg.rating || 0 }
    });

    return review;
  }
}

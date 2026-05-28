"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createFromBundle(userId, data) {
        const bundle = await this.prisma.partyBundle.findUnique({
            where: { id: data.bundleId },
            include: {
                items: {
                    include: { vendorService: { include: { vendor: true } } }
                }
            }
        });
        if (!bundle)
            throw new common_1.NotFoundException('Bundle not found');
        if (bundle.status !== 'CONFIRMED')
            throw new common_1.BadRequestException('Bundle is not confirmed, cannot create bookings');
        const bookings = [];
        for (const item of bundle.items) {
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
                    startTime: bundle.partyTime || '12:00',
                    guestCount: bundle.guestCount,
                    totalAmount,
                    commissionAmount,
                    vendorEarning,
                    status: 'REQUESTED'
                }
            });
            bookings.push(booking);
        }
        return bookings;
    }
    async cancelBooking(id, userId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.userId !== userId)
            throw new common_1.BadRequestException('Not authorized');
        if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
            throw new common_1.BadRequestException('Cannot cancel this booking');
        }
        const now = new Date();
        const eventDate = new Date(booking.bookingDate);
        const hoursDiff = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        let refundPercent = 0;
        if (hoursDiff > 48) {
            refundPercent = 1;
        }
        else if (hoursDiff > 24) {
            refundPercent = 0.5;
        }
        else {
            refundPercent = 0;
        }
        const refundAmount = booking.totalAmount * refundPercent;
        const cancelledBooking = await this.prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED' }
        });
        return {
            booking: cancelledBooking,
            refundAmount,
            message: `Booking cancelled. Refund: ₹${refundAmount}`
        };
    }
    async submitReview(id, userId, data) {
        const booking = await this.prisma.booking.findUnique({
            where: { id }
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.userId !== userId)
            throw new common_1.BadRequestException('Not authorized');
        if (booking.status !== 'COMPLETED')
            throw new common_1.BadRequestException('Can only review completed bookings');
        const review = await this.prisma.review.create({
            data: {
                bookingId: booking.id,
                userId,
                vendorId: booking.vendorId,
                rating: data.rating,
                reviewText: data.reviewText,
            }
        });
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
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map
import { PrismaService } from '../prisma/prisma.service';
import { CreateBundleDto, AddBundleItemDto, AddBundleAddOnDto } from './dto/bundle.schema';
export declare class BundlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: CreateBundleDto): Promise<{
        items: {
            id: string;
            quantity: number;
            customNote: string | null;
            unitPrice: number;
            priceSnapshot: string;
            itemStatus: string;
            vendorServiceId: string;
            bundleId: string;
        }[];
        addOns: {
            id: string;
            quantity: number;
            customNote: string | null;
            bundleId: string;
            addOnItemId: string;
            totalPrice: number;
        }[];
    } & {
        id: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        themeId: string | null;
        title: string;
        occasionType: string;
        partyDate: Date;
        partyTime: string | null;
        guestCount: number;
        budgetMax: number | null;
        status: string;
        totalAmount: number;
    }>;
    findOne(id: string, userId: string): Promise<{
        items: ({
            vendorService: {
                vendor: {
                    businessName: string;
                };
            } & {
                id: string;
                description: string;
                isActive: boolean;
                vendorId: string;
                categoryId: string;
                title: string;
                basePrice: number;
                priceUnit: string;
                maxCapacity: number | null;
                photos: string;
                tags: string;
                priceHistory: string;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            unitPrice: number;
            priceSnapshot: string;
            itemStatus: string;
            vendorServiceId: string;
            bundleId: string;
        })[];
        addOns: ({
            addOnItem: {
                name: string;
                id: string;
                description: string;
                isActive: boolean;
                sortOrder: number;
                imageUrl: string;
                price: number;
                categorySlug: string;
                isVendorFulfilled: boolean;
                vendorId: string | null;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            bundleId: string;
            addOnItemId: string;
            totalPrice: number;
        })[];
        collaborators: ({
            user: {
                name: string;
                email: string;
                profilePicUrl: string | null;
            } | null;
        } & {
            id: string;
            email: string | null;
            role: string;
            createdAt: Date;
            userId: string | null;
            inviteToken: string | null;
            acceptedAt: Date | null;
            bundleId: string;
        })[];
        payment: ({
            splits: {
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
            }[];
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
        }) | null;
    } & {
        id: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        themeId: string | null;
        title: string;
        occasionType: string;
        partyDate: Date;
        partyTime: string | null;
        guestCount: number;
        budgetMax: number | null;
        status: string;
        totalAmount: number;
    }>;
    addItem(id: string, userId: string, data: AddBundleItemDto): Promise<{
        items: ({
            vendorService: {
                vendor: {
                    businessName: string;
                };
            } & {
                id: string;
                description: string;
                isActive: boolean;
                vendorId: string;
                categoryId: string;
                title: string;
                basePrice: number;
                priceUnit: string;
                maxCapacity: number | null;
                photos: string;
                tags: string;
                priceHistory: string;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            unitPrice: number;
            priceSnapshot: string;
            itemStatus: string;
            vendorServiceId: string;
            bundleId: string;
        })[];
        addOns: ({
            addOnItem: {
                name: string;
                id: string;
                description: string;
                isActive: boolean;
                sortOrder: number;
                imageUrl: string;
                price: number;
                categorySlug: string;
                isVendorFulfilled: boolean;
                vendorId: string | null;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            bundleId: string;
            addOnItemId: string;
            totalPrice: number;
        })[];
        collaborators: ({
            user: {
                name: string;
                email: string;
                profilePicUrl: string | null;
            } | null;
        } & {
            id: string;
            email: string | null;
            role: string;
            createdAt: Date;
            userId: string | null;
            inviteToken: string | null;
            acceptedAt: Date | null;
            bundleId: string;
        })[];
        payment: ({
            splits: {
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
            }[];
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
        }) | null;
    } & {
        id: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        themeId: string | null;
        title: string;
        occasionType: string;
        partyDate: Date;
        partyTime: string | null;
        guestCount: number;
        budgetMax: number | null;
        status: string;
        totalAmount: number;
    }>;
    removeItem(id: string, itemId: string, userId: string): Promise<{
        items: ({
            vendorService: {
                vendor: {
                    businessName: string;
                };
            } & {
                id: string;
                description: string;
                isActive: boolean;
                vendorId: string;
                categoryId: string;
                title: string;
                basePrice: number;
                priceUnit: string;
                maxCapacity: number | null;
                photos: string;
                tags: string;
                priceHistory: string;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            unitPrice: number;
            priceSnapshot: string;
            itemStatus: string;
            vendorServiceId: string;
            bundleId: string;
        })[];
        addOns: ({
            addOnItem: {
                name: string;
                id: string;
                description: string;
                isActive: boolean;
                sortOrder: number;
                imageUrl: string;
                price: number;
                categorySlug: string;
                isVendorFulfilled: boolean;
                vendorId: string | null;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            bundleId: string;
            addOnItemId: string;
            totalPrice: number;
        })[];
        collaborators: ({
            user: {
                name: string;
                email: string;
                profilePicUrl: string | null;
            } | null;
        } & {
            id: string;
            email: string | null;
            role: string;
            createdAt: Date;
            userId: string | null;
            inviteToken: string | null;
            acceptedAt: Date | null;
            bundleId: string;
        })[];
        payment: ({
            splits: {
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
            }[];
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
        }) | null;
    } & {
        id: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        themeId: string | null;
        title: string;
        occasionType: string;
        partyDate: Date;
        partyTime: string | null;
        guestCount: number;
        budgetMax: number | null;
        status: string;
        totalAmount: number;
    }>;
    addAddOn(id: string, userId: string, data: AddBundleAddOnDto): Promise<{
        items: ({
            vendorService: {
                vendor: {
                    businessName: string;
                };
            } & {
                id: string;
                description: string;
                isActive: boolean;
                vendorId: string;
                categoryId: string;
                title: string;
                basePrice: number;
                priceUnit: string;
                maxCapacity: number | null;
                photos: string;
                tags: string;
                priceHistory: string;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            unitPrice: number;
            priceSnapshot: string;
            itemStatus: string;
            vendorServiceId: string;
            bundleId: string;
        })[];
        addOns: ({
            addOnItem: {
                name: string;
                id: string;
                description: string;
                isActive: boolean;
                sortOrder: number;
                imageUrl: string;
                price: number;
                categorySlug: string;
                isVendorFulfilled: boolean;
                vendorId: string | null;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            bundleId: string;
            addOnItemId: string;
            totalPrice: number;
        })[];
        collaborators: ({
            user: {
                name: string;
                email: string;
                profilePicUrl: string | null;
            } | null;
        } & {
            id: string;
            email: string | null;
            role: string;
            createdAt: Date;
            userId: string | null;
            inviteToken: string | null;
            acceptedAt: Date | null;
            bundleId: string;
        })[];
        payment: ({
            splits: {
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
            }[];
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
        }) | null;
    } & {
        id: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        themeId: string | null;
        title: string;
        occasionType: string;
        partyDate: Date;
        partyTime: string | null;
        guestCount: number;
        budgetMax: number | null;
        status: string;
        totalAmount: number;
    }>;
    removeAddOn(id: string, addOnId: string, userId: string): Promise<{
        items: ({
            vendorService: {
                vendor: {
                    businessName: string;
                };
            } & {
                id: string;
                description: string;
                isActive: boolean;
                vendorId: string;
                categoryId: string;
                title: string;
                basePrice: number;
                priceUnit: string;
                maxCapacity: number | null;
                photos: string;
                tags: string;
                priceHistory: string;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            unitPrice: number;
            priceSnapshot: string;
            itemStatus: string;
            vendorServiceId: string;
            bundleId: string;
        })[];
        addOns: ({
            addOnItem: {
                name: string;
                id: string;
                description: string;
                isActive: boolean;
                sortOrder: number;
                imageUrl: string;
                price: number;
                categorySlug: string;
                isVendorFulfilled: boolean;
                vendorId: string | null;
            };
        } & {
            id: string;
            quantity: number;
            customNote: string | null;
            bundleId: string;
            addOnItemId: string;
            totalPrice: number;
        })[];
        collaborators: ({
            user: {
                name: string;
                email: string;
                profilePicUrl: string | null;
            } | null;
        } & {
            id: string;
            email: string | null;
            role: string;
            createdAt: Date;
            userId: string | null;
            inviteToken: string | null;
            acceptedAt: Date | null;
            bundleId: string;
        })[];
        payment: ({
            splits: {
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
            }[];
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
        }) | null;
    } & {
        id: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        themeId: string | null;
        title: string;
        occasionType: string;
        partyDate: Date;
        partyTime: string | null;
        guestCount: number;
        budgetMax: number | null;
        status: string;
        totalAmount: number;
    }>;
    checkout(id: string, userId: string): Promise<{
        message: string;
        bundleId: string;
        totalAmount: number;
    }>;
}

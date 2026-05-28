"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seeding...');
    await prisma.review.deleteMany();
    await prisma.chatMessage.deleteMany();
    await prisma.vendorPayout.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.bundleAddOn.deleteMany();
    await prisma.bundleItem.deleteMany();
    await prisma.bundleCollaborator.deleteMany();
    await prisma.paymentSplit.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.partyBundle.deleteMany();
    await prisma.vendorService.deleteMany();
    await prisma.vendorAvailability.deleteMany();
    await prisma.vendorCategory.deleteMany();
    await prisma.vendorTheme.deleteMany();
    await prisma.vendorProfile.deleteMany();
    await prisma.addOnCatalogItem.deleteMany();
    await prisma.theme.deleteMany();
    await prisma.category.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.auditLog.deleteMany();
    await prisma.wizardSession.deleteMany();
    await prisma.adminConfig.deleteMany();
    await prisma.user.deleteMany();
    await prisma.adminConfig.create({
        data: { key: 'cancellation_policy', value: JSON.stringify({ hours100: 48, hours50: 24, hours0: 0 }) }
    });
    await prisma.adminConfig.create({
        data: { key: 'split_expiry_minutes', value: '30' }
    });
    await prisma.adminConfig.create({
        data: { key: 'payout_dispute_days', value: '3' }
    });
    const categoryData = [
        'Restaurants', 'Banquet Halls', 'Villas', 'Cabs', 'Florists', 'Catering',
        'Decorators', 'DJs', 'Photography', 'Cakes', 'Return Gifts', 'Event Anchors'
    ];
    const categories = [];
    for (const name of categoryData) {
        const slug = name.toLowerCase().replace(/ /g, '-');
        const cat = await prisma.category.create({
            data: {
                name,
                slug,
                description: `${name} for your event`,
                iconUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
                defaultCommissionRate: 0.1,
            }
        });
        categories.push(cat);
    }
    const getCatId = (name) => categories.find(c => c.name === name).id;
    const themeData = [
        { name: 'Romantic Candlelit', slug: 'romantic-candlelit', moodKeywords: 'date-night,anniversary,proposal', img: 'photo-1519225421980-715cb0215aed' },
        { name: 'Rooftop Sunset', slug: 'rooftop-sunset', moodKeywords: 'birthday,date-night,nye', img: 'photo-1533174072545-7a4b6ad7a6c3' },
        { name: 'Boho Garden', slug: 'boho-garden', moodKeywords: 'birthday,housewarming,baby-shower', img: 'photo-1464366400600-7168b8af9bc3' },
        { name: 'Vintage Glamour', slug: 'vintage-glamour', moodKeywords: 'anniversary,corporate', img: 'photo-1511578314322-379afb476865' },
        { name: 'Neon Nights', slug: 'neon-nights', moodKeywords: 'birthday,nye,bachelor', img: 'photo-1574391884720-bbc3740c59d1' },
        { name: 'Royal Indian', slug: 'royal-indian', moodKeywords: 'wedding,anniversary,traditional', img: 'photo-1583939003579-730e3918a45a' },
        { name: 'Tropical Luau', slug: 'tropical-luau', moodKeywords: 'summer,pool-party,birthday', img: 'photo-1530103862676-de8c9debad1d' },
        { name: 'Minimalist White', slug: 'minimalist-white', moodKeywords: 'corporate,elegant,engagement', img: 'photo-1478146059778-26028b07395a' },
        { name: 'Outdoor Rustic', slug: 'outdoor-rustic', moodKeywords: 'housewarming,farewell,family', img: 'photo-1506784983877-45594efa4cbe' },
    ];
    const themes = [];
    for (const t of themeData) {
        const theme = await prisma.theme.create({
            data: {
                name: t.name,
                slug: t.slug,
                description: `A beautiful ${t.name.toLowerCase()} setup for your event`,
                coverImageUrl: `https://images.unsplash.com/${t.img}?w=800`,
                moodKeywords: t.moodKeywords,
            }
        });
        themes.push(theme);
    }
    const addOnCategories = ['floral', 'chocolate', 'candles', 'balloons', 'cake', 'photography', 'extras'];
    const addOnNames = {
        floral: ['Rose Petals Bed', 'Orchid Bouquet', 'Floral Arch', 'Table Centerpiece'],
        chocolate: ['Belgian Truffle Box', 'Fondue Station', 'Custom Chocolate Bar', 'Praline Gift Set'],
        candles: ['Aromatic Candle Set', 'Floating Candles (50)', 'LED Tea Lights (100)'],
        balloons: ['Helium Balloon Arch', 'Number Balloons', 'Confetti Balloons (50)', 'Heart Foil Set'],
        cake: ['2-Tier Custom Cake', '3-Tier Premium Cake', 'Cupcake Tower (30)'],
        photography: ['Polaroid Station', 'Photo Booth Props', '360° Video Booth'],
        extras: ['Custom Playlist DJ', 'Fog Machine', 'Sparkler Exit Kit', 'Party Favors (20)'],
    };
    for (const cat of addOnCategories) {
        for (const name of (addOnNames[cat] || [])) {
            await prisma.addOnCatalogItem.create({
                data: {
                    name,
                    description: `Premium ${name.toLowerCase()} to enhance your event`,
                    categorySlug: cat,
                    price: Math.floor(Math.random() * 4000) + 800,
                    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=200',
                    isVendorFulfilled: true,
                }
            });
        }
    }
    const hash = await bcrypt.hash('Admin@1234!', 10);
    const admin = await prisma.user.create({
        data: { name: 'Super Admin', email: 'admin@partyos.dev', phone: '+91-9000000000', passwordHash: hash, role: 'ADMIN', isVerified: true }
    });
    const cHash = await bcrypt.hash('Password@123', 10);
    const cust1 = await prisma.user.create({
        data: { name: 'Rahul Kumar', email: 'rahul@example.com', phone: '+91-9000011111', passwordHash: cHash, role: 'CUSTOMER', isVerified: true }
    });
    const cust2 = await prisma.user.create({
        data: { name: 'Sarah Mehta', email: 'sarah@example.com', phone: '+91-9000022222', passwordHash: cHash, role: 'CUSTOMER', isVerified: true }
    });
    const vHash = await bcrypt.hash('Vendor@123', 10);
    const vendorNames = [
        'Lumina Events & Co.', 'Skyline Hospitality', 'The Rustic Table',
        'EliteCabs Mumbai', 'Bloom & Petal Studio', 'Spice Route Caterers',
        'Dreamweave Decorators', 'Beat Drop DJs'
    ];
    const vendorProfiles = [];
    for (let i = 0; i < 8; i++) {
        const vUser = await prisma.user.create({
            data: {
                name: `${vendorNames[i]} Owner`,
                email: `vendor${i + 1}@example.com`,
                phone: `+91-900003333${i + 1}`,
                passwordHash: vHash,
                role: 'VENDOR',
                isVerified: true,
            }
        });
        const profile = await prisma.vendorProfile.create({
            data: {
                userId: vUser.id,
                businessName: vendorNames[i],
                description: `Top-rated ${vendorNames[i]} offering amazing experiences for your events.`,
                city: i % 2 === 0 ? 'Mumbai' : 'Delhi',
                state: i % 2 === 0 ? 'Maharashtra' : 'Delhi',
                pincode: '400001',
                addressLine: `${100 + i} Main Street`,
                isApproved: true,
                averageRating: parseFloat((4.5 + i * 0.05).toFixed(2)),
                commissionRate: 0.1,
                categories: { create: [{ categoryId: categories[i % categories.length].id, isPrimary: true }] },
                themes: { create: [{ themeId: themes[i % themes.length].id }] }
            }
        });
        vendorProfiles.push(profile);
        const serviceCount = i < 4 ? 3 : 2;
        for (let j = 1; j <= serviceCount; j++) {
            await prisma.vendorService.create({
                data: {
                    vendorId: profile.id,
                    categoryId: categories[i % categories.length].id,
                    title: `${vendorNames[i]} — Service ${j}`,
                    description: `Premium service #${j} by ${vendorNames[i]}`,
                    basePrice: Math.floor(Math.random() * 80000) + 10000,
                    priceUnit: 'per event',
                    photos: JSON.stringify([
                        `https://images.unsplash.com/${themeData[j % themeData.length].img}?w=500`
                    ]),
                    tags: JSON.stringify(['premium', 'top-rated']),
                }
            });
        }
    }
    const allServices = await prisma.vendorService.findMany({ include: { vendor: true } });
    const bundle1 = await prisma.partyBundle.create({
        data: {
            userId: cust1.id,
            title: "Rahul's 30th Birthday Bash",
            occasionType: 'birthday',
            themeId: themes[1].id,
            partyDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            partyTime: '19:00',
            guestCount: 50,
            budgetMax: 200000,
            city: 'Mumbai',
            status: 'CONFIRMED',
            totalAmount: allServices[0].basePrice + allServices[1].basePrice,
            collaborators: { create: [{ userId: cust1.id, role: 'OWNER' }] },
            items: {
                create: [
                    {
                        vendorServiceId: allServices[0].id,
                        quantity: 1,
                        unitPrice: allServices[0].basePrice,
                        priceSnapshot: JSON.stringify({ title: allServices[0].title, basePrice: allServices[0].basePrice }),
                    },
                    {
                        vendorServiceId: allServices[1].id,
                        quantity: 1,
                        unitPrice: allServices[1].basePrice,
                        priceSnapshot: JSON.stringify({ title: allServices[1].title, basePrice: allServices[1].basePrice }),
                    }
                ]
            }
        }
    });
    const b1Items = await prisma.bundleItem.findMany({ where: { bundleId: bundle1.id } });
    const booking1 = await prisma.booking.create({
        data: {
            bundleId: bundle1.id,
            bundleItemId: b1Items[0].id,
            userId: cust1.id,
            vendorId: allServices[0].vendorId,
            serviceId: allServices[0].id,
            bookingDate: bundle1.partyDate,
            startTime: '19:00',
            guestCount: 50,
            totalAmount: allServices[0].basePrice,
            commissionAmount: allServices[0].basePrice * 0.1,
            vendorEarning: allServices[0].basePrice * 0.9,
            status: 'CONFIRMED',
        }
    });
    const booking2 = await prisma.booking.create({
        data: {
            bundleId: bundle1.id,
            bundleItemId: b1Items[1].id,
            userId: cust1.id,
            vendorId: allServices[1].vendorId,
            serviceId: allServices[1].id,
            bookingDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            startTime: '18:00',
            guestCount: 50,
            totalAmount: allServices[1].basePrice,
            commissionAmount: allServices[1].basePrice * 0.1,
            vendorEarning: allServices[1].basePrice * 0.9,
            status: 'COMPLETED',
        }
    });
    await prisma.review.create({
        data: {
            bookingId: booking2.id,
            userId: cust1.id,
            vendorId: allServices[1].vendorId,
            rating: 5,
            reviewText: 'Absolutely phenomenal! The team handled everything with such grace. Will book again.',
            vendorReply: 'Thank you Rahul! It was a pleasure hosting your birthday bash. 🎉',
            vendorRepliedAt: new Date(),
        }
    });
    for (let i = 2; i <= 5; i++) {
        if (!allServices[i])
            break;
        const dummyBooking = await prisma.booking.create({
            data: {
                userId: cust2.id,
                vendorId: allServices[i].vendorId,
                serviceId: allServices[i].id,
                bookingDate: new Date(Date.now() - (i * 7) * 24 * 60 * 60 * 1000),
                startTime: '19:00',
                guestCount: 20 + i * 5,
                totalAmount: allServices[i].basePrice,
                commissionAmount: allServices[i].basePrice * 0.1,
                vendorEarning: allServices[i].basePrice * 0.9,
                status: 'COMPLETED',
            }
        });
        await prisma.review.create({
            data: {
                bookingId: dummyBooking.id,
                userId: cust2.id,
                vendorId: allServices[i].vendorId,
                rating: 4 + (i % 2),
                reviewText: [
                    'Great experience! Very professional team.',
                    'Exceeded expectations. Beautiful setup.',
                    'Good value for money. Would recommend.',
                    'Amazing attention to detail. 10/10.',
                ][i % 4],
                vendorReply: i % 2 === 0 ? 'Thank you for the kind words!' : undefined,
                vendorRepliedAt: i % 2 === 0 ? new Date() : undefined,
            }
        });
    }
    await prisma.partyBundle.create({
        data: {
            userId: cust2.id,
            title: 'Corporate Year-End Celebration',
            occasionType: 'corporate',
            themeId: themes[3].id,
            partyDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
            partyTime: '18:30',
            guestCount: 80,
            budgetMax: 500000,
            city: 'Delhi',
            status: 'DRAFT',
            totalAmount: 0,
            collaborators: { create: [{ userId: cust2.id, role: 'OWNER' }] }
        }
    });
    await prisma.notification.create({
        data: {
            userId: cust1.id,
            type: 'BOOKING_CONFIRMED',
            title: 'Booking Confirmed! 🎉',
            body: 'Your booking with Lumina Events & Co. for your 30th birthday is confirmed.',
        }
    });
    await prisma.notification.create({
        data: {
            userId: cust1.id,
            type: 'NEW_MESSAGE',
            title: 'New message from vendor',
            body: 'Skyline Hospitality sent you a message about your upcoming event.',
        }
    });
    await prisma.auditLog.create({
        data: {
            actorId: admin.id,
            actorRole: 'ADMIN',
            action: 'VENDOR_APPROVED',
            entityType: 'VendorProfile',
            entityId: vendorProfiles[0].id,
        }
    });
    console.log('✅ Database seeded successfully!');
    console.log(`   Admin:     admin@partyos.dev / Admin@1234!`);
    console.log(`   Customer:  rahul@example.com / Password@123`);
    console.log(`   Customer:  sarah@example.com / Password@123`);
    console.log(`   Vendors:   vendor1@example.com – vendor8@example.com / Vendor@123`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
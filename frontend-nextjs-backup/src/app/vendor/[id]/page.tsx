import Image from 'next/image';
import { Star, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { Separator } from '@/components/ui/separator';

const MOCK_VENDOR = {
  id: 'v1',
  businessName: 'Lumina Events & Co.',
  description: 'Creating magical experiences for over a decade. We specialize in luxury weddings, corporate galas, and intimate celebrations with a focus on bespoke design and flawless execution.',
  city: 'Mumbai',
  averageRating: 4.9,
  reviewCount: 124,
  coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200',
  isVerified: true,
  services: [
    {
      id: 's1',
      vendorId: 'v1',
      name: 'Full Event Planning',
      description: 'Comprehensive event planning from conception to execution.',
      price: 150000,
      durationHours: 24,
      imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500',
    },
    {
      id: 's2',
      vendorId: 'v1',
      name: 'Day-of Coordination',
      description: 'Flawless execution of your event on the big day.',
      price: 50000,
      durationHours: 12,
      imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500',
    }
  ],
  reviews: [
    { id: 1, user: 'Sarah M.', rating: 5, text: 'Absolutely phenomenal! They handled everything perfectly.', date: '2 weeks ago' },
    { id: 2, user: 'Rahul K.', rating: 5, text: 'The best decision we made for our wedding. Highly recommend.', date: '1 month ago' }
  ]
};

export default function VendorProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image 
          src={MOCK_VENDOR.coverImage} 
          alt={MOCK_VENDOR.businessName} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
        <div className="bg-card rounded-3xl p-8 shadow-xl border border-border flex flex-col md:flex-row gap-8 justify-between items-start">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-heading font-bold">{MOCK_VENDOR.businessName}</h1>
              {MOCK_VENDOR.isVerified && (
                <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 mr-1" /> Verified
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm font-medium">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {MOCK_VENDOR.city}</span>
              <span className="flex items-center text-accent"><Star className="w-4 h-4 mr-1 fill-current" /> {MOCK_VENDOR.averageRating} ({MOCK_VENDOR.reviewCount} reviews)</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-primary" /> Premium Vendor</span>
            </div>
            
            <p className="text-foreground leading-relaxed">
              {MOCK_VENDOR.description}
            </p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-3 min-w-[200px]">
            <Button className="w-full text-lg h-12 rounded-xl">Contact Vendor</Button>
            <Button variant="outline" className="w-full h-12 rounded-xl">Share Profile</Button>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-heading font-bold mb-8">Services Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_VENDOR.services.map((service: any) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
              />
            ))}
          </div>
        </div>

        <Separator className="my-16" />

        {/* Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold">Reviews</h2>
            <div className="text-right">
              <div className="flex items-center justify-end text-3xl font-bold text-accent mb-1">
                <Star className="w-8 h-8 fill-current mr-2" /> {MOCK_VENDOR.averageRating}
              </div>
              <p className="text-sm text-muted-foreground">Based on {MOCK_VENDOR.reviewCount} reviews</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_VENDOR.reviews.map(review => (
              <div key={review.id} className="bg-muted/30 p-6 rounded-2xl border border-border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">{review.user}</h4>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-muted'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6">Load More Reviews</Button>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useWizardStore } from '@/lib/store/wizard-store';
import { ServiceCard } from '@/components/shared/ServiceCard';

const MOCK_VENUES = [
  {
    id: 'v-1',
    title: 'The Glasshouse',
    vendorName: 'Lumina Events',
    basePrice: 45000,
    priceUnit: 'per event',
    photos: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500'],
  },
  {
    id: 'v-2',
    title: 'Sunset Rooftop Lounge',
    vendorName: 'Skyline Hospitality',
    basePrice: 60000,
    priceUnit: 'per event',
    photos: ['https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500'],
  },
  {
    id: 'v-3',
    title: 'Heritage Villa',
    vendorName: 'Royal Estates',
    basePrice: 85000,
    priceUnit: 'per day',
    photos: ['https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500'],
  },
];

export function Step4Venue() {
  const { selectedVenueId, setVenue } = useWizardStore();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-heading font-bold mb-2">Select a Venue</h2>
        <p className="text-muted-foreground">Curated locations that match your details and theme.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-4 px-2">
        {MOCK_VENUES.map(venue => (
          <div 
            key={venue.id} 
            onClick={() => setVenue(venue.id)}
            className={`cursor-pointer transition-all duration-300 rounded-2xl ring-offset-2 ${selectedVenueId === venue.id ? 'ring-2 ring-primary ring-offset-background scale-[1.02]' : 'hover:scale-[1.01]'}`}
          >
            {/* @ts-ignore - type mismatch for mock data */}
            <ServiceCard service={venue as any} />
          </div>
        ))}
      </div>
    </div>
  );
}

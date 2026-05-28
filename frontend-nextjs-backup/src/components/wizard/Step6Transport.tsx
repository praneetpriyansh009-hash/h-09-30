'use client';
import { useWizardStore } from '@/lib/store/wizard-store';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

const MOCK_TRANSPORT = [
  {
    id: 't-1',
    title: 'Luxury Sedan (Up to 4 Pax)',
    vendorName: 'Elite Cabs',
    basePrice: 3500,
    priceUnit: 'per trip',
    photos: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500'],
  },
  {
    id: 't-2',
    title: 'Premium SUV (Up to 6 Pax)',
    vendorName: 'Elite Cabs',
    basePrice: 5000,
    priceUnit: 'per trip',
    photos: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500'],
  },
  {
    id: 't-3',
    title: 'Party Bus (Up to 20 Pax)',
    vendorName: 'Vibe Travels',
    basePrice: 15000,
    priceUnit: 'per day',
    photos: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500'],
  },
];

export function Step6Transport() {
  const { selectedTransportId, setTransport, nextStep } = useWizardStore();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center relative">
        <h2 className="text-3xl font-heading font-bold mb-2">Need a ride?</h2>
        <p className="text-muted-foreground">Book transport for you or your guests.</p>
        
        <Button 
          variant="ghost" 
          onClick={() => {
            setTransport(null);
            nextStep();
          }}
          className="absolute right-0 top-0 text-muted-foreground hover:text-primary"
        >
          Skip this step
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-4 px-2">
        {MOCK_TRANSPORT.map(transport => (
          <div 
            key={transport.id} 
            onClick={() => setTransport(transport.id)}
            className={`cursor-pointer transition-all duration-300 rounded-2xl ring-offset-2 ${selectedTransportId === transport.id ? 'ring-2 ring-primary ring-offset-background scale-[1.02]' : 'hover:scale-[1.01]'}`}
          >
            {/* @ts-ignore - type mismatch for mock data */}
            <ServiceCard service={transport as any} />
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';
import { useWizardStore } from '@/lib/store/wizard-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PartyPopper, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Step7Review() {
  const { occasion, date, time, guests, addOns, selectedVenueId, selectedTransportId } = useWizardStore();
  const router = useRouter();

  // Mock pricing calculation
  const venuePrice = selectedVenueId ? 60000 : 0;
  const transportPrice = selectedTransportId ? 5000 : 0;
  const addOnsTotal = addOns.reduce((sum, a) => sum + (a.price * a.quantity), 0);
  const total = venuePrice + transportPrice + addOnsTotal;

  const handleCheckout = () => {
    // Navigate to a mock bundle detail/checkout page
    router.push('/bundle/mock-bundle-123');
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <PartyPopper className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-heading font-bold mb-2">Review Your Plan</h2>
        <p className="text-muted-foreground">Almost there! Review your selections and proceed to book.</p>
      </div>

      <div className="w-full max-w-2xl bg-muted/20 border border-border rounded-2xl p-6 md:p-8 space-y-6">
        
        {/* Details Summary */}
        <div>
          <h3 className="font-semibold text-lg flex items-center mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Event Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block">Occasion</span>
              <span className="font-medium capitalize">{occasion?.replace('-', ' ') || 'Party'}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Date & Time</span>
              <span className="font-medium">{date?.toLocaleDateString()} at {time}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Guests</span>
              <span className="font-medium">{guests} people</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Cost Breakdown */}
        <div>
          <h3 className="font-semibold text-lg flex items-center mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Cost Breakdown
          </h3>
          
          <div className="space-y-3 text-sm">
            {selectedVenueId && (
              <div className="flex justify-between">
                <span>Venue (Sunset Rooftop Lounge)</span>
                <span className="font-medium">₹{venuePrice.toLocaleString()}</span>
              </div>
            )}
            
            {addOns.map(a => (
              <div key={a.id} className="flex justify-between">
                <span>{a.quantity}x {a.name}</span>
                <span className="font-medium">₹{(a.price * a.quantity).toLocaleString()}</span>
              </div>
            ))}

            {selectedTransportId && (
              <div className="flex justify-between">
                <span>Transport (Premium SUV)</span>
                <span className="font-medium">₹{transportPrice.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-xl font-bold">Total Estimate</span>
          <span className="text-3xl font-bold text-primary">₹{total.toLocaleString()}</span>
        </div>

      </div>

      <div className="mt-10 max-w-2xl w-full flex gap-4">
        <Button 
          className="flex-1 h-14 text-lg rounded-xl"
          variant="outline"
          onClick={() => alert("Split payment flow...")}
        >
          Split with Friends
        </Button>
        <Button 
          className="flex-1 h-14 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

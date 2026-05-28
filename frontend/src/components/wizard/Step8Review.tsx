import { useWizardStore } from '@/lib/store/wizard-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PartyPopper, CheckCircle2, Receipt, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Step8Review() {
  const { 
    occasion, date, time, guests, city, 
    themeId, customMessage, selectedVenueId, 
    menuPackageId, eventFunctions,
    addOns, selectedTransportId, transportStops
  } = useWizardStore();
  
  const navigate = useNavigate();

  // Mock Pricing Logic
  const venuePrice = selectedVenueId ? 25000 : 0;
  
  const menuPricePerHead = menuPackageId === 'standard-buffet' ? 1200 :
                           menuPackageId === 'premium-buffet' ? 2500 :
                           menuPackageId === 'plated-dinner' ? 4000 : 
                           menuPackageId === 'high-tea' ? 800 : 0;
                           
  const totalMenuPrice = menuPricePerHead * guests;
  
  const transportPrice = selectedTransportId === 't-1' ? 3500 :
                         selectedTransportId === 't-2' ? 5000 :
                         selectedTransportId === 't-3' ? 15000 : 0;
                         
  const addOnsTotal = addOns.reduce((sum, a) => sum + (a.price * a.quantity), 0);
  
  const platformFee = 500;
  const subtotal = venuePrice + totalMenuPrice + transportPrice + addOnsTotal;
  const taxes = subtotal * 0.18; // 18% GST mock
  const grandTotal = subtotal + taxes + platformFee;

  const handleCheckout = () => {
    navigate('/bundle/mock-bundle-123');
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

      <div className="w-full max-w-2xl bg-card/40 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl overflow-y-auto max-h-[60vh] custom-scrollbar">
        
        {/* Core Event Summary */}
        <div className="flex flex-col md:flex-row gap-6 p-4 bg-primary/5 rounded-2xl border border-primary/20">
          <div className="flex-1 space-y-1">
            <h3 className="font-bold text-xl text-primary capitalize">{occasion?.replace('-', ' ') || 'Special Event'}</h3>
            <div className="flex items-center text-muted-foreground text-sm gap-2">
              <Calendar className="w-4 h-4" /> 
              {date ? date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD'} at {time}
            </div>
            <div className="flex items-center text-muted-foreground text-sm gap-2">
              <MapPin className="w-4 h-4" /> {city || 'TBD'}
            </div>
          </div>
          <div className="text-right flex flex-col justify-center">
            <span className="text-sm text-muted-foreground">Guest Count</span>
            <span className="text-2xl font-bold">{guests} <span className="text-sm font-normal">pax</span></span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div>
          <h3 className="font-semibold text-lg flex items-center mb-4 text-foreground">
            <Receipt className="w-5 h-5 mr-2 text-primary" /> Order Summary
          </h3>
          
          <div className="space-y-4 text-sm">
            {/* Theme Info */}
            <div className="bg-background/50 p-4 rounded-xl space-y-1">
              <div className="flex justify-between font-medium">
                <span>Theme & Ambience</span>
                <span className="text-green-500">Included</span>
              </div>
              {themeId === 'custom' ? (
                <p className="text-muted-foreground text-xs italic">"{customMessage}"</p>
              ) : (
                <p className="text-muted-foreground text-xs capitalize">{themeId?.replace('-', ' ')}</p>
              )}
            </div>

            {/* Venue & Menu */}
            {(selectedVenueId || menuPackageId) && (
              <div className="bg-background/50 p-4 rounded-xl space-y-3">
                {selectedVenueId && (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Venue Booking</p>
                      <p className="text-xs text-muted-foreground">The Glasshouse (Base Price)</p>
                    </div>
                    <span className="font-medium">₹{venuePrice.toLocaleString()}</span>
                  </div>
                )}
                {selectedVenueId && menuPackageId && <Separator className="bg-border/50" />}
                {menuPackageId && (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Food & Beverages</p>
                      <p className="text-xs text-muted-foreground">{guests} guests × ₹{menuPricePerHead}</p>
                      {eventFunctions.length > 0 && (
                        <p className="text-xs text-primary mt-1">Functions: {eventFunctions.join(', ')}</p>
                      )}
                    </div>
                    <span className="font-medium">₹{totalMenuPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Add Ons */}
            {addOns.length > 0 && (
              <div className="bg-background/50 p-4 rounded-xl space-y-2">
                <p className="font-medium mb-1">Add-Ons</p>
                {addOns.map(a => (
                  <div key={a.id} className="flex justify-between text-muted-foreground">
                    <span>{a.quantity}x {a.name}</span>
                    <span className="text-foreground">₹{(a.price * a.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Transport */}
            {selectedTransportId && (
              <div className="bg-background/50 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Transport</p>
                    <p className="text-xs text-muted-foreground">Premium Vehicle</p>
                  </div>
                  <span className="font-medium">₹{transportPrice.toLocaleString()}</span>
                </div>
                {transportStops.filter(Boolean).length > 0 && (
                  <div className="text-xs text-muted-foreground pl-2 border-l-2 border-primary/20">
                    <p>Route: {transportStops.filter(Boolean).length} stops configured</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Final Calculation */}
        <div className="space-y-2 text-sm px-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Platform Fee</span>
            <span>₹{platformFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Taxes & GST (18%)</span>
            <span>₹{taxes.toLocaleString()}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-end pt-4 border-t border-border mt-4 px-2">
          <div>
            <span className="text-lg font-bold block text-foreground">Grand Total</span>
            <span className="text-xs text-muted-foreground">Includes all taxes and fees</span>
          </div>
          <span className="text-3xl font-bold text-primary">₹{grandTotal.toLocaleString()}</span>
        </div>

      </div>

      <div className="mt-8 max-w-2xl w-full flex flex-col sm:flex-row gap-4">
        <Button 
          className="flex-1 h-14 text-lg rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]"
          variant="outline"
          onClick={() => alert("Split payment flow...")}
        >
          Split with Friends
        </Button>
        <Button 
          className="flex-1 h-14 text-lg rounded-2xl bg-gradient-to-r from-neon-pink to-neon-violet hover:from-neon-pink/90 hover:to-neon-violet/90 text-white shadow-[0_0_30px_rgba(225,29,72,0.4)]"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

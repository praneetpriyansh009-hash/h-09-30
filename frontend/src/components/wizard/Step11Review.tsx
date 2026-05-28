import { useWizardStore } from '@/lib/store/wizard-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PartyPopper, Receipt, Calendar, MapPin, Music, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Step11Review() {
  const { 
    occasion, date, time, guests, city, 
    themeId, customMessage, selectedVenueId, 
    menuPackageId, eventFunctions,
    addOns, selectedTransportId, transportStops,
    spotifyGenre, dressCode, signatureDrinks,
    hangoverKits, cleaningService, uberVouchers
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
  
  // Post-party costs
  const hangoverKitTotal = hangoverKits * 1500;
  const cleaningTotal = cleaningService ? 5000 : 0;
  const uberVouchersTotal = uberVouchers * 1000;
  const postPartyTotal = hangoverKitTotal + cleaningTotal + uberVouchersTotal;
  
  const platformFee = 500;
  const subtotal = venuePrice + totalMenuPrice + transportPrice + addOnsTotal + postPartyTotal;
  const taxes = subtotal * 0.18; // 18% GST mock
  const grandTotal = subtotal + taxes + platformFee;

  const handleCheckout = () => {
    // Navigate to the shiny digital ticket
    navigate('/ticket');
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-pink/10 text-neon-pink mb-4">
          <PartyPopper className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-heading font-bold mb-2">Review Your <span className="gradient-text">Masterpiece</span></h2>
        <p className="text-white/50 font-display">The ultimate party is ready. Review and finalize.</p>
      </div>

      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl overflow-y-auto max-h-[60vh] custom-scrollbar">
        
        {/* Core Event Summary */}
        <div className="flex flex-col md:flex-row gap-6 p-5 bg-gradient-to-br from-neon-pink/10 to-neon-violet/10 rounded-2xl border border-white/[0.1] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="flex-1 space-y-2 relative z-10">
            <h3 className="font-bold text-2xl text-white capitalize">{occasion?.replace('-', ' ') || 'Epic Event'}</h3>
            <div className="flex items-center text-white/70 text-sm gap-2">
              <Calendar className="w-4 h-4 text-neon-pink" /> 
              {date ? date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD'} at {time}
            </div>
            <div className="flex items-center text-white/70 text-sm gap-2">
              <MapPin className="w-4 h-4 text-neon-cyan" /> {city || 'TBD'}
            </div>
          </div>
          <div className="text-right flex flex-col justify-center relative z-10">
            <span className="text-sm text-white/50">Guest Count</span>
            <span className="text-3xl font-bold text-white">{guests} <span className="text-sm font-normal text-white/50">pax</span></span>
          </div>
        </div>

        {/* Vibes Overview */}
        <div className="flex flex-wrap gap-3">
          {dressCode && (
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] rounded-full px-4 py-2 text-sm text-white">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="capitalize">{dressCode.replace('-', ' ')}</span>
            </div>
          )}
          {spotifyGenre && (
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] rounded-full px-4 py-2 text-sm text-white">
              <Music className="w-4 h-4 text-neon-violet" />
              <span>{spotifyGenre}</span>
            </div>
          )}
          {signatureDrinks.length > 0 && (
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] rounded-full px-4 py-2 text-sm text-white">
              <span>🍹 {signatureDrinks.length} Signature Drinks</span>
            </div>
          )}
        </div>

        {/* Detailed Breakdown */}
        <div>
          <h3 className="font-semibold text-lg flex items-center mb-4 text-white">
            <Receipt className="w-5 h-5 mr-2 text-neon-pink" /> Financial Breakdown
          </h3>
          
          <div className="space-y-4 text-sm">
            
            {/* Venue & Menu */}
            {(selectedVenueId || menuPackageId) && (
              <div className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-xl space-y-3">
                {selectedVenueId && (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">Venue Booking</p>
                      <p className="text-xs text-white/40">Premium Space</p>
                    </div>
                    <span className="font-medium text-white">₹{venuePrice.toLocaleString()}</span>
                  </div>
                )}
                {selectedVenueId && menuPackageId && <Separator className="bg-white/[0.05]" />}
                {menuPackageId && (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">Food & Beverages</p>
                      <p className="text-xs text-white/40">{guests} guests × ₹{menuPricePerHead}</p>
                    </div>
                    <span className="font-medium text-white">₹{totalMenuPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Add Ons */}
            {addOns.length > 0 && (
              <div className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-xl space-y-2">
                <p className="font-medium mb-1 text-white">Add-Ons & Experiences</p>
                {addOns.map(a => (
                  <div key={a.id} className="flex justify-between text-white/60">
                    <span>{a.quantity}x {a.name}</span>
                    <span className="text-white">₹{(a.price * a.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Transport */}
            {selectedTransportId && (
              <div className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-white">Logistics & Transport</p>
                    <p className="text-xs text-white/40">VIP Convoy</p>
                  </div>
                  <span className="font-medium text-white">₹{transportPrice.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Post-Party Care */}
            {postPartyTotal > 0 && (
              <div className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-xl space-y-2">
                <p className="font-medium mb-1 text-white">Post-Party Care</p>
                {hangoverKits > 0 && (
                  <div className="flex justify-between text-white/60">
                    <span>{hangoverKits}x Hangover Kits</span>
                    <span className="text-white">₹{hangoverKitTotal.toLocaleString()}</span>
                  </div>
                )}
                {cleaningService && (
                  <div className="flex justify-between text-white/60">
                    <span>Deep Cleaning Service</span>
                    <span className="text-white">₹{cleaningTotal.toLocaleString()}</span>
                  </div>
                )}
                {uberVouchers > 0 && (
                  <div className="flex justify-between text-white/60">
                    <span>{uberVouchers}x Uber Vouchers</span>
                    <span className="text-white">₹{uberVouchersTotal.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        <Separator className="bg-white/[0.1]" />

        {/* Final Calculation */}
        <div className="space-y-2 text-sm px-2">
          <div className="flex justify-between text-white/60">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Platform & Concierge Fee</span>
            <span>₹{platformFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Taxes & GST (18%)</span>
            <span>₹{taxes.toLocaleString()}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-end pt-4 border-t border-white/[0.1] mt-4 px-2">
          <div>
            <span className="text-lg font-bold block text-white">Grand Total</span>
            <span className="text-xs text-white/40">All inclusive</span>
          </div>
          <span className="text-3xl font-bold text-neon-pink">₹{grandTotal.toLocaleString()}</span>
        </div>

      </div>

      <div className="mt-8 max-w-2xl w-full flex flex-col sm:flex-row gap-4 z-10">
        <Button 
          className="flex-1 h-14 text-lg rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]"
          variant="outline"
          onClick={() => navigate('/party/mock-id-123')}
        >
          View Dashboard
        </Button>
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-neon-pink to-neon-violet hover:from-neon-pink/90 hover:to-neon-violet/90 text-white shadow-[0_0_30px_rgba(225,29,72,0.4)]"
            onClick={handleCheckout}
          >
            Confirm & Generate Ticket
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

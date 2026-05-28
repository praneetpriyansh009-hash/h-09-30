import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Pill, SprayCan, Car, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function Step10PostParty() {
  const { 
    guests,
    hangoverKits,
    cleaningService,
    uberVouchers,
    setPostParty,
    nextStep, 
    prevStep 
  } = useWizardStore();

  const toggleCleaning = () => {
    setPostParty({ hangoverKits, cleaningService: !cleaningService, uberVouchers });
  };

  const updateKits = (delta: number) => {
    const newCount = Math.max(0, Math.min(guests, hangoverKits + delta));
    setPostParty({ hangoverKits: newCount, cleaningService, uberVouchers });
  };

  const updateVouchers = (delta: number) => {
    const newCount = Math.max(0, Math.min(guests, uberVouchers + delta));
    setPostParty({ hangoverKits, cleaningService, uberVouchers: newCount });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold mb-2">The <span className="gradient-text">Morning After</span></h2>
        <p className="text-white/50 font-display">Elite parties mean taking care of your guests (and yourself) after the music stops.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 space-y-6 pb-24">
        
        {/* Hangover Kits */}
        <div className={cn(
          "p-6 rounded-3xl border transition-all duration-300",
          hangoverKits > 0 ? "bg-neon-pink/10 border-neon-pink/50" : "bg-white/[0.03] border-white/[0.08]"
        )}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-pink/20 to-neon-violet/20 flex items-center justify-center shrink-0">
                <Pill className="w-6 h-6 text-neon-pink" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">Premium Hangover Kits</h3>
                <p className="text-sm text-white/50 mb-3">IV Hydration salts, aspirin, eye masks, and gourmet coffee sent to guests.</p>
                <span className="text-neon-pink font-semibold">₹1,500 / kit</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-black/40 rounded-full p-1 border border-white/[0.1]">
              <button 
                onClick={() => updateKits(-1)}
                className="w-8 h-8 rounded-full bg-white/[0.1] hover:bg-white/[0.2] flex items-center justify-center text-white"
              >-</button>
              <span className="w-6 text-center text-white font-medium">{hangoverKits}</span>
              <button 
                onClick={() => updateKits(1)}
                className="w-8 h-8 rounded-full bg-neon-pink text-white flex items-center justify-center shadow-[0_0_10px_rgba(225,29,72,0.5)]"
              >+</button>
            </div>
          </div>
        </div>

        {/* Deep Cleaning */}
        <div 
          onClick={toggleCleaning}
          className={cn(
            "p-6 rounded-3xl border cursor-pointer transition-all duration-300",
            cleaningService ? "bg-neon-cyan/10 border-neon-cyan/50" : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-blue-500/20 flex items-center justify-center shrink-0">
                <SprayCan className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">Next-Day Deep Cleaning</h3>
                <p className="text-sm text-white/50 mb-3">Professional crew arrives at 8 AM. Zero stress, spotless venue/home.</p>
                <span className="text-neon-cyan font-semibold">₹5,000 Flat</span>
              </div>
            </div>
            
            <div className={cn(
              "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors",
              cleaningService ? "bg-neon-cyan border-neon-cyan text-black" : "border-white/20 text-transparent"
            )}>
              <Check className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Uber Vouchers */}
        <div className={cn(
          "p-6 rounded-3xl border transition-all duration-300",
          uberVouchers > 0 ? "bg-gold/10 border-gold/50" : "bg-white/[0.03] border-white/[0.08]"
        )}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-yellow-500/20 flex items-center justify-center shrink-0">
                <Car className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">Safe Ride Home (Cab Vouchers)</h3>
                <p className="text-sm text-white/50 mb-3">Pre-paid ₹1,000 Uber/Ola vouchers for your guests to get home safely.</p>
                <span className="text-gold font-semibold">₹1,000 / voucher</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-black/40 rounded-full p-1 border border-white/[0.1]">
              <button 
                onClick={() => updateVouchers(-1)}
                className="w-8 h-8 rounded-full bg-white/[0.1] hover:bg-white/[0.2] flex items-center justify-center text-white"
              >-</button>
              <span className="w-6 text-center text-white font-medium">{uberVouchers}</span>
              <button 
                onClick={() => updateVouchers(1)}
                className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center shadow-[0_0_10px_rgba(245,166,35,0.5)] font-bold"
              >+</button>
            </div>
          </div>
        </div>

      </div>

      <div className="pt-6 border-t border-white/[0.08] flex justify-between mt-auto bg-background/80 backdrop-blur-md">
        <Button variant="ghost" onClick={prevStep} className="text-white/70 hover:text-white">
          Back
        </Button>
        <Button 
          onClick={nextStep} 
          className="bg-white text-black font-bold px-8 hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Review Party
        </Button>
      </div>
    </div>
  );
}

import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Music, Shirt, GlassWater, Plus, X, Flame, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const DRESS_CODES = [
  { id: 'casual', name: 'Casual / Relaxed', icon: '👕' },
  { id: 'cocktail', name: 'Cocktail Attire', icon: '🍸' },
  { id: 'black-tie', name: 'Black Tie / Formal', icon: '👔' },
  { id: 'theme', name: 'Thematic / Costume', icon: '🎭' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', icon: '🕶️' },
  { id: 'beach', name: 'Beach / Tropical', icon: '🏖️' },
];

const GENRES = [
  'EDM / House', 'Hip Hop', 'Pop Hits', 'Bollywood', 'Techno', 'Jazz / Acoustic', 'R&B', 'Amapiano'
];

export function Step9Vibes() {
  const { 
    spotifyGenre, 
    dressCode, 
    signatureDrinks, 
    energyLevel,
    wildcardSurprise,
    setVibes, 
    nextStep, 
    prevStep 
  } = useWizardStore();

  const [drinkName, setDrinkName] = useState('');

  const handleDrinkAdd = () => {
    if (drinkName.trim() && signatureDrinks.length < 3) {
      setVibes({
        spotifyGenre,
        dressCode,
        energyLevel,
        wildcardSurprise,
        signatureDrinks: [...signatureDrinks, drinkName.trim()]
      });
      setDrinkName('');
    }
  };

  const removeDrink = (index: number) => {
    setVibes({
      spotifyGenre,
      dressCode,
      energyLevel,
      wildcardSurprise,
      signatureDrinks: signatureDrinks.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold mb-2">Energy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-violet">Chaos</span></h2>
        <p className="text-white/50 font-display">Let's craft the soul and intensity of your party.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 space-y-12 pb-24">
        
        {/* Energy Level Slider */}
        <section className="bg-[#111]/80 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-heading font-semibold text-white">Party Energy Level</h3>
          </div>
          <div className="px-2">
            <Slider 
              value={[energyLevel]} 
              max={100} 
              step={1}
              onValueChange={(v) => setVibes({ spotifyGenre, dressCode, signatureDrinks, wildcardSurprise, energyLevel: v[0] })}
              className="py-4"
            />
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider mt-2">
              <span className={cn("transition-colors", energyLevel < 33 ? "text-blue-400" : "text-white/30")}>Zen & Chill</span>
              <span className={cn("transition-colors", energyLevel >= 33 && energyLevel < 66 ? "text-neon-pink" : "text-white/30")}>Electric</span>
              <span className={cn("transition-colors", energyLevel >= 66 ? "text-red-500 animate-pulse" : "text-white/30")}>Absolute Chaos</span>
            </div>
          </div>
        </section>

        {/* Wildcard Surprise */}
        <section className={cn(
          "p-6 rounded-3xl border transition-all duration-500",
          wildcardSurprise ? "bg-gradient-to-r from-neon-pink/20 to-neon-violet/20 border-neon-pink shadow-[0_0_30px_rgba(225,29,72,0.3)]" : "bg-white/[0.03] border-white/10"
        )}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-neon-pink" />
                <h3 className="text-lg font-heading font-bold text-white">The Wildcard Surprise (₹5,000)</h3>
              </div>
              <p className="text-sm text-white/60">Allow Hookin to add one unexpected, mind-blowing element to your party based on your vibe. You won't know until it happens.</p>
            </div>
            <button 
              onClick={() => setVibes({ spotifyGenre, dressCode, signatureDrinks, energyLevel, wildcardSurprise: !wildcardSurprise })}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                wildcardSurprise ? "bg-neon-pink" : "bg-white/20"
              )}
            >
              <span className="sr-only">Enable Wildcard Surprise</span>
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  wildcardSurprise ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </section>

        {/* Dress Code */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shirt className="w-5 h-5 text-neon-pink" />
            <h3 className="text-xl font-heading font-semibold text-white">Dress Code</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DRESS_CODES.map((dc) => {
              const isSelected = dressCode === dc.id;
              return (
                <button
                  key={dc.id}
                  onClick={() => setVibes({ spotifyGenre, dressCode: dc.id, signatureDrinks, energyLevel, wildcardSurprise })}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300",
                    isSelected
                      ? "bg-neon-pink/10 border-neon-pink text-white shadow-[0_0_15px_rgba(225,29,72,0.2)]"
                      : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:border-white/[0.15]"
                  )}
                >
                  <span className="text-3xl mb-2">{dc.icon}</span>
                  <span className="font-medium text-sm text-center">{dc.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Music Genre */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 text-neon-violet" />
            <h3 className="text-xl font-heading font-semibold text-white">Music / Playlist Vibe</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {GENRES.map((genre) => {
              const isSelected = spotifyGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => setVibes({ spotifyGenre: genre, dressCode, signatureDrinks, energyLevel, wildcardSurprise })}
                  className={cn(
                    "px-4 py-2 rounded-full border transition-all duration-300 text-sm font-medium",
                    isSelected
                      ? "bg-neon-violet/20 border-neon-violet text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                      : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.08] hover:text-white"
                  )}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </section>

        {/* Signature Drinks */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <GlassWater className="w-5 h-5 text-neon-cyan" />
            <h3 className="text-xl font-heading font-semibold text-white">Signature Custom Drinks (Max 3)</h3>
          </div>
          <p className="text-sm text-white/40 mb-4">Name a few drinks after yourself, the birthday person, or an inside joke.</p>
          
          <div className="space-y-4">
            <div className="flex gap-2 max-w-md">
              <Input
                placeholder="e.g. The Midnight Neon Elixir..."
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDrinkAdd()}
                disabled={signatureDrinks.length >= 3}
                className="bg-white/[0.03] border-white/[0.1] text-white focus-visible:ring-neon-cyan"
              />
              <Button 
                onClick={handleDrinkAdd}
                disabled={signatureDrinks.length >= 3 || !drinkName.trim()}
                className="bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {signatureDrinks.map((drink, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 max-w-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🍹</span>
                    <span className="font-medium text-white">{drink}</span>
                  </div>
                  <button 
                    onClick={() => removeDrink(idx)}
                    className="text-white/40 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="pt-6 border-t border-white/[0.08] flex justify-between mt-auto bg-background/80 backdrop-blur-md">
        <Button variant="ghost" onClick={prevStep} className="text-white/70 hover:text-white">
          Back
        </Button>
        <Button 
          onClick={nextStep} 
          className="bg-gradient-to-r from-neon-pink to-neon-violet text-white font-bold px-8 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all"
        >
          Next: Post-Party Care
        </Button>
      </div>
    </div>
  );
}

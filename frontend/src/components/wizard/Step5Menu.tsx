import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Utensils, GlassWater, Coffee, Check } from 'lucide-react';

const MENU_PACKAGES = [
  { id: 'standard-buffet', name: 'Standard Buffet', price: 1200, icon: Utensils, desc: '3 Starters, 4 Mains, 2 Desserts' },
  { id: 'premium-buffet', name: 'Premium Buffet', price: 2500, icon: Utensils, desc: '5 Starters, 6 Mains, 4 Desserts + Live Counter' },
  { id: 'plated-dinner', name: 'Plated Dinner', price: 4000, icon: GlassWater, desc: '5-Course curated sit-down meal' },
  { id: 'high-tea', name: 'High Tea', price: 800, icon: Coffee, desc: 'Finger sandwiches, pastries, premium teas' },
];

export function Step5Menu() {
  const { menuPackageId, setMenuPackage, eventFunctions, setEventFunctions } = useWizardStore();

  const toggleFunction = (func: string) => {
    if (eventFunctions.includes(func)) {
      setEventFunctions(eventFunctions.filter(f => f !== func));
    } else {
      setEventFunctions([...eventFunctions, func]);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-heading font-bold mb-2">Food & Functions</h2>
        <p className="text-muted-foreground">Select a menu package and tell us about your special requests.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pr-2">
        <div>
          <Label className="text-base font-semibold mb-4 block">Select a Menu Package (Per Guest)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MENU_PACKAGES.map(pkg => {
              const isSelected = menuPackageId === pkg.id;
              const Icon = pkg.icon;
              return (
                <div 
                  key={pkg.id}
                  onClick={() => setMenuPackage(pkg.id)}
                  className={cn(
                    "relative p-4 rounded-xl border cursor-pointer transition-all duration-300",
                    isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{pkg.name}</h4>
                        <p className="text-sm text-muted-foreground">{pkg.desc}</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary">₹{pkg.price}</span>
                  </div>
                  {isSelected && (
                    <motion.div layoutId="check-menu" className="absolute top-2 right-2 text-primary">
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold mb-4 block">Special Functions on the day (Optional)</Label>
          <div className="flex flex-wrap gap-3 mb-4">
            {['Cake Cutting', 'Speeches', 'First Dance', 'Awards Ceremony', 'Games', 'Live Performance'].map(func => (
              <button
                key={func}
                onClick={() => toggleFunction(func)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                  eventFunctions.includes(func) 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                )}
              >
                {func}
              </button>
            ))}
          </div>
          
          <div className="space-y-2 mt-6">
            <Label className="text-sm">Any dietary requirements or custom requests?</Label>
            <Textarea 
              placeholder="E.g. We need 3 vegan options, no peanuts..." 
              className="bg-muted/50 border-transparent focus-visible:ring-primary/20"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useWizardStore } from '@/lib/store/wizard-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { CalendarDays, MapPin, Users, Clock, IndianRupee } from 'lucide-react';

export function Step2Logistics() {
  const { city, date, time, guests, budgetMax, setDetails } = useWizardStore();

  const handleUpdate = (updates: Partial<Parameters<typeof setDetails>[0]>) => {
    setDetails({
      city,
      date,
      time,
      guests,
      budgetMax,
      ...updates
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-heading font-bold mb-2">The Details</h2>
        <p className="text-muted-foreground">Let's get the logistics sorted for your celebration.</p>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-10 flex-1">
        
        {/* Location & Date Row */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="flex items-center text-base font-semibold">
              <MapPin className="w-4 h-4 mr-2 text-primary" /> City
            </Label>
            <Input 
              placeholder="e.g. Mumbai" 
              value={city} 
              onChange={(e) => handleUpdate({ city: e.target.value })}
              className="h-12 text-lg bg-muted/50 border-transparent focus-visible:ring-primary/20 focus-visible:border-primary"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center text-base font-semibold">
              <CalendarDays className="w-4 h-4 mr-2 text-primary" /> Date
            </Label>
            <Input 
              type="date"
              value={date ? date.toISOString().split('T')[0] : ''} 
              onChange={(e) => handleUpdate({ date: e.target.value ? new Date(e.target.value) : null })}
              className="h-12 text-lg bg-muted/50 border-transparent focus-visible:ring-primary/20 focus-visible:border-primary"
            />
          </div>
        </div>

        {/* Time & Guests Row */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="flex items-center text-base font-semibold">
              <Clock className="w-4 h-4 mr-2 text-primary" /> Start Time
            </Label>
            <Input 
              type="time"
              value={time} 
              onChange={(e) => handleUpdate({ time: e.target.value })}
              className="h-12 text-lg bg-muted/50 border-transparent focus-visible:ring-primary/20 focus-visible:border-primary"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center text-base font-semibold">
              <Users className="w-4 h-4 mr-2 text-primary" /> Guest Count
            </Label>
            <div className="flex items-center gap-4">
              <Input 
                type="number"
                min="1"
                value={guests} 
                onChange={(e) => handleUpdate({ guests: parseInt(e.target.value) || 1 })}
                className="h-12 text-lg bg-muted/50 border-transparent focus-visible:ring-primary/20 focus-visible:border-primary text-center"
              />
              <span className="text-muted-foreground">people</span>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-6 pt-4 border-t border-border">
          <div className="flex justify-between items-end">
            <Label className="flex items-center text-base font-semibold">
              <IndianRupee className="w-4 h-4 mr-2 text-primary" /> Max Budget (Optional)
            </Label>
            <span className="text-xl font-bold text-primary">
              {budgetMax ? `₹${budgetMax.toLocaleString()}` : 'No limit'}
            </span>
          </div>
          <Slider 
            value={[budgetMax || 100000]} 
            max={500000} 
            step={5000}
            onValueChange={(v) => handleUpdate({ budgetMax: (v as number[])[0] === 500000 ? null : (v as number[])[0] })}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹5,000</span>
            <span>₹2,50,000</span>
            <span>No Limit</span>
          </div>
        </div>

      </div>
    </div>
  );
}

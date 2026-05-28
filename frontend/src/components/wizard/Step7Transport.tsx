import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Plus, Trash2, Car, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_TRANSPORT = [
  {
    id: 't-1',
    title: 'Luxury Sedan',
    capacity: 4,
    basePrice: 3500,
    photos: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500'],
  },
  {
    id: 't-2',
    title: 'Premium SUV',
    capacity: 6,
    basePrice: 5000,
    photos: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500'],
  },
  {
    id: 't-3',
    title: 'Party Bus',
    capacity: 20,
    basePrice: 15000,
    photos: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500'],
  },
];

export function Step7Transport() {
  const { selectedTransportId, setTransport, transportStops, setTransportStops, guests, nextStep } = useWizardStore();

  const handleStopChange = (index: number, value: string) => {
    const newStops = [...transportStops];
    newStops[index] = value;
    setTransportStops(newStops);
  };

  const addStop = () => {
    setTransportStops([...transportStops, '']);
  };

  const removeStop = (index: number) => {
    if (transportStops.length <= 2) return;
    const newStops = transportStops.filter((_, i) => i !== index);
    setTransportStops(newStops);
  };

  const filteredTransport = MOCK_TRANSPORT.filter(t => t.capacity >= Math.min(guests, t.capacity)); // Just show all for now, maybe highlight the recommended ones

  return (
    <div className="h-full flex flex-col md:flex-row gap-8">
      
      {/* Route Planner */}
      <div className="flex-1 flex flex-col max-w-md">
        <div className="mb-6">
          <h2 className="text-3xl font-heading font-bold mb-2">Need a ride?</h2>
          <p className="text-muted-foreground">Plan your route for the day. Add multiple stops if needed.</p>
        </div>

        <div className="bg-card/50 border border-border p-6 rounded-2xl relative">
          {/* Vertical connection line */}
          <div className="absolute left-[39px] top-[48px] bottom-[100px] w-0.5 bg-border z-0" />
          
          <div className="space-y-4 relative z-10">
            {transportStops.map((stop, index) => {
              const isFirst = index === 0;
              const isLast = index === transportStops.length - 1;
              return (
                <div key={index} className="flex gap-4 items-end group">
                  <div className="flex flex-col items-center justify-center h-10 w-10 shrink-0">
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 bg-background z-10 transition-colors",
                      isFirst ? "border-green-500" : isLast ? "border-red-500" : "border-primary"
                    )} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      {isFirst ? 'Start / Pick-up' : isLast ? 'Final Destination' : `Stop ${index}`}
                    </Label>
                    <Input 
                      placeholder={isFirst ? "Enter pick-up address" : isLast ? "Enter venue address" : "Enter stop address"}
                      value={stop}
                      onChange={(e) => handleStopChange(index, e.target.value)}
                      className="bg-background/50 focus-visible:ring-primary/20"
                    />
                  </div>
                  {!isFirst && !isLast && (
                    <button 
                      onClick={() => removeStop(index)}
                      className="h-10 w-10 shrink-0 flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {(isFirst || isLast) && <div className="w-10 shrink-0" />}
                </div>
              );
            })}
          </div>

          <Button 
            variant="outline" 
            onClick={addStop}
            className="w-full mt-6 border-dashed border-border text-muted-foreground hover:text-foreground bg-transparent"
          >
            <Plus className="w-4 h-4 mr-2" /> Add a Stop
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={() => {
            setTransport(null);
            nextStep();
          }}
          className="mt-4 text-muted-foreground hover:text-primary self-start"
        >
          Skip transport for now
        </Button>
      </div>

      {/* Vehicle Selection */}
      <div className="flex-1 flex flex-col min-w-0">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" /> Choose Vehicle
        </h3>
        
        <div className="space-y-4 overflow-y-auto pr-2 pb-4">
          {filteredTransport.map(vehicle => {
            const isSelected = selectedTransportId === vehicle.id;
            const isRecommended = guests > 4 && vehicle.capacity >= guests;
            
            return (
              <div 
                key={vehicle.id} 
                onClick={() => setTransport(vehicle.id)}
                className={cn(
                  "cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden border-2 flex relative",
                  isSelected ? "border-primary bg-primary/5 scale-[1.02] shadow-xl" : "border-border hover:border-primary/50"
                )}
              >
                <img src={vehicle.photos[0]} alt={vehicle.title} className="w-1/3 object-cover min-h-[120px]" />
                
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{vehicle.title}</h4>
                    <span className="font-semibold text-primary">₹{vehicle.basePrice}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" /> Up to {vehicle.capacity} passengers
                  </div>
                  
                  {isRecommended && !isSelected && (
                    <span className="mt-2 text-xs font-semibold text-green-500 bg-green-500/10 w-fit px-2 py-0.5 rounded-sm">Recommended for {guests} guests</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

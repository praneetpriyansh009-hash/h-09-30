'use client';
import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';

const OCCASIONS = [
  { id: 'date-night', name: 'Date Night', emoji: '🌹' },
  { id: 'birthday', name: 'Birthday', emoji: '🎂' },
  { id: 'proposal', name: 'Proposal', emoji: '💍' },
  { id: 'housewarming', name: 'Housewarming', emoji: '🏠' },
  { id: 'anniversary', name: 'Anniversary', emoji: '👑' },
  { id: 'corporate', name: 'Corporate', emoji: '💼' },
  { id: 'farewell', name: 'Farewell', emoji: '🥲' },
  { id: 'nye', name: 'New Year Eve', emoji: '🎆' },
  { id: 'graduation', name: 'Graduation', emoji: '🎓' },
  { id: 'just-because', name: 'Just Because', emoji: '✨' },
];

export function Step1Occasion() {
  const { occasion, setOccasion } = useWizardStore();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-heading font-bold mb-2">What are you celebrating?</h2>
        <p className="text-muted-foreground">Select an occasion to get curated recommendations.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-1 content-start">
        {OCCASIONS.map((occ) => {
          const isSelected = occasion === occ.id;
          return (
            <button
              key={occ.id}
              onClick={() => setOccasion(occ.id)}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 group",
                isSelected 
                  ? "border-primary bg-primary/5 shadow-md scale-105" 
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/50 hover:scale-105"
              )}
            >
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {occ.emoji}
              </span>
              <span className={cn("font-medium", isSelected ? "text-primary font-semibold" : "text-foreground")}>
                {occ.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

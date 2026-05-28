'use client';
import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const THEMES = [
  { id: 'romantic-candlelit', name: 'Romantic Candlelit', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500' },
  { id: 'rooftop-sunset', name: 'Rooftop Sunset', img: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500' },
  { id: 'boho-garden', name: 'Boho Garden', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500' },
  { id: 'vintage-glamour', name: 'Vintage Glamour', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500' },
  { id: 'neon-nights', name: 'Neon Nights', img: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500' },
  { id: 'royal-indian', name: 'Royal Indian', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500' },
];

export function Step2Theme() {
  const { occasion, themeId, setThemeId } = useWizardStore();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-heading font-bold mb-2">Choose your vibe</h2>
        <p className="text-muted-foreground">Select a theme for your {occasion ? occasion.replace('-', ' ') : 'event'}.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-4">
        {THEMES.map((theme) => {
          const isSelected = themeId === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setThemeId(theme.id)}
              className={cn(
                "relative group rounded-2xl overflow-hidden h-64 border-4 transition-all duration-300 text-left",
                isSelected ? "border-primary shadow-xl scale-[1.02]" : "border-transparent hover:border-primary/50"
              )}
            >
              <Image 
                src={theme.img} 
                alt={theme.name} 
                fill 
                className={cn("object-cover transition-transform duration-700", isSelected ? "scale-110" : "group-hover:scale-110")} 
              />
              <div className={cn(
                "absolute inset-0 transition-opacity duration-300",
                isSelected ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent" : "bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90"
              )} />
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-heading font-bold text-xl mb-1">{theme.name}</h3>
                {isSelected && (
                  <span className="inline-flex items-center text-xs font-medium bg-primary/20 text-primary-foreground px-2 py-1 rounded-full backdrop-blur-md">
                    Selected
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

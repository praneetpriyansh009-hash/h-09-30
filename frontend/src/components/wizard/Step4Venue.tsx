import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';
import { Star, MapPin, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_VENUES = [
  {
    id: 'v-1',
    title: 'The Glasshouse',
    location: 'Bandra West, Mumbai',
    rating: 4.8,
    reviews: 124,
    tags: ['rooftop-sunset', 'romantic-candlelit'],
    price: '₹3000 for two',
    photos: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500'],
  },
  {
    id: 'v-2',
    title: 'Skyline Lounge',
    location: 'Lower Parel, Mumbai',
    rating: 4.5,
    reviews: 312,
    tags: ['rooftop-sunset', 'neon-nights'],
    price: '₹4500 for two',
    photos: ['https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500'],
  },
  {
    id: 'v-3',
    title: 'The Heritage Courtyard',
    location: 'Colaba, Mumbai',
    rating: 4.9,
    reviews: 89,
    tags: ['royal-indian', 'vintage-glamour'],
    price: '₹5000 for two',
    photos: ['https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500'],
  },
  {
    id: 'v-4',
    title: 'Bohemian Garden Cafe',
    location: 'Juhu, Mumbai',
    rating: 4.6,
    reviews: 420,
    tags: ['boho-garden'],
    price: '₹2000 for two',
    photos: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500'],
  },
  {
    id: 'v-5',
    title: 'Neon Vault Club',
    location: 'Andheri West, Mumbai',
    rating: 4.3,
    reviews: 560,
    tags: ['neon-nights'],
    price: '₹4000 for two',
    photos: ['https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500'],
  }
];

export function Step4Venue() {
  const { selectedVenueId, setVenue, themeId } = useWizardStore();

  const filteredVenues = (themeId && themeId !== 'custom') 
    ? MOCK_VENUES.filter(v => v.tags.includes(themeId))
    : MOCK_VENUES;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-heading font-bold mb-2">Select a Venue</h2>
        <p className="text-muted-foreground">
          {themeId === 'custom' 
            ? 'Explore top-rated venues that can accommodate your custom request.'
            : 'Curated locations that perfectly match your chosen theme.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-4 px-2">
        {filteredVenues.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-10">
            No venues found for this specific theme in your city. Try "Custom Ambience".
          </div>
        ) : (
          filteredVenues.map(venue => {
            const isSelected = selectedVenueId === venue.id;
            
            return (
              <div 
                key={venue.id} 
                onClick={() => setVenue(venue.id)}
                className={cn(
                  "cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden border-2 flex flex-col relative",
                  isSelected ? "border-primary bg-primary/5 scale-[1.02] shadow-xl" : "border-border hover:border-primary/50 hover:scale-[1.01]"
                )}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={venue.photos[0]} alt={venue.title} className="object-cover w-full h-full" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-black px-2 py-1 rounded flex items-center text-xs font-bold shadow">
                    <span className="bg-green-600 text-white px-1 rounded text-[10px] mr-1 flex items-center">
                      {venue.rating} <Star className="w-2 h-2 ml-0.5 fill-white" />
                    </span>
                    ({venue.reviews})
                  </div>
                  {isSelected && (
                    <motion.div layoutId="check-venue" className="absolute top-3 left-3 bg-primary text-white p-1 rounded-full shadow-lg">
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-1 truncate">{venue.title}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-2 truncate">
                    <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {venue.location}
                  </div>
                  <div className="mt-auto pt-2 border-t border-border flex justify-between items-center text-sm font-semibold text-primary">
                    <span>{venue.price}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

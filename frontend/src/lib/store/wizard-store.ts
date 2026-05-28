import { create } from 'zustand';

export interface AddOnSelection {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface WizardState {
  step: number;
  occasion: string | null;
  // Logistics
  city: string;
  date: Date | null;
  time: string;
  guests: number;
  budgetMax: number | null;
  // Theme & Ambience
  themeId: string | null;
  customMessage: string | null;
  // Venue
  selectedVenueId: string | null;
  // Menu & Functions
  menuPackageId: string | null;
  eventFunctions: string[];
  // Add-Ons
  addOns: AddOnSelection[];
  // Transport
  selectedTransportId: string | null;
  transportStops: string[];
  // Vibes (Extreme Party)
  spotifyGenre: string | null;
  dressCode: string | null;
  signatureDrinks: string[];
  energyLevel: number;
  wildcardSurprise: boolean;
  // Post-Party Care (Extreme Party)
  hangoverKits: number;
  cleaningService: boolean;
  uberVouchers: number;
  
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  setOccasion: (occasion: string) => void;
  setDetails: (details: { city: string; date: Date | null; time: string; guests: number; budgetMax: number | null }) => void;
  setThemeId: (id: string | null) => void;
  setCustomMessage: (msg: string | null) => void;
  setVenue: (id: string | null) => void;
  
  setMenuPackage: (id: string | null) => void;
  setEventFunctions: (funcs: string[]) => void;
  
  addAddOn: (addon: AddOnSelection) => void;
  removeAddOn: (id: string) => void;
  updateAddOnQuantity: (id: string, quantity: number) => void;
  
  setTransport: (id: string | null) => void;
  setTransportStops: (stops: string[]) => void;

  setVibes: (vibes: { spotifyGenre: string | null; dressCode: string | null; signatureDrinks: string[]; energyLevel: number; wildcardSurprise: boolean }) => void;
  setPostParty: (postParty: { hangoverKits: number; cleaningService: boolean; uberVouchers: number }) => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  step: 1,
  occasion: null,
  city: '',
  date: null,
  time: '19:00',
  guests: 10,
  budgetMax: null,
  themeId: null,
  customMessage: null,
  selectedVenueId: null,
  menuPackageId: null,
  eventFunctions: [],
  addOns: [],
  selectedTransportId: null,
  transportStops: ['', ''], // Default 2 stops (Pick up, Drop off)
  
  spotifyGenre: null,
  dressCode: null,
  signatureDrinks: [],
  energyLevel: 50,
  wildcardSurprise: false,
  
  hangoverKits: 0,
  cleaningService: false,
  uberVouchers: 0,

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(10, state.step + 1) })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  
  setOccasion: (occasion) => set({ occasion }),
  setDetails: (details) => set({ ...details }),
  setThemeId: (id) => set({ themeId: id }),
  setCustomMessage: (msg) => set({ customMessage: msg }),
  setVenue: (id) => set({ selectedVenueId: id }),
  
  setMenuPackage: (id) => set({ menuPackageId: id }),
  setEventFunctions: (funcs) => set({ eventFunctions: funcs }),
  
  addAddOn: (addon) => set((state) => {
    const existing = state.addOns.find(a => a.id === addon.id);
    if (existing) {
      return { addOns: state.addOns.map(a => a.id === addon.id ? { ...a, quantity: a.quantity + addon.quantity } : a) };
    }
    return { addOns: [...state.addOns, addon] };
  }),
  removeAddOn: (id) => set((state) => ({ addOns: state.addOns.filter(a => a.id !== id) })),
  updateAddOnQuantity: (id, quantity) => set((state) => ({
    addOns: state.addOns.map(a => a.id === id ? { ...a, quantity } : a)
  })),
  
  setTransport: (id) => set({ selectedTransportId: id }),
  setTransportStops: (stops) => set({ transportStops: stops }),

  setVibes: (vibes) => set({ ...vibes }),
  setPostParty: (postParty) => set({ ...postParty }),
}));

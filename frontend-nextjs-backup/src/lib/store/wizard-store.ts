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
  themeId: string | null;
  city: string;
  date: Date | null;
  time: string;
  guests: number;
  budgetMax: number | null;
  selectedVenueId: string | null;
  addOns: AddOnSelection[];
  selectedTransportId: string | null;
  
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  setOccasion: (occasion: string) => void;
  setThemeId: (id: string) => void;
  setDetails: (details: { city: string; date: Date | null; time: string; guests: number; budgetMax: number | null }) => void;
  setVenue: (id: string | null) => void;
  
  addAddOn: (addon: AddOnSelection) => void;
  removeAddOn: (id: string) => void;
  updateAddOnQuantity: (id: string, quantity: number) => void;
  
  setTransport: (id: string | null) => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  step: 1,
  occasion: null,
  themeId: null,
  city: '',
  date: null,
  time: '19:00',
  guests: 10,
  budgetMax: null,
  selectedVenueId: null,
  addOns: [],
  selectedTransportId: null,

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(7, state.step + 1) })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  
  setOccasion: (occasion) => set({ occasion }),
  setThemeId: (id) => set({ themeId: id }),
  setDetails: (details) => set({ ...details }),
  setVenue: (id) => set({ selectedVenueId: id }),
  
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
}));

import { create } from 'zustand';

interface BundleItem {
  id: string;
  name: string;
  type: 'venue' | 'caterer' | 'decorator' | 'entertainment';
  price: number;
}

interface BundleState {
  items: BundleItem[];
  totalPrice: number;
  addItem: (item: BundleItem) => void;
  removeItem: (id: string) => void;
  clearBundle: () => void;
}

export const useBundleStore = create<BundleState>((set) => ({
  items: [],
  totalPrice: 0,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      totalPrice: state.totalPrice + item.price,
    })),
  removeItem: (id) =>
    set((state) => {
      const itemToRemove = state.items.find((item) => item.id === id);
      return {
        items: state.items.filter((item) => item.id !== id),
        totalPrice: state.totalPrice - (itemToRemove?.price || 0),
      };
    }),
  clearBundle: () => set({ items: [], totalPrice: 0 }),
}));

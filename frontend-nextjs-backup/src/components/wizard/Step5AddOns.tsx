'use client';
import { useWizardStore } from '@/lib/store/wizard-store';
import { AddOnCard } from '@/components/shared/AddOnCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const MOCK_ADDONS = [
  { id: 'a1', name: 'Premium Floral Arch', price: 15000, category: 'floral', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200' },
  { id: 'a2', name: 'Custom Fondant Cake (3kg)', price: 4500, category: 'cake', imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=200' },
  { id: 'a3', name: 'Acoustic Guitarist (2 hrs)', price: 8000, category: 'extras', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200' },
  { id: 'a4', name: 'LED Dance Floor', price: 25000, category: 'extras', imageUrl: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=200' },
];

export function Step5AddOns() {
  const { addOns, addAddOn, updateAddOnQuantity, removeAddOn } = useWizardStore();

  const handleAdd = (addon: any, qty: number) => {
    addAddOn({ id: addon.id, name: addon.name, price: addon.price, quantity: qty });
  };

  const currentTotal = addOns.reduce((sum, a) => sum + (a.price * a.quantity), 0);

  return (
    <div className="h-full flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <h2 className="text-3xl font-heading font-bold mb-2">Enhance your party</h2>
          <p className="text-muted-foreground">Add special touches to make it unforgettable.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 overflow-y-auto pr-2 pb-4">
          {MOCK_ADDONS.map(addon => {
            const selected = addOns.find(a => a.id === addon.id);
            return (
              <div key={addon.id} className="relative">
                {/* @ts-ignore - type mismatch for mock data */}
                <AddOnCard 
                  addOn={addon as any}
                  onAdd={() => handleAdd(addon, (selected?.quantity || 0) + 1)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar summary */}
      <div className="w-full md:w-72 bg-muted/30 rounded-2xl p-6 border border-border h-fit flex flex-col sticky top-0">
        <h3 className="font-semibold text-lg mb-4">Your Add-Ons</h3>
        
        {addOns.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center border-2 border-dashed border-border rounded-xl">
            No add-ons selected yet.
          </p>
        ) : (
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {addOns.map(a => (
              <div key={a.id} className="flex justify-between items-start text-sm">
                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-muted-foreground">Qty: {a.quantity} x ₹{a.price}</p>
                </div>
                <p className="font-semibold">₹{(a.price * a.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        <Separator className="my-4" />
        
        <div className="flex justify-between items-center mb-6">
          <span className="font-medium text-muted-foreground">Add-ons Total</span>
          <span className="font-bold text-xl text-primary">₹{currentTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, ShoppingCart, Sparkles, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Cakes', 'Decor', 'Entertainment', 'Photography'];

const MOCK_ADDONS = [
  { id: 'a1', name: 'Premium Floral Arch', price: 15000, category: 'Decor', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200' },
  { id: 'a2', name: 'Custom Fondant Cake (3kg)', price: 4500, category: 'Cakes', imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=200' },
  { id: 'a3', name: 'Acoustic Guitarist (2 hrs)', price: 8000, category: 'Entertainment', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200' },
  { id: 'a4', name: 'LED Dance Floor', price: 25000, category: 'Decor', imageUrl: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=200' },
  { id: 'a5', name: 'Candid Photographer', price: 12000, category: 'Photography', imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=200' },
  { id: 'a6', name: 'Champagne Tower', price: 18000, category: 'Decor', imageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=200' },
];

export function Step6AddOns() {
  const { addOns, addAddOn, removeAddOn, updateAddOnQuantity } = useWizardStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [customRequest, setCustomRequest] = useState('');

  const handleAdd = (addon: typeof MOCK_ADDONS[0]) => {
    addAddOn({ id: addon.id, name: addon.name, price: addon.price, quantity: 1 });
  };

  const handleAddCustomRequest = () => {
    if (!customRequest.trim()) return;
    addAddOn({
      id: `custom-${Date.now()}`,
      name: `Custom: ${customRequest.trim()}`,
      price: 0, // 0 means Price TBD
      quantity: 1,
    });
    setCustomRequest('');
  };

  const handleUpdateQty = (id: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty <= 0) removeAddOn(id);
    else updateAddOnQuantity(id, newQty);
  };

  const currentTotal = addOns.reduce((sum, a) => sum + (a.price * a.quantity), 0);
  
  const filteredAddOns = activeCategory === 'All' 
    ? MOCK_ADDONS 
    : MOCK_ADDONS.filter(a => a.category === activeCategory);

  return (
    <div className="h-full flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="mb-6">
          <h2 className="text-3xl font-heading font-bold mb-2">The Magic Marketplace</h2>
          <p className="text-muted-foreground">Pick from our premium vendors, or request absolutely anything you can dream of.</p>
        </div>

        {/* Custom Dream Request Box */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group mb-8"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-pink to-neon-violet rounded-2xl blur opacity-30 group-focus-within:opacity-100 transition duration-500" />
          <div className="relative bg-[#111] border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
            <div className="pl-4 pr-2">
              <Sparkles className="w-5 h-5 text-neon-pink animate-pulse" />
            </div>
            <input 
              type="text"
              placeholder="Request literally anything (e.g. Fire breathers, Helicopter drop...)"
              value={customRequest}
              onChange={(e) => setCustomRequest(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomRequest()}
              className="flex-1 bg-transparent border-0 text-white placeholder-white/40 focus:ring-0 text-sm md:text-base h-12"
            />
            <button 
              onClick={handleAddCustomRequest}
              disabled={!customRequest.trim()}
              className="px-6 h-12 rounded-xl bg-white text-black font-bold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
            >
              <span>Request</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Categories Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-2 pb-4">
          {filteredAddOns.map(addon => {
            const selected = addOns.find(a => a.id === addon.id);
            const qty = selected?.quantity || 0;
            
            return (
              <div key={addon.id} className="flex items-center p-4 rounded-xl border border-border bg-card/50 gap-4 transition-all hover:border-primary/50 hover:bg-card/80">
                <img src={addon.imageUrl} alt={addon.name} className="w-20 h-20 rounded-lg object-cover shadow-md" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-base truncate text-white">{addon.name}</h4>
                  <p className="text-sm text-primary font-medium mt-1">₹{addon.price.toLocaleString()}</p>
                </div>
                
                <div className="flex-shrink-0">
                  {qty === 0 ? (
                    <button 
                      onClick={() => handleAdd(addon)}
                      className="px-6 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold text-sm transition-all border border-primary/20 hover:border-primary hover:shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-primary/20 rounded-lg p-1 border border-primary/30 shadow-[0_0_10px_rgba(var(--primary),0.2)]">
                      <button onClick={() => handleUpdateQty(addon.id, qty, -1)} className="p-1 rounded bg-black/50 text-primary hover:bg-primary hover:text-white transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-6 text-center text-primary">{qty}</span>
                      <button onClick={() => handleUpdateQty(addon.id, qty, 1)} className="p-1 rounded bg-black/50 text-primary hover:bg-primary hover:text-white transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-full md:w-80 bg-[#111]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-fit flex flex-col sticky top-0 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 mb-6 text-white">
          <ShoppingCart className="w-5 h-5 text-neon-pink" />
          <h3 className="font-bold text-lg">Magic Cart</h3>
        </div>
        
        {addOns.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">Your cart is empty.</p>
            <p className="text-xs mt-1 text-white/50">Add some magic to your party.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {addOns.map(a => {
              const isCustom = a.id.startsWith('custom-');
              return (
                <div key={a.id} className="flex justify-between items-start text-sm group">
                  <div className="flex-1 pr-4">
                    <p className="font-medium text-white">{a.name}</p>
                    {isCustom ? (
                      <p className="text-neon-cyan text-xs mt-0.5 font-semibold animate-pulse">Price TBD by Concierge</p>
                    ) : (
                      <p className="text-white/50 text-xs mt-0.5">₹{a.price.toLocaleString()}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="font-semibold text-neon-pink">
                      {isCustom ? '--' : `₹${(a.price * a.quantity).toLocaleString()}`}
                    </p>
                    <div className="flex items-center gap-2 scale-90 origin-right">
                      <button onClick={() => handleUpdateQty(a.id, a.quantity, -1)} className="p-0.5 rounded-full bg-white/10 hover:bg-neon-pink hover:text-white transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-3 text-center text-white">{a.quantity}</span>
                      <button onClick={() => handleUpdateQty(a.id, a.quantity, 1)} className="p-0.5 rounded-full bg-white/10 hover:bg-neon-pink hover:text-white transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Separator className="my-4 bg-white/10" />
        
        <div className="flex justify-between items-center">
          <span className="font-medium text-white/50 text-sm">Estimated Total</span>
          <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-violet">
            ₹{currentTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useWizardStore } from '@/lib/store/wizard-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PartyPopper, CheckCircle2, UserPlus, CreditCard } from 'lucide-react';
import Image from 'next/image';

export default function BundleDetailPage({ params }: { params: { id: string } }) {
  const { occasion, date, time, guests, addOns, selectedVenueId, selectedTransportId } = useWizardStore();

  const venuePrice = selectedVenueId ? 60000 : 0;
  const transportPrice = selectedTransportId ? 5000 : 0;
  const addOnsTotal = addOns.reduce((sum, a) => sum + (a.price * a.quantity), 0);
  const total = venuePrice + transportPrice + addOnsTotal;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">My {occasion?.replace('-', ' ') || 'Party'} Bundle</h1>
          <p className="text-muted-foreground">ID: {params.id}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6">
            <UserPlus className="w-4 h-4 mr-2" /> Invite Collaborator
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Venue */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Venue & Date</h2>
            <div className="flex gap-6">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <Image src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500" alt="Venue" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Sunset Rooftop Lounge</h3>
                <p className="text-muted-foreground text-sm mb-4">Skyline Hospitality • Mumbai</p>
                <div className="flex flex-wrap gap-4 text-sm font-medium bg-muted/50 p-3 rounded-lg">
                  <div>
                    <span className="block text-muted-foreground text-xs">Date</span>
                    {date?.toLocaleDateString() || 'Not set'}
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-xs">Time</span>
                    {time || 'Not set'}
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-xs">Guests</span>
                    {guests}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Addons */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Add-Ons</h2>
            {addOns.length === 0 ? (
              <p className="text-muted-foreground">No add-ons selected.</p>
            ) : (
              <div className="space-y-4">
                {addOns.map(a => (
                  <div key={a.id} className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border border-border">
                    <div>
                      <h4 className="font-medium">{a.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {a.quantity}</p>
                    </div>
                    <div className="font-semibold">₹{(a.price * a.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Payment Sidebar */}
        <div>
          <div className="bg-muted/20 border border-border rounded-2xl p-6 sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Payment Summary</h3>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span>Venue</span>
                <span className="font-medium">₹{venuePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Add-ons ({addOns.length})</span>
                <span className="font-medium">₹{addOnsTotal.toLocaleString()}</span>
              </div>
              {selectedTransportId && (
                <div className="flex justify-between">
                  <span>Transport</span>
                  <span className="font-medium">₹{transportPrice.toLocaleString()}</span>
                </div>
              )}
            </div>

            <Separator className="mb-4" />

            <div className="flex justify-between items-end mb-8">
              <span className="font-medium text-muted-foreground">Total Due</span>
              <span className="text-3xl font-bold text-primary">₹{total.toLocaleString()}</span>
            </div>

            <Button className="w-full h-14 text-lg rounded-xl mb-3 shadow-md" onClick={() => alert('Proceeding to Razorpay payment mock...')}>
              <CreditCard className="w-5 h-5 mr-2" /> Pay Full Amount
            </Button>
            
            <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => alert('Creating split payment link...')}>
              Split with Friends
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" /> Secure payment via Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

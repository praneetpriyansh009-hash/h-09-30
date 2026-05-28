'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Users, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function PaySplitPage({ params }: { params: { splitToken: string } }) {
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-muted/20 px-4">
        <div className="bg-card max-w-md w-full p-8 rounded-3xl shadow-xl text-center border border-border">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-8">You've successfully paid your share for the party. An email confirmation has been sent.</p>
          <Button className="w-full" onClick={() => window.location.href = '/'}>Go to Homepage</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-muted/20 py-12 px-4">
      <div className="bg-card max-w-md w-full p-8 rounded-3xl shadow-xl border border-border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Pay Your Share</h2>
          <p className="text-muted-foreground text-sm">Rahul K. requested you to split the cost for "Birthday Party at Sunset Rooftop"</p>
        </div>

        <div className="bg-muted/50 rounded-2xl p-6 mb-8 text-center">
          <span className="block text-sm text-muted-foreground font-medium mb-1">Your Share (50%)</span>
          <span className="text-4xl font-bold text-primary">₹43,500</span>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setPaid(true); }}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required className="h-12 bg-muted/50 border-transparent" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" required className="h-12 bg-muted/50 border-transparent" />
          </div>

          <Button type="submit" className="w-full h-14 text-lg rounded-xl mt-4 shadow-md">
            <CreditCard className="w-5 h-5 mr-2" /> Pay ₹43,500 Now
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            Payment links expire in 30 minutes. Secured by Razorpay.
          </p>
        </form>
      </div>
    </div>
  );
}

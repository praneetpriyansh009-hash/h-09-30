import Link from 'next/link';
import { Globe, Mail, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-heading font-bold text-3xl tracking-tighter flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-base font-bold shadow-[0_0_20px_rgba(255,51,102,0.4)]">
                H
              </div>
              <span className="text-glow">Hookin</span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              The premium platform for planning extraordinary events. Discover curated vendors, design stunning themes, and celebrate flawlessly.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-muted-foreground border border-white/5">
                <Globe className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-muted-foreground border border-white/5">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-muted-foreground border border-white/5">
                <Mail className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-muted-foreground border border-white/5">
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">Browse Vendors</Link></li>
              <li><Link href="/themes" className="text-muted-foreground hover:text-primary transition-colors">Theme Gallery</Link></li>
              <li><Link href="/plan/new" className="text-muted-foreground hover:text-primary transition-colors">Start Planning</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-muted-foreground hover:text-primary transition-colors">Press</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 tracking-wide">For Vendors</h4>
            <ul className="space-y-4">
              <li><Link href="/vendor-portal/onboarding" className="text-muted-foreground hover:text-primary transition-colors">Partner with Us</Link></li>
              <li><Link href="/vendor-portal" className="text-muted-foreground hover:text-primary transition-colors">Vendor Portal</Link></li>
              <li><Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">Resources</Link></li>
              <li><Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Hookin Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

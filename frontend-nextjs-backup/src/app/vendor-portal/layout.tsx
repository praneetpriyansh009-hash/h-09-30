'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Package, MessageSquare, Star, Wallet, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const LINKS = [
  { href: '/vendor-portal/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/vendor-portal/bookings', icon: Calendar, label: 'Bookings' },
  { href: '/vendor-portal/services', icon: Package, label: 'Services' },
  { href: '/vendor-portal/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/vendor-portal/reviews', icon: Star, label: 'Reviews' },
  { href: '/vendor-portal/earnings', icon: Wallet, label: 'Earnings' },
];

export default function VendorPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      {/* Vendor Sidebar */}
      <aside className="w-64 glass-panel border-r border-white/5 hidden md:flex flex-col relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-primary/10 blur-[50px] -z-10" />

        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 font-heading font-bold text-xl text-foreground mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Store className="w-5 h-5 text-white" />
            </div>
            Portal
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 relative z-10">
          {LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/vendor-portal/dashboard' && pathname.startsWith(link.href));
            
            return (
              <Link key={link.href} href={link.href} className="relative block">
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 z-10 relative",
                  isActive ? "text-white" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}>
                  {isActive && (
                    <motion.div
                      layoutId="active-sidebar-tab"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl shadow-[0_0_15px_rgba(255,51,102,0.3)] -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
        <div className="relative z-10 h-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

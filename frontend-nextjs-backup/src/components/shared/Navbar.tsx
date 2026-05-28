'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth-store';
import { cn } from '@/lib/utils';
const NAV_LINKS = [
  { name: 'Browse', href: '/search' },
  { name: 'Themes', href: '/themes' },
  { name: 'Venues', href: '/venues' },
  { name: 'How it Works', href: '/about' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show navbar on auth pages or wizard
  if (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/plan/new')) {
    return null;
  }

  // Admin and Vendor portals have their own sidebars, but we might want a simplified top bar. 
  // For now, let's hide it there too to avoid conflicts.
  if (pathname.startsWith('/admin') || pathname.startsWith('/vendor-portal')) {
    return null;
  }

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-heading font-bold text-2xl tracking-tighter flex items-center gap-2 relative z-50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-[0_0_15px_rgba(255,51,102,0.4)]">
            H
          </div>
          <span className="text-glow">Hookin</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                pathname === link.href ? "text-white" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative group">
              <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                <User className="w-4 h-4 text-white relative z-10" />
              </Button>
              <div className="absolute right-0 top-full mt-2 w-56 glass border-white/10 rounded-xl p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 shadow-2xl">
                <div className="flex flex-col space-y-1 p-2 mb-2 border-b border-white/10">
                  <p className="font-medium text-white">{user?.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-sm text-white">
                  <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg text-sm text-white mb-2 border-b border-white/10 pb-3">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>Settings</span>
                </Link>
                <button 
                  onClick={() => logout()}
                  className="flex w-full items-center gap-2 p-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/5 rounded-xl">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-white text-black hover:bg-white/90 rounded-xl px-6 font-semibold">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden relative z-50 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>

      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
        className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 flex flex-col pt-24 px-6 md:hidden"
      >
        <nav className="flex flex-col gap-6 text-xl font-heading font-medium">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "transition-colors pb-4 border-b border-white/5",
                pathname === link.href ? "text-primary" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto pb-12 pt-6 flex flex-col gap-4">
          {isAuthenticated ? (
            <Button variant="destructive" className="w-full h-14 rounded-xl text-lg" onClick={() => {
              logout();
              setIsMobileMenuOpen(false);
            }}>
              Log Out
            </Button>
          ) : (
            <>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <Button className="w-full h-14 rounded-xl bg-white text-black hover:bg-white/90 text-lg font-semibold">
                  Create Account
                </Button>
              </Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <Button variant="outline" className="w-full h-14 rounded-xl border-white/20 text-white text-lg font-semibold">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </header>
  );
}

// Dummy icon for mobile menu dashboard
function LayoutDashboard(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}

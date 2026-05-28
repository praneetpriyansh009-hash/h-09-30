import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, LayoutDashboard, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth-store';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Browse', href: '/search' },
  { name: 'Themes', href: '/themes' },
  { name: 'Venues', href: '/venues' },
  { name: 'How it Works', href: '/about' },
];

function HookinLogo({ className = '' }: { className?: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="42" height="42" rx="12" fill="#030303" stroke="url(#navBorderGrad)" strokeWidth="1.2" />
      <path d="M14 12V30" stroke="url(#navPinkGlow)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M28 12V30" stroke="url(#navCyanGlow)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M14 24L28 18" stroke="url(#navCenterGlow)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="28" cy="12" r="2.5" fill="#ffffff" />
      <defs>
        <linearGradient id="navPinkGlow" x1="14" y1="12" x2="14" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff2d78" />
          <stop offset="1" stopColor="#ff2d78" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="navCyanGlow" x1="28" y1="30" x2="28" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#06b6d4" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="navCenterGlow" x1="14" y1="24" x2="28" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff2d78" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="navBorderGrad" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,255,255,0.25)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const { user, isAuthenticated, logout } = useAuthStore();
  const { scrollY } = useScroll();

  // Smart hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 100 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  // Don't show navbar on auth pages or wizard
  if (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/plan/new')) {
    return null;
  }
  if (pathname.startsWith('/admin') || pathname.startsWith('/vendor-portal')) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          isScrolled ? "py-2" : "py-4"
        )}
      >
        {/* Outer container — floats as a pill when scrolled */}
        <div className={cn(
          "mx-auto transition-all duration-500 ease-out",
          isScrolled
            ? "max-w-5xl mx-4 md:mx-auto bg-black/70 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "max-w-7xl bg-transparent"
        )}>
          <div className="relative z-10 px-4 md:px-6 py-2 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Subtle glow behind logo on hover */}
                <div className="absolute inset-0 bg-neon-pink/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <HookinLogo className="relative z-10" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-glow transition-all duration-300 leading-none">
                  Hookin
                </span>
                <span className="text-[10px] text-white/30 font-medium tracking-[0.15em] uppercase leading-none mt-0.5">
                  celebrations
                </span>
              </div>
            </Link>

            {/* Desktop Nav — Pill style with active indicator */}
            <nav className="hidden md:flex items-center gap-0.5 bg-white/[0.03] backdrop-blur-md rounded-full px-1.5 py-1 border border-white/[0.06]">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      isActive ? "text-white" : "text-white/40 hover:text-white/70"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.12]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Auth Buttons + CTA */}
            <div className="hidden md:flex items-center gap-2.5">
              {isAuthenticated ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="relative h-10 rounded-full px-3 flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-pink/30 to-neon-violet/30 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-white text-sm font-medium max-w-[100px] truncate">{user?.name}</span>
                    <ChevronDown className={cn("w-3.5 h-3.5 text-white/50 transition-transform", isUserMenuOpen && "rotate-180")} />
                  </Button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-3 w-60 glass-heavy rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/[0.06]"
                      >
                        <div className="px-3 py-2.5 mb-1 border-b border-white/[0.06]">
                          <p className="font-medium text-white text-sm">{user?.name}</p>
                          <p className="truncate text-xs text-white/40 mt-0.5">{user?.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[0.04] rounded-xl text-sm text-white/70 hover:text-white transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[0.04] rounded-xl text-sm text-white/70 hover:text-white transition-colors mb-1"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                        <div className="border-t border-white/[0.06] pt-1">
                          <button
                            onClick={() => {
                              logout();
                              setIsUserMenuOpen(false);
                            }}
                            className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Log out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-white/50 hover:text-white hover:bg-white/[0.04] rounded-xl text-sm h-9">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/plan/new">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="relative h-9 bg-gradient-to-r from-neon-pink to-neon-violet hover:from-neon-pink/90 hover:to-neon-violet/90 text-white rounded-xl px-5 font-semibold text-sm shadow-[0_0_20px_rgba(225,29,72,0.25)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all overflow-hidden group/cta">
                        <span className="relative z-10 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Plan a Party
                        </span>
                        {/* Shimmer sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative z-50 text-white hover:bg-white/[0.05]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu — Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />

            {/* Background accents */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-pink/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-neon-violet/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col h-full pt-24 px-8">
              {/* Mobile logo */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-10"
              >
                <HookinLogo />
                <span className="font-heading font-bold text-2xl tracking-tight text-white">Hookin</span>
              </motion.div>

              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block py-4 text-3xl font-heading font-bold tracking-tight transition-colors border-b border-white/[0.04]",
                        pathname === link.href ? "text-neon-pink" : "text-white/80 hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="mt-auto pb-12 pt-8 flex flex-col gap-3"
              >
                {isAuthenticated ? (
                  <Button
                    variant="destructive"
                    className="w-full h-14 rounded-2xl text-lg font-semibold"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Log Out
                  </Button>
                ) : (
                  <>
                    <Link to="/plan/new" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                      <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-violet text-white text-lg font-bold shadow-[0_0_30px_rgba(225,29,72,0.3)] flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Plan a Party
                      </Button>
                    </Link>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                      <Button variant="outline" className="w-full h-14 rounded-2xl border-white/[0.1] text-white text-lg font-medium hover:bg-white/[0.04]">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

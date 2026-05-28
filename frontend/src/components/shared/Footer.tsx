import { Link } from 'react-router-dom';
import { Mail, Camera, MessageCircle, Video, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  { icon: Camera, label: "Instagram" },
  { icon: MessageCircle, label: "Twitter" },
  { icon: Video, label: "YouTube" },
  { icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04]">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-neon-pink/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/[0.04]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                Stay in the loop
              </h3>
              <p className="text-white/40 font-display">
                Get the latest trends, vendor highlights, and exclusive offers.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 h-12 px-5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-neon-pink/50 text-sm font-medium transition-all"
              />
              <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-neon-pink to-neon-violet text-white font-semibold text-sm shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all hover:scale-[1.02]">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center text-white text-base font-bold shadow-[0_0_20px_rgba(225,29,72,0.3)] group-hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-shadow">
                H
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white group-hover:text-glow transition-all">
                Hookin
              </span>
            </Link>
            <p className="text-white/30 mb-8 max-w-sm leading-relaxed text-sm font-display">
              India's premium event planning platform. Curated vendors, stunning themes, and seamless celebrations — making every occasion unforgettable.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
                <motion.button
                  key={label}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-neon-pink/30 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-6 uppercase tracking-[0.15em]">Platform</h4>
            <ul className="space-y-3">
              {[
                { to: '/search', label: 'Browse Vendors' },
                { to: '/themes', label: 'Theme Gallery' },
                { to: '/plan/new', label: 'Start Planning' },
                { to: '/pricing', label: 'Pricing' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/30 hover:text-neon-pink text-sm transition-colors duration-300 flex items-center gap-1 group/link">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-6 uppercase tracking-[0.15em]">Company</h4>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/careers', label: 'Careers' },
                { to: '/press', label: 'Press' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/30 hover:text-neon-pink text-sm transition-colors duration-300 flex items-center gap-1 group/link">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <a href="mailto:hookin.help@gmail.com" className="text-white/30 hover:text-neon-pink text-sm transition-colors duration-300 flex items-center gap-1 group/link">
                  Contact
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-6 uppercase tracking-[0.15em]">For Vendors</h4>
            <ul className="space-y-3">
              {[
                { to: '/vendor-portal/onboarding', label: 'Partner with Us' },
                { to: '/vendor-portal', label: 'Vendor Portal' },
                { to: '/resources', label: 'Resources' },
                { to: '/help', label: 'Help Center' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/30 hover:text-neon-pink text-sm transition-colors duration-300 flex items-center gap-1 group/link">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-display">
            © {new Date().getFullYear()} Hookin Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/20 font-display">
            <Link to="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-white/50 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

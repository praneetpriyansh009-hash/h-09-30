import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function ComingSoon() {
  const location = useLocation();
  const pageName = location.pathname.substring(1).replace('-', ' ') || 'Page';

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden text-white font-display">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Sparkles className="w-10 h-10 text-neon-pink" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-5xl md:text-7xl font-heading font-bold mb-6 capitalize"
        >
          {pageName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-violet">Coming Soon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12"
        >
          We are currently crafting this experience. Our team is working hard to bring you the ultimate luxury event planning features very soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/">
            <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all group">
              <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

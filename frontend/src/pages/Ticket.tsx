import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useWizardStore } from '@/lib/store/wizard-store';
import { QrCode, MapPin, Calendar, Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function Ticket() {
  const { occasion, date, time, city, dressCode } = useWizardStore();
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center relative overflow-hidden py-20 px-4">
      {windowSize.width > 0 && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          recycle={false} 
          numberOfPieces={400} 
          colors={['#e11d48', '#9333ea', '#22d3ee', '#f5a623']}
        />
      )}
      
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-pink/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-neon-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="text-center mb-12 z-10 relative"
      >
        <h1 className="text-5xl md:text-7xl font-heading font-black mb-4">
          You're <span className="gradient-text">Hooked In!</span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl font-display max-w-xl mx-auto">
          Your ultimate party experience has been successfully booked. Save this digital pass or share it with your guests.
        </p>
      </motion.div>

      {/* 3D Ticket Container */}
      <div className="perspective-1000 z-10 relative w-full max-w-sm">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-[1/1.8] rounded-3xl overflow-hidden cursor-crosshair shadow-[0_20px_60px_rgba(225,29,72,0.3)]"
        >
          {/* Glassmorphic Background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/20"></div>
          
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-transparent to-neon-violet/20 opacity-50 mix-blend-overlay"></div>
          
          {/* Ticket Content */}
          <div className="absolute inset-0 p-8 flex flex-col translate-z-12">
            
            <div className="flex justify-between items-start mb-auto">
              <div>
                <span className="text-neon-cyan text-xs font-bold uppercase tracking-widest block mb-1">VIP PASS</span>
                <h2 className="text-2xl font-black text-white leading-none tracking-tight">
                  {occasion ? occasion.replace('-', ' ') : 'EPIC BASH'}
                </h2>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center text-white font-bold">
                H
              </div>
            </div>

            <div className="space-y-4 my-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-neon-pink" />
                </div>
                <div>
                  <p className="text-white/50 text-xs">Date & Time</p>
                  <p className="text-white font-semibold text-sm">
                    {date ? date.toLocaleDateString() : 'TBD'} | {time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-neon-cyan" />
                </div>
                <div>
                  <p className="text-white/50 text-xs">Location</p>
                  <p className="text-white font-semibold text-sm">{city || 'TBD'}</p>
                </div>
              </div>

              {dressCode && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                    ✨
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Dress Code</p>
                    <p className="text-white font-semibold text-sm capitalize">{dressCode.replace('-', ' ')}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto border-t border-white/20 pt-6 border-dashed relative">
              {/* Fake Ticket cutouts */}
              <div className="absolute -left-11 -top-3 w-6 h-6 rounded-full bg-[#030303]"></div>
              <div className="absolute -right-11 -top-3 w-6 h-6 rounded-full bg-[#030303]"></div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Scan for Entry</p>
                  <p className="text-white text-xs font-mono">HKN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <QrCode className="w-12 h-12 text-black" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 flex flex-col sm:flex-row gap-4 z-10 w-full max-w-sm"
      >
        <Button 
          variant="outline"
          className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 rounded-xl"
        >
          <Share2 className="w-4 h-4 mr-2" /> Share Invite
        </Button>
        <Button 
          onClick={() => navigate('/party/mock-id')}
          className="flex-1 bg-neon-cyan text-black hover:bg-neon-cyan/80 h-12 rounded-xl font-bold"
        >
          Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

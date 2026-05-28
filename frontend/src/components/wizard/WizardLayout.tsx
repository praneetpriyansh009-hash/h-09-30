import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from '@/lib/store/wizard-store';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface WizardLayoutProps {
  children: React.ReactNode;
}

const STEPS = [
  'Occasion',
  'Logistics',
  'Theme',
  'Venue',
  'Menu',
  'Add-Ons',
  'Transport',
  'Vibes',
  'Care',
  'Review'
];

export function WizardLayout({ children }: WizardLayoutProps) {
  const { step, prevStep, nextStep } = useWizardStore();

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 noise z-0" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent z-10" />
      
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-neon-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* Home Button */}
        <div className="mb-6">
          <Link to="/">
            <Button
              variant="ghost"
              className="rounded-xl px-4 h-10 bg-white/[0.04] hover:bg-white/[0.1] text-white/60 hover:text-white border border-white/[0.08] hover:border-white/[0.15] transition-all text-sm font-medium gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center mb-4 relative z-10">
            {STEPS.map((s, i) => {
              const stepNumber = i + 1;
              const isActive = step === stepNumber;
              const isPast = step > stepNumber;
              
              return (
                <div key={s} className="flex flex-col items-center relative w-full group">
                  <motion.div 
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 relative z-20",
                      isActive ? "bg-gradient-to-br from-neon-pink to-neon-violet text-white shadow-[0_0_20px_rgba(225,29,72,0.4)] scale-110" 
                      : isPast ? "bg-white/[0.1] text-white border border-white/[0.2] backdrop-blur-md" 
                      : "bg-white/[0.03] text-white/30 border border-white/[0.05]"
                    )}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                  >
                    {isPast ? <Check className="w-5 h-5" /> : stepNumber}
                  </motion.div>
                  <span className={cn(
                    "text-xs mt-3 font-semibold uppercase tracking-wider hidden md:block transition-colors duration-300",
                    isActive ? "text-neon-pink" : isPast ? "text-white/80" : "text-white/30"
                  )}>
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Progress Track */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-white/[0.05] rounded-full z-0 mx-[5%]">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-pink to-neon-violet rounded-full shadow-[0_0_10px_rgba(225,29,72,0.5)]"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="glass-card rounded-[2rem] border border-white/[0.08] p-8 md:p-12 flex-1 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          {/* Decorative accents */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            variant="ghost" 
            onClick={prevStep}
            disabled={step === 1}
            className="rounded-2xl px-6 h-14 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/[0.08] disabled:opacity-30 transition-all font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
          
          <Button 
            onClick={nextStep}
            disabled={step === 10}
            className="rounded-2xl px-8 h-14 bg-gradient-to-r from-neon-pink to-neon-violet hover:from-neon-pink/90 hover:to-neon-violet/90 text-white shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all font-bold group"
          >
            {step === 9 ? 'Review Plan' : 'Next Step'} 
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}

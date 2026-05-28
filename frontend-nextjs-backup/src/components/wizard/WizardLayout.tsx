'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from '@/lib/store/wizard-store';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface WizardLayoutProps {
  children: React.ReactNode;
}

const STEPS = [
  'Occasion',
  'Theme',
  'Details',
  'Venue',
  'Add-Ons',
  'Transport',
  'Review'
];

export function WizardLayout({ children }: WizardLayoutProps) {
  const { step, prevStep, nextStep } = useWizardStore();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/20 flex flex-col pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {STEPS.map((s, i) => {
              const stepNumber = i + 1;
              const isActive = step === stepNumber;
              const isPast = step > stepNumber;
              
              return (
                <div key={s} className="flex flex-col items-center relative z-10 w-full">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${isActive ? 'bg-primary text-white shadow-md' : isPast ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {isPast ? <Check className="w-4 h-4" /> : stepNumber}
                  </div>
                  <span className={`text-xs mt-2 font-medium hidden md:block ${isActive ? 'text-primary' : isPast ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-2 bg-muted rounded-full relative -mt-8 md:-mt-10 mx-4 z-0 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-10 flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={step === 1}
            className="rounded-full px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          <Button 
            onClick={nextStep}
            disabled={step === 7}
            className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
          >
            {step === 6 ? 'Review Plan' : 'Next Step'} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

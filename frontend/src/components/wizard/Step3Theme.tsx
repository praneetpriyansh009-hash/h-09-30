import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Sparkles, Wand2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const INSPIRATION_PILLS = [
  { id: 'romantic-candlelit', name: 'Romantic Candlelit', text: 'A quiet, romantic evening with hundreds of candles, a private chef, and a violinist playing soft jazz.' },
  { id: 'rooftop-sunset', name: 'Rooftop Sunset', text: 'A gorgeous rooftop at sunset with acoustic music, string lights, and endless champagne.' },
  { id: 'boho-garden', name: 'Boho Garden', text: 'An earthy, free-spirited garden party with floor seating, macrame decor, and acoustic folk music.' },
  { id: 'vintage-glamour', name: 'Vintage Glamour', text: 'A 1920s Gatsby-style evening with vintage cars, flapper dresses, and a live swing band.' },
  { id: 'neon-nights', name: 'Neon Nights', text: 'A heavy underground cyberpunk vibe, bathed in neon pink and cyan, with a techno DJ.' },
  { id: 'royal-indian', name: 'Royal Indian', text: 'A grand, palatial Indian celebration with traditional dhol, marigold draping, and a massive feast.' },
];

export function Step3Theme() {
  const { themeId, setThemeId, customMessage, setCustomMessage } = useWizardStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [customMessage]);

  const handlePillClick = (text: string) => {
    setCustomMessage(text);
    setThemeId('custom');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center pt-8">
      <div className="mb-8 text-center max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3 h-3 animate-pulse" />
            AI Vibe Matcher
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Describe your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet">Dream Vibe</span>
          </h2>
          <p className="text-white/50 text-lg font-display">
            Don't hold back. Tell us exactly what you envision, and our AI will curate the perfect vendors and venues.
          </p>
        </motion.div>
      </div>

      <div className="w-full max-w-3xl flex-1 flex flex-col pb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
          className="relative group w-full perspective-1000 mb-8"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink via-neon-violet to-neon-cyan rounded-[2rem] blur-xl opacity-30 group-focus-within:opacity-70 transition duration-1000 animate-gradient-x" />
          
          <div className="relative bg-[#0a0a0b]/80 backdrop-blur-xl border border-white/10 group-focus-within:border-white/20 rounded-[2rem] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="absolute top-6 left-6">
              <Wand2 className="w-6 h-6 text-neon-violet animate-pulse" />
            </div>
            <textarea
              ref={textareaRef}
              placeholder="e.g. A secret garden party under the stars with a fire-breathing bartender and a string quartet playing pop songs..."
              value={customMessage || ''}
              onChange={(e) => {
                setCustomMessage(e.target.value);
                setThemeId(e.target.value.trim() ? 'custom' : null);
              }}
              className="w-full min-h-[150px] bg-transparent border-0 text-white text-xl md:text-2xl font-medium focus:ring-0 focus:outline-none placeholder-white/20 pl-10 resize-none overflow-hidden"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-white/40 mb-4 text-center font-semibold tracking-widest uppercase">Need Inspiration?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {INSPIRATION_PILLS.map((pill) => (
              <button
                key={pill.id}
                onClick={() => handlePillClick(pill.text)}
                className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.1] hover:border-white/[0.2] text-sm text-white/70 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {pill.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { useWizardStore } from '@/lib/store/wizard-store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const OCCASIONS = [
  { id: 'date-night', name: 'Date Night', emoji: '🌹' },
  { id: 'birthday', name: 'Birthday', emoji: '🎂' },
  { id: 'proposal', name: 'Proposal', emoji: '💍' },
  { id: 'housewarming', name: 'Housewarming', emoji: '🏠' },
  { id: 'anniversary', name: 'Anniversary', emoji: '👑' },
  { id: 'corporate', name: 'Corporate', emoji: '💼' },
  { id: 'farewell', name: 'Farewell', emoji: '🥲' },
  { id: 'nye', name: 'New Year Eve', emoji: '🎆' },
  { id: 'graduation', name: 'Graduation', emoji: '🎓' },
  { id: 'just-because', name: 'Just Because', emoji: '✨' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring" as const, 
      stiffness: 300, 
      damping: 20 
    }
  }
};

export function Step1Occasion() {
  const { occasion, setOccasion } = useWizardStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-neon-pink text-xs font-semibold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
            Step 1
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white tracking-tight">
            {getGreeting()}, what do you want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-violet">celebrate?</span>
          </h2>
          <p className="text-white/50 text-lg font-display">
            Select an occasion to unlock curated recommendations, venues, and elite vendors tailored just for you.
          </p>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full"
      >
        {OCCASIONS.map((occ) => {
          const isSelected = occasion === occ.id;
          return (
            <motion.button
              variants={itemVariants}
              key={occ.id}
              onClick={() => setOccasion(occ.id)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl border transition-all duration-300 group relative overflow-hidden",
                isSelected 
                  ? "border-neon-pink bg-neon-pink/10 shadow-[0_0_30px_rgba(225,29,72,0.2)]" 
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.2] hover:bg-white/[0.06]"
              )}
            >
              {/* Active glow background */}
              {isSelected && (
                <motion.div 
                  layoutId="activeOccasionGlow"
                  className="absolute inset-0 bg-gradient-to-b from-neon-pink/20 to-transparent opacity-50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <span className={cn(
                "text-5xl md:text-6xl mb-4 transition-transform duration-300 relative z-10",
                isSelected ? "scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "group-hover:scale-110 group-hover:-rotate-3"
              )}>
                {occ.emoji}
              </span>
              <span className={cn(
                "font-medium text-sm md:text-base relative z-10 transition-colors", 
                isSelected ? "text-white font-bold" : "text-white/70 group-hover:text-white"
              )}>
                {occ.name}
              </span>
              
              {/* Subtle corner accent for selected state */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_10px_rgba(225,29,72,0.8)]" />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Sparkles, MapPin, CalendarDays, ArrowRight, Star, Zap, 
  Heart, Trophy, Crown, ChevronRight, ShieldCheck, Camera, 
  Music, Shield, Flame, Activity, TrendingUp, Users, HeartHandshake, CheckCircle2, PlayCircle, Plus,
  PartyPopper, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VendorCard } from "@/components/shared/VendorCard";
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from "framer-motion";
import { useRef, useState, useEffect, MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/auth-store";
import { generateParty, AiPartyPlan } from "@/lib/api/client";

/* ═══════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════ */

const TRENDING_THEMES = [
  { id: "boho-chic", name: "Boho Chic", subtitle: "Earthy & Free-spirited", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80" },
  { id: "neon-nights", name: "Neon Nights", subtitle: "Electric & Energetic", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
  { id: "vintage-glamour", name: "Vintage Glamour", subtitle: "Timeless Elegance", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80" },
  { id: "tropical-luau", name: "Tropical Luau", subtitle: "Island Paradise", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80" },
];

const FEATURED_VENDORS = [
  { id: "v1", name: "Lumina Events", category: "Decor", location: "Mumbai, MH", rating: 4.9, reviewCount: 128, priceStart: 25000, imageUrl: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80", isFeatured: true },
  { id: "v2", name: "Spice Route Catering", category: "Catering", location: "Delhi, DL", rating: 4.7, reviewCount: 84, priceStart: 1500, imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80", isFeatured: true },
  { id: "v3", name: "Snapshot Studios", category: "Photography", location: "Bangalore, KA", rating: 4.8, reviewCount: 215, priceStart: 35000, imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80" },
  { id: "v4", name: "Harmony Beats", category: "Entertainment", location: "Pune, MH", rating: 4.6, reviewCount: 56, priceStart: 15000, imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" },
];

const COMMUNITY_TEMPLATES = [
  { id: 1, title: "Delhi Birthday Party", budget: "₹1.8 Lakh", guests: 150, image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80", tags: ["Neon", "DJ"] },
  { id: 2, title: "Mumbai Date Night", budget: "₹45k", guests: 2, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", tags: ["Rooftop", "Violin"] },
  { id: 3, title: "Goa Sangeet", budget: "₹8.5 Lakh", guests: 300, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", tags: ["Beach", "Folk"] },
  { id: 4, title: "Bangalore House Party", budget: "₹25k", guests: 25, image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80", tags: ["Techno", "BYOB"] },
  { id: 5, title: "Jaipur Destination Wedding", budget: "₹25 Lakh", guests: 400, image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80", tags: ["Royal", "Palace"] },
];

/* ═══════════════════════════════════════════════════
   Rotating Words Hook
   ═══════════════════════════════════════════════════ */
function useRotatingWord(words: string[], interval: number = 3000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);
  return { word: words[index], index };
}

/* ═══════════════════════════════════════════════════
   Typewriter Hook
   ═══════════════════════════════════════════════════ */
function useTypewriter(words: string[], speed: number = 50, delay: number = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timer = setTimeout(() => setText(text.slice(0, -1)), speed / 2);
      }
    } else {
      if (text === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), delay);
      } else {
        timer = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), speed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, speed, delay]);

  return text;
}

/* ═══════════════════════════════════════════════════
   Floating Stat Badge Component
   ═══════════════════════════════════════════════════ */
function FloatingBadge({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2 + delay, duration: 0.6, type: "spring" }}
      className={cn("absolute hidden lg:flex items-center gap-2 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]", className)}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Main Home Component
   ═══════════════════════════════════════════════════ */

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [aiPrompt, setAiPrompt] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [aiResult, setAiResult] = useState<AiPartyPlan | null>(null);
  const controls = useAnimation();
  const { user, isAuthenticated } = useAuthStore();

  const HERO_WORDS = ["Unforgettable", "Legendary", "Epic", "Magical"];
  const { word: heroWord, index: heroWordIndex } = useRotatingWord(HERO_WORDS, 3000);

  const placeholderWords = [
    "Chill house party in Indore for 25 friends under ₹25k...",
    "Grand Mumbai Sangeet with neon decor and live DJ...",
    "Romantic rooftop date in Bangalore under ₹15k...",
    "Boho-chic destination wedding in Jaipur...",
  ];
  const typewrittenPlaceholder = useTypewriter(placeholderWords, 60, 3000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    // If not logged in, redirect to login
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // If not premium, show upgrade modal
    if (user?.role !== 'PREMIUM' && user?.role !== 'ADMIN') {
      setShowUpgradeModal(true);
      return;
    }

    // Premium user: call Groq AI
    setIsGenerating(true);
    try {
      const result = await generateParty(aiPrompt);
      setAiResult(result);
    } catch (err) {
      console.error('AI generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative selection:bg-neon-pink/30 selection:text-white">

      {/* ════════════════════════════════════════════
          HERO SECTION — The Ultimate Opening
          ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Multi-layer animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#030303]" />

          {/* Deep, Rich Aurora blobs */}
          <motion.div
            className="absolute w-[1000px] h-[1000px] rounded-full animate-morph mix-blend-screen"
            style={{
              background: 'radial-gradient(circle, rgba(225,29,72,0.12) 0%, transparent 60%)',
              top: '-20%',
              left: '-10%',
              x: mousePos.x * 2.5,
              y: mousePos.y * 2.5,
            }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full animate-morph mix-blend-screen"
            style={{
              background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 60%)',
              bottom: '-25%',
              right: '-10%',
              x: mousePos.x * -2,
              y: mousePos.y * -2,
            }}
            animate={{ scale: [1, 1.3, 1], rotate: [0, -60, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full mix-blend-screen"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)',
              top: '40%',
              right: '20%',
              x: mousePos.x * 1.5,
              y: mousePos.y * 1.5,
            }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030303_85%)]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-6xl mx-auto w-full px-4 md:px-8 mt-16"
        >
          {/* Floating social proof badges */}
          <FloatingBadge className="top-8 left-0" delay={0}>
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <div className="text-white text-xs font-semibold">12,000+ Events</div>
              <div className="text-white/40 text-[10px]">Successfully planned</div>
            </div>
          </FloatingBadge>

          <FloatingBadge className="top-20 right-4" delay={0.2}>
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-pink/40 to-neon-violet/40 border-2 border-[#030303]" />
              ))}
            </div>
            <div>
              <div className="text-white text-xs font-semibold">4.9 ★ Rating</div>
              <div className="text-white/40 text-[10px]">from 2,400+ reviews</div>
            </div>
          </FloatingBadge>

          <FloatingBadge className="bottom-36 left-4" delay={0.4}>
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
              <Crown className="w-4 h-4 text-gold" />
            </div>
            <div>
              <div className="text-white text-xs font-semibold">500+ Vendors</div>
              <div className="text-white/40 text-[10px]">Verified & curated</div>
            </div>
          </FloatingBadge>

          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            >
              <Badge className="bg-white/[0.04] backdrop-blur-md text-white/70 border border-white/[0.08] px-5 py-2 rounded-full text-xs font-medium inline-flex items-center gap-2 hover:bg-white/[0.08] transition-all cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Trusted by 12,000+ event planners across India
              </Badge>
            </motion.div>

            {/* Main heading with rotating word */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 50 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-heading font-bold tracking-[-0.04em] leading-[0.95]"
            >
              <span className="text-white">Make every moment</span>
              <br />
              <span className="relative inline-block h-[1.15em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroWordIndex}
                    initial={{ y: 60, opacity: 0, rotateX: -40 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -60, opacity: 0, rotateX: 40 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="gradient-text-warm text-glow inline-block"
                  >
                    {heroWord}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-white/40 max-w-xl mx-auto font-light leading-relaxed font-display"
            >
              Tell us your vibe. Our AI handles the rest — venues, vendors, 
              decor, and everything in between.
            </motion.p>

            {/* Glowing AI Input — Peak Extreme UI */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 100, damping: 20 }}
              className="max-w-3xl mx-auto pt-6 relative"
            >
              {/* Dynamic Focus Aura */}
              <AnimatePresence>
                {isInputFocused && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute -inset-10 bg-gradient-to-r from-neon-pink/20 via-neon-violet/20 to-neon-cyan/20 blur-[60px] rounded-full pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <form onSubmit={handleAiSubmit} className="relative group perspective-1000">
                {/* 3D Container for Input */}
                <motion.div 
                  animate={{
                    rotateX: isInputFocused ? 2 : 0,
                    scale: isInputFocused ? 1.02 : 1,
                    boxShadow: isInputFocused 
                      ? '0 30px 60px -10px rgba(0,0,0,0.8), 0 0 40px rgba(225,29,72,0.3)' 
                      : '0 10px 30px -10px rgba(0,0,0,0.5), 0 0 0 transparent'
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative rounded-2xl md:rounded-[2rem] transition-all duration-500"
                >
                  {/* Animated Glow ring */}
                  <div className={cn(
                    "absolute -inset-[2px] rounded-2xl md:rounded-[2rem] blur-md transition-all duration-700 animate-gradient-x pointer-events-none",
                    isInputFocused 
                      ? "bg-gradient-to-r from-neon-pink via-neon-violet to-neon-cyan opacity-80 scale-[1.02]" 
                      : "bg-gradient-to-r from-neon-pink via-neon-violet to-neon-cyan opacity-40 group-hover:opacity-70 group-hover:scale-[1.01]"
                  )} />
                  
                  {/* Border trace animation */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] border border-white/5 overflow-hidden pointer-events-none">
                    <motion.div 
                      className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  
                  {/* Input Container */}
                  <div className="relative flex flex-col md:flex-row items-center bg-[#050505]/95 backdrop-blur-3xl border border-white/[0.08] group-hover:border-white/[0.15] rounded-2xl md:rounded-[2rem] p-2 md:p-3 pl-6 transition-all duration-500">
                    
                    <div className="flex items-center w-full md:w-auto flex-1 h-14 md:h-16 relative">
                      <motion.div
                        animate={{ 
                          rotate: isInputFocused ? [0, 15, -15, 0] : 0,
                          scale: isInputFocused ? 1.1 : 1,
                          color: isInputFocused ? '#ff2d78' : '#e2e8f0'
                        }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 shrink-0"
                      >
                        <Sparkles className="w-6 h-6 mr-4 drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]" />
                      </motion.div>
                      
                      {!aiPrompt && (
                        <div className="absolute inset-0 pl-10 flex items-center text-white/30 text-lg md:text-xl font-medium pointer-events-none truncate pr-4">
                          {typewrittenPlaceholder}
                          <motion.span 
                            animate={{ opacity: [0, 1, 0] }} 
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-[2px] h-6 bg-neon-pink/80 ml-1 align-middle"
                          />
                        </div>
                      )}
                      
                      <input
                        type="text"
                        value={aiPrompt}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        className="w-full h-full bg-transparent border-0 text-white text-lg md:text-xl font-medium focus:ring-0 focus:outline-none placeholder-transparent relative z-10 caret-neon-pink"
                        spellCheck="false"
                      />
                    </div>

                    <div className="w-full md:w-auto mt-3 md:mt-0 md:ml-4 shrink-0">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isGenerating}
                        className="w-full md:w-auto rounded-xl md:rounded-[1.25rem] h-12 md:h-14 px-8 bg-white text-black font-extrabold text-sm md:text-base tracking-wide transition-all flex items-center justify-center gap-2 relative overflow-hidden group/btn shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {/* Shimmer sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                        
                        <span className="relative z-10 flex items-center gap-2">
                          {isGenerating ? (
                            <>
                              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                <Sparkles className="w-5 h-5" />
                              </motion.div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Rocket className="w-5 h-5 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                              Generate Party
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Particles (Rendered only on focus) */}
                <AnimatePresence>
                  {isInputFocused && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0], 
                            scale: [0.5, 1.5, 0.5], 
                            x: (Math.random() - 0.5) * 200, 
                            y: (Math.random() - 0.5) * 100 - 50 
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
                          style={{
                            backgroundColor: ['#ff2d78', '#06b6d4', '#9333ea'][i % 3],
                            boxShadow: `0 0 10px ${['#ff2d78', '#06b6d4', '#9333ea'][i % 3]}`
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Quick tags */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap items-center justify-center gap-2 pt-2"
            >
              <span className="text-white/20 text-xs">Try:</span>
              {["🎉 Neon House Party", "🌹 Rooftop Date", "💃 Sangeet under ₹5L", "🏖️ Beach Wedding"].map((tag, i) => (
                <button 
                  key={i}
                  onClick={() => setAiPrompt(tag.replace(/^[^\s]+\s/, ''))}
                  className="text-xs text-white/40 hover:text-white/80 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.15] rounded-full px-3.5 py-1.5 transition-all hover:scale-105 active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </motion.div>

          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], height: [4, 8, 4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 bg-white/40 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          TRUST BAR — Logos / Social Proof strip
          ════════════════════════════════════════════ */}
      <section className="py-12 border-t border-b border-white/[0.04] bg-[#020202]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "12K+", label: "Events Planned" },
              { value: "500+", label: "Verified Vendors" },
              { value: "50+", label: "Cities" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/30 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          GOD-TIER BENTO GRID — App Features
          ════════════════════════════════════════════ */}
      <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-neon-cyan text-sm font-semibold uppercase tracking-[0.2em]">The Best App In The World</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-[1.1]">
            Everything you need. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-violet">All in one place.</span>
          </h2>
        </motion.div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 auto-rows-[300px]">
          
          {/* Block 1: Smart Budget Tracker (Spans 2 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 relative rounded-[2rem] overflow-hidden glass-card group border border-white/[0.08] hover:border-white/[0.2] transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] to-[#12121a] z-0" />
            {/* Background glowing blob */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-neon-cyan/20 blur-[80px] rounded-full group-hover:bg-neon-cyan/30 transition-all duration-500 z-0" />
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-white mb-3">Smart Budget Tracker</h3>
              <p className="text-white/50 font-display text-lg max-w-sm">
                Look rich without going broke. Real-time cost breakdowns and genius AI suggestions to save money.
              </p>
              
              {/* Fake UI Element */}
              <div className="mt-auto bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">AI Savings Alert</div>
                    <div className="text-green-400 text-xs">Swapped decor saved ₹15,000</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/40 text-xs uppercase tracking-wider">Total Est.</div>
                  <div className="text-white font-bold text-xl">₹45,000</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Block 2: Safety & Recovery (Tall) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="md:row-span-2 relative rounded-[2rem] overflow-hidden glass-card group border border-white/[0.08] hover:border-neon-pink/[0.3] transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b12] to-[#0a0a0b] z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.15)_0%,transparent_70%)] z-0" />

            <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-[1.5rem] bg-neon-pink/10 flex items-center justify-center mb-8 mt-4 ring-1 ring-neon-pink/30 shadow-[0_0_30px_rgba(225,29,72,0.3)]">
                <ShieldCheck className="w-8 h-8 text-neon-pink" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-white mb-4">Safety & Recovery Suite</h3>
              <p className="text-white/60 font-display text-base leading-relaxed mb-8">
                Party hard, party safe. Verified vendors, safe rides home, and emergency SOS baked right in.
              </p>

              {/* List of features */}
              <div className="w-full space-y-3 mt-auto">
                {[
                  { icon: HeartHandshake, text: "Doctor on Call" },
                  { icon: Shield, text: "Women Safety Escorts" },
                  { icon: Activity, text: "Hangover Recovery Kits" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3">
                    <item.icon className="w-5 h-5 text-neon-pink" />
                    <span className="text-white/80 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Block 3: Post-Party Memory Vault */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-[2rem] overflow-hidden glass-card group border border-white/[0.08] hover:border-white/[0.2] transition-all"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0b] to-[#120a1a] z-0" />
             
             <div className="relative z-10 p-8 h-full flex flex-col">
               <div className="w-12 h-12 rounded-2xl bg-neon-violet/10 flex items-center justify-center mb-4">
                 <Camera className="w-6 h-6 text-neon-violet" />
               </div>
               <h3 className="text-2xl font-heading font-bold text-white mb-2">Memory Vault</h3>
               <p className="text-white/50 font-display text-sm">
                 AI automatically compiles your guests' photos into stunning reels and albums.
               </p>

               {/* Overlapping polaroids */}
               <div className="mt-auto relative h-24 w-full flex items-end justify-center perspective-1000">
                  <div className="absolute w-20 h-24 bg-gray-800 rounded-lg border-4 border-white shadow-xl transform -rotate-12 -translate-x-8 group-hover:-rotate-25 group-hover:-translate-x-12 transition-all duration-500 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&q=80" className="w-full h-full object-cover" alt="mem1"/>
                  </div>
                  <div className="absolute z-10 w-20 h-24 bg-gray-800 rounded-lg border-4 border-white shadow-xl transform rotate-6 translate-x-4 group-hover:rotate-15 group-hover:translate-x-10 transition-all duration-500 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&q=80" className="w-full h-full object-cover" alt="mem2"/>
                  </div>
                  <div className="absolute z-20 w-12 h-12 bg-neon-violet rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.5)] transform -translate-y-4 scale-0 group-hover:scale-100 transition-all duration-500 delay-100">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
               </div>
             </div>
          </motion.div>

          {/* Block 4: The Ultimate Add-Ons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-[2rem] overflow-hidden glass-card group border border-white/[0.08] hover:border-white/[0.2] transition-all flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a120a] to-[#0a0a0b] z-0" />
            <div className="relative z-10 p-8 text-center">
              <div className="flex justify-center -space-x-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center backdrop-blur-md z-30">
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center backdrop-blur-md z-20">
                  <Music className="w-6 h-6 text-purple-400" />
                </div>
                <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center backdrop-blur-md z-10">
                  <Crown className="w-6 h-6 text-pink-400" />
                </div>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Add-Ons Marketplace</h3>
              <p className="text-white/50 font-display text-sm mb-4">
                Smoke machines, custom cakes, fire dancers. 1-tap bookings.
              </p>
              <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold group-hover:translate-x-2 transition-transform">
                Explore Add-ons <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════════
          COMMUNITY TEMPLATES MARQUEE
          ════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-neon-pink" />
                <span className="text-neon-pink text-sm font-semibold uppercase tracking-[0.2em]">Viral Vibes</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-white">
                Steal These <span className="gradient-text-warm">Parties</span>
              </h2>
              <p className="text-white/40 mt-3 font-display">Clone exact party templates from the community in one click.</p>
            </div>
          </div>
        </div>

        {/* Marquee Track */}
        <div className="relative w-full overflow-hidden flex flex-col gap-6">
          {/* Gradient masks for smooth edges */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex gap-6 w-max px-4"
            animate={{ x: [0, -1035] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {/* Duplicate array for seamless looping */}
            {[...COMMUNITY_TEMPLATES, ...COMMUNITY_TEMPLATES].map((template, idx) => (
              <div key={idx} className="relative w-[320px] h-[400px] rounded-[2rem] overflow-hidden group cursor-pointer shrink-0 border border-white/5 hover:border-white/20 transition-colors">
                <img src={template.image} alt={template.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex gap-2 mb-3">
                    {template.tags.map((tag, i) => (
                       <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border border-white/10">
                         {tag}
                       </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2 leading-tight">{template.title}</h3>
                  <div className="flex items-center justify-between text-white/60 text-sm">
                    <span>{template.budget}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3"/> {template.guests}</span>
                  </div>
                </div>

                {/* Hover Overlay Action */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Button className="rounded-full bg-neon-pink hover:bg-neon-pink/90 text-white font-bold px-6 py-5 shadow-[0_0_20px_rgba(225,29,72,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                     <Plus className="w-4 h-4 mr-2" /> Clone Template
                   </Button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
          ════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-cyan">Hookin</span> Standard
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto font-display">
              Three seamless steps to an unforgettable experience.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-pink/40 via-neon-violet/40 to-neon-cyan/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            {[
              { icon: Search, title: "Discover", desc: "Browse our handpicked collection of elite venues and artisan vendors, curated for excellence.", gradient: "from-neon-pink to-neon-pink/50", glow: "rgba(225, 29, 72, 0.2)", color: "text-neon-pink" },
              { icon: CalendarDays, title: "Customize", desc: "Build your perfect event bundle with real-time pricing, dynamic packages, and full transparency.", gradient: "from-neon-violet to-neon-violet/50", glow: "rgba(147, 51, 234, 0.2)", color: "text-neon-violet" },
              { icon: Zap, title: "Celebrate", desc: "Book instantly and let us handle every detail. All that's left is to enjoy the moment.", gradient: "from-neon-cyan to-neon-cyan/50", glow: "rgba(6, 182, 212, 0.2)", color: "text-neon-cyan" },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.2, duration: 0.6, type: "spring" }} whileHover={{ y: -8 }} className="flex flex-col items-center text-center group">
                <div className="relative mb-10">
                  <motion.div className="w-[120px] h-[120px] rounded-[2rem] glass-card flex items-center justify-center relative z-10 group-hover:border-white/20 transition-all duration-500" whileHover={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 0.5 }} style={{ boxShadow: `0 0 40px ${step.glow}` }}>
                    <step.icon className={`w-10 h-10 ${step.color} transition-colors duration-300`} />
                  </motion.div>
                  <div className={`absolute -top-3 -right-3 w-9 h-9 rounded-full bg-gradient-to-br ${step.gradient} text-white text-sm font-bold flex items-center justify-center shadow-lg z-20`}>{i + 1}</div>
                  <div className="absolute inset-0 rounded-[2rem] blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10 scale-110" style={{ background: step.glow }} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-white/40 text-base leading-relaxed max-w-xs font-display">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA BANNER 
          ════════════════════════════════════════════ */}
      <section className="py-24 px-4 md:px-8 relative overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto relative">
          <div className="relative rounded-[2.5rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-neon-violet/10 to-neon-cyan/10 animate-gradient-x" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            
            <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <PartyPopper className="w-12 h-12 text-gold mx-auto mb-6 opacity-60" />
                <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4">
                  Ready to create <span className="gradient-text-warm">something epic?</span>
                </h2>
                <p className="text-white/40 mb-8 font-display max-w-md mx-auto">
                  Join thousands of event planners who trust Hookin for their celebrations.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/plan/new">
                    <Button size="lg" className="h-14 px-10 rounded-2xl bg-white text-black hover:bg-white/90 text-base font-bold shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Start Planning Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════
          UPGRADE MODAL — Premium Gate
          ════════════════════════════════════════════ */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowUpgradeModal(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 via-[#0a0a0a] to-neon-violet/10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-gold/10 blur-[80px] rounded-full" />
                
                <div className="relative z-10 p-10 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 mb-8"
                  >
                    <Crown className="w-10 h-10 text-gold" />
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                    Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">Hookin Premium</span>
                  </h2>
                  <p className="text-white/50 mb-8 max-w-sm mx-auto leading-relaxed">
                    The AI Concierge is exclusively available for Premium members. Upgrade to instantly generate curated party plans with our AI.
                  </p>
                  
                  <div className="space-y-3 text-left mb-8 max-w-xs mx-auto">
                    {[
                      "Unlimited AI party generation",
                      "Priority vendor matching",
                      "Exclusive luxury themes",
                      "24/7 concierge support",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                        <span className="text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-gold via-yellow-400 to-gold text-black font-bold text-lg shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] transition-all hover:scale-[1.02]"
                    onClick={() => setShowUpgradeModal(false)}
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to Premium
                  </Button>
                  <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className="mt-4 text-sm text-white/30 hover:text-white/50 transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          AI RESULT OVERLAY
          ════════════════════════════════════════════ */}
      <AnimatePresence>
        {aiResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setAiResult(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-neon-pink/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-neon-pink/10">
                      <Sparkles className="w-6 h-6 text-neon-pink" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-heading font-bold text-white">{aiResult.title}</h2>
                      <p className="text-white/40 text-sm">{aiResult.theme} · {aiResult.budget}</p>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">Itinerary</h3>
                    <div className="space-y-2">
                      {aiResult.itinerary?.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                          <div className="w-2 h-2 rounded-full bg-neon-cyan shrink-0" />
                          <span className="text-white/70 text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Vendors */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">Recommended Vendors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {aiResult.vendors?.map((vendor, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          className="p-4 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                          <p className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{vendor.category}</p>
                          <p className="text-white/60 text-sm">{vendor.recommendation}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => { navigate('/plan/new', { state: { aiPlan: aiResult } }); setAiResult(null); }}
                      className="flex-1 h-12 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all"
                    >
                      Use This Plan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setAiResult(null)}
                      className="h-12 rounded-xl border-white/10 text-white/60 hover:bg-white/5"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

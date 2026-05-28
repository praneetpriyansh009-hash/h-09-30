'use client';

import Image from "next/image";
import Link from "next/link";
import { Search, Sparkles, MapPin, CalendarDays, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { VendorCard } from "@/components/shared/VendorCard";
import { motion, Variants } from "framer-motion";

const TRENDING_THEMES = [
  { id: "boho-chic", name: "Boho Chic", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80" },
  { id: "neon-nights", name: "Neon Nights", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500&q=80" },
  { id: "vintage-glamour", name: "Vintage Glamour", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&q=80" },
  { id: "tropical-luau", name: "Tropical Luau", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80" },
];

const FEATURED_VENDORS = [
  {
    id: "v1",
    name: "Lumina Events",
    category: "Decor",
    location: "Mumbai, MH",
    rating: 4.9,
    reviewCount: 128,
    priceStart: 25000,
    imageUrl: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
    isFeatured: true
  },
  {
    id: "v2",
    name: "Spice Route Catering",
    category: "Catering",
    location: "Delhi, DL",
    rating: 4.7,
    reviewCount: 84,
    priceStart: 1500,
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
    isFeatured: true
  },
  {
    id: "v3",
    name: "Snapshot Studios",
    category: "Photography",
    location: "Bangalore, KA",
    rating: 4.8,
    reviewCount: 215,
    priceStart: 35000,
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80"
  },
  {
    id: "v4",
    name: "Harmony Beats",
    category: "Entertainment",
    location: "Pune, MH",
    rating: 4.6,
    reviewCount: 56,
    priceStart: 15000,
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30">
      {/* Hero Section with animated gradient and glassmorphism */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-20 overflow-hidden px-4 md:px-6 lg:px-8">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-background">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-primary/30 via-primary/10 to-transparent opacity-60 blur-[140px] rounded-full mix-blend-screen animate-pulse duration-[10000ms]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-accent/30 via-accent/10 to-transparent opacity-60 blur-[140px] rounded-full mix-blend-screen animate-pulse duration-[12000ms]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[150px] rounded-full" />
        </div>
        
        {/* Subtle Grid Pattern overlay */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_80%,transparent_100%)]" />

        <div className="max-w-6xl mx-auto w-full z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="bg-white/5 backdrop-blur-md text-primary border border-primary/30 px-6 py-2.5 rounded-full text-sm font-semibold mb-8 inline-flex items-center shadow-[0_0_20px_rgba(255,51,102,0.3)] hover:shadow-[0_0_30px_rgba(255,51,102,0.5)] transition-all cursor-default">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Experience the future of celebrations
              </Badge>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold tracking-tighter text-white leading-[1.05] drop-shadow-2xl">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x relative inline-block pb-4 text-glow">
                Occasions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Discover premium venues, world-class vendors, and curated experiences designed for perfection.
            </p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
              className="max-w-4xl mx-auto mt-14 glass-panel p-3 md:p-4 rounded-3xl md:rounded-[3rem] flex flex-col md:flex-row gap-3 relative overflow-hidden group border-white/20 hover:border-primary/50 transition-colors duration-500"
            >
              {/* Shine effect inside search bar */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shimmer group-hover:animate-none" />

              <div className="flex-1 flex items-center px-6 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl md:rounded-[2rem] h-16 md:h-20">
                <Search className="w-6 h-6 text-primary mr-4 shrink-0" />
                <Input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="border-0 bg-transparent text-xl shadow-none focus-visible:ring-0 px-0 h-full w-full placeholder:text-muted-foreground/60 text-white font-medium"
                />
              </div>
              <div className="flex-1 flex items-center px-6 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl md:rounded-[2rem] h-16 md:h-20 border-t border-white/5 md:border-t-0 md:border-l">
                <MapPin className="w-6 h-6 text-accent mr-4 shrink-0" />
                <Input 
                  type="text" 
                  placeholder="Where?" 
                  className="border-0 bg-transparent text-xl shadow-none focus-visible:ring-0 px-0 h-full w-full placeholder:text-muted-foreground/60 text-white font-medium"
                />
              </div>
              <Button size="lg" className="rounded-xl md:rounded-[2rem] h-16 md:h-20 px-12 bg-primary hover:bg-primary/90 text-white w-full md:w-auto text-xl font-bold shadow-[0_0_20px_rgba(255,51,102,0.4)] transition-all hover:shadow-[0_0_40px_rgba(255,51,102,0.8)] hover:scale-[1.02]">
                Explore Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Themes */}
      <section className="py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-3 tracking-tight">Curated Themes</h2>
              <p className="text-lg text-muted-foreground">Handpicked aesthetics for your next masterpiece.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link href="/themes" className="group flex items-center text-primary font-semibold hover:text-primary/80 transition-colors text-lg">
                View Collection <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TRENDING_THEMES.map((theme, idx) => (
              <motion.div variants={itemVariants} key={theme.id} whileHover={{ y: -12 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link href={`/theme/${theme.id}`}>
                  <div className="group relative h-96 rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl ring-1 ring-white/10 hover:ring-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,51,102,0.3)]">
                    <Image
                      src={theme.image}
                      alt={theme.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-heading font-bold text-2xl mb-2">
                          {theme.name}
                        </h3>
                        <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          Explore this collection &rarr;
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How Hookin Works */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 border-y border-white/5 backdrop-blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">The Hookin Standard</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Three seamless steps to an unforgettable experience.</p>
            </motion.div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />
            
            {[
              { icon: Search, title: "Discover Excellence", desc: "Browse through an exclusive catalog of top-tier venues and artisan vendors." },
              { icon: CalendarDays, title: "Tailor-Made", desc: "Craft your unique bundle with dynamic pricing and absolute transparency." },
              { icon: Users, title: "Celebrate Fully", desc: "Secure your bookings instantly. We handle the rest, so you can enjoy the moment." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-36 h-36 rounded-[2.5rem] glass-card flex items-center justify-center mb-10 relative transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_0_40px_rgba(255,51,102,0.3)] group-hover:border-primary/40">
                  <step.icon className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-32 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-3 tracking-tight">Elite Partners</h2>
              <p className="text-lg text-muted-foreground">The best professionals in the business, ready for your event.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link href="/search" className="group flex items-center text-primary font-semibold hover:text-primary/80 transition-colors text-lg">
                View Directory <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {FEATURED_VENDORS.map((vendor, idx) => (
              <motion.div variants={itemVariants} key={vendor.id} whileHover={{ y: -8 }} className="h-full">
                <VendorCard vendor={vendor} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

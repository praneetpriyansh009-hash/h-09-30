import { Link } from 'react-router-dom';
import { Star, MapPin, Award, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceStart: number;
  imageUrl: string;
  isFeatured?: boolean;
}

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link to={`/vendor/${vendor.id}`} className="block h-full group">
      <motion.div 
        className="h-full glass-card rounded-3xl overflow-hidden relative transition-all duration-500 border border-white/[0.04] group-hover:border-neon-pink/30 group-hover:shadow-[0_0_40px_rgba(225,29,72,0.15)] flex flex-col"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

        {/* Image Section */}
        <div className="relative h-56 w-full overflow-hidden shrink-0 z-10">
          <img
            src={vendor.imageUrl || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80"}
            alt={vendor.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {vendor.isFeatured && (
              <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-gold/30 shadow-[0_0_15px_rgba(245,166,35,0.3)] bg-black/40 backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">Featured</span>
              </div>
            )}
          </div>

          {/* Bottom Gradient overlay for text readability if needed */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
        </div>
        
        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1 relative z-10">
          <div className="flex justify-between items-start mb-3 gap-2">
            <h3 className="font-heading font-bold text-xl text-white line-clamp-1 group-hover:text-neon-pink transition-colors duration-300">
              {vendor.name}
            </h3>
            <div className="glass px-2 py-1 rounded-lg flex items-center gap-1 shrink-0 bg-white/[0.05]">
              <Star className="w-3 h-3 text-gold fill-gold" />
              <span className="text-white font-semibold text-sm">{vendor.rating.toFixed(1)}</span>
              <span className="text-white/40 text-xs">({vendor.reviewCount})</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-white/50 mb-5 font-display">
            <MapPin className="w-4 h-4 mr-1.5 text-neon-cyan shrink-0" />
            <span className="line-clamp-1">{vendor.location}</span>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <div className="flex flex-col">
                <span className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-0.5">Starting at</span>
                <span className="font-bold text-white text-lg font-heading">
                  ₹{vendor.priceStart.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-neon-pink group-hover:text-white text-white/50 transition-all duration-300 shadow-[0_0_0_rgba(225,29,72,0)] group-hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Badge Floating slightly over image/content boundary */}
        <div className="absolute top-[204px] right-6 z-20">
          <div className="px-4 py-1.5 rounded-full bg-[#111113] border border-white/[0.1] text-xs font-medium text-white/80 shadow-xl backdrop-blur-xl">
            {vendor.category}
          </div>
        </div>

      </motion.div>
    </Link>
  );
}

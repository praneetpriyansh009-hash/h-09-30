import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Users, Sparkles, ChevronRight, Clock, Plus, 
  Heart, Star, Activity, PartyPopper
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock Data
const MOCK_PARTIES = [
  {
    id: 'p1',
    title: 'Neon Nights 21st Birthday',
    date: 'Oct 24, 2024',
    location: 'Mumbai, MH',
    guests: 120,
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80',
    progress: 85,
  },
  {
    id: 'p2',
    title: 'Corporate Retreat 2024',
    date: 'Nov 12, 2024',
    location: 'Goa, GA',
    guests: 45,
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    progress: 30,
  }
];

const SAVED_VENDORS = [
  {
    id: 'v1',
    name: 'Lumina Events',
    category: 'Decor',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80',
  },
  {
    id: 'v2',
    name: 'Spice Route Catering',
    category: 'Catering',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
  }
];

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const firstName = user?.name?.split(' ')[0] || 'Guest';

  return (
    <div className="min-h-screen bg-[#030303] text-white font-display pt-24 pb-32">
      <main className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-violet">{firstName}</span>
            </h1>
            <p className="text-white/50 text-lg">Your celebration command center.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button 
              onClick={() => navigate('/plan/new')}
              className="bg-white text-black hover:bg-white/90 font-bold rounded-xl h-12 px-6 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Plan New Party
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Active Celebrations */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-neon-pink/10">
                <PartyPopper className="w-6 h-6 text-neon-pink" />
              </div>
              <h2 className="text-2xl font-bold font-heading">Your Celebrations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_PARTIES.map((party, index) => (
                <motion.div
                  key={party.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/party/${party.id}`)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500"
                >
                  <div className="absolute inset-0">
                    <img src={party.image} alt={party.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent" />
                  </div>
                  
                  <div className="relative p-6 h-full flex flex-col justify-end min-h-[300px]">
                    <div className="flex justify-between items-start mb-auto">
                      <Badge className={party.status === 'Upcoming' ? 'bg-neon-cyan text-black hover:bg-neon-cyan/90' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-0'}>
                        {party.status}
                      </Badge>
                      <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20">
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{party.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-6">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {party.date}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {party.location}</span>
                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {party.guests}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-white/40 font-medium uppercase tracking-wider">
                          <span>Planning Progress</span>
                          <span>{party.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${party.progress}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full rounded-full ${party.status === 'Upcoming' ? 'bg-neon-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/40'}`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* AI Assistant Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-violet/20 blur-[50px] rounded-full" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2 rounded-xl bg-neon-violet/20">
                  <Sparkles className="w-5 h-5 text-neon-violet" />
                </div>
                <h3 className="text-xl font-bold font-heading">AI Concierge</h3>
              </div>
              <p className="text-white/50 text-sm mb-6 relative z-10">
                Your personal AI planner is ready to help you brainstorm themes or find vendors.
              </p>
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white justify-between group relative z-10">
                Start a new chat
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Saved Vendors */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-500/10">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
                  </div>
                  <h3 className="text-xl font-bold font-heading">Saved Vendors</h3>
                </div>
                <Link to="/vendors/saved" className="text-sm text-white/40 hover:text-white transition-colors">View All</Link>
              </div>

              <div className="space-y-4">
                {SAVED_VENDORS.map((vendor) => (
                  <div key={vendor.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <img src={vendor.image} alt={vendor.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-white group-hover:text-neon-pink transition-colors">{vendor.name}</h4>
                      <p className="text-xs text-white/50 mb-1">{vendor.category}</p>
                      <div className="flex items-center gap-1 text-xs text-gold">
                        <Star className="w-3 h-3 fill-gold" />
                        <span className="font-medium">{vendor.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}

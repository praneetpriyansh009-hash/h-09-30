'use client';

import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, TrendingUp, Users, CalendarDays, Check, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const STATS = [
  { label: 'Platform GMV', value: '₹12.5M', change: '+15%', trend: 'up', icon: IndianRupee, color: 'from-primary to-accent' },
  { label: 'Commission Revenue', value: '₹1.25M', change: '+12%', trend: 'up', icon: TrendingUp, color: 'from-blue-500 to-cyan-400' },
  { label: 'Active Vendors', value: '450', change: '+24', trend: 'up', icon: Users, color: 'from-emerald-500 to-teal-400' },
  { label: 'Total Bookings', value: '1,240', change: '+8%', trend: 'up', icon: CalendarDays, color: 'from-purple-500 to-indigo-400' },
];

const PENDING_VENDORS = [
  { id: 'v1', name: 'Lumina Events', category: 'Decorators', city: 'Mumbai', appliedDate: '2 hours ago' },
  { id: 'v2', name: 'Spice Route Catering', category: 'Caterers', city: 'Delhi', appliedDate: '5 hours ago' },
  { id: 'v3', name: 'Capture Moments', category: 'Photography', city: 'Bangalore', appliedDate: '1 day ago' },
  { id: 'v4', name: 'The Grand Vista', category: 'Venues', city: 'Pune', appliedDate: '2 days ago' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-1">Platform performance and key metrics.</p>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} variants={itemVariants} className="glass-panel p-6 rounded-3xl relative overflow-hidden group border border-white/5 hover:border-white/10 transition-colors">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-[40px] -mr-8 -mt-8 opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-semibold flex items-center bg-green-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> {stat.change}
                </span>
              </div>
              
              <p className="text-muted-foreground font-medium text-sm mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</h3>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Placeholder (Takes up 2 cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-white/5 flex flex-col min-h-[400px]"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-heading font-bold">Revenue Growth</h2>
            <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          
          {/* Simple CSS Chart Visualization */}
          <div className="flex-1 flex items-end justify-between gap-2 pt-4">
            {[40, 55, 45, 70, 65, 85, 80, 100, 90, 110, 95, 120].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="w-full relative flex-1 flex items-end">
                  <div 
                    className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-colors relative"
                    style={{ height: `${(h / 120) * 100}%` }}
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/50 to-transparent h-full" />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending Approvals */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-3xl p-0 border border-white/5 overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div>
              <h2 className="text-xl font-heading font-bold">Pending Vendors</h2>
              <p className="text-sm text-muted-foreground">Require approval</p>
            </div>
            <Badge variant="outline" className="bg-primary/20 text-primary border-0">{PENDING_VENDORS.length}</Badge>
          </div>
          
          <div className="divide-y divide-white/5 flex-1 overflow-y-auto">
            {PENDING_VENDORS.map(vendor => (
              <div key={vendor.id} className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">{vendor.name}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1 gap-2">
                    <span>{vendor.category}</span>
                    <span>•</span>
                    <span>{vendor.city}</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-green-500/20 hover:text-green-400">
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-red-500/20 hover:text-red-400">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-white/5 text-center">
            <Button variant="ghost" className="text-primary hover:text-primary text-sm w-full h-8">View All Applications</Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

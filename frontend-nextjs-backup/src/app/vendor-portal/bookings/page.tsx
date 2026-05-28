'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, DollarSign, Check, X, Search, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Mock data
const BOOKINGS = [
  { id: 'b1', customer: 'Sarah Mehta', event: 'Anniversary Party', date: '2026-06-15', time: '19:00', amount: 150000, status: 'pending' },
  { id: 'b2', customer: 'Rahul Kumar', event: '30th Birthday Bash', date: '2026-06-20', time: '20:00', amount: 85000, status: 'confirmed' },
  { id: 'b3', customer: 'Neha Sharma', event: 'Baby Shower', date: '2026-06-25', time: '14:00', amount: 45000, status: 'confirmed' },
  { id: 'b4', customer: 'Vikas Gupta', event: 'Corporate Offsite', date: '2026-07-02', time: '09:00', amount: 250000, status: 'pending' },
  { id: 'b5', customer: 'Priya Desai', event: 'Engagement', date: '2026-05-10', time: '18:00', amount: 120000, status: 'completed' },
  { id: 'b6', customer: 'Amit Singh', event: 'Housewarming', date: '2026-05-05', time: '11:00', amount: 35000, status: 'cancelled' },
];

const TABS = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

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

export default function VendorBookingsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = BOOKINGS.filter(booking => {
    const matchesTab = activeTab === 'All' || booking.status === activeTab.toLowerCase();
    const matchesSearch = booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          booking.event.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage your event requests and schedule.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="flex space-x-1 glass p-1 rounded-2xl overflow-x-auto max-w-full">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors whitespace-nowrap",
                activeTab === tab ? "text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search bookings..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 glass rounded-xl border-white/10 focus-visible:ring-primary/50"
          />
        </div>
      </div>

      {/* Bookings List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4"
      >
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <motion.div 
              key={booking.id}
              variants={itemVariants}
              className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Customer & Event */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg">{booking.customer}</h3>
                    <Badge variant="outline" className={cn("capitalize px-2 py-0.5 rounded-full", getStatusColor(booking.status))}>
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-primary font-medium text-sm">{booking.event}</p>
                </div>

                {/* Date & Time */}
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {booking.time}
                  </div>
                </div>

                {/* Amount */}
                <div className="flex items-center text-lg font-semibold md:justify-end">
                  <DollarSign className="w-4 h-4 mr-1 text-muted-foreground" />
                  {booking.amount.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:w-[140px] justify-end shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                {booking.status === 'pending' ? (
                  <>
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-green-500/20 hover:text-green-400">
                      <Check className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-red-500/20 hover:text-red-400">
                      <X className="w-5 h-5" />
                    </Button>
                  </>
                ) : (
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10">
                    <MoreHorizontal className="w-5 h-5 text-muted-foreground group-hover:text-white" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 glass-panel rounded-2xl">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
            <p className="text-muted-foreground">We couldn't find any bookings matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, IndianRupee, Clock, Users, Star } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Mock data
const SERVICES = [
  {
    id: 's1',
    name: 'Full Event Planning',
    description: 'Comprehensive event planning from conception to execution. We handle everything including venue selection, vendor management, decor, and day-of coordination.',
    price: 150000,
    durationHours: 24,
    status: 'active',
    rating: 4.9,
    reviews: 45,
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500',
  },
  {
    id: 's2',
    name: 'Day-of Coordination',
    description: 'Flawless execution of your event on the big day. Perfect for clients who have planned everything but want to relax and enjoy the event.',
    price: 50000,
    durationHours: 12,
    status: 'active',
    rating: 4.8,
    reviews: 32,
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500',
  },
  {
    id: 's3',
    name: 'Theme Consultation & Design',
    description: 'A detailed 2-hour consultation to create a unique theme and mood board for your upcoming celebration.',
    price: 15000,
    durationHours: 2,
    status: 'draft',
    rating: 0,
    reviews: 0,
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500',
  },
  {
    id: 's4',
    name: 'Destination Wedding Package',
    description: 'End-to-end management for destination weddings including travel logistics, guest accommodation, and multiple events over 3 days.',
    price: 500000,
    durationHours: 72,
    status: 'active',
    rating: 5.0,
    reviews: 12,
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500',
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
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function VendorServicesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground mt-1">Manage your offerings, pricing, and availability.</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 shadow-[0_0_20px_rgba(255,51,102,0.3)] rounded-xl h-11 px-6">
          <Plus className="w-4 h-4 mr-2" /> Add New Service
        </Button>
      </div>

      {/* Services Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {SERVICES.map((service) => (
          <motion.div 
            key={service.id}
            variants={itemVariants}
            className="glass-panel rounded-2xl overflow-hidden flex flex-col group border border-white/5 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,51,102,0.15)] hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={service.imageUrl} 
                alt={service.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant="outline" className={cn(
                  "backdrop-blur-md border-white/20 capitalize",
                  service.status === 'active' ? "bg-green-500/80 text-white" : "bg-white/20 text-white"
                )}>
                  {service.status}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-heading font-bold text-lg line-clamp-1 flex-1 pr-2">{service.name}</h3>
                {service.rating > 0 && (
                  <div className="flex items-center text-accent text-sm font-semibold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-current mr-1" />
                    {service.rating}
                  </div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
                <div className="flex items-center bg-white/5 px-2 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 mr-1 text-primary" /> {service.durationHours} hrs
                </div>
                {service.reviews > 0 && (
                  <div className="flex items-center bg-white/5 px-2 py-1 rounded-md">
                    <Users className="w-3.5 h-3.5 mr-1 text-accent" /> {service.reviews} reviews
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                <div className="flex items-center text-xl font-bold text-foreground">
                  <IndianRupee className="w-5 h-5 text-muted-foreground mr-1" />
                  {service.price.toLocaleString('en-IN')}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-red-500/20 text-muted-foreground hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

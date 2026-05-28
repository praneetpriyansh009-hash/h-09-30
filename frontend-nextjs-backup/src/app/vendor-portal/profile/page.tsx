'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, Save, Building2, MapPin, Phone, Mail, Globe, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

export default function VendorProfilePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Business Profile</h1>
          <p className="text-muted-foreground mt-1">Update your public vendor information and branding.</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 shadow-[0_0_20px_rgba(255,51,102,0.3)] rounded-xl h-11 px-6">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl overflow-hidden border border-white/5"
      >
        {/* Cover Photo */}
        <div className="h-64 bg-muted relative group">
          <Image 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200" 
            alt="Cover Photo" 
            fill 
            className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          <div className="absolute top-4 right-4">
            <Button variant="secondary" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-white/20 rounded-xl">
              <Camera className="w-4 h-4 mr-2" /> Change Cover
            </Button>
          </div>

          {/* Profile Avatar inside Cover */}
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-card border-4 border-black relative overflow-hidden group/avatar cursor-pointer shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200" 
                alt="Logo" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 pt-16 space-y-8">
          
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="Lumina Events" className="pl-10 glass rounded-xl border-white/10 focus-visible:ring-primary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none">
                  <option value="decorators">Decorators</option>
                  <option value="planners">Event Planners</option>
                  <option value="caterers">Caterers</option>
                  <option value="venues">Venues</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>About the Business</Label>
                <Textarea 
                  defaultValue="Award-winning event decorators specializing in premium, bespoke themes. We bring your vision to life with meticulous attention to detail."
                  className="min-h-[120px] glass rounded-xl border-white/10 focus-visible:ring-primary/50" 
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact & Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="email" defaultValue="hello@luminaevents.com" className="pl-10 glass rounded-xl border-white/10 focus-visible:ring-primary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="tel" defaultValue="+91 98765 43210" className="pl-10 glass rounded-xl border-white/10 focus-visible:ring-primary/50" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>City / Base Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="Mumbai, Maharashtra" className="pl-10 glass rounded-xl border-white/10 focus-visible:ring-primary/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="https://luminaevents.com" className="pl-10 glass rounded-xl border-white/10 focus-visible:ring-primary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Instagram Handle</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="@lumina.events" className="pl-10 glass rounded-xl border-white/10 focus-visible:ring-primary/50" />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}

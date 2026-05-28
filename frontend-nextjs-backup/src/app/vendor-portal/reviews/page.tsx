'use client';

import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, MessageSquareReply, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

// Mock data
const REVIEWS = [
  {
    id: 'r1',
    customerName: 'Sarah Mehta',
    rating: 5,
    date: 'June 10, 2026',
    text: 'Absolutely phenomenal experience working with Lumina Events. They understood our vision perfectly and executed it flawlessly. The vintage glamour theme was a huge hit with all our guests!',
    eventName: 'Anniversary Party',
    initials: 'SM',
    color: 'from-pink-500 to-rose-500',
    reply: 'Thank you so much Sarah! It was an absolute pleasure bringing your vision to life.',
  },
  {
    id: 'r2',
    customerName: 'Rahul Kumar',
    rating: 4,
    date: 'May 22, 2026',
    text: 'Great service overall. The decor was beautiful and the coordination was smooth. Only minor issue was a slight delay in setup, but they made up for it.',
    eventName: 'Birthday Bash',
    initials: 'RK',
    color: 'from-blue-500 to-cyan-500',
    reply: null,
  },
  {
    id: 'r3',
    customerName: 'Neha Sharma',
    rating: 5,
    date: 'April 15, 2026',
    text: 'I cannot recommend them enough! Everything from the initial consultation to the final execution was highly professional. They truly care about their clients.',
    eventName: 'Baby Shower',
    initials: 'NS',
    color: 'from-emerald-500 to-teal-500',
    reply: null,
  },
  {
    id: 'r4',
    customerName: 'Priya Desai',
    rating: 5,
    date: 'March 05, 2026',
    text: 'The floral arrangements were breathtaking. Every single guest complimented the table centerpieces.',
    eventName: 'Engagement Ceremony',
    initials: 'PD',
    color: 'from-purple-500 to-indigo-500',
    reply: 'Thank you Priya! We loved selecting those rare orchids for you.',
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function VendorReviewsPage() {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Reviews</h1>
          <p className="text-muted-foreground mt-1">See what your clients are saying about you.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-3xl flex items-center gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] -mr-10 -mt-10" />
          <div className="text-center shrink-0">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-yellow-300">
              4.8
            </h2>
            <div className="flex items-center justify-center mt-2 text-accent">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={cn("w-4 h-4", s <= 4 ? "fill-current" : s === 5 ? "fill-current opacity-50" : "")} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Overall Rating</h3>
            <p className="text-muted-foreground text-sm">Based on 124 reviews</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-3xl flex items-center justify-between md:col-span-2"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-4">Rating Breakdown</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars, idx) => {
                const percent = stars === 5 ? 85 : stars === 4 ? 10 : stars === 3 ? 3 : stars === 2 ? 2 : 0;
                return (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <div className="flex items-center w-12 text-muted-foreground font-medium">
                      {stars} <Star className="w-3 h-3 ml-1" />
                    </div>
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-accent to-yellow-400 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="w-10 text-right text-muted-foreground">{percent}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {REVIEWS.map((review) => (
          <motion.div 
            key={review.id}
            variants={itemVariants}
            className="glass-panel p-6 rounded-2xl relative overflow-hidden"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.color} p-[2px] shrink-0`}>
                <div className="w-full h-full bg-background/80 rounded-full flex items-center justify-center font-bold text-sm backdrop-blur-sm">
                  {review.initials}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{review.customerName}</h4>
                    <p className="text-xs text-primary font-medium">{review.eventName}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                
                <div className="flex items-center gap-1 mt-2 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-current text-accent" : "text-white/10")} />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed pl-16">
              "{review.text}"
            </p>

            <div className="pl-16 mt-4">
              {review.reply ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4 relative">
                  <div className="absolute -left-2 top-4 w-4 h-4 bg-white/5 border-l border-t border-white/10 rotate-[-45deg]" />
                  <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                    <MessageSquareReply className="w-4 h-4 text-primary" /> Your Reply
                  </p>
                  <p className="text-sm text-muted-foreground">{review.reply}</p>
                </div>
              ) : replyingTo === review.id ? (
                <div className="mt-4 space-y-3">
                  <Textarea 
                    placeholder="Write a public reply to this review..." 
                    className="min-h-[100px] glass resize-none rounded-xl border-white/20 focus-visible:ring-primary/50"
                  />
                  <div className="flex items-center gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)} className="rounded-xl">Cancel</Button>
                    <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90">Post Reply</Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 rounded-xl border-white/10 hover:bg-white/5 hover:text-primary transition-colors"
                  onClick={() => setReplyingTo(review.id)}
                >
                  <MessageSquareReply className="w-4 h-4 mr-2" /> Reply
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

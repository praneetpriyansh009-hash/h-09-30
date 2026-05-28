'use client';

import { motion, Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Wallet, TrendingUp, IndianRupee, ArrowUpRight, Activity, ArrowRightLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Mock data
const PAYOUTS = [
  { id: 'p1', date: '2026-06-01', amount: 45000, status: 'Paid', ref: 'TXN-98234A' },
  { id: 'p2', date: '2026-05-15', amount: 120000, status: 'Paid', ref: 'TXN-87123B' },
  { id: 'p3', date: '2026-05-01', amount: 35000, status: 'Paid', ref: 'TXN-76451C' },
  { id: 'p4', date: '2026-06-15', amount: 85000, status: 'Processing', ref: 'TXN-PENDING' },
  { id: 'p5', date: '2026-06-20', amount: 150000, status: 'Pending', ref: 'UPCOMING' },
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

export default function VendorEarningsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Earnings & Payouts</h1>
          <p className="text-muted-foreground mt-1">Track your revenue and manage withdrawals.</p>
        </div>
        <Button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl h-11 px-6">
          Download Statement
        </Button>
      </div>

      {/* Stat Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[30px] -mr-8 -mt-8 transition-transform group-hover:scale-150" />
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground font-medium text-sm mb-1">Total Earnings</p>
          <h3 className="text-3xl font-bold text-foreground">₹4,85,000</h3>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-[30px] -mr-8 -mt-8 transition-transform group-hover:scale-150" />
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
            <TrendingUp className="w-6 h-6 text-accent" />
          </div>
          <p className="text-muted-foreground font-medium text-sm mb-1">This Month</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-foreground">₹1,30,000</h3>
            <span className="text-green-500 text-sm font-semibold flex items-center mb-1 bg-green-500/10 px-1.5 rounded">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> 12%
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-3xl relative overflow-hidden group border-primary/20 bg-primary/5">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
            <ArrowRightLeft className="w-6 h-6 text-primary" />
          </div>
          <p className="text-primary font-medium text-sm mb-1">Pending Payouts</p>
          <h3 className="text-3xl font-bold text-foreground">₹2,35,000</h3>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
            <Activity className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium text-sm mb-1">Platform Fee</p>
          <h3 className="text-3xl font-bold text-foreground">10%</h3>
        </motion.div>
      </motion.div>

      {/* Payouts Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel rounded-3xl overflow-hidden border border-white/5"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h2 className="text-xl font-heading font-bold">Payout History</h2>
          <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">View All</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-muted-foreground text-sm">
                <th className="p-6 font-medium">Date</th>
                <th className="p-6 font-medium">Reference ID</th>
                <th className="p-6 font-medium text-right">Amount</th>
                <th className="p-6 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PAYOUTS.map((payout, idx) => (
                <tr key={payout.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 text-foreground font-medium">
                    {new Date(payout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-6 text-muted-foreground font-mono text-sm">{payout.ref}</td>
                  <td className="p-6 text-right font-bold text-lg">
                    ₹{payout.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-6 text-center">
                    <Badge variant="outline" className={cn(
                      "px-3 py-1 rounded-full border-0 font-semibold",
                      payout.status === 'Paid' ? "bg-green-500/20 text-green-400" :
                      payout.status === 'Processing' ? "bg-blue-500/20 text-blue-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    )}>
                      {payout.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

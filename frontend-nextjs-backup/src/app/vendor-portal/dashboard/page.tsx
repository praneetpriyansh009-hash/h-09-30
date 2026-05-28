'use client';

import { CalendarCheck, IndianRupee, MessageSquare, Star, ArrowUpRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';

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

export default function VendorDashboardPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-heading font-extrabold mb-2 tracking-tight text-glow">Welcome Back, Lumina Events</h1>
          <p className="text-muted-foreground text-lg">Here is the pulse of your business today.</p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button className="bg-white/10 hover:bg-white/20 text-foreground border border-white/10 backdrop-blur-md rounded-xl px-6">
            Edit Profile
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { icon: IndianRupee, label: 'This Month', value: '₹1,24,000', color: 'from-primary to-rose-500', glow: 'shadow-primary/20' },
          { icon: CalendarCheck, label: 'Upcoming Events', value: '8', color: 'from-accent to-yellow-500', glow: 'shadow-accent/20' },
          { icon: MessageSquare, label: 'Unread Messages', value: '3', color: 'from-blue-500 to-indigo-500', glow: 'shadow-blue-500/20' },
          { icon: Star, label: 'Average Rating', value: '4.9', color: 'from-emerald-400 to-green-600', glow: 'shadow-emerald-500/20' },
        ].map((stat, i) => (
          <motion.div variants={itemVariants} key={i}>
            <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              {/* Subtle animated background glow */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity`} />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg ${stat.glow}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-muted-foreground font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Bookings */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
              <CalendarCheck className="w-6 h-6 text-primary" /> Upcoming Bookings
            </h2>
            <Button variant="link" className="text-primary p-0 h-auto">View Calendar</Button>
          </div>
          
          <div className="glass rounded-3xl p-2 space-y-2">
            {[
              { title: "Rahul's 30th Birthday Bash", date: "Tomorrow, 7:00 PM", status: "Confirmed", initials: "RK" },
              { title: "Sarah & John's Anniversary", date: "Oct 24, 6:00 PM", status: "Pending", initials: "SJ" },
              { title: "Corporate Gala Dinner", date: "Oct 28, 8:00 PM", status: "Confirmed", initials: "CG" }
            ].map((booking, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl border border-white/5 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-muted/50 border border-white/10 flex items-center justify-center font-bold text-lg">
                    {booking.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{booking.title}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {booking.date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-accent/10 text-accent border border-accent/20'}`}>
                    {booking.status}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-accent" /> Recent Messages
            </h2>
            <Button variant="link" className="text-primary p-0 h-auto">Open Inbox</Button>
          </div>
          
          <div className="glass rounded-3xl p-2 space-y-2">
            {[
              { name: "Sarah Mehta", time: "2 hours ago", text: "Hi, I had a question about the floral setup for next week...", initials: "SM", color: "from-purple-500 to-pink-500" },
              { name: "Vikram Singh", time: "5 hours ago", text: "Is the deposit fully refundable if we cancel 48 hours prior?", initials: "VS", color: "from-blue-500 to-cyan-500" },
              { name: "Priya Sharma", time: "Yesterday", text: "Thank you! The arrangements look perfect.", initials: "PS", color: "from-emerald-500 to-teal-500" }
            ].map((msg, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl border border-white/5 cursor-pointer group">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${msg.color} p-[2px]`}>
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-bold text-sm">
                    {msg.initials}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold">{msg.name}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 group-hover:text-foreground/80 transition-colors">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

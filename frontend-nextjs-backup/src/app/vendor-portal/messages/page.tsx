'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Send, Paperclip, MoreVertical, CheckCheck, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data
const THREADS = [
  {
    id: 't1',
    user: { name: 'Sarah Mehta', initials: 'SM', color: 'from-purple-500 to-pink-500' },
    lastMessage: 'Can you arrange for a specific theme?',
    time: '10:30 AM',
    unread: 2,
    eventName: "Sarah's Wedding Anniversary",
  },
  {
    id: 't2',
    user: { name: 'Rahul Kumar', initials: 'RK', color: 'from-blue-500 to-cyan-500' },
    lastMessage: 'Perfect, looking forward to it.',
    time: 'Yesterday',
    unread: 0,
    eventName: "Rahul's 30th Birthday Bash",
  },
  {
    id: 't3',
    user: { name: 'Neha Sharma', initials: 'NS', color: 'from-emerald-500 to-teal-500' },
    lastMessage: 'Is the deposit refundable?',
    time: 'Monday',
    unread: 0,
    eventName: "Neha's Baby Shower",
  }
];

const INITIAL_MESSAGES = [
  { id: 'm1', sender: 'user', text: 'Hi! We are planning an anniversary party for 50 people.', time: '10:00 AM' },
  { id: 'm2', sender: 'vendor', text: 'Hello Sarah! We would love to host your anniversary party. What date are you looking at?', time: '10:15 AM' },
  { id: 'm3', sender: 'user', text: 'We are looking at the 15th of next month.', time: '10:20 AM' },
  { id: 'm4', sender: 'user', text: 'Can you arrange for a specific theme? Like Vintage Glamour?', time: '10:30 AM' },
];

export default function VendorMessagesPage() {
  const [activeThread, setActiveThread] = useState(THREADS[0]);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const handleSend = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      sender: 'vendor',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setMessageText('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)] flex glass-panel rounded-3xl overflow-hidden shadow-2xl relative"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Threads List (Sidebar) */}
      <div className="w-80 border-r border-white/5 flex flex-col bg-black/20 backdrop-blur-md relative z-10">
        <div className="p-6 border-b border-white/5">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center justify-between">
            Messages
            <Badge className="bg-primary/20 text-primary border-primary/30">2 New</Badge>
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-11 bg-white/5 border-white/10 rounded-full h-11 focus-visible:ring-primary/50" 
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {THREADS.map((thread) => (
            <div 
              key={thread.id}
              onClick={() => setActiveThread(thread)}
              className={cn(
                "p-4 rounded-2xl cursor-pointer transition-all duration-300 flex gap-4 relative overflow-hidden group",
                activeThread.id === thread.id ? "bg-white/10" : "hover:bg-white/5"
              )}
            >
              {activeThread.id === thread.id && (
                <motion.div 
                  layoutId="active-thread-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${thread.user.color} p-[2px] shrink-0`}>
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-bold text-sm">
                  {thread.user.initials}
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-sm truncate text-foreground">{thread.user.name}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{thread.time}</span>
                </div>
                <p className="text-xs font-medium text-primary mb-1 truncate">{thread.eventName}</p>
                <p className={cn(
                  "text-xs truncate",
                  thread.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {thread.lastMessage}
                </p>
              </div>

              {thread.unread > 0 && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(255,51,102,0.5)]">
                  {thread.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-background/40 relative z-10">
        {/* Chat Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${activeThread.user.color} p-[2px]`}>
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-bold text-sm">
                {activeThread.user.initials}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg">{activeThread.user.name}</h3>
              <p className="text-sm text-primary font-medium">{activeThread.eventName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
          <div className="text-center py-4">
            <span className="text-xs font-medium px-3 py-1 bg-white/5 rounded-full text-muted-foreground border border-white/10">
              Today
            </span>
          </div>
          
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isVendor = msg.sender === 'vendor';
              return (
                <motion.div 
                  key={msg.id} 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn("flex w-full", isVendor ? "justify-end" : "justify-start")}
                >
                  <div className={cn(
                    "max-w-[70%] px-5 py-3.5 relative group",
                    isVendor 
                      ? "bg-gradient-to-br from-primary to-rose-600 text-white rounded-2xl rounded-tr-sm shadow-[0_5px_20px_rgba(255,51,102,0.2)]" 
                      : "bg-white/10 backdrop-blur-md text-foreground rounded-2xl rounded-tl-sm border border-white/5"
                  )}>
                    <p className="text-[15px] leading-relaxed">{msg.text}</p>
                    <div className={cn(
                      "flex items-center gap-1.5 mt-2 justify-end",
                      isVendor ? "text-white/70" : "text-muted-foreground"
                    )}>
                      <span className="text-[10px] font-medium tracking-wide">{msg.time}</span>
                      {isVendor && <CheckCheck className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-xl">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-full">
              <Paperclip className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 relative flex items-center">
              <Input 
                placeholder="Type your message..." 
                className="w-full bg-white/5 border-white/10 focus-visible:ring-primary rounded-full h-12 pl-5 pr-12 text-base"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <Button variant="ghost" size="icon" className="absolute right-1 text-muted-foreground hover:text-primary rounded-full">
                <Smile className="w-5 h-5" />
              </Button>
            </div>

            <Button 
              onClick={handleSend} 
              className="shrink-0 rounded-full w-12 h-12 p-0 flex items-center justify-center bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(255,51,102,0.4)] transition-all hover:scale-105"
            >
              <Send className="w-5 h-5 ml-[-2px]" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Temporary Badge component until we import from UI
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold", className)}>{children}</span>
}

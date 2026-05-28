import { useWizardStore } from '@/lib/store/wizard-store';
import { motion } from 'framer-motion';
import { Calendar, Clock, CloudSun, MapPin, Users, Music, Link as LinkIcon, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PartyDashboard() {
  const { occasion, date, time, city, guests, spotifyGenre, dressCode } = useWizardStore();

  return (
    <div className="min-h-screen bg-[#030303] pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 noise z-0" />
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-neon-violet/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-3 py-1 bg-neon-cyan/20 text-neon-cyan text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Live Dashboard
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-white capitalize">
              {occasion ? occasion.replace('-', ' ') : 'The Epic Bash'}
            </h1>
            <p className="text-white/50 mt-2 font-display text-lg">Your command center for the ultimate experience.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white">
              <Share2 className="w-4 h-4 mr-2" /> Share Link
            </Button>
            <Button className="bg-white text-black font-bold">
              Manage Guests
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Info Card */}
          <div className="lg:col-span-2 glass-card rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-pink/10 rounded-full blur-[80px]" />
            
            <h2 className="text-2xl font-bold text-white mb-8">Event Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-neon-pink" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Date</p>
                  <p className="text-white font-semibold text-lg">{date ? date.toLocaleDateString() : 'Dec 31, 2026'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-neon-cyan" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Time</p>
                  <p className="text-white font-semibold text-lg">{time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-neon-violet" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Location</p>
                  <p className="text-white font-semibold text-lg">{city || 'Secret Location'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <CloudSun className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Weather Forecast</p>
                  <p className="text-white font-semibold text-lg">72°F / Clear Night</p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-white/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Guest List</p>
                  <p className="text-white font-semibold text-lg">12 Confirmed / {guests} Invited</p>
                  <div className="flex -space-x-2 mt-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030303] bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center text-[10px] font-bold text-white">
                        G{i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Music className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Playlist Vibe</p>
                  <p className="text-white font-semibold text-lg">{spotifyGenre || 'Open Format'}</p>
                  <Button variant="link" className="text-green-400 p-0 h-auto mt-1 flex items-center text-xs">
                    <LinkIcon className="w-3 h-3 mr-1" /> Open Spotify Collaborative Playlist
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Countdown Widget */}
            <div className="glass-card rounded-3xl p-6 border border-neon-cyan/20 relative overflow-hidden bg-neon-cyan/5">
              <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4 text-center">Time to Party</h3>
              <div className="flex justify-center gap-4 text-center">
                <div>
                  <div className="text-4xl font-black text-white">14</div>
                  <div className="text-xs text-white/50 mt-1">DAYS</div>
                </div>
                <div className="text-4xl font-black text-white/20">:</div>
                <div>
                  <div className="text-4xl font-black text-white">08</div>
                  <div className="text-xs text-white/50 mt-1">HOURS</div>
                </div>
                <div className="text-4xl font-black text-white/20">:</div>
                <div>
                  <div className="text-4xl font-black text-neon-cyan">45</div>
                  <div className="text-xs text-neon-cyan/50 mt-1">MINS</div>
                </div>
              </div>
            </div>

            {/* Polls Widget */}
            <div className="glass-card rounded-3xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold">Live Polls</h3>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
              <p className="text-white/50 text-sm mb-4">Let your guests vote on the final details.</p>
              
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-white text-sm mb-2 font-medium">Signature Drink Base?</p>
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>Vodka</span>
                    <span>70%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-pink w-[70%]" />
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 bg-white/10 text-white hover:bg-white/20">
                Create New Poll
              </Button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

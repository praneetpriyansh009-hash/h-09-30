import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings as SettingsIcon, CreditCard, Bell, ShieldAlert, 
  Camera, LogOut, Check, ChevronRight, Smartphone, Mail, AlertTriangle
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TABS = [
  { id: 'account', label: 'Account Details', icon: User },
  { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
  { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
  { id: 'danger', label: 'Danger Zone', icon: ShieldAlert, danger: true },
];

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock state
  const [name, setName] = useState(user?.name || 'Jane Doe');
  const [email, setEmail] = useState(user?.email || 'jane@example.com');
  const [phone, setPhone] = useState('+1 (555) 000-0000');

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true
  });

  const handleSave = () => {
    setIsEditing(false);
    // Real implementation would update Firebase profile here
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-display pt-24 pb-20">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Account Settings</h1>
          <p className="text-white/50 text-lg">Manage your profile, preferences, and payment methods.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 shrink-0 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? tab.danger 
                      ? 'bg-red-500/10 text-red-500 shadow-[inset_0_0_0_1px_rgba(239,68,68,0.2)]'
                      : 'bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              
              {/* Account Tab */}
              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Profile Picture */}
                  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] flex items-center gap-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-pink to-neon-violet p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                          {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-3xl font-heading font-bold text-white/50">{name.charAt(0)}</span>
                          )}
                        </div>
                      </div>
                      <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <Camera className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Profile Picture</h3>
                      <p className="text-sm text-white/40 mb-4 max-w-sm">Upload a new avatar. Larger images will be resized automatically.</p>
                      <div className="flex gap-3">
                        <Button variant="outline" className="h-9 text-xs">Upload new</Button>
                        <Button variant="ghost" className="h-9 text-xs text-red-400 hover:text-red-300">Remove</Button>
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Personal Information</h3>
                      <Button 
                        variant="ghost" 
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={isEditing ? "text-neon-cyan" : "text-white/60"}
                      >
                        {isEditing ? 'Save Changes' : 'Edit'}
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-white/40">Full Name</Label>
                        <Input 
                          disabled={!isEditing}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-white/5 border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white/40">Email Address</Label>
                        <Input 
                          disabled={!isEditing}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/5 border-white/10 disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white/40">Phone Number</Label>
                        <Input 
                          disabled={!isEditing}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-white/5 border-white/10 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Connected Accounts */}
                  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05]">
                    <h3 className="text-xl font-bold text-white mb-6">Connected Accounts</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Google</p>
                            <p className="text-white/40 text-sm">Connected</p>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-white/40 hover:text-red-400">Disconnect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Apple</p>
                            <p className="text-white/40 text-sm">Not connected</p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Connect</Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05]">
                    <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
                    <div className="space-y-6">
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="mt-1"><Mail className="w-5 h-5 text-neon-cyan" /></div>
                          <div>
                            <p className="text-white font-medium mb-1">Email Notifications</p>
                            <p className="text-sm text-white/40">Receive booking updates, vendor messages, and receipts.</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setNotifications(prev => ({...prev, email: !prev.email}))}
                          className={`w-12 h-6 rounded-full relative transition-colors ${notifications.email ? 'bg-neon-cyan' : 'bg-white/20'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${notifications.email ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="mt-1"><Smartphone className="w-5 h-5 text-neon-pink" /></div>
                          <div>
                            <p className="text-white font-medium mb-1">SMS Alerts</p>
                            <p className="text-sm text-white/40">Urgent updates about your events and direct vendor texts.</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setNotifications(prev => ({...prev, sms: !prev.sms}))}
                          className={`w-12 h-6 rounded-full relative transition-colors ${notifications.sms ? 'bg-neon-pink' : 'bg-white/20'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${notifications.sms ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

              {/* Danger Zone */}
              {activeTab === 'danger' && (
                <motion.div
                  key="danger"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/20">
                    <h3 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6" />
                      Danger Zone
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-red-500/10">
                        <div>
                          <p className="text-white font-medium mb-1">Sign Out</p>
                          <p className="text-sm text-white/40">Log out of your account on this device.</p>
                        </div>
                        <Button variant="outline" onClick={logout} className="border-white/10 text-white hover:bg-white/5">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-white font-medium mb-1">Delete Account</p>
                          <p className="text-sm text-white/40">Permanently delete your account and all associated data. This action cannot be undone.</p>
                        </div>
                        <Button className="bg-red-500 hover:bg-red-600 text-white font-medium shrink-0">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                   <div className="p-12 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center mb-6">
                      <CreditCard className="w-8 h-8 text-white/40" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Payment Methods</h3>
                    <p className="text-white/40 mb-8 max-w-sm mx-auto">Add a payment method to securely book venues and vendors in one click.</p>
                    <Button className="bg-white text-black hover:bg-white/90 font-bold rounded-xl px-8">
                      Add Card
                    </Button>
                   </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

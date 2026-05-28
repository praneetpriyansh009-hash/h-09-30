import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { Mail, Lock, User, ArrowRight, Loader2, Star, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  updateProfile
} from 'firebase/auth';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const phoneSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number with country code (e.g., +91...)'),
});

function GoogleIcon(props: any) {
  return <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>;
}

function AppleIcon(props: any) {
  return <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.641-.026 2.669-1.48 3.666-2.947 1.14-1.674 1.604-3.296 1.624-3.376-.039-.013-3.156-1.213-3.181-4.825-.026-3.024 2.47-4.475 2.583-4.549-1.428-2.083-3.64-2.336-4.432-2.388-2.072-.156-4.108 1.021-5.498 1.021zm3.123-5.32c.866-1.046 1.448-2.502 1.288-3.947-1.233.05-2.753.821-3.64 1.865-.792.932-1.488 2.42-1.306 3.844 1.385.106 2.788-.716 3.658-1.762z" fill="#fff"/></svg>;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  
  const [authMode, setAuthMode] = useState<'email' | 'phone'>('email');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize Recaptcha
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      registerSchema.parse({ name, email, password });
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update display name
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/plan/new');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) newErrors[issue.path[0].toString()] = issue.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ form: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/plan/new');
    } catch (error: any) {
      setErrors({ form: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new OAuthProvider('apple.com');
      await signInWithPopup(auth, provider);
      navigate('/plan/new');
    } catch (error: any) {
      setErrors({ form: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      phoneSchema.parse({ phone });
      setIsLoading(true);
      const result = await signInWithPhoneNumber(auth, phone, (window as any).recaptchaVerifier);
      setConfirmationResult(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) newErrors[issue.path[0].toString()] = issue.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ form: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult || otp.length < 6) return;
    setErrors({});
    try {
      setIsLoading(true);
      await confirmationResult.confirm(otp);
      navigate('/plan/new');
    } catch (error: any) {
      setErrors({ form: "Invalid OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#030303]"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 noise z-0" />
      <div id="recaptcha-container"></div>
      
      <motion.div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(225,29,72,0.12) 0%, transparent 70%)',
          x: mousePos.x * 2,
          y: mousePos.y * 2,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)',
          x: mousePos.x * -2,
          y: mousePos.y * -2,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <Link to="/" className="absolute top-8 left-8 z-20 group flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white font-bold group-hover:border-gold/50 transition-all">
          H
        </div>
        <span className="font-heading font-bold text-white group-hover:text-glow transition-all">Back to Home</span>
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-[420px] p-8 md:p-10 glass-panel rounded-[2rem] border border-white/[0.08] relative z-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-pink to-gold flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_30px_rgba(245,166,35,0.3)]"
          >
            <Star className="w-8 h-8 fill-white/20" />
          </motion.div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-white/40 font-display">Join Hookin and unlock premium events.</p>
        </div>

        {errors.form && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {errors.form}
          </div>
        )}

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleGoogleLogin}
            className="h-12 bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.08] text-white"
          >
            <GoogleIcon className="w-5 h-5 mr-2" />
            Google
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleAppleLogin}
            className="h-12 bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.08] text-white"
          >
            <AppleIcon className="w-5 h-5 mr-2" />
            Apple
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] flex-1 bg-white/[0.08]" />
          <span className="text-white/30 text-xs font-medium uppercase">Or register with</span>
          <div className="h-[1px] flex-1 bg-white/[0.08]" />
        </div>

        <div className="flex rounded-xl bg-white/[0.03] p-1 mb-6 border border-white/[0.08]">
          <button
            onClick={() => setAuthMode('email')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${authMode === 'email' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
          >
            Email
          </button>
          <button
            onClick={() => setAuthMode('phone')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${authMode === 'phone' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
          >
            Phone
          </button>
        </div>

        <AnimatePresence mode="wait">
          {authMode === 'email' ? (
            <motion.form 
              key="email-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleEmailSubmit} 
              className="space-y-5"
            >
              <div className="space-y-2 relative group">
                <Label htmlFor="name" className="text-white/60 font-medium ml-1">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-gold transition-colors" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 h-14 bg-white/[0.03] border-white/[0.08] focus-visible:ring-gold focus-visible:border-gold/50 rounded-2xl text-base text-white placeholder:text-white/20 transition-all hover:bg-white/[0.05]"
                  />
                </div>
                {errors.name && <p className="text-neon-pink text-sm ml-1">{errors.name}</p>}
              </div>

              <div className="space-y-2 relative group">
                <Label htmlFor="email" className="text-white/60 font-medium ml-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-neon-pink transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 bg-white/[0.03] border-white/[0.08] focus-visible:ring-neon-pink focus-visible:border-neon-pink/50 rounded-2xl text-base text-white placeholder:text-white/20 transition-all hover:bg-white/[0.05]"
                  />
                </div>
                {errors.email && <p className="text-neon-pink text-sm ml-1">{errors.email}</p>}
              </div>

              <div className="space-y-2 relative group">
                <Label htmlFor="password" className="text-white/60 font-medium ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-neon-violet transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-14 bg-white/[0.03] border-white/[0.08] focus-visible:ring-neon-violet focus-visible:border-neon-violet/50 rounded-2xl text-base text-white placeholder:text-white/20 transition-all hover:bg-white/[0.05]"
                  />
                </div>
                {errors.password && <p className="text-neon-pink text-sm ml-1">{errors.password}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 text-base font-bold rounded-2xl bg-gradient-to-r from-neon-pink via-gold to-neon-violet hover:opacity-90 text-white shadow-[0_0_30px_rgba(245,166,35,0.3)] transition-all hover:shadow-[0_0_40px_rgba(245,166,35,0.5)] mt-4 bg-[length:200%_auto] animate-gradient-x"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="phone-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {!confirmationResult ? (
                <form onSubmit={handleSendOTP} className="space-y-5">
                  <div className="space-y-2 relative group">
                    <Label htmlFor="phone" className="text-white/60 font-medium ml-1">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-gold transition-colors" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-12 h-14 bg-white/[0.03] border-white/[0.08] focus-visible:ring-gold focus-visible:border-gold/50 rounded-2xl text-base text-white placeholder:text-white/20 transition-all hover:bg-white/[0.05]"
                      />
                    </div>
                    {errors.phone && <p className="text-neon-pink text-sm ml-1">{errors.phone}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-14 text-base font-bold rounded-2xl bg-gradient-to-r from-gold to-neon-violet hover:opacity-90 text-white shadow-[0_0_30px_rgba(245,166,35,0.3)] transition-all hover:shadow-[0_0_40px_rgba(245,166,35,0.5)] mt-4"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-5">
                  <div className="space-y-2 relative group">
                    <div className="flex justify-between items-center ml-1">
                      <Label htmlFor="otp" className="text-white/60 font-medium">Enter 6-digit OTP</Label>
                      <button type="button" onClick={() => setConfirmationResult(null)} className="text-sm text-gold hover:text-white transition-colors">Change number</button>
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-gold transition-colors" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="pl-12 h-14 bg-white/[0.03] border-white/[0.08] focus-visible:ring-gold focus-visible:border-gold/50 rounded-2xl text-base text-white tracking-widest placeholder:text-white/20 transition-all hover:bg-white/[0.05]"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading || otp.length < 6}
                    className="w-full h-14 text-base font-bold rounded-2xl bg-gradient-to-r from-gold to-neon-violet hover:opacity-90 text-white shadow-[0_0_30px_rgba(245,166,35,0.3)] transition-all hover:shadow-[0_0_40px_rgba(245,166,35,0.5)] mt-4"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Register'}
                  </Button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-white/40 font-display">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-semibold hover:text-gold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

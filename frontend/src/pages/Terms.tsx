import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Lock, AlertCircle, RefreshCw, Handshake, Brain, CheckCircle2, ChevronRight, Scale } from 'lucide-react';

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction & Acceptance', icon: Handshake },
  { id: 'platform-role', title: '2. Hookin\'s Role as Intermediary', icon: Scale },
  { id: 'ai-concierge', title: '3. AI Concierge & Capabilities', icon: Brain },
  { id: 'bookings', title: '4. Bookings & Payments', icon: RefreshCw },
  { id: 'cancellations', title: '5. Cancellations & Refunds', icon: AlertCircle },
  { id: 'liability', title: '6. Limitation of Liability', icon: Shield },
  { id: 'disputes', title: '7. Dispute Resolution', icon: Scale },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 300; 

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] selection:bg-neon-pink/30 text-white font-display pt-24 pb-32">
      <main className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-white/80 tracking-wide uppercase">Last Updated: October 24, 2024</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-8"
          >
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-gold to-neon-violet">Conditions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed"
          >
            A perfectly curated framework designed to protect our hosts, empower our vendors, and ensure every celebration executed through Hookin is flawless, legally sound, and utterly unforgettable.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Sticky Sidebar Navigation */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-32 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-8 pl-4">Legal Framework</h3>
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all duration-500 group ${
                    activeSection === section.id 
                      ? 'bg-gradient-to-r from-white/10 to-transparent border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.03)]' 
                      : 'border border-transparent hover:border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl transition-colors duration-500 ${activeSection === section.id ? 'bg-white/10 text-gold' : 'bg-white/5 text-white/30 group-hover:text-white/60 group-hover:bg-white/10'}`}>
                      <section.icon className="w-4 h-4" />
                    </div>
                    <span className={`font-medium transition-colors duration-500 ${activeSection === section.id ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>
                      {section.title}
                    </span>
                  </div>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-3xl prose prose-invert prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:text-white prose-p:text-white/60 prose-p:leading-loose prose-a:text-gold hover:prose-a:text-neon-pink transition-colors">
            
            <section id="introduction" className="scroll-mt-32 mb-24 relative">
              <div className="absolute -left-12 top-2 w-1 h-8 bg-gradient-to-b from-neon-pink to-transparent rounded-full hidden lg:block" />
              <h2 className="text-3xl md:text-4xl mb-8">1. Introduction & Acceptance</h2>
              <p>
                Welcome to Hookin. By accessing our platform, utilizing our AI concierge, or booking any vendor through our service, you are entering into a binding legal agreement with Hookin Technologies Pvt. Ltd. ("Hookin", "we", "us", or "our").
              </p>
              <p>
                These terms govern your access to the Hookin website, mobile applications, and all associated services. If you do not agree to every clause outlined in this document, you must immediately cease use of the platform. Your continued use constitutes explicit acceptance of these Terms and Conditions.
              </p>
            </section>

            <section id="platform-role" className="scroll-mt-32 mb-24 relative">
              <div className="absolute -left-12 top-2 w-1 h-8 bg-gradient-to-b from-gold to-transparent rounded-full hidden lg:block" />
              <h2 className="text-3xl md:text-4xl mb-8">2. Hookin's Role as Intermediary</h2>
              <p>
                Hookin is a technology platform and luxury concierge service designed to facilitate connections between event hosts ("Users") and event service providers, venues, and talent ("Vendors"). 
              </p>
              <ul className="space-y-4 text-white/60 my-8 bg-white/5 border border-white/10 p-8 rounded-3xl list-none pl-0">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <span><strong>Independent Contractors:</strong> All Vendors on the Hookin platform operate as independent business entities. Hookin does not employ Vendors and cannot be held liable for their direct actions, omissions, or the ultimate execution of their services.</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <span><strong>Vetting Process:</strong> While Hookin employs rigorous verification processes including portfolio reviews, KYC checks, and background verifications for luxury tier vendors, we do not guarantee the quality, safety, or legality of the underlying services provided.</span>
                </li>
              </ul>
              <p>
                The ultimate contract for the provision of event services is directly between the User and the Vendor. Hookin acts solely as the payment collection agent and facilitator of the booking.
              </p>
            </section>

            <section id="ai-concierge" className="scroll-mt-32 mb-24 relative">
              <div className="absolute -left-12 top-2 w-1 h-8 bg-gradient-to-b from-neon-cyan to-transparent rounded-full hidden lg:block" />
              <h2 className="text-3xl md:text-4xl mb-8">3. AI Concierge & Capabilities</h2>
              <p>
                Hookin utilizes advanced Artificial Intelligence to provide event recommendations, auto-generate itineraries, suggest themes, and approximate budget allocations.
              </p>
              <p>
                By utilizing the AI planner, you acknowledge that all AI-generated suggestions (including timeline generation, capacity limits, and aesthetic recommendations) are advisory in nature. The User remains solely responsible for validating the feasibility of AI suggestions with the selected Vendors prior to the event. Hookin holds no liability for logistical failures resulting from unchecked AI-generated itineraries.
              </p>
            </section>

            <section id="bookings" className="scroll-mt-32 mb-24 relative">
              <div className="absolute -left-12 top-2 w-1 h-8 bg-gradient-to-b from-neon-violet to-transparent rounded-full hidden lg:block" />
              <h2 className="text-3xl md:text-4xl mb-8">4. Bookings & Payments</h2>
              <p>
                To secure an event, a booking must be confirmed through the Hookin platform accompanied by the requisite deposit.
              </p>
              <h3 className="text-2xl text-white mt-12 mb-6 font-heading">Payment Structures</h3>
              <p>
                Depending on the scale of the event, payments are typically split into a <strong>Retainer Deposit (usually 30-50%)</strong> due at the time of booking, and a <strong>Final Balance</strong> due no later than 72 hours prior to the event commencement.
              </p>
              <p>
                All financial transactions are secured by 256-bit AES encryption. Hookin charges a standard platform fee of 5% applied to the total invoice value, which covers the concierge AI suite, payment processing, and escrow protection.
              </p>
            </section>

            <section id="cancellations" className="scroll-mt-32 mb-24 relative">
              <div className="absolute -left-12 top-2 w-1 h-8 bg-gradient-to-b from-red-500 to-transparent rounded-full hidden lg:block" />
              <h2 className="text-3xl md:text-4xl mb-8">5. Cancellations & Refunds</h2>
              <p>
                We understand that plans change. Our cancellation policy is designed to be fair to both the User who requires flexibility and the Vendor who has reserved their calendar.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-gold font-bold mb-2 m-0">30+ Days Prior</h4>
                  <p className="text-sm text-white/60 m-0">Eligible for a full refund of the deposit, minus the 5% Hookin platform fee.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-orange-400 font-bold mb-2 m-0">15-29 Days Prior</h4>
                  <p className="text-sm text-white/60 m-0">50% of the deposit is forfeit to compensate vendors for lost booking opportunities.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl md:col-span-2">
                  <h4 className="text-red-400 font-bold mb-2 m-0">0-14 Days Prior</h4>
                  <p className="text-sm text-white/60 m-0">The initial deposit is strictly non-refundable. Vendors have finalized inventory, staffing, and logistics for your specific event dates.</p>
                </div>
              </div>
            </section>

            <section id="liability" className="scroll-mt-32 mb-24 relative">
              <div className="absolute -left-12 top-2 w-1 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full hidden lg:block" />
              <h2 className="text-3xl md:text-4xl mb-8">6. Limitation of Liability</h2>
              <p className="uppercase text-xs tracking-widest font-bold text-white/40 mb-4">Please read carefully</p>
              <p>
                To the maximum extent permitted by applicable law, Hookin, its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to, or use of, the platform.
              </p>
              <p>
                Hookin is entirely exempt from liability regarding property damage, personal injury, noise complaints, or permit violations occurring during an event. The User assumes all legal and financial responsibility for the conduct of guests and the procurement of necessary local event permits.
              </p>
            </section>

            <section id="disputes" className="scroll-mt-32 mb-24 relative">
              <div className="absolute -left-12 top-2 w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent rounded-full hidden lg:block" />
              <h2 className="text-3xl md:text-4xl mb-8">7. Dispute Resolution</h2>
              <p>
                In the rare event of a dispute between a User and a Vendor (e.g., service not delivered as described), Hookin provides a complimentary mediation desk. Funds held in the Final Balance may be frozen pending resolution.
              </p>
              <p>
                Any legal dispute arising from the use of the Hookin platform itself shall be governed by the laws of India, and shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.
              </p>
            </section>

            <div className="mt-24 pt-12 border-t border-white/10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
                <Scale className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl text-white font-heading font-bold mb-4">Legal Inquiries</h3>
              <p className="text-white/40 text-lg">
                For questions regarding these terms, our privacy practices, or compliance documentation, please contact our general counsel at <br/>
                <a href="mailto:hookin.help@gmail.com" className="text-gold hover:text-white font-medium mt-2 inline-block transition-colors">hookin.help@gmail.com</a>
              </p>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

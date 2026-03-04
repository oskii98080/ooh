import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Instagram, 
  Twitter,
  Send,
  LayoutDashboard, 
  Target, 
  Wallet, 
  Calendar, 
  TrendingUp, 
  Users, 
  PlayCircle, 
  Lock, 
  Mail, 
  ShieldCheck,
  Sparkles,
  Zap,
  X
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const StripeNotification = ({ type, onClose }: { type: 'success' | 'canceled', onClose: () => void }) => {
  const isSuccess = type === 'success';
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] p-4 rounded-2xl shadow-2xl flex items-center gap-4 border ${
        isSuccess ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
      } backdrop-blur-xl min-w-[320px]`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSuccess ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
        {isSuccess ? <Check size={20} /> : <X size={20} />}
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm">{isSuccess ? 'Payment Successful!' : 'Payment Canceled'}</p>
        <p className="text-xs opacity-70">{isSuccess ? 'Check your email for access instructions.' : 'No worries, you can try again anytime.'}</p>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
        <X size={16} />
      </button>
    </motion.div>
  );
};

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  fullWidth = false,
  loading = false,
  ...props 
}: any) => {
  const baseStyles = "px-8 py-4 rounded-full font-primary font-bold transition-all duration-300 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "shimmer-btn text-charcoal shadow-lg hover:shadow-gold/20 hover:-translate-y-1",
    secondary: "bg-gold text-charcoal hover:bg-gold/90 shadow-lg hover:-translate-y-1",
    outline: "border-2 border-gold text-gold hover:bg-gold hover:text-charcoal",
    ghost: "text-white hover:text-gold"
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      disabled={loading}
      className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
      ) : children}
    </motion.button>
  );
};

const SectionHeader = ({ title, subtitle, centered = true }: any) => (
  <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-white/70 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "80px" }}
      viewport={{ once: true }}
      className="h-[2px] bg-gold mx-auto mt-8"
    />
  </div>
);

const TestimonialCard = ({ name, handle, quote, impact, avatar, featured = false, className = "" }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`glass p-6 rounded-3xl border-gold/10 shadow-sm relative overflow-hidden flex flex-col ${featured ? 'md:col-span-2 lg:col-span-3 bg-white/10' : ''} ${className}`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-gold uppercase tracking-tighter bg-gold/5 px-2 py-0.5 rounded-full border border-gold/10">
        <ShieldCheck size={10} /> Verified Purchase
      </div>
    </div>
    <p className={`text-white italic mb-6 ${featured ? 'text-2xl leading-relaxed' : 'text-lg'}`}>"{quote}"</p>
    <div className="flex items-center gap-4 mt-auto">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold/20 shrink-0">
        <img src={avatar} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="font-bold text-white truncate">{name}</p>
          <Check size={14} className="text-gold bg-gold/20 rounded-full p-0.5 shrink-0" />
        </div>
        <p className="text-gold text-sm truncate">{handle}</p>
      </div>
      {impact && (
        <div className="bg-gold/10 px-3 py-1 rounded-full text-[10px] font-bold text-gold uppercase tracking-wider shrink-0">
          {impact}
        </div>
      )}
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gold/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-gold transition-colors text-white"
      >
        <span className="text-xl font-medium">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/70 text-lg leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [notification, setNotification] = useState<'success' | 'canceled' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasShownPopup = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) setNotification('success');
    if (params.get('canceled')) setNotification('canceled');

    // Clean up URL
    if (params.get('success') || params.get('canceled')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleStripeCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong with the payment process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0 && !hasShownPopup.current) {
        setShowExitPopup(true);
        hasShownPopup.current = true;
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {notification && (
          <StripeNotification type={notification} onClose={() => setNotification(null)} />
        )}
      </AnimatePresence>
      {/* Absolute Logo & Socials (Stays at top, scrolls away) */}
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none flex flex-col items-center py-8 gap-4">
        <div className="pointer-events-auto drop-shadow-lg">
          <img 
            src="https://res.cloudinary.com/dddvmez6s/image/upload/v1772666111/Image_04-03-2026_at_23.14_ptxgdx.jpg" 
            alt="lumorasocial" 
            className="h-24 md:h-40 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <a href="#" className="text-white/40 hover:text-gold transition-colors"><Twitter size={18} /></a>
          <a href="#" className="text-white/40 hover:text-gold transition-colors"><Instagram size={18} /></a>
          <a href="#" className="text-white/40 hover:text-gold transition-colors"><Send size={18} /></a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-56 pb-32 md:pt-80 md:pb-48 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12">
              <span className="text-3xl block mb-6">🔥</span>
              <p className="text-gold font-bold uppercase tracking-[0.2em] text-sm">Over 2,400 downloads</p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-primary leading-[1] mb-12 text-white">
              Total Financial <span className="italic text-gold">Clarity.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
              The exact Excel CRM system I use to track my finances, manage my goals, and organise every area of my life — now available for you.
            </p>
            
            <div className="flex flex-col items-center gap-10 mb-24">
              <div className="flex flex-col md:flex-row items-center gap-4 text-white/60">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?u=user${i}`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-charcoal object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-charcoal bg-gold flex items-center justify-center text-[10px] font-bold text-charcoal">
                    +2.4k
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
                  </div>
                  <span className="text-xs font-medium tracking-wide">Join 2,400+ high-performers tracking their life</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <Button 
                  variant="primary" 
                  className="!px-6 !py-3 !text-base md:!px-10 md:!py-5 md:!text-xl group shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_50px_rgba(201,168,76,0.5)] transition-all"
                  onClick={handleStripeCheckout}
                  loading={isLoading}
                >
                  YES I Want the System <ArrowRight className="group-hover:translate-x-2 transition-transform ml-2" />
                </Button>
                
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-gold" /> 30-Day Money Back</span>
                  <span className="flex items-center gap-1.5"><Lock size={12} className="text-gold" /> Secure SSL Checkout</span>
                  <span className="flex items-center gap-1.5"><Zap size={12} className="text-gold" /> Instant Access</span>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="relative z-10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/10 bg-charcoal">
                <img 
                  src="https://res.cloudinary.com/dddvmez6s/image/upload/v1772582468/Screenshot_2026-03-04_at_00.00.02_dods1d.png" 
                  alt="Lumora CRM Mockup" 
                  className="w-full max-h-[500px] object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative background glow */}
              <div className="absolute -inset-20 bg-gold/10 rounded-full blur-[150px] -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Marquee */}
      <div className="bg-charcoal py-6 overflow-hidden border-y border-gold/20">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-ivory/80 text-xl flex items-center gap-3">
                <Star size={16} className="fill-gold text-gold" /> "This changed how I see my money."
              </span>
              <span className="text-ivory/80 text-xl flex items-center gap-3">
                <Star size={16} className="fill-gold text-gold" /> "Finally something that actually works."
              </span>
              <span className="text-ivory/80 text-xl flex items-center gap-3">
                <Star size={16} className="fill-gold text-gold" /> "I paid off debt in 3 months using this."
              </span>
              <span className="text-ivory/80 text-xl flex items-center gap-3">
                <Star size={16} className="fill-gold text-gold" /> "Worth every penny."
              </span>
              <span className="text-ivory/80 text-xl flex items-center gap-3">
                <Star size={16} className="fill-gold text-gold" /> "My new financial bible 📖"
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-40 px-6 bg-charcoal/50 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-24">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-primary font-bold text-white mb-4">Real People. Real Results.</h2>
            <p className="text-white/50 text-sm max-w-2xl mx-auto italic">Join thousands of people who have already taken back control of their life and finances.</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Lane 1: Left to Right */}
          <div className="flex animate-marquee-reverse whitespace-nowrap gap-6 [--marquee-duration:15s] md:[--marquee-duration:30s]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { name: "Sarah M.", handle: "@sarahm_lifestyle", avatar: "https://picsum.photos/seed/sarah/100/100", quote: "I've tried every budgeting app and nothing stuck. This spreadsheet is the only thing that made me actually understand my money.", impact: "Saved £400" },
                  { name: "James R.", handle: "@james_fin", avatar: "https://picsum.photos/seed/james/100/100", quote: "Saved my life during tax season. The automation is incredible.", impact: "Tax Ready" },
                  { name: "Elena P.", handle: "@elena_design", avatar: "https://picsum.photos/seed/elena/100/100", quote: "The project tracker is a masterpiece. My workflow is finally smooth.", impact: "Productive" },
                  { name: "Marcus T.", handle: "@marcus_tech", avatar: "https://picsum.photos/seed/marcus/100/100", quote: "Finally, a CRM that doesn't require a PhD. Simple and effective.", impact: "User Friendly" },
                  { name: "Sophie L.", handle: "@sophie_biz", avatar: "https://picsum.photos/seed/sophie/100/100", quote: "I've shared this with my whole team. We're all more organized now.", impact: "Team Favorite" },
                  { name: "David K.", handle: "@david_goals", avatar: "https://picsum.photos/seed/david/100/100", quote: "The goal setting section is so motivating. I'm hitting targets early.", impact: "Goal Getter" },
                  { name: "Chloe W.", handle: "@chloe_smallbiz", avatar: "https://picsum.photos/seed/chloe/100/100", quote: "Best investment for my small business. Worth every penny.", impact: "Business Growth" },
                  { name: "Robert B.", handle: "@robert_pro", avatar: "https://picsum.photos/seed/robert/100/100", quote: "Intuitive, clean, and powerful. Exactly what I needed.", impact: "Pro Choice" },
                  { name: "Mia J.", handle: "@mia_organized", avatar: "https://picsum.photos/seed/mia/100/100", quote: "I feel so much more organized now. No more mental clutter.", impact: "Mental Clarity" },
                  { name: "Liam S.", handle: "@liam_data", avatar: "https://picsum.photos/seed/liam/100/100", quote: "The charts are beautiful and helpful. Data visualization at its best.", impact: "Data Driven" },
                ].map((t, idx) => (
                  <TestimonialCard key={idx} {...t} className="w-[280px] md:w-[400px] shrink-0" />
                ))}
              </div>
            ))}
          </div>

          {/* Lane 2: Right to Left */}
          <div className="flex animate-marquee whitespace-nowrap gap-6 [--marquee-duration:15s] md:[--marquee-duration:30s]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { name: "Tasha", handle: "@thriftytasha", avatar: "https://picsum.photos/seed/tasha/100/100", quote: "Paid off my credit card in 60 days after tracking everything properly for the first time.", impact: "Debt Free" },
                  { name: "Noah G.", handle: "@noah_growth", avatar: "https://picsum.photos/seed/noah/100/100", quote: "A must-have for anyone serious about growth. It's a game changer.", impact: "Growth Mindset" },
                  { name: "Ava H.", handle: "@ava_simple", avatar: "https://picsum.photos/seed/ava/100/100", quote: "Simple yet incredibly effective. I love the clean design.", impact: "Minimalist" },
                  { name: "Isabella F.", handle: "@isabella_budget", avatar: "https://picsum.photos/seed/isabella/100/100", quote: "I love the automated budget summaries. So much time saved.", impact: "Time Saver" },
                  { name: "William M.", handle: "@william_setup", avatar: "https://picsum.photos/seed/william/100/100", quote: "The setup was quick and painless. Up and running in no time.", impact: "Quick Start" },
                  { name: "Sophia E.", handle: "@sophia_assistant", avatar: "https://picsum.photos/seed/sophia/100/100", quote: "It's like having a personal assistant. Everything is tracked.", impact: "Organized" },
                  { name: "Benjamin D.", handle: "@ben_finance", avatar: "https://picsum.photos/seed/ben/100/100", quote: "Helped me identify where my money was leaking. Eye-opening.", impact: "Wealth Builder" },
                  { name: "Charlotte C.", handle: "@charlotte_contacts", avatar: "https://picsum.photos/seed/charlotte/100/100", quote: "The contact manager is a hidden gem. So useful for networking.", impact: "Networking" },
                  { name: "Lucas A.", handle: "@lucas_daily", avatar: "https://picsum.photos/seed/lucas/100/100", quote: "I use it every single day without fail. It's my daily hub.", impact: "Daily Routine" },
                  { name: "Amelia V.", handle: "@amelia_excel", avatar: "https://picsum.photos/seed/amelia/100/100", quote: "The best spreadsheet I've ever used. Period.", impact: "Excel Pro" },
                ].map((t, idx) => (
                  <TestimonialCard key={idx} {...t} className="w-[280px] md:w-[400px] shrink-0" />
                ))}
              </div>
            ))}
          </div>

          {/* Lane 3: Left to Right */}
          <div className="flex animate-marquee-reverse whitespace-nowrap gap-6 [--marquee-duration:15s] md:[--marquee-duration:30s]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { name: "Mindful Money", handle: "@mindfulmoneyuk", avatar: "https://picsum.photos/seed/money/100/100", quote: "It's not just for finances — I use the goal tracker section every single morning." },
                  { name: "Henry Z.", handle: "@henry_freelance", avatar: "https://picsum.photos/seed/henry/100/100", quote: "Highly recommend for freelancers. Keeps everything in order.", impact: "Freelance Life" },
                  { name: "Evelyn X.", handle: "@evelyn_progress", avatar: "https://picsum.photos/seed/evelyn/100/100", quote: "The progress bars are so satisfying. Makes tracking fun.", impact: "Satisfying" },
                  { name: "Jack Q.", handle: "@jack_workflow", avatar: "https://picsum.photos/seed/jack/100/100", quote: "Transformed my chaotic workflow into something manageable.", impact: "Workflow King" },
                  { name: "Grace Y.", handle: "@grace_support", avatar: "https://picsum.photos/seed/grace/100/100", quote: "The support and guide are top-notch. Very helpful.", impact: "Great Support" },
                  { name: "Leo W.", handle: "@leo_savings", avatar: "https://picsum.photos/seed/leo/100/100", quote: "I'm finally hitting my savings targets. This works.", impact: "Saver" },
                  { name: "Lily R.", handle: "@lily_prod", avatar: "https://picsum.photos/seed/lily/100/100", quote: "A game changer for my productivity. I get more done.", impact: "Productive" },
                  { name: "Daniel P.", handle: "@daniel_tools", avatar: "https://picsum.photos/seed/daniel/100/100", quote: "So much better than expensive SaaS tools. Simple is better.", impact: "Smart Choice" },
                  { name: "Zoey S.", handle: "@zoey_layout", avatar: "https://picsum.photos/seed/zoey/100/100", quote: "The layout is just perfect. Everything is where it should be.", impact: "Perfect Design" },
                  { name: "Samuel O.", handle: "@sam_control", avatar: "https://picsum.photos/seed/sam/100/100", quote: "I feel in total control for the first time. Thank you!", impact: "Empowered" },
                ].map((t, idx) => (
                  <TestimonialCard key={idx} {...t} className="w-[280px] md:w-[400px] shrink-0" />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Button variant="primary" className="!px-10 !py-4 !text-lg group shadow-[0_0_30px_rgba(201,168,76,0.2)] hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] transition-all">
            Join thousands already using the system <ArrowRight className="group-hover:translate-x-2 transition-transform ml-2" />
          </Button>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-40 px-6 relative overflow-hidden bg-charcoal/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-6">
                <Sparkles size={14} /> The Ultimate Productivity Tool
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-bold mb-8 leading-tight text-white">
                Master Your Workflow with <span className="italic text-gold text-glow">Lumora CRM</span>
              </h2>
              
              <div className="space-y-6 mb-12">
                {[
                  { icon: <LayoutDashboard className="text-gold" />, title: "Total Organization", desc: "Plan and manage up to 20 projects in one place, keeping every task and date well structured." },
                  { icon: <Zap className="text-gold" />, title: "Time Savings", desc: "Reduce the time you spend organizing and planning, allowing you to focus on executing your tasks." },
                  { icon: <TrendingUp className="text-gold" />, title: "Look Like a PRO", desc: "Designed in Excel, it’s intuitive and easy to use. Stand out professionally and execute like an expert. 🚀" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors border border-gold/5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-white/60 leading-relaxed text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="glass p-8 rounded-[2rem] border-gold/20 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -z-10 group-hover:bg-gold/10 transition-colors" />
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gold text-charcoal px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Launch Offer
                        </span>
                        <span className="text-white/40 text-xs font-medium">Limited time only</span>
                      </div>
                      <div className="flex items-end gap-3">
                        <span className="text-5xl font-primary font-bold text-white">£390</span>
                        <span className="text-xl text-white/30 line-through mb-1">£500</span>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="text-right">
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">One-Time Payment</p>
                        <p className="text-gold font-bold text-xs">Lifetime Access Included</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    fullWidth
                    className="!py-5 text-sm sm:text-lg md:text-xl whitespace-nowrap group"
                    onClick={handleStripeCheckout}
                    loading={isLoading}
                  >
                    GET INSTANT ACCESS <ArrowRight className="group-hover:translate-x-2 transition-transform ml-2 shrink-0" />
                  </Button>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Lock size={12} className="text-gold" /> Secure Checkout</span>
                  <span className="flex items-center gap-1.5"><Check size={12} className="text-gold" /> Lifetime Access</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-gold" /> 30-Day Guarantee</span>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                    Instant access delivered to your inbox immediately after purchase
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gold/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(201,168,76,0.15)] border border-white/10 bg-charcoal">
                <img 
                  src="https://res.cloudinary.com/dddvmez6s/image/upload/v1772583918/Screenshot_2026-03-04_at_00.25.11_ptvpa6.png" 
                  alt="Lumora CRM Dashboard" 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              
              {/* Floating Trust Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 glass p-5 rounded-2xl shadow-2xl z-20 border border-gold/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">2,400+ Users</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">Trust the system</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 glass p-4 rounded-2xl shadow-2xl z-20 border border-gold/20 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <ShieldCheck size={16} />
                </div>
                <p className="text-white font-bold text-xs">100% Risk-Free</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Everything You Get Inside */}
      <section className="py-40 px-6 bg-charcoal text-ivory relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="Everything You Get Inside" 
            subtitle="A complete system designed to take the stress out of your daily life. No fluff, just functionality."
          />
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold/20 px-6 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold font-bold text-xs uppercase tracking-widest">No Monthly Subscriptions · One-Time Payment</span>
            </div>
          </div>
          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible flex-nowrap md:flex-wrap snap-x snap-mandatory scrollbar-hide pb-4">
              {[
                { icon: <Wallet className="text-gold" />, title: "Finance Tracker", desc: "Log every transaction, see your spending patterns, and know exactly where your money goes each month." },
                { icon: <Calendar className="text-gold" />, title: "Monthly Budget Planner", desc: "Set income, fixed costs and variable spending in one clean, automated view." },
                { icon: <Target className="text-gold" />, title: "Goal Tracker", desc: "Track up to 10 savings goals simultaneously with visual progress bars and milestones." },
                { icon: <LayoutDashboard className="text-gold" />, title: "Bill & Subscription Manager", desc: "Never miss a payment again — see every bill, due date, and amount in one central hub." },
                { icon: <TrendingUp className="text-gold" />, title: "Net Worth Dashboard", desc: "Watch your wealth grow month by month with auto-calculated charts and insights." },
                { icon: <Check className="text-gold" />, title: "Weekly Check-In Template", desc: "A simple Sunday review ritual built into the system to keep you aligned." },
                { icon: <Users className="text-gold" />, title: "CRM Contact Tracker", desc: "Manage important personal or professional contacts with ease and structure." },
                { icon: <PlayCircle className="text-gold" />, title: "Setup Guide & Walkthrough", desc: "Step-by-step instructions so you're up and running in under 20 minutes." },
                { icon: <Star className="text-gold" />, title: "Lifetime Access", desc: "Every future version of the sheet, yours automatically. No subscriptions, ever." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass p-8 rounded-3xl border-white/5 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-1 min-w-[85vw] md:min-w-0 snap-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors border border-white/5 group-hover:border-gold/20">
                    {item.icon}
                  </div>
                  <h3 className="text-xl mb-3 font-primary font-bold text-white group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            {/* Mobile Arrows */}
            <div className="flex md:hidden justify-center gap-4 mt-4">
              <button className="p-2 rounded-full border border-gold/20 text-gold/50"><ArrowRight className="rotate-180" size={20} /></button>
              <button className="p-2 rounded-full border border-gold/20 text-gold/50"><ArrowRight size={20} /></button>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-white/5 text-center">
            <p className="text-xl font-primary font-medium italic mb-8 text-white/80">"Everything you need. Nothing you don't."</p>
            <div className="flex justify-center">
              <Button variant="primary" className="!px-10 !py-4 !text-base">
                Get the Full System <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-40 px-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-primary font-bold text-white mb-4">Up and Running in Under 30 Minutes</h2>
            <p className="text-white/50 text-sm max-w-2xl mx-auto">Three simple steps to total financial clarity. No complex setup required.</p>
          </div>
          
          <div className="relative">
            {/* Animated Connector Line (Desktop) */}
            <div className="absolute top-[60px] left-[15%] right-[15%] h-[2px] hidden md:block z-0">
              <div className="w-full h-full bg-gold/10 rounded-full" />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold/20 via-gold/60 to-gold/20 rounded-full"
              />
            </div>
            
            <div className="flex md:grid md:grid-cols-3 gap-8 lg:gap-12 relative overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4">
              {[
                { step: "01", title: "Purchase & Download", desc: "Complete your one-time purchase and instantly receive your download link via email. Works on Excel and Google Sheets." },
                { step: "02", title: "Set It Up", desc: "Follow the included setup guide or watch the short walkthrough video. Plug in your income, your bills, and your goals. Done." },
                { step: "03", title: "Take Control", desc: "Check in weekly, watch the dashboards update automatically, and finally feel what it's like to be completely on top of your money." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
                  className="relative z-10 group min-w-[85vw] md:min-w-0 snap-center"
                >
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl bg-charcoal border-2 border-gold/30 flex items-center justify-center mb-8 group-hover:border-gold transition-all duration-500 shadow-[0_0_20px_rgba(201,168,76,0.1)] group-hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors" />
                      <span className="text-2xl font-primary font-bold text-gold relative z-10">{item.step}</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="glass p-8 rounded-[2rem] border-white/5 group-hover:border-gold/20 transition-all duration-500 bg-white/[0.02] shadow-xl group-hover:shadow-gold/5"
                    >
                      <h3 className="text-xl font-primary font-bold mb-4 text-white group-hover:text-gold transition-colors">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed text-xs">{item.desc}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Mobile Arrows */}
            <div className="flex md:hidden justify-center gap-4 mt-4">
              <button className="p-2 rounded-full border border-gold/20 text-gold/50"><ArrowRight className="rotate-180" size={20} /></button>
              <button className="p-2 rounded-full border border-gold/20 text-gold/50"><ArrowRight size={20} /></button>
            </div>
          </div>

          <div className="mt-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex justify-center"
            >
              <Button variant="primary" className="!px-10 !py-4 !text-base shadow-gold/20 shadow-lg hover:shadow-gold/40 transition-shadow">
                Start My Journey Today <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-40 px-6 bg-charcoal/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-primary font-bold text-white mb-4">Questions? We've Got You.</h2>
            <p className="text-white/50 text-sm">Everything you need to know about the Lumora System.</p>
          </div>
          <div className="space-y-4 glass p-8 rounded-[2.5rem] border-white/5">
            <FAQItem 
              question="What format does the spreadsheet come in?" 
              answer="It's delivered as an .xlsx file, compatible with Microsoft Excel (PC and Mac) and Google Sheets. No special software required."
            />
            <FAQItem 
              question="Do I need to know Excel to use this?" 
              answer="Not at all. Everything is pre-built and labelled — you just fill in your numbers. A setup guide is included for complete beginners."
            />
            <FAQItem 
              question="Is this a monthly subscription?" 
              answer="No. It's a one-time payment of £390. You own it forever, including all future updates."
            />
            <FAQItem 
              question="How do I receive the product?" 
              answer="Immediately after purchase, you'll receive an email with your download link. You'll have access within minutes."
            />
            <FAQItem 
              question="What if it doesn't work for me?" 
              answer="We offer a 30-day money-back guarantee, no questions asked. If you set it up and it's not for you, email us and we'll refund in full."
            />
            <FAQItem 
              question="Will this work with Google Sheets?" 
              answer="Yes — while designed for Excel, it's fully compatible with Google Sheets. Minor formatting differences may apply."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-charcoal rounded-[3rem] p-12 md:p-20 text-center text-ivory relative overflow-hidden border border-gold/10"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-primary font-bold mb-6 leading-tight text-white">
              You're One Download Away from <span className="italic text-gold">Total Financial Clarity.</span>
            </h2>
            <p className="text-lg md:text-xl text-ivory/70 mb-10 max-w-2xl mx-auto">
              Join 2,400+ people who finally feel in control of their money. One-time payment. Instant access. No subscriptions.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-6">
                <span className="text-3xl md:text-5xl font-primary font-bold text-white">£390</span>
                <span className="text-xl text-ivory/30 line-through">£500</span>
              </div>
              <Button 
                variant="primary" 
                className="!px-6 !py-3 !text-base md:!px-10 md:!py-5 md:!text-xl"
                onClick={handleStripeCheckout}
                loading={isLoading}
              >
                Yes I'm Ready to Take Control »
              </Button>
              <div className="flex flex-wrap justify-center gap-6 mt-4 text-ivory/50 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2"><Lock size={14} /> Secure Checkout</span>
                <span className="flex items-center gap-2"><Mail size={14} /> Instant Email Delivery</span>
                <span className="flex items-center gap-2"><ShieldCheck size={14} /> 30-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-gold/10 bg-charcoal/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <div>
                <img 
                  src="https://res.cloudinary.com/dddvmez6s/image/upload/v1772666111/Image_04-03-2026_at_23.14_ptxgdx.jpg" 
                  alt="lumorasocial" 
                  className="h-20 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Empowering high-performers to take total control of their life and finances through elegant, automated systems.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/20 transition-colors border border-white/5">
                  <Instagram size={18} className="text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/20 transition-colors border border-white/5">
                  <Twitter size={18} className="text-white" />
                </a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-gold transition-colors">Lumora CRM</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Setup Guide</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Video Walkthrough</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Lifetime Updates</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Stay Updated</h4>
              <p className="text-white/50 text-sm mb-6">Join 5,000+ subscribers for productivity tips and system updates.</p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-gold/50 transition-colors text-white"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white hover:bg-gold/80 transition-colors">
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <p>© 2025 Lumora Social</p>
              <p>Built for High-Performers</p>
            </div>
            <p>Digital Product · Instant Delivery</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA removed as requested */}

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitPopup(false)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-charcoal p-10 rounded-[2rem] shadow-2xl max-w-lg w-full text-center border-2 border-gold/20"
            >
              <button 
                onClick={() => setShowExitPopup(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white"
              >
                <X />
              </button>
              <h3 className="text-4xl font-primary font-bold mb-4 text-white">Wait — Before You Go!</h3>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Your special launch price of <span className="text-gold font-bold">£390</span> is locked for today only. Don't miss out on taking back control of your life.
              </p>
              <Button variant="primary" fullWidth onClick={() => setShowExitPopup(false)}>
                Claim My Discount Now <ArrowRight />
              </Button>
              <p className="mt-4 text-sm text-white/40">30-Day Money Back Guarantee Included</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import zdj from "./assets/images/zdj.jpg";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  Compass,
  Sparkles,
  HeartPulse,
  Dumbbell,
  ShieldCheck,
  Lock,
  Activity,
  ZapOff,
  BatteryLow,
  ShieldAlert,
  Flame,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Shield,
  Award,
  FlaskConical,
  Truck,
  RotateCcw,
  Mail,
  X,
  Menu,
  Percent,
  Copy,
  Clock,
  ArrowUpRight,
  LockKeyhole
} from "lucide-react";

import {
  problemCards,
  ingredientList,
  benefitsList,
  timelineSteps,
  statsList,
  testimonialsList,
  faqsList
} from "./data";
import ShopifyBuyButton from "./components/ShopifyBuyButton";

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState("benefits");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive FAQ state
  const [openFaq, setOpenFaq] = useState<string | null>("q1");

  // Age chart interactive state
  const [selectedAge, setSelectedAge] = useState<number>(50);

  // Conversion popups states
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [popupEmail, setPopupEmail] = useState("");
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Sticky Buy Bar scroll state
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Countdown timer (15m 00s)
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins in seconds

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 900)); // loop timer for conversion continuity
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Sticky header & sticky buy bar handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Exit intent popup handler
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if user moves mouse out of top of screen (exit intent)
      if (e.clientY < 50) {
        const hasSeenPopup = localStorage.getItem("exit_popup_seen");
        if (!hasSeenPopup) {
          setShowExitPopup(true);
          localStorage.setItem("exit_popup_seen", "true");
        }
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Also trigger welcome popup after 12 seconds
    const welcomeTimer = setTimeout(() => {
      const hasSeenWelcome = localStorage.getItem("welcome_popup_seen");
      if (!hasSeenWelcome) {
        setShowWelcomePopup(true);
        localStorage.setItem("welcome_popup_seen", "true");
      }
    }, 12000);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(welcomeTimer);
    };
  }, []);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Copy coupon helper
  const copyCoupon = () => {
    navigator.clipboard.writeText("CELLULAR15");
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2000);
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (popupEmail.trim()) {
      setPopupSubmitted(true);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSubmitted(false), 6000);
    }
  };

  // Get dynamic NAD percentage based on selected age
  const getNadPercentage = (age: number) => {
    if (age <= 20) return 100;
    if (age >= 80) return 15;
    // Linear interpolation between key points
    // 20 -> 100%
    // 50 -> 50%
    // 80 -> 15%
    if (age < 50) {
      const ratio = (age - 20) / 30;
      return Math.round(100 - ratio * 50);
    } else {
      const ratio = (age - 50) / 30;
      return Math.round(50 - ratio * 35);
    }
  };

  // Icon mapping helper
  const renderIcon = (name: string, className = "w-6 h-6 text-[#6FAF32]") => {
    switch (name) {
      case "Zap": return <Zap className={className} />;
      case "Compass": return <Compass className={className} />;
      case "Sparkles": return <Sparkles className={className} />;
      case "HeartPulse": return <HeartPulse className={className} />;
      case "Dumbbell": return <Dumbbell className={className} />;
      case "ShieldCheck": return <ShieldCheck className={className} />;
      case "Lock": return <Lock className={className} />;
      case "Activity": return <Activity className={className} />;
      case "ZapOff": return <ZapOff className={className} />;
      case "BatteryLow": return <BatteryLow className={className} />;
      case "ShieldAlert": return <ShieldAlert className={className} />;
      case "FlameKindling": return <Flame className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-neutral-900 font-sans selection:bg-[#6FAF32]/20 selection:text-[#2F5D1E]">
      
      {/* Dynamic Urgency Top Banner */}
      <div className="bg-gradient-to-r from-[#2F5D1E] via-[#417F29] to-[#2F5D1E] text-white py-2 px-4 text-xs md:text-sm text-center font-medium flex items-center justify-center gap-2 relative z-50">
        <Percent className="w-4 h-4 text-[#6FAF32] animate-bounce" />
        <span>FLASH SALE: Special Promo price $99.99 (Originally $130) is valid only for today! Ends in</span>
        <span className="font-mono bg-black/30 px-2 py-0.5 rounded font-bold text-[#6FAF32] flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 inline" /> {formatTime(timeLeft)}
        </span>
      </div>

      {/* Main Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-[#F7F8F5]/90 backdrop-blur-md border-b border-neutral-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-8 h-8 bg-[#2F5D1E] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
            </div>
            <div>
              <span className="font-display font-bold tracking-tight text-xl text-[#2F5D1E] leading-none block">AETHERIS</span>
              <span className="block text-[8px] uppercase tracking-widest font-mono text-neutral-500 font-bold mt-1">CELLULAR REGENERATION</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToId("benefits")} className="text-sm font-medium text-neutral-600 hover:text-[#2F5D1E] transition-colors">Benefits</button>
            <button onClick={() => scrollToId("problem")} className="text-sm font-medium text-neutral-600 hover:text-[#2F5D1E] transition-colors">The Problem</button>
            <button onClick={() => scrollToId("ingredients")} className="text-sm font-medium text-neutral-600 hover:text-[#2F5D1E] transition-colors">Ingredients</button>
            <button onClick={() => scrollToId("technology")} className="text-sm font-medium text-neutral-600 hover:text-[#2F5D1E] transition-colors">absorption Science</button>
            <button onClick={() => scrollToId("testimonials")} className="text-sm font-medium text-neutral-600 hover:text-[#2F5D1E] transition-colors">Reviews</button>
            <button onClick={() => scrollToId("faq")} className="text-sm font-medium text-neutral-600 hover:text-[#2F5D1E] transition-colors">FAQ</button>
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">GMP Standard Certified</span>
              <span className="text-xs text-[#2F5D1E] font-medium flex items-center gap-1 justify-end">
                <Check className="w-3.5 h-3.5" /> Made in the USA
              </span>
            </div>
            <button
              onClick={() => scrollToId("purchase")}
              className="px-6 py-2.5 rounded-full bg-[#2F5D1E] text-white hover:bg-[#6FAF32] font-semibold text-sm transition-all duration-300 shadow-md shadow-[#2F5D1E]/10 flex items-center gap-2"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-[#2F5D1E] focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#F7F8F5] border-b border-neutral-200"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col">
                <button onClick={() => scrollToId("benefits")} className="text-left py-2 font-medium text-neutral-700">Benefits</button>
                <button onClick={() => scrollToId("problem")} className="text-left py-2 font-medium text-neutral-700">The Problem</button>
                <button onClick={() => scrollToId("ingredients")} className="text-left py-2 font-medium text-neutral-700">Ingredients</button>
                <button onClick={() => scrollToId("technology")} className="text-left py-2 font-medium text-neutral-700">absorption Science</button>
                <button onClick={() => scrollToId("testimonials")} className="text-left py-2 font-medium text-neutral-700">Reviews</button>
                <button onClick={() => scrollToId("faq")} className="text-left py-2 font-medium text-neutral-700">FAQ</button>
                <button
                  onClick={() => scrollToId("purchase")}
                  className="w-full text-center py-3 rounded-full bg-[#2F5D1E] text-white font-semibold text-sm shadow-md"
                >
                  Order Liposomal Complex
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sticky Bottom Buy Drawer */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 py-3.5 px-4 shadow-xl shadow-black/20"
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                src={zdj}
                alt="Aetheris Supplement Bottle"
                className="w-10 h-10 object-cover rounded bg-neutral-100"
                referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#2F5D1E] line-clamp-1">NAD+ & Resveratrol Liposomal Complex</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#6FAF32]/10 text-[#2F5D1E] font-semibold px-2 py-0.5 rounded-full">1200mg Dosage</span>
                    <span className="text-xs text-neutral-500">★ 4.9 (1,500+ reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                <div className="text-right">
                  <span className="text-xs text-neutral-400 line-through block">$130.00</span>
                  <span className="text-lg font-extrabold text-[#2F5D1E]">$99.99</span>
                </div>
                <button
                  onClick={() => scrollToId("purchase")}
                  className="bg-[#6FAF32] hover:bg-[#2F5D1E] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-sm whitespace-nowrap shadow-lg shadow-[#6FAF32]/20 flex items-center gap-2"
                >
                  Order Today <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32">
        {/* Subtle Background Glows */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#6FAF32] opacity-[0.08] blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] bg-[#2F5D1E] opacity-[0.05] blur-[80px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Side */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Premium Floating Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 border border-[#6FAF32]/20 px-3.5 py-1.5 rounded-full w-fit shadow-sm">
                <span className="w-2 h-2 bg-[#6FAF32] rounded-full animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#2F5D1E] font-display">THE GOLD STANDARD OF MITOCHONDRIAL RESTORATION</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-bold text-[#141414] leading-[1.05] tracking-tight">
                Unlock Cellular <br className="hidden sm:inline" />
                <span className="text-[#6FAF32]">Youth</span> & Peak Energy
              </h1>

              {/* Subheadline */}
              <p className="text-neutral-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Advanced Liposomal NAD+ + Resveratrol Formula engineered for <strong>maximum absorption</strong>, clean energy, mental clarity, and healthy biological aging. Experience cognitive precision and physiological vitality from the mitochondria up.
              </p>

              {/* Actions & Urgency */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => scrollToId("purchase")}
                  className="w-full sm:w-auto bg-[#6FAF32] text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg shadow-[#6FAF32]/25 hover:scale-105 hover:bg-[#2F5D1E] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Buy It Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToId("technology")}
                  className="w-full sm:w-auto bg-white border border-neutral-200 text-[#2F5D1E] px-8 py-4 rounded-full text-lg font-semibold hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Learn Science
                </button>
              </div>

              {/* Natural Tones Grid Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-4 border-t border-neutral-200/50">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#2F5D1E]">10X</span>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Bioavailability</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#2F5D1E]">97%</span>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Satisfaction</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#2F5D1E]">1200mg</span>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Active Potency</span>
                </div>
              </div>

              {/* Urgency and secure indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-xs text-neutral-500 font-medium">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#6FAF32] text-[#6FAF32]" />
                  <Star className="w-4 h-4 fill-[#6FAF32] text-[#6FAF32]" />
                  <Star className="w-4 h-4 fill-[#6FAF32] text-[#6FAF32]" />
                  <Star className="w-4 h-4 fill-[#6FAF32] text-[#6FAF32]" />
                  <Star className="w-4 h-4 fill-[#6FAF32] text-[#6FAF32]" />
                  <span className="ml-1 text-neutral-800 font-bold">4.9/5 Rating</span>
                </div>
                <span className="hidden sm:inline text-neutral-300">|</span>
                <span>✓ Purity Certified Formula</span>
              </div>
            </div>

            {/* Hero Image / Bottle Mockup Side */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              
              {/* Floating Stat Bubble from Design */}
              <div className="absolute -right-4 top-12 bg-white p-4 rounded-2xl shadow-xl border border-neutral-100 flex items-center gap-3 z-10 hidden sm:flex">
                <div className="w-10 h-10 rounded-full bg-[#EBF4E5] flex items-center justify-center shrink-0">
                  <span className="text-[#6FAF32] text-xl font-bold">★</span>
                </div>
                <div>
                  <p className="text-xs font-bold leading-none text-neutral-900">4.9/5</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Trustpilot Score</p>
                </div>
              </div>

              {/* Floating Key Benefit Badge from Design */}
              <div className="absolute -left-4 bottom-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 z-10 hidden sm:block">
                <div className="text-[10px] font-bold text-[#6FAF32] uppercase tracking-widest mb-1 font-mono">Key Benefit</div>
                <p className="text-sm font-bold text-neutral-800">Reverses DNA Fatigue</p>
              </div>

              {/* Main Glowing Card container */}
              <div className="relative w-full max-w-sm rounded-3xl p-4 bg-gradient-to-b from-white to-[#F0F2EE] border border-neutral-200/80 shadow-2xl overflow-hidden group">
                {/* Internal gradient pulsing */}
                <div className="absolute inset-0 bg-[#6FAF32]/5 opacity-35 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
                
                {/* Floating supplement bottle image */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="relative aspect-3/4 rounded-2xl overflow-hidden border border-neutral-200/50 shadow-inner"
                >
                  <img
                    src={zdj}
                    alt="Aetheris Premium Supplement Bottle Mockup"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Info Overlay Panel */}
                <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center justify-between text-neutral-700">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 font-bold block">FORMULATION</span>
                    <span className="text-sm font-bold text-[#2F5D1E]">NAD+ + TRANS-RESVERATROL</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#6FAF32]/10 text-[#2F5D1E] px-2.5 py-1 rounded">
                    1200mg / Serving
                  </span>
                </div>
              </div>

              {/* Interactive micro-badge for formula highlight */}
              <div className="mt-6 flex items-center gap-2 bg-[#6FAF32]/10 px-4 py-2 rounded-full border border-[#6FAF32]/25 text-xs font-bold text-[#2F5D1E]">
                <FlaskConical className="w-4 h-4 text-[#2F5D1E]" /> Bypasses digestion with lipid liposome delivery.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Divider Banner from Natural Tones */}
      <section className="bg-white border-y border-neutral-100 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-[#6FAF32] flex items-center justify-center shrink-0">
                <span className="text-[#6FAF32] text-xs font-bold">✓</span>
              </div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Non-GMO Formula</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-[#6FAF32] flex items-center justify-center shrink-0">
                <span className="text-[#6FAF32] text-xs font-bold">✓</span>
              </div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">100% Vegan</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-[#6FAF32] flex items-center justify-center shrink-0">
                <span className="text-[#6FAF32] text-xs font-bold">✓</span>
              </div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Gluten-Free</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-[#F7F8F5] rounded-xl border border-neutral-100 flex flex-col items-center min-w-[120px]">
              <span className="text-[9px] uppercase text-neutral-400 font-bold">Ships Today</span>
              <span className="text-xs font-bold text-neutral-800">Free Shipping</span>
            </div>
            <div className="px-4 py-2 bg-[#F7F8F5] rounded-xl border border-neutral-100 flex flex-col items-center min-w-[120px]">
              <span className="text-[9px] uppercase text-neutral-400 font-bold">Hassle-Free</span>
              <span className="text-xs font-bold text-neutral-800">Easy Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">The Biological Reality</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2F5D1E] tracking-tight">
              Why Do We Feel Older Every Year?
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg">
              As we cross our 20s, cellular energy metabolism undergoes a quiet deceleration. The primary cause is the rapid depletion of a critical cellular engine oil: NAD+.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Problem Cards Grid */}
            <div className="lg:col-span-7 space-y-5">
              {problemCards.map((card) => (
                <div
                  key={card.id}
                  className="flex gap-4 p-5 rounded-2xl bg-[#F7F8F5] border border-neutral-200/40 hover:border-[#6FAF32]/30 transition-all duration-300 hover:shadow-xs group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-neutral-200/60 group-hover:bg-[#2F5D1E]/5 transition-colors shrink-0">
                    {renderIcon(card.iconName, "w-6 h-6 text-neutral-500 group-hover:text-[#6FAF32] transition-colors")}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-neutral-900 group-hover:text-[#2F5D1E] transition-colors">{card.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side: Interactive Scientific NAD+ decline chart */}
            <div className="lg:col-span-5 bg-[#F7F8F5] rounded-3xl p-6 border border-neutral-200/80 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-bold block">Scientific Visualization</span>
                <h4 className="text-lg font-bold text-[#2F5D1E]">The Natural Decline of NAD+ Levels</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  By age 50, your body has lost nearly 50% of its youthful NAD+ capacity, leading to mitochondrial fatigue and age-associated issues.
                </p>
              </div>

              {/* Beautiful Interactive SVG Graph */}
              <div className="relative pt-6">
                <div className="absolute top-2 right-2 bg-white/90 border border-neutral-200 px-2 py-1 rounded text-[10px] font-mono font-bold text-neutral-500">
                  NAD+ Level: {getNadPercentage(selectedAge)}%
                </div>
                
                <svg viewBox="0 0 400 200" className="w-full h-48 overflow-visible">
                  {/* Grid Lines */}
                  <line x1="10" y1="180" x2="390" y2="180" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="10" y1="100" x2="390" y2="100" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="10" y1="20" x2="390" y2="20" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="3,3" />

                  {/* NAD Level Curve Area */}
                  <path
                    d="M 10 20 Q 150 50, 200 100 T 390 170"
                    fill="none"
                    stroke="#D4DBCE"
                    strokeWidth="3"
                  />

                  {/* Active Gradient Line representing NAD loss */}
                  <path
                    d="M 10 20 Q 150 50, 200 100 T 390 170"
                    fill="none"
                    stroke="url(#greenGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Shading area beneath the curve */}
                  <path
                    d="M 10 20 Q 150 50, 200 100 T 390 170 L 390 180 L 10 180 Z"
                    fill="url(#greenGlowArea)"
                    opacity="0.15"
                  />

                  {/* Slider interaction horizontal track */}
                  <line
                    x1={10 + ((selectedAge - 20) / 60) * 380}
                    y1="10"
                    x2={10 + ((selectedAge - 20) / 60) * 380}
                    y2="180"
                    stroke="#6FAF32"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />

                  {/* Active Node point */}
                  <circle
                    cx={10 + ((selectedAge - 20) / 60) * 380}
                    cy={20 + (1 - getNadPercentage(selectedAge)/100) * 150}
                    r="8"
                    fill="#2F5D1E"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="animate-pulse"
                  />

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6FAF32" />
                      <stop offset="50%" stopColor="#417F29" />
                      <stop offset="100%" stopColor="#E11D48" /> {/* turn red at extreme age */}
                    </linearGradient>
                    <linearGradient id="greenGlowArea" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6FAF32" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* X Axis Labels */}
                  <text x="10" y="195" fill="#888888" fontSize="10" fontFamily="monospace">Age 20 (Peak)</text>
                  <text x="190" y="195" fill="#888888" fontSize="10" fontFamily="monospace" textAnchor="middle">Age 50 (-50%)</text>
                  <text x="390" y="195" fill="#888888" fontSize="10" fontFamily="monospace" textAnchor="end">Age 80 (-85%)</text>
                </svg>
              </div>

              {/* Age Slider Input */}
              <div className="space-y-2 pt-2 bg-white rounded-2xl p-4 border border-neutral-200/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-neutral-600">Select Age to view levels:</span>
                  <span className="font-mono text-[#2F5D1E] font-extrabold text-sm">{selectedAge} Years Old</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(parseInt(e.target.value))}
                  className="w-full accent-[#6FAF32] cursor-pointer h-1.5 bg-neutral-200 rounded-lg appearance-none"
                />
                <p className="text-[11px] text-neutral-400 text-center italic">
                  *Drag the bar to see how cell vitality declines naturally.
                </p>
              </div>

              <div className="bg-[#2F5D1E] text-white p-4 rounded-2xl space-y-2">
                <div className="flex gap-2 items-center">
                  <span className="px-2 py-0.5 bg-[#6FAF32] text-xs font-bold rounded">Target</span>
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">The Restorative Mission</span>
                </div>
                <p className="text-xs leading-relaxed text-neutral-200">
                  By supplying raw Liposomal NAD+ directly to cell structures, you offset this biological decline, promoting mitochondrial output back toward youthful baselines.
                </p>
              </div>
            </div>

          </div>

          {/* Quick inline conversion trigger */}
          <div className="mt-16 text-center">
            <button
              onClick={() => scrollToId("purchase")}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2F5D1E] hover:text-[#6FAF32] border-b border-[#2F5D1E] hover:border-[#6FAF32] pb-1 transition-all duration-300 group"
            >
              Don't let your cells decline. Restore them now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* Solution Section */}
      <section id="ingredients" className="py-24 bg-radial-glow relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">The Advanced Formulation</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2F5D1E] tracking-tight">
              Restore Your Cells From Within
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg">
              Unlike generic single-capsule products, Aetheris Liposomal Complex contains a synchronized blueprint of premium coenzymes and adaptogens.
            </p>
          </div>

          {/* Scrolling Ingredient Animation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ingredientList.map((ing, idx) => (
              <motion.div
                key={ing.id}
                whileHover={{ y: -6 }}
                className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden group"
              >
                {/* Visual subtle card pattern */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#6FAF32]/5 rounded-bl-3xl group-hover:bg-[#6FAF32]/10 transition-colors" />
                
                <div className="space-y-4">
                  <span className="inline-block text-[10px] uppercase font-mono tracking-wider text-[#6FAF32] font-extrabold bg-[#6FAF32]/10 px-2.5 py-1 rounded">
                    {ing.tag}
                  </span>
                  
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold text-[#2F5D1E]">{ing.name}</h3>
                    <span className="text-sm font-mono text-neutral-400 font-bold block">{ing.dosage} per serving</span>
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {ing.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-bold block">CLINICAL SUPPORT</span>
                  <p className="text-[11px] text-[#2F5D1E] leading-relaxed italic">
                    "{ing.scientificBenefit}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Science-backed Formulation Highlight Banner */}
          <div className="mt-12 bg-[#2F5D1E] text-white rounded-3xl p-6 sm:p-8 border border-[#2F5D1E]/80 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#6FAF32] font-bold block">Mitochondrial Synergy</span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">The NAD+ + Trans-Resveratrol Synergy</h3>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                NAD+ acts as the fuel, while Trans-Resveratrol acts as the accelerator pedal. Trans-Resveratrol activates the sirtuin genes, which then consume the provided NAD+ to perform cellular maintenance and DNA recovery. Neither is fully effective without the other.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <button
                onClick={() => scrollToId("purchase")}
                className="bg-[#6FAF32] hover:bg-white hover:text-[#2F5D1E] text-white px-6 py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-md flex items-center gap-2"
              >
                Experience This Synergy <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Liposomal Technology Section */}
      <section id="technology" className="py-24 bg-[#111A0C] text-white relative overflow-hidden border-y border-[#2F5D1E]/40">
        <div className="absolute inset-0 bg-radial-glow-dark opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">Bioavailability Breakthrough</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              10X Better Absorption via Liposomes
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Generic capsule dietary supplements are instantly degraded by stomach acids. Liposomal delivery encapsulates molecules in phospholipid spheres, delivering nutrients straight to your cellular membranes intact.
            </p>
          </div>

          {/* Interactive Flow / Comparative diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Left: Traditional Delivery Card */}
            <div className="bg-black/40 rounded-3xl p-8 border border-neutral-800 flex flex-col justify-between space-y-8">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-950/25 border border-red-900/30 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Traditional Capsule Path</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Stomach acid and digestive pathways actively disassemble traditional dry powder capsules before they ever arrive at the intestine.
                </p>
              </div>

              {/* Step comparative flow */}
              <div className="space-y-4 py-4 border-t border-neutral-800">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-950 border border-red-900 flex items-center justify-center text-xs text-red-400 font-bold">1</span>
                  <span className="text-xs text-neutral-300 font-medium">Stomach acid degrades capsule integrity</span>
                </div>
                <div className="h-4 border-l border-red-900/40 ml-3" />
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-950 border border-red-900 flex items-center justify-center text-xs text-red-400 font-bold">2</span>
                  <span className="text-xs text-neutral-300 font-medium">Over 85% of active ingredients destroyed</span>
                </div>
                <div className="h-4 border-l border-red-900/40 ml-3" />
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-950 border border-red-900 flex items-center justify-center text-xs text-red-400 font-bold">3</span>
                  <span className="text-xs text-neutral-400 italic">Minimal cellular uptake, high waste</span>
                </div>
              </div>

              <div className="bg-red-950/25 border border-red-900/20 rounded-2xl p-4 text-center">
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-red-400 block">EXPECTED ABSORPTION</span>
                <span className="text-2xl font-extrabold text-red-400">~ 10% - 15%</span>
              </div>
            </div>

            {/* Right: Premium Liposomal Delivery Card */}
            <div className="bg-[#1C2A15] rounded-3xl p-8 border border-[#3E6C28]/30 flex flex-col justify-between space-y-8 relative">
              <div className="absolute top-4 right-4 bg-[#6FAF32] text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                Bio-Engineered
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#6FAF32]/10 border border-[#6FAF32]/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#6FAF32]" />
                </div>
                <h3 className="text-xl font-bold text-[#6FAF32]">Liposomal Complex Pathway</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Molecules are encapsulated inside phospholipid liposome coatings (structurally identical to our cells' own membranes), allowing easy passage into cells.
                </p>
              </div>

              {/* Step comparative flow */}
              <div className="space-y-4 py-4 border-t border-[#3E6C28]/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#2F5D1E] border border-[#6FAF32] flex items-center justify-center text-xs text-[#6FAF32] font-bold">1</span>
                  <span className="text-xs text-neutral-200 font-medium">Bypasses gastric acids fully shielded</span>
                </div>
                <div className="h-4 border-l border-[#6FAF32]/40 ml-3" />
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#2F5D1E] border border-[#6FAF32] flex items-center justify-center text-xs text-[#6FAF32] font-bold">2</span>
                  <span className="text-xs text-neutral-200 font-medium">Fuses seamlessly with cell membranes</span>
                </div>
                <div className="h-4 border-l border-[#6FAF32]/40 ml-3" />
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#2F5D1E] border border-[#6FAF32] flex items-center justify-center text-xs text-[#6FAF32] font-bold">3</span>
                  <span className="text-xs text-[#6FAF32] font-bold">Releases active nutrients directly inside</span>
                </div>
              </div>

              <div className="bg-[#6FAF32]/15 border border-[#6FAF32]/30 rounded-2xl p-4 text-center">
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-[#6FAF32] block">EXPECTED ABSORPTION</span>
                <span className="text-2xl font-extrabold text-[#6FAF32]">Up to 98%</span>
              </div>
            </div>

          </div>

          {/* Interactive Infographic - Molecular Animation */}
          <div className="mt-16 bg-white/5 rounded-3xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <span className="text-xs text-[#6FAF32] font-mono uppercase tracking-wider block">Bio-Mimetic Bilayer Structure</span>
              <h4 className="text-lg font-bold text-white">How Cellular Merging Works</h4>
              <p className="text-xs text-neutral-400 max-w-xl">
                Because liposome shells are constructed from sunflower phosphatidylcholine lipids, your intestinal cells recognize them as natural cellular membranes, pulling them inside actively. No digestive friction, zero biological waste.
              </p>
            </div>
            
            {/* Visual simulation using CSS spheres */}
            <div className="flex items-center justify-center gap-4 shrink-0">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-[#6FAF32] animate-spin duration-10000" />
                <div className="w-12 h-12 rounded-full bg-[#2F5D1E]/40 border-2 border-[#6FAF32] flex items-center justify-center">
                  <span className="text-[10px] font-mono text-[#6FAF32]">NAD+</span>
                </div>
              </div>
              <span className="text-neutral-400">→</span>
              <div className="w-20 bg-[#6FAF32]/10 border border-[#6FAF32]/20 rounded-full py-1 text-center text-[10px] text-[#6FAF32] font-bold">
                Cell Fusion
              </div>
              <span className="text-neutral-400">→</span>
              <div className="w-10 h-10 rounded-full bg-[#6FAF32] flex items-center justify-center text-black font-extrabold text-xs">
                98%
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-[#F7F8F5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">The Cellular Advantage</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2F5D1E] tracking-tight">
              Clinically-Backed Systemic Benefits
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg">
              Regular replenishment of cell coenzymes generates systemic physiological momentum across key physical benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsList.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-[#6FAF32]/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#6FAF32]/10 flex items-center justify-center group-hover:bg-[#2F5D1E] transition-colors duration-300">
                    {renderIcon(benefit.iconName, "w-5.5 h-5.5 text-[#2F5D1E] group-hover:text-white transition-colors")}
                  </div>
                  <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-[#2F5D1E] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1 group-hover:text-[#6FAF32] transition-colors">
                  <span>Sirtuin activated</span> • <span>Non-GMO</span>
                </div>
              </div>
            ))}
          </div>

          {/* Value comparison table */}
          <div className="mt-20 bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 overflow-x-auto">
            <h4 className="text-lg font-bold text-[#2F5D1E] mb-6 text-center">How Aetheris Compares</h4>
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-neutral-200 text-xs font-mono uppercase tracking-wider text-neutral-400">
                  <th className="py-4">Feature Metric</th>
                  <th className="py-4 text-[#2F5D1E] font-bold">Aetheris Liposomal</th>
                  <th className="py-4">Standard Capsules</th>
                  <th className="py-4">Sublingual Tablets</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm divide-y divide-neutral-150">
                <tr>
                  <td className="py-4 font-bold text-neutral-800">Absorption Rate</td>
                  <td className="py-4 text-[#2F5D1E] font-bold">Up to 98%</td>
                  <td className="py-4 text-neutral-500">~ 12% - 15%</td>
                  <td className="py-4 text-neutral-500">~ 25% - 30%</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-neutral-800">Stomach Acid Shielding</td>
                  <td className="py-4 text-[#2F5D1E] font-bold">Yes (Phospholipid wrap)</td>
                  <td className="py-4 text-neutral-500">No (Destroyed by pH)</td>
                  <td className="py-4 text-neutral-500">Partial</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-neutral-800">NAD+ Active Dosage</td>
                  <td className="py-4 text-[#2F5D1E] font-bold">500mg Liposomal</td>
                  <td className="py-4 text-neutral-500">100mg - 250mg dry</td>
                  <td className="py-4 text-neutral-500">125mg raw</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-neutral-800">Trans-Resveratrol synergy</td>
                  <td className="py-4 text-[#2F5D1E] font-bold">Yes (600mg included)</td>
                  <td className="py-4 text-neutral-500">Rarely (Requires separate buy)</td>
                  <td className="py-4 text-neutral-500">No</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-neutral-800">Cost efficiency</td>
                  <td className="py-4 text-[#2F5D1E] font-bold">High (Maximum delivery/dollar)</td>
                  <td className="py-4 text-neutral-500">Very Low (Most wasted)</td>
                  <td className="py-4 text-neutral-500">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white border-y border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">The Daily Protocol</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2F5D1E] tracking-tight">
              A Simple Protocol, Seamless Results
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg">
              Integrating cellular health optimization into your standard daily routine takes less than 30 seconds.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {timelineSteps.map((step, idx) => (
              <div key={step.step} className="relative space-y-4">
                
                {/* Horizontal line connector for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-6 left-1/2 w-full h-[1.5px] bg-neutral-200 z-0" />
                )}

                <div className="relative z-10 w-12 h-12 rounded-full bg-[#2F5D1E] text-[#6FAF32] flex items-center justify-center font-mono font-black text-lg border-4 border-white shadow-md">
                  {step.step}
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-neutral-900">{step.title}</h3>
                  <span className="text-xs font-bold text-[#6FAF32] block uppercase tracking-wider">{step.subtitle}</span>
                  <p className="text-xs text-neutral-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Urgency guarantee helper */}
          <div className="mt-16 bg-[#F7F8F5] border border-neutral-200 rounded-3xl p-6 text-center max-w-2xl mx-auto space-y-4">
            <p className="text-xs font-semibold text-[#2F5D1E]">
              💡 <strong>Pro Tip:</strong> We recommend continuous supplementation for 4 to 8 weeks to allow intracellular NAD+ stores to fully saturate for compound longevity results.
            </p>
          </div>

        </div>
      </section>

      {/* Stats and Achievements Section */}
      <section className="py-24 bg-gradient-premium relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#6FAF32]/10 rounded-br-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">Verified Outcomes</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2F5D1E]">
                Why Customers Love It
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed">
                We gathered quantitative self-reported statistics from our voluntary customer trial cohort following 4 weeks of consistent, daily dosage of Liposomal Complex.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono text-neutral-400 font-bold block">COHORT BASELINE</span>
                <span className="text-xs font-bold text-neutral-700">1,250 active trial participants</span>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {statsList.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-2">
                  <span className="font-display text-4xl sm:text-5xl font-black text-[#2F5D1E] block">
                    {stat.value}
                  </span>
                  <h3 className="font-bold text-neutral-800 text-sm sm:text-base">{stat.label}</h3>
                  <p className="text-xs text-neutral-500">{stat.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">The Community Word</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2F5D1E] tracking-tight">
              Loved by Longevity Seekers
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg">
              Hear directly from active professionals, parents, and athletes who incorporated our Liposomal complex into their health routines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonialsList.map((test) => (
              <div
                key={test.id}
                className="bg-[#F7F8F5] p-6 rounded-3xl border border-neutral-200/50 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#6FAF32]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 italic leading-relaxed">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/30">
                  <div className="w-9 h-9 rounded-full bg-[#6FAF32]/25 text-[#2F5D1E] font-black flex items-center justify-center text-xs">
                    {test.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-neutral-900">{test.name}, {test.age}</h4>
                    <span className="text-[10px] text-neutral-400 block uppercase font-mono font-bold">Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Security seal and guarantee banner */}
          <div className="mt-16 max-w-3xl mx-auto bg-[#F7F8F5] rounded-3xl p-6 sm:p-8 border border-neutral-200/60 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4 text-left">
              <div className="w-16 h-16 shrink-0 rounded-full bg-white flex items-center justify-center border border-neutral-200/80 shadow-xs">
                <Award className="w-8 h-8 text-[#2F5D1E]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#2F5D1E]">Purity & Quality Promise</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  We stand by the scientific integrity and premium standards of our formula. Every single batch is manufactured under strict cGMP guidelines.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block mb-1">CERTIFIED PURE</span>
              <span className="text-xs font-extrabold text-neutral-700 bg-white border border-neutral-200 px-3.5 py-1.5 rounded-full">
                cGMP Certified
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 bg-neutral-900 text-white relative overflow-hidden border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">The Manufacturing Pledge</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Premium Quality Without Compromise
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              We control every layer of ingredient standard formulation, physical sourcing, and batch analytics. Here is how we verify our capsules:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
              <Award className="w-6 h-6 text-[#6FAF32] mx-auto" />
              <span className="text-xs font-bold block text-neutral-200">cMP Facility Certified</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
              <ShieldCheck className="w-6 h-6 text-[#6FAF32] mx-auto" />
              <span className="text-xs font-bold block text-neutral-200">Made in the USA</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
              <FlaskConical className="w-6 h-6 text-[#6FAF32] mx-auto" />
              <span className="text-xs font-bold block text-neutral-200">Non-GMO Verified</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
              <Check className="w-6 h-6 text-[#6FAF32] mx-auto" />
              <span className="text-xs font-bold block text-neutral-200">Gluten-Free Pure</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
              <LockKeyhole className="w-6 h-6 text-[#6FAF32] mx-auto" />
              <span className="text-xs font-bold block text-neutral-200">No Artificial Fillers</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
              <Activity className="w-6 h-6 text-[#6FAF32] mx-auto" />
              <span className="text-xs font-bold block text-neutral-200">3rd-Party Verified</span>
            </div>
          </div>

        </div>
      </section>

      {/* Purchase / Form Section */}
      <section id="purchase" className="py-24 bg-gradient-premium relative overflow-hidden">
        {/* Glow background pattern */}
        <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left pricing offer details column */}
            <div className="lg:col-span-6 space-y-8">
              
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">EXCLUSIVE DIGITAL OFFER</span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2F5D1E] tracking-tight">
                  Restore Your Cellular Reservoir Today
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Every container contains 90 high-absorption liposomal capsules—a full 45-day supply at full cellular-restoration clinical dosages.
                </p>
              </div>

              {/* Conversion assurance badges */}
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#6FAF32]/10 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-[#2F5D1E]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-950">Free Express Shipping</h4>
                    <p className="text-xs text-neutral-500">Arrives in 2-4 business days inside the USA with tracking details sent instantly.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#6FAF32]/10 flex items-center justify-center shrink-0">
                    <RotateCcw className="w-5 h-5 text-[#2F5D1E]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-950">No Subscription Trap</h4>
                    <p className="text-xs text-neutral-500">One-time purchase checkout option is default. Cancel/modify subscriptions anytime with one single click.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#6FAF32]/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-[#2F5D1E]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-950">Secured Encrypted Gateway</h4>
                    <p className="text-xs text-neutral-500">We utilize AES-256 standard bank-level encryption. Your details are safe.</p>
                  </div>
                </div>
              </div>

              {/* Secure Checkout Icon logos */}
              <div className="pt-4 border-t border-neutral-200">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block mb-3 font-mono">SECURE PAYMENT GATEWAYS AUTHORIZED</span>
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono font-bold">
                  <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded">VISA</span>
                  <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded">MASTERCARD</span>
                  <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded">AMEX</span>
                </div>
              </div>

            </div>

            {/* Right Interactive Shopify Buy Button Wrapper Column */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xl space-y-6 relative">
                
                {/* Sale Highlight Tag */}
                <div className="absolute -top-3.5 left-6 bg-[#2F5D1E] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" /> SPECIAL PROMOTION ACTIVE
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">CHOOSE QUANTITY & ADD TO CART</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2F5D1E]">NAD+ & Resveratrol Liposomal Complex</h3>
                  <p className="text-xs text-neutral-500">1200mg Complex / 90 Capsules / Manufactured in cGMP Certified USA Facility</p>
                </div>

                {/* Custom price tag showcase */}
                <div className="flex items-baseline gap-3 p-4 bg-[#F7F8F5] rounded-2xl border border-neutral-200/50">
                  <span className="text-3xl font-extrabold text-[#2F5D1E]">$99.99</span>
                  <span className="text-sm text-neutral-400 line-through">$130.00</span>
                  <span className="ml-auto text-xs font-bold text-[#6FAF32] uppercase bg-[#6FAF32]/10 px-2 py-0.5 rounded">
                    Save $30.01 Today
                  </span>
                </div>

                {/* Countdown Timer for FOMO */}
                <div className="text-xs text-neutral-600 bg-[#EBF0E6] p-3 rounded-xl flex items-center gap-2 border border-[#6FAF32]/10 font-medium">
                  <Clock className="w-4 h-4 text-[#6FAF32]" />
                  <span>Promo pricing reserved for:</span>
                  <span className="font-mono text-[#2F5D1E] font-bold ml-auto">{formatTime(timeLeft)} minutes remaining</span>
                </div>

                {/* Real Shopify Buy Button component integration */}
                <div className="pt-2">
                  <ShopifyBuyButton className="w-full" />
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-semibold uppercase">
                  <span>✓ Premium Bioavailability</span>
                  <span>✓ Fast Free USA Shipping</span>
                  <span>✓ Standard cGMP Pure</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">Answers Explained</span>
            <h2 className="font-display text-3xl font-extrabold text-[#2F5D1E] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-sm">
              Explore the detailed biochemistry, shipping mechanisms, and safety metrics of our Liposomal Complex.
            </p>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq) => (
              <div
                key={faq.id}
                className="border border-neutral-200 rounded-2xl overflow-hidden hover:border-[#6FAF32]/40 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left font-bold text-neutral-900 hover:text-[#2F5D1E] transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {openFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-[#6FAF32]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-neutral-150 bg-[#F7F8F5]"
                    >
                      <p className="p-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Banner Section (Before footer) */}
      <section className="py-24 bg-[#111A0C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow-dark opacity-35 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
          
          <span className="text-xs font-bold uppercase tracking-widest text-[#6FAF32] font-mono">Commit to Your Cells</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Feel Younger. Think Sharper. Live Stronger.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto">
            Upgrade your biological standard with our ultra-bioavailable Liposomal NAD+ + Resveratrol complex. Scientifically optimized for cellular longevity and premium vitality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToId("purchase")}
              className="w-full sm:w-auto bg-[#6FAF32] hover:bg-white hover:text-[#2F5D1E] text-neutral-950 font-bold py-4 px-10 rounded-full transition-all duration-300 text-base shadow-lg shadow-[#6FAF32]/20 flex items-center justify-center gap-2 group"
            >
              Order Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-medium">
            <span>✓ No Auto-Ship Obligations</span>
            <span>✓ cGMP Quality Standard Pure</span>
            <span>✓ Free Global Delivery options</span>
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            
            {/* Logo Column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#6FAF32] flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <span className="font-display font-bold tracking-tight text-white">AETHERIS</span>
                  <span className="block text-[8px] uppercase tracking-widest font-mono text-[#6FAF32] font-bold">CELLULAR HEALTH</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-neutral-500">
                Premium bio-engineered longevity formulations designed to bypass physical barriers and restore native energy from the mitochondria up.
              </p>
              <div className="text-[10px] text-neutral-500 font-mono">
                Aetheris, Inc. © 2026. All rights reserved.
              </div>
            </div>

            {/* Newsletter form column */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-wider font-bold text-white block">Newsletter Restoration Intel</span>
              <p className="text-xs text-neutral-500">
                Receive curated summaries of clinical NAD+ literature, longevity optimization hacks, and notification of private warehouse discounts.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6FAF32] w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#2F5D1E] hover:bg-[#6FAF32] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </form>
              
              {newsletterSubmitted && (
                <p className="text-xs text-[#6FAF32] font-bold animate-pulse">
                  ✓ Intel subscription validated. Check your inbox for updates.
                </p>
              )}
            </div>

            {/* Useful Links Column */}
            <div className="md:col-span-3 space-y-4">
              <span className="text-xs uppercase tracking-wider font-bold text-white block">Aetheris Policies</span>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Secure Checkout Compliance</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-neutral-900 pt-8 text-[10px] text-neutral-600 space-y-3 leading-relaxed">
            <p>
              *Disclaimer: These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary based on physiological baseline, lifestyle metrics, and consistency of intake.
            </p>
            <p>
              Designed for longevity-focused consumers who want to actively optimize their cellular reservoirs. Built in compliance with current cGMP guidelines.
            </p>
          </div>

        </div>
      </footer>

      {/* Popups & Modals */}
      
      {/* 1. Welcome / Delay Discount popup */}
      <AnimatePresence>
        {showWelcomePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-neutral-200 relative shadow-2xl space-y-6"
            >
              <button
                onClick={() => setShowWelcomePopup(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 text-center">
                <div className="w-12 h-12 bg-[#6FAF32]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Percent className="w-6 h-6 text-[#2F5D1E]" />
                </div>
                <span className="text-xs font-mono font-bold text-[#6FAF32] uppercase tracking-widest block">WELCOME SPECIAL PROMOTION</span>
                <h3 className="text-xl font-bold text-[#2F5D1E]">Unlock Special Pricing Instantly</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Enter your email to secure your special promotion rate of $99.99, valid only for today.
                </p>
              </div>

              {!popupSubmitted ? (
                <form onSubmit={handlePopupSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={popupEmail}
                    onChange={(e) => setPopupEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#6FAF32]"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#2F5D1E] hover:bg-[#6FAF32] text-white font-bold py-3.5 rounded-full text-xs transition-colors shadow-md"
                  >
                    Generate Discount Code
                  </button>
                </form>
              ) : (
                <div className="bg-[#F7F8F5] p-5 rounded-2xl border border-[#6FAF32]/25 space-y-4 text-center">
                  <p className="text-xs text-neutral-600">Your custom welcome code is generated and ready:</p>
                  <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl px-4 py-2 font-mono font-black text-lg text-[#2F5D1E]">
                    <span>CELLULAR99</span>
                    <button
                      onClick={copyCoupon}
                      className="text-xs font-sans text-[#6FAF32] font-bold flex items-center gap-1 hover:text-[#2F5D1E]"
                    >
                      {couponCopied ? <Check className="w-4 h-4 text-[#6FAF32]" /> : <Copy className="w-4 h-4" />}
                      <span>{couponCopied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setShowWelcomePopup(false);
                      scrollToId("purchase");
                    }}
                    className="w-full bg-[#6FAF32] text-white font-bold py-2.5 rounded-xl text-xs"
                  >
                    Apply & Shop Now
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-neutral-200 relative shadow-2xl space-y-6"
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 text-center">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-rose-500 animate-pulse" />
                </div>
                <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block">Wait, Don't Miss Out!</span>
                <h3 className="text-xl font-bold text-[#2F5D1E]">Exclusive Exit Offer</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  We'll cover your shipping fee if you complete your order now! Plus we'll secure the special $99.99 promotional rate. 
                </p>
              </div>

              <div className="bg-[#F7F8F5] p-4 rounded-2xl border border-neutral-200/60 flex items-center justify-between text-xs">
                <div>
                  <span className="block font-bold text-neutral-800">Free Express Delivery</span>
                  <span className="text-neutral-500">Normally $9.95</span>
                </div>
                <span className="font-extrabold text-[#6FAF32] uppercase">FREE</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitPopup(false)}
                  className="w-1/2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 font-bold py-3 rounded-full text-xs transition-colors text-center"
                >
                  No, thank you
                </button>
                <button
                  onClick={() => {
                    setShowExitPopup(false);
                    scrollToId("purchase");
                  }}
                  className="w-1/2 bg-[#2F5D1E] hover:bg-[#6FAF32] text-white font-bold py-3 rounded-full text-xs transition-colors text-center shadow-md"
                >
                  Secure Order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

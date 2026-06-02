import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, Code, Globe, MessageSquare, TrendingUp, Compass, 
  Menu, X, Phone, Layers, Smartphone, Star, Check, ArrowRight,
  Send, Database, ArrowUpRight, BarChart2, ShieldCheck, Mail, Pin, HelpCircle,
  Clock, CheckCircle, Flame, Server, Laptop, ChevronRight,
  Instagram, Facebook, Linkedin, ChevronDown, Search, Calendar, Tag, ChevronLeft,
  Share2
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ROICalculator from "./components/ROICalculator";
import AIPlanner from "./components/AIPlanner";
import AIChat from "./components/AIChat";
import TechnicalSheetModal from "./components/TechnicalSheetModal";
import { LeadSubmission } from "./types";
import { TECHNICAL_SHEETS, TechnicalSheet, BIO_DATA, BlogPost } from "./data";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

export default function App() {
  const bannerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [chiSonoModalOpen, setChiSonoModalOpen] = useState(false);

  // Blog State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postContent, setPostContent] = useState("");
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const blogScrollRef = useRef<HTMLDivElement>(null);
  const [cookiesAccepted, setCookiesAccepted] = useState(() => {
    try {
      return sessionStorage.getItem("fw_cookies_accepted") === "true";
    } catch {
      return false;
    }
  });
  
  // App-level Contact Form state
  const [businessName, setBusinessName] = useState("");
  const [niche, setNiche] = useState("Salute, Wellness & Bellezza");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goals, setGoals] = useState<string[]>(["Creare un nuovo Sito Web da zero"]);
  const [budget, setBudget] = useState("Professional (€1.500 - €3.500)");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Technical Sheets Modal state
  const [selectedSheet, setSelectedSheet] = useState<TechnicalSheet | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    fetch("/blog/posts.json")
      .then(res => res.json())
      .then(data => setBlogPosts(data))
      .catch(err => console.error("Error loading blog posts:", err));
  }, []);

  const openPost = async (post: BlogPost) => {
    try {
      const response = await fetch(`/blog/${post.slug}.md`);
      const text = await response.text();
      setPostContent(text);
      setSelectedPost(post);
      setIsBlogModalOpen(true);
    } catch (err) {
      console.error("Error loading post content:", err);
    }
  };

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const scrollBlog = (direction: 'left' | 'right') => {
    if (blogScrollRef.current) {
      const scrollAmount = 350;
      blogScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openSheet = (sheetId: string) => {
    const sheet = TECHNICAL_SHEETS.find(s => s.id === sheetId);
    if (sheet) {
      setSelectedSheet(sheet);
      setIsSheetOpen(true);
    }
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !clientName || !email) return;

    // Create a new lead to inject into the CRM simulator local storage
    const newLead: LeadSubmission = {
      id: "lead_" + Date.now(),
      businessName,
      niche,
      clientName,
      email,
      phone,
      goals,
      webType: "Da valutare insieme",
      budget,
      timestamp: "Adesso",
      status: "Nuovo"
    };

    try {
      const stored = localStorage.getItem("fw_leads_database");
      let database: LeadSubmission[] = [];
      if (stored) {
        database = JSON.parse(stored);
      }
      database.unshift(newLead);
      localStorage.setItem("fw_leads_database", JSON.stringify(database));
      
      // Notify the AdminHub component about the state update
      window.dispatchEvent(new CustomEvent("fw_new_lead_added"));
      setFormSubmitted(true);
      
      // Auto-reset after a delay
      setTimeout(() => {
        setFormSubmitted(false);
        setBusinessName("");
        setClientName("");
        setEmail("");
        setPhone("");
      }, 5000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0015] text-white/90 flex flex-col font-sans relative overflow-x-hidden antialiased select-none">
      
      {/* GLOBAL BACKGROUND WITH DARK PURPLE OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/images/immagine%205.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0015]/85 backdrop-blur-[2px]"></div>
      </div>

      {/* 1. FLOATING NAVIGATION BAR (GLASSMORPHIC CHIC RECTANGULAR) */}
      <nav className="fixed top-5 left-0 right-0 z-[100] flex items-center justify-center px-4 w-full pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl flex items-center justify-between bg-accent-purple/10 backdrop-blur-xl rounded-none px-5 py-2.5 shadow-xl border border-white/10 h-14">
          <div className="flex items-center gap-8 pl-1">
            <a 
              href="#hero" 
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="h-8 md:h-10 flex items-center shrink-0 overflow-hidden">
                <img
                  src="/images/def.logo%20facilissimo%20web%20.jpg"
                  alt="Facilissimo Web"
                  className="h-full w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden h-8 w-8 rounded-none border border-bg-ivory/50 bg-white/15 flex items-center justify-center font-mono">
                  <span className="text-bg-ivory font-black font-display text-xs tracking-widest">FW</span>
                </div>
              </div>
              <span className="font-display font-bold text-sm uppercase tracking-widest text-[#FFF] transition-colors">
                FACILISSIMO <span className="text-accent-orange">WEB</span>
              </span>
            </a>
            
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-7">
              <button
                onClick={() => setChiSonoModalOpen(true)}
                className="text-[10px] font-bold uppercase tracking-widest text-[#BDBAB2] hover:text-white transition-colors cursor-pointer"
              >
                Chi Sono
              </button>

              {/* Servizi Dropdown */}
              <div className="relative group/dropdown">
                <button
                  className="text-[10px] font-bold uppercase tracking-widest text-[#BDBAB2] hover:text-white transition-colors flex items-center gap-1 cursor-pointer py-4"
                >
                  Servizi <ChevronDown className="w-3 h-3 transition-transform group-hover/dropdown:rotate-180" />
                </button>

                <div className="absolute top-full left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-200 z-[110]">
                  <div className="bg-accent-purple/20 backdrop-blur-2xl border border-white/10 p-2 shadow-2xl flex flex-col gap-1">
                    {TECHNICAL_SHEETS.map((sheet) => (
                      <button
                        key={sheet.id}
                        onClick={() => openSheet(sheet.id)}
                        className="text-left px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between group/item cursor-pointer"
                      >
                        {sheet.title}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-accent-orange" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <a 
                href="#comparativa" 
                className="text-[10px] font-bold uppercase tracking-widest text-[#BDBAB2] hover:text-white transition-colors"
              >
                Codice vs WP
              </a>
              <a 
                href="#ai-planner" 
                className="text-[10px] font-bold uppercase tracking-widest text-accent-orange hover:text-white transition-colors flex items-center gap-1"
              >
                AI Planner <Sparkles className="w-3 h-3 text-accent-orange" />
              </a>
              <a
                href="#blog"
                className="text-[10px] font-bold uppercase tracking-widest text-[#BDBAB2] hover:text-white transition-colors"
              >
                Blog
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#contatti" 
              className="hidden lg:flex bg-white text-charcoal hover:bg-bg-ivory transition-all text-[9px] h-9 font-bold px-4 rounded-none items-center justify-center uppercase tracking-wider shrink-0 shadow"
            >
              Parliamo del tuo Progetto
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#BDBAB2] hover:text-white p-1 cursor-pointer pointer-events-auto"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU PORTAL - Z-INDEX 100 TO STAND OVER ALL CELLULAR OVERLAYS */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed inset-x-4 top-[84px] bg-accent-purple/20 backdrop-blur-2xl text-white rounded-none p-6 z-[100] border-2 border-white/20 shadow-2xl flex flex-col gap-4 lg:hidden"
            style={{ pointerEvents: 'auto' }}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setChiSonoModalOpen(true);
              }}
              className="text-xs uppercase font-bold tracking-widest text-white/80 py-4 border-b border-white/5 text-left cursor-pointer"
            >
              Chi Sono
            </button>

            <div className="border-b border-white/5 py-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 block">I Miei Servizi</span>
              <div className="flex flex-col gap-2 pl-2">
                {TECHNICAL_SHEETS.map((sheet) => (
                  <button
                    key={sheet.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openSheet(sheet.id);
                    }}
                    className="text-xs uppercase font-bold tracking-widest text-white/70 hover:text-white text-left py-1 flex items-center justify-between group cursor-pointer"
                  >
                    {sheet.title}
                    <ChevronRight className="w-3.5 h-3.5 text-accent-orange" />
                  </button>
                ))}
              </div>
            </div>
            <a 
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              href="#comparativa" 
              className="text-xs uppercase font-bold tracking-widest text-white/80 py-2 border-b border-white/5"
            >
              Classico vs Codice Custom
            </a>
            <a 
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              href="#ai-planner" 
              className="text-xs uppercase font-bold tracking-widest text-accent-orange py-2 border-b border-white/5 flex items-center gap-1.5"
            >
              Strategia AI Istantanea <Sparkles className="w-3.5 h-3.5" />
            </a>
            <a
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              href="#blog"
              className="text-xs uppercase font-bold tracking-widest text-white/80 py-4 border-b border-white/5"
            >
              Blog
            </a>
            <a 
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              href="#contatti" 
              className="text-xs uppercase font-bold tracking-widest text-charcoal bg-white py-3 px-4 rounded-none hover:bg-bg-ivory transition-all text-center block mt-2 shadow font-semibold"
            >
              Parliamo del tuo Progetto
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full relative z-10">
          <>
            {/* 2. HERO LANDING SECTION */}
        <section className="bg-transparent pt-24 md:pt-36 pb-20 md:pb-32" id="hero">
          <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col items-center text-center relative">
            {/* Active Work Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md text-white rounded-none px-4 py-1.5 text-[9px] uppercase font-bold tracking-widest flex items-center gap-2 mb-6 shadow-md border border-white/10"
            >
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full live-beacon"></span>
              {BIO_DATA.name} • {BIO_DATA.role}
            </motion.div>

            <h1
              className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter text-white leading-[1.05]"
            >
              Siti Web che vendono: Design e Strategia
            </h1>
            <div className="w-24 h-2 grad-sunset mx-auto mt-4 rounded-full"></div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base text-white/70 mt-6 max-w-2xl leading-relaxed font-sans font-light"
            >
              {BIO_DATA.shortDescription}
            </motion.p>

            {/* Quick Pillar Badge Strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2.5 justify-center items-center mt-8"
            >
              {[
                { label: "WordPress, Wix & Squarespace", id: "wp-wix-sq" },
                { label: "Codice React su Misura", id: "react-custom" },
                { label: "Lead Generation Strategica", id: "lead-gen" },
                { label: "Campagne ADS (Meta & Google)", id: "ads-mgmt" }
              ].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => openSheet(tag.id)}
                  className="text-[10px] font-bold bg-white/5 backdrop-blur-sm text-white px-3 py-1.5 border border-white/10 rounded-none shadow-sm flex items-center gap-1.5 hover:border-accent-orange/40 transition-all hover:scale-105 cursor-pointer active:scale-95"
                >
                  <Check className="w-3 h-3 text-accent-pink" />
                  {tag.label}
                </button>
              ))}
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mt-10 w-full max-w-2xl"
            >
              <a
                href="#contatti"
                className="grad-electric hover:shadow-xl hover:scale-[1.03] transition-all text-white font-bold px-8 py-4 rounded-none flex items-center justify-center gap-2 uppercase tracking-widest text-[11px] w-full sm:w-auto cursor-pointer"
              >
                Inizia Ora - Parlami del tuo Progetto <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#servizi"
                className="bg-transparent border border-white/30 text-white hover:bg-white hover:text-charcoal transition-all font-bold px-8 py-4 rounded-none flex items-center justify-center uppercase tracking-widest text-[11px] w-full sm:w-auto cursor-pointer"
              >
                Cosa Posso Fare Per Te
              </a>
            </motion.div>
          </div>
        </section>

        {/* 2.5 PARALLAX MARQUEE BANNER SECTION */}
        <section
          ref={bannerRef}
          className="relative h-[500px] w-full overflow-hidden flex items-center justify-center bg-charcoal"
        >
          {/* Parallax Background */}
          <motion.div
            style={{ y: backgroundY }}
            className="absolute -top-[10%] left-0 z-0 h-[120%] w-full"
          >
            <img
              src="/images/fondo%20per%20home%20.png"
              alt="Banner Background"
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>

          {/* Infinite Marquee Content */}
          <div className="relative z-10 w-full overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "linear"
              }}
              className="flex whitespace-nowrap items-center"
            >
              {/* Double the content to create seamless loop */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 md:gap-20 px-6 md:px-10">
                  <span className="text-6xl md:text-[120px] font-black text-white uppercase tracking-tighter font-mono leading-none">
                    FACILISSIMO WEB
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. CORE VALUE PROPOSITIONS SERVICES */}
        <section className="bg-white/5 backdrop-blur-sm py-20 md:py-32" id="servizi">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-pink bg-accent-pink/10 px-3.5 py-1 rounded-none">
                Servizi Freelance
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-2 text-white">
                Soluzioni Semplici per Crescere Online
              </h2>
              <p className="text-xs text-white/60">
                Ti aiuto a costruire una presenza digitale forte che attira nuovi clienti ogni giorno.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Box 1: Web Design Sartoriale */}
              <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:shadow-xl transition-all group">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent-blue/20 flex items-center justify-center text-accent-blue mb-4">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">Sito Web Professionale</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Realizzo il tuo sito web su misura, veloce e ottimizzato per i motori di ricerca. Che tu preferisca WordPress per gestirlo in autonomia o una soluzione su misura in codice per prestazioni massime, ho la soluzione giusta.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center text-xs">
                  <span className="font-medium text-white/80 font-mono">Web Design</span>
                  <a href="#comparativa" className="text-accent-blue hover:underline flex items-center gap-1">
                    Scopri di più <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Box 2: Lead Generation Specialist */}
              <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:shadow-xl transition-all group">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent-pink/20 flex items-center justify-center text-accent-pink mb-4">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">Trovare Nuovi Clienti</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Non solo un bel sito, ma uno strumento che lavora per te. Creo sistemi per raccogliere contatti di persone interessate ai tuoi servizi e automatizzo il processo per farti risparmiare tempo prezioso.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center text-xs">
                  <span className="font-medium text-white/80 font-mono">Lead Gen</span>
                  <a href="#calcolatore" className="text-accent-pink hover:underline flex items-center gap-1">
                    Prova il simulatore <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Box 3: Social & Ads Management */}
              <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:shadow-xl transition-all group">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent-orange/20 flex items-center justify-center text-accent-orange mb-4">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold font-semibold text-white">Pubblicità Google e Meta</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Porto traffico qualificato sul tuo sito attraverso campagne pubblicitarie mirate su Google, Facebook e Instagram. Massimizziamo insieme il tuo budget per ottenere il miglior risultato possibile.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center text-xs">
                  <span className="font-medium text-white/80 font-mono">Marketing</span>
                  <a href="#contatti" className="text-accent-orange hover:underline flex items-center gap-1">
                    Chiedi info <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 4. COMPARISON CHART SECTION (CLASSIC VS DESIGN CODE) */}
        <section className="bg-transparent py-20 md:py-32" id="comparativa">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
                La Tecnologia Giusta
              </span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white leading-tight">
                WordPress o Codice Su Misura?
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Non esiste una soluzione universale. Se hai bisogno di un sito semplice da aggiornare da solo, <strong>WordPress</strong> è la scelta migliore. Se invece cerchi il massimo della velocità e un design unico, un sito in <strong>codice puro</strong> ti darà quel vantaggio competitivo necessario oggi.
              </p>
              <div className="space-y-4 text-xs font-semibold">
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <p className="text-white/90">
                    WordPress: Ideale per blog, piccoli siti e per chi vuole gestire i testi in autonomia.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <p className="text-white/90">
                    Codice Custom: Il top per velocità e sicurezza. Google lo ama perché è leggerissimo.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Contrast Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card Metodo Classico */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden group hover:border-[#BF5AF2]/35 transition-all">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#BF5AF2]/10 rounded-bl-3xl pointer-events-none transition-all group-hover:scale-130"></div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#BF5AF2] bg-[#BF5AF2]/20 px-2 py-0.5 rounded">
                  FACILE E VELOCE
                </span>
                <h4 className="font-display text-base font-bold text-white">WordPress &amp; Co.</h4>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  Perfetto per chi vuole un sito professionale in tempi brevi.
                </p>
                <div className="space-y-2 text-[10px] text-white/70 pt-3 border-t border-white/10">
                  <div className="flex justify-between font-mono"><span>Gestione:</span><strong>Autonoma al 100%</strong></div>
                  <div className="flex justify-between font-mono"><span>Consegna:</span><strong>1-2 settimane</strong></div>
                  <div className="flex justify-between font-mono"><span>Costo:</span><strong>Contenuto</strong></div>
                  <div className="flex justify-between font-mono"><span>Performance:</span><b>Standard</b></div>
                </div>
              </div>

              {/* Card Pure Code Level */}
              <div className="bg-white/10 backdrop-blur-xl text-white rounded-2xl p-6 shadow-md space-y-4 relative overflow-hidden group hover:shadow-lg transition-all border border-white/20">
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent-orange/20 rounded-bl-3xl pointer-events-none transition-all group-hover:scale-130"></div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-accent-orange bg-accent-orange/20 px-2.5 py-0.5 rounded">
                  MASSIME PRESTAZIONI
                </span>
                <h4 className="font-display text-base font-bold text-white flex items-center gap-1">
                  Codice Puro <Code className="w-4 h-4 text-accent-orange" />
                </h4>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Creato riga per riga per chi vuole solo il meglio.
                </p>
                <div className="space-y-2 text-[10px] text-white/80 pt-3 border-t border-white/20">
                  <div className="flex justify-between font-mono"><span>Velocità:</span><strong className="text-green-400">Istantanea</strong></div>
                  <div className="flex justify-between font-mono"><span>SEO:</span><strong className="text-green-400">Superiore</strong></div>
                  <div className="flex justify-between font-mono"><span>Design:</span><strong>Senza Limiti</strong></div>
                  <div className="flex justify-between font-mono"><span>Sicurezza:</span><strong>Totale</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE WIDGET 1: THE ROI CONVERSION CALCULATOR */}
        <section className="bg-white/5 backdrop-blur-sm py-20 md:py-32 scroll-mt-24" id="calcolatore">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange bg-accent-orange/10 px-3.5 py-1 rounded-full">
                Strumento di Calcolo
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Quanto puoi guadagnare con la pubblicità?
              </h2>
              <p className="text-xs text-white/60">
                Usa questo simulatore per capire quanto può rendere il tuo investimento in pubblicità. Un sito che funziona meglio ti permette di ottenere più clienti a parità di spesa.
              </p>
            </div>

            <ROICalculator />
          </div>
        </section>

        {/* 6. INTERACTIVE WIDGET 2: THE AI PLANNER (GEMINI INTEGRATION) */}
        <section className="bg-transparent py-20 md:py-32 scroll-mt-24" id="ai-planner">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#BF5AF2] bg-[#BF5AF2]/10 px-3.5 py-1 rounded-full flex items-center justify-center gap-1 mx-auto w-max">
                Assistente Strategico <Sparkles className="w-3.5 h-3.5" />
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Ricevi un'Idea di Strategia Subito
              </h2>
              <p className="text-xs text-white/60">
                Rispondi a qualche domanda sulla tua attività e riceverai immediatamente alcuni suggerimenti su come migliorare la tua presenza online per trovare più contatti.
              </p>
            </div>

            <AIPlanner />
          </div>
        </section>

        {/* 11. LEAD INTAKE CONTACT FORM WORKFLOW */}
        <section className="bg-white/5 backdrop-blur-sm py-20 md:py-32 scroll-mt-24" id="contatti">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange bg-accent-orange/10 px-3.5 py-1 rounded-full">
                Inizia Ora
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                Raccontami il Tuo Progetto
              </h2>
              <p className="text-xs text-white/60">
                Compila il modulo qui sotto. Riceverò i tuoi dati e ti ricontatterò per fissare una breve chiamata gratuita.
              </p>
            </div>

            <div className="glass-panel rounded-none p-6 md:p-8 border border-white/10 max-w-2xl mx-auto shadow-md relative overflow-hidden">
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-none flex items-center justify-center mx-auto shadow-inner border border-green-200">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold">Messaggio Inviato!</h4>
                    <p className="text-xs text-muted-grey mt-1 max-w-sm mx-auto">
                      Grazie per avermi contattato. Ti risponderò al più presto per discutere del tuo progetto!
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmitContact}
                  className="space-y-5 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 animate-none">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-white">Nome dell'Attività <span className="text-accent-pink">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Es. Officina del Gusto Verona"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-none text-xs focus:outline-none focus:border-accent-blue text-white"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-white">Nicchia / Settore</label>
                      <select 
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-none text-xs focus:outline-none focus:border-accent-blue text-white"
                      >
                        <option value="Salute, Wellness &amp; Bellezza">Salute, Wellness &amp; Bellezza</option>
                        <option value="Ristorazione e Food">Ristorazione &amp; Food</option>
                        <option value="Servizi Professionali (Legali, Medici, Fiscale)">Servizi Professionali / Studi</option>
                        <option value="E-commerce e Vendita Prodotti">E-commerce e Retail</option>
                        <option value="Altro">Altro</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 animate-none">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-white">Il Tuo Nome <span className="text-accent-pink">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Es. Matteo Bianchi"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-none text-xs focus:outline-none focus:border-accent-blue text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-white">La Tua E-mail <span className="text-accent-pink">*</span></label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Es. m.bianchi@email.it"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-none text-xs focus:outline-none focus:border-accent-blue text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-white">Numero Telefonico</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Consigliato, Es: +39 340 9876543"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-none text-xs focus:outline-none focus:border-accent-blue font-mono text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-white">Budget Stimato</label>
                      <select 
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-none text-xs focus:outline-none focus:border-accent-blue text-white"
                      >
                        <option value="Starter (€500 - €1.500)">Starter (€500 - €1.500) - Ottimizzazione Standard</option>
                        <option value="Professional (€1.500 - €3.500)">Professional (€1.500 - €3.500) - Sito + Tracciamenti</option>
                        <option value="Premium / Scalabile (€3.500+)">Premium / Scalabile (€3.500+) - Macchina Acquisizione</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full grad-electric hover:shadow-lg text-white font-bold py-3 px-6 rounded-none flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer transition-transform hover:scale-101"
                    >
                      Invia Richiesta e Traccia <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 11.5 BLOG SECTION - ONE PAGE STYLE */}
        <section className="bg-transparent py-20 md:py-32 scroll-mt-24 border-t border-white/5" id="blog">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue bg-accent-blue/10 px-3.5 py-1 rounded-none">
                  Approfondimenti & News
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                  Il Blog di Facilissimo Web
                </h2>
                <p className="text-xs text-white/60 max-w-md">
                  Consigli, strategie e novità dal mondo del web design e della lead generation per far crescere il tuo business.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Cerca articoli..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue text-white"
                />
              </div>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="relative group">
              <button
                onClick={() => scrollBlog('left')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollBlog('right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div
                ref={blogScrollRef}
                className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="min-w-[300px] md:min-w-[350px] snap-start glass-panel border border-white/10 overflow-hidden group/card cursor-pointer hover:border-accent-blue/30 transition-all"
                    onClick={() => openPost(post)}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent-blue/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[10px] text-white/40 font-mono">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.tags[0]}
                        </div>
                      </div>
                      <h3 className="font-display text-lg font-bold text-white group-hover/card:text-accent-blue transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="pt-4 flex items-center gap-2 text-xs font-bold text-accent-blue uppercase tracking-widest">
                        Leggi tutto <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="w-full py-20 text-center text-white/40 text-sm italic">
                    Nessun articolo trovato per la tua ricerca.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
          </>
      </main>

      {/* 12. HIGH END GRAPHICAL SLATE FOOTER */}
      <footer className="bg-white/5 backdrop-blur-md text-white pt-16 pb-10 px-6 sm:px-10 rounded-none border-t border-white/10 relative z-20 mt-16 w-full shrink-0">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Logo Column */}
            <div className="space-y-6 text-left flex flex-col items-start">
              <div className="w-[250px] h-auto overflow-hidden">
                <img
                  src="/images/def.logo%20facilissimo%20web%20.jpg"
                  alt="Facilissimo Web"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-[250px] h-[250px] rounded-none border border-white/20 bg-white/10 flex items-center justify-center font-mono">
                  <span className="text-white font-black font-display text-5xl tracking-widest">FW</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-black text-xs uppercase tracking-widest text-white">FACILISSIMO WEB</h4>
                <p className="text-xs text-[#BDBAB2] leading-relaxed font-sans font-light max-w-xs">
                  Metodo d'eccellenza per la digitalizzazione delle imprese locali in tutta Italia. Sviluppo custom-code, design, visibilità e monetizzazione.
                </p>
              </div>
            </div>

            {/* Services Links column */}
            <div className="space-y-4 text-left">
              <h5 className="text-[10px] uppercase tracking-widest font-bold text-accent-orange">Servizi Principali</h5>
              <ul className="text-xs text-[#BDBAB2] space-y-2.5">
                <li><a href="#comparativa" className="hover:text-white transition-colors">Siti in Vero Codice (React)</a></li>
                <li><a href="#comparativa" className="hover:text-white transition-colors">Web Design Classico (WP/Wix)</a></li>
                <li><a href="#servizi" className="hover:text-white transition-colors">Campagne Pubblicitarie ADS</a></li>
                <li><a href="#servizi" className="hover:text-white transition-colors">Sistemi di Lead Generation</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog & Risorse</a></li>
              </ul>
            </div>

            {/* Direct contact column */}
            <div className="space-y-4 text-left">
              <h5 className="text-[10px] uppercase tracking-widest font-bold text-accent-pink">Consulenza Istantanea</h5>
              <p className="text-xs text-[#BDBAB2] leading-relaxed">
                Tutte le consulenze partono da una mini-call conoscitiva gratuita di 15 minuti su zoom o whatsapp.
              </p>
              <div className="flex gap-4">
                <a 
                  href="mailto:mariateresarogani@gmail.com" 
                  className="w-9 h-9 rounded-none border border-white/15 flex items-center justify-center hover:bg-white/10 text-[#BDBAB2] hover:text-white transition-colors"
                  title="Contatta via Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-none border border-white/15 flex items-center justify-center hover:bg-white/10 text-[#BDBAB2] hover:text-white transition-colors"
                  title="Instagram (Prossimamente)"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-none border border-white/15 flex items-center justify-center hover:bg-white/10 text-[#BDBAB2] hover:text-white transition-colors"
                  title="Facebook (Prossimamente)"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-none border border-white/15 flex items-center justify-center hover:bg-white/10 text-[#BDBAB2] hover:text-white transition-colors"
                  title="LinkedIn (Prossimamente)"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="#hero" 
                  className="w-9 h-9 rounded-none border border-white/15 flex items-center justify-center hover:bg-white/10 text-[#BDBAB2] hover:text-white transition-colors"
                  title="Torna all'inizio"
                >
                  <Compass className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#8C8880] font-mono">
            <p>© 2026 Facilissimo Web / FW di Maria Teresa Rogani. Tutti i diritti riservati.</p>
            <div className="flex gap-4">
              <a href="#contatti" className="hover:text-white">P.IVA: 01234567890</a>
              <span>•</span>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPrivacyModalOpen(true);
                }}
                className="hover:text-white underline cursor-pointer"
              >
                Privacy Policy &amp; GDPR
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* COOKIES DISCLAIMER (USO COOKIES SOLO PER LA SESSIONE) */}
      <AnimatePresence>
        {!cookiesAccepted && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 inset-x-6 z-[200] flex justify-center pointer-events-none"
          >
            <div className="pointer-events-auto max-w-4xl w-full bg-accent-purple/20 backdrop-blur-2xl border border-white/20 p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange"></div>
              <div className="text-left space-y-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-none bg-accent-orange/20 flex items-center justify-center text-accent-orange">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs uppercase font-bold text-white tracking-widest">Privacy & Session Control</h5>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed max-w-2xl">
                  Per offrirti un'esperienza interattiva d'eccellenza con i nostri simulatori AI e CRM, utilizziamo esclusivamente <strong>cookie tecnici di sessione</strong>. Non profilano i tuoi dati e vengono eliminati automaticamente quando chiudi il browser. Navigando accetti il loro utilizzo per questa sessione.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0 relative z-10">
                <button
                  onClick={() => setPrivacyModalOpen(true)}
                  className="text-[10px] font-bold text-white/50 hover:text-white uppercase tracking-widest transition-colors px-4 py-2"
                >
                  Leggi Policy
                </button>
                <button
                  onClick={() => {
                    try {
                      sessionStorage.setItem("fw_cookies_accepted", "true");
                    } catch {}
                    setCookiesAccepted(true);
                  }}
                  className="grad-electric text-white hover:shadow-lg transition-all text-[10px] font-bold px-8 py-3 rounded-none uppercase tracking-widest shrink-0 cursor-pointer w-full sm:w-auto text-center border border-white/10"
                >
                  Accetto e Proseguo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHI SONO MODAL */}
      <AnimatePresence>
        {chiSonoModalOpen && (
          <div className="fixed inset-0 bg-black/75 z-[200] backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-4xl w-full border border-line-ivory p-6 md:p-10 rounded-none shadow-2xl overflow-y-auto max-h-[90vh] text-left relative"
            >
              <button
                onClick={() => setChiSonoModalOpen(false)}
                className="absolute top-4 right-4 text-muted-grey hover:text-charcoal p-1 cursor-pointer font-bold font-mono text-xs"
              >
                CHIUDI [X]
              </button>

              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden shrink-0 shadow-xl border-4 border-white bg-bg-ivory relative">
                  <img
                    src={BIO_DATA.image}
                    alt={BIO_DATA.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop";
                    }}
                  />
                </div>
                <div className="space-y-4 text-left flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C7BE] bg-[#00C7BE]/10 px-3 py-1 rounded-full">
                    {BIO_DATA.badge}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-charcoal">
                    Chi Sono: {BIO_DATA.name}
                  </h3>
                  <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed font-sans font-light">
                    {BIO_DATA.shortDescription}
                  </p>
                  <p className="text-xs md:text-sm text-muted-grey leading-relaxed font-sans font-light">
                    {BIO_DATA.longDescription}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    {BIO_DATA.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs font-semibold text-charcoal">
                        <Check className="w-4 h-4 text-green-500 font-bold" /> {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <a
                      href={`https://wa.me/${BIO_DATA.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] transition-all font-bold px-6 py-3 rounded-none uppercase tracking-widest text-xs shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI CHAT FLOATING INTERFACE */}
      <AIChat />

      {/* TECHNICAL SHEET MODAL */}
      <TechnicalSheetModal
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        sheet={selectedSheet}
      />

      {/* BLOG POST MODAL */}
      <AnimatePresence>
        {isBlogModalOpen && selectedPost && (
          <div className="fixed inset-0 bg-black/90 z-[200] backdrop-blur-md flex items-center justify-center p-0 md:p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-[#0a0015] w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] border-x md:border border-white/10 overflow-hidden flex flex-col relative"
            >
              {/* Header */}
              <div className="sticky top-0 z-30 bg-[#0a0015]/80 backdrop-blur-xl border-b border-white/10 p-4 md:p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsBlogModalOpen(false)}
                    className="p-2 hover:bg-white/5 text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="hidden sm:block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue">{selectedPost.category}</span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{selectedPost.title}</h4>
                  </div>
                </div>
                <button
                  onClick={() => setIsBlogModalOpen(false)}
                  className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  Chiudi [ESC]
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12">
                <div className="max-w-2xl mx-auto space-y-8">
                  <header className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-white/40 font-mono">
                      <span>{selectedPost.date}</span>
                      <span>•</span>
                      <span>{selectedPost.author}</span>
                    </div>
                    <h1 className="font-display text-3xl md:text-4xl font-black text-white leading-tight">
                      {selectedPost.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-white/60 bg-white/5 px-2 py-1">#{tag}</span>
                      ))}
                    </div>
                  </header>

                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop";
                      }}
                    />
                  </div>

                  <article className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-p:text-white/70 prose-p:leading-relaxed prose-strong:text-white prose-a:text-accent-blue hover:prose-a:underline prose-img:rounded-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {postContent}
                    </ReactMarkdown>
                  </article>

                  {/* Social Sharing Buttons */}
                  <div className="pt-8 border-t border-white/10 mt-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        <Share2 className="w-3 h-3" /> Condividi questo articolo
                      </div>
                      <div className="flex flex-wrap justify-center gap-3">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + "/#blog?post=" + selectedPost.slug)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                          title="Condividi su Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://www.instagram.com/`}
                          target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-white hover:border-transparent transition-all"
                          title="Condividi su Instagram"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + "/#blog?post=" + selectedPost.slug)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
                          title="Condividi su LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent("Leggi questo articolo su Facilissimo Web: " + selectedPost.title + " " + window.location.origin + "/#blog?post=" + selectedPost.slug)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all"
                          title="Condividi su WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(selectedPost.title + " Facilissimo Web")}`}
                          target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-charcoal hover:border-white transition-all"
                          title="Cerca su Google"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <footer className="pt-12 border-t border-white/10 mt-6 text-center space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Ti è piaciuto l'articolo?</p>
                      <h4 className="text-lg font-bold text-white">Parliamo di come applicare queste strategie al tuo business</h4>
                    </div>
                    <button
                      onClick={() => {
                        setIsBlogModalOpen(false);
                        window.location.hash = "#contatti";
                      }}
                      className="grad-electric px-8 py-4 text-xs font-bold uppercase tracking-widest text-white hover:shadow-xl transition-all"
                    >
                      Prenota una consulenza gratuita
                    </button>
                  </footer>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRIVACY POLICY MODAL (GDPR) */}
      <AnimatePresence>
        {privacyModalOpen && (
          <div className="fixed inset-0 bg-black/75 z-[200] backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-md w-full border border-line-ivory p-6 md:p-8 space-y-4 rounded-none shadow-2xl overflow-y-auto max-h-[85vh] text-left"
            >
              <div className="flex justify-between items-center border-b border-line-ivory pb-3">
                <h4 className="font-display font-bold text-lg text-charcoal">Privacy Policy &amp; GDPR</h4>
                <button 
                  onClick={() => setPrivacyModalOpen(false)}
                  className="text-muted-grey hover:text-charcoal p-1 cursor-pointer font-bold font-mono text-xs"
                >
                  CHIUDI [X]
                </button>
              </div>
              <div className="space-y-3 text-[11px] text-muted-grey leading-relaxed">
                <p>
                  <strong>1. TITOLARE DEL TRATTAMENTO:</strong><br />
                  Il titolare del trattamento è Maria Teresa Rogani per Facilissimo Web / FW di Maria Teresa Rogani.
                </p>
                <p>
                  <strong>2. DATI RACCOLTI:</strong><br />
                  La compilazione dei moduli interattivi (AI Planner e CRM Simulator) acquisisce in sicurezza dati quali nome dell'attività, nome del contatto, email, telefono e risposte di target strategico.
                </p>
                <p>
                  <strong>3. FINALITÀ:</strong><br />
                  I dati raccolti sono trattati al solo scopo di formulare la risposta simulata, preparare l'audit computazionale dell'AI e organizzare l'eventuale mini-call conoscitiva di 15-minuti. Nessun dato viene ceduto a terzi.
                </p>
                <p>
                  <strong>4. COOKIES DI SESSIONE:</strong><br />
                  Utilizziamo solo cookie temporanei (session storage) per identificare lo stato delle selezioni dell'utente correnti. Questi spariscono chiudendo la finestra del browser.
                </p>
                <p>
                  <strong>5. DIRITTI DELL'INTERESSATO:</strong><br />
                  Ai sensi del Regolamento GDPR 2016/679, puoi chiedere in ogni momento la cancellazione, rettifica o visione dei tuoi dati scrivendo a <a href="mailto:mariateresarogani@gmail.com" className="text-accent-blue underline">mariateresarogani@gmail.com</a>.
                </p>
              </div>
              <div className="pt-3 border-t border-line-ivory flex justify-end">
                <button 
                  onClick={() => setPrivacyModalOpen(false)}
                  className="bg-charcoal text-white hover:bg-[#202025] transition-all text-[10px] font-bold px-4 py-2 rounded-none uppercase tracking-widest cursor-pointer"
                >
                  Ho letto e accetto
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

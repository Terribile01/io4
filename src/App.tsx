import React, { useState, useRef } from "react";
import { 
  Sparkles, Code, Globe, MessageSquare, TrendingUp, Compass, 
  Menu, X, Phone, Layers, Smartphone, Star, Check, ArrowRight,
  Send, Database, ArrowUpRight, BarChart2, ShieldCheck, Mail, Pin, HelpCircle,
  Clock, CheckCircle, Flame, Server, Laptop, ChevronRight,
  Instagram, Facebook, Linkedin
} from "lucide-react";
import ROICalculator from "./components/ROICalculator";
import AIPlanner from "./components/AIPlanner";
import { LeadSubmission } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [chiSonoModalOpen, setChiSonoModalOpen] = useState(false);
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
    <div className="min-h-screen bg-bg-ivory text-charcoal flex flex-col font-sans relative overflow-x-hidden antialiased select-none">
      
      {/* 1. FLOATING NAVIGATION BAR (GLASSMORPHIC CHIC RECTANGULAR) */}
      <nav className="fixed top-5 left-0 right-0 z-[100] flex items-center justify-center px-4 w-full pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl flex items-center justify-between bg-charcoal/95 backdrop-blur-md rounded-none px-5 py-2.5 shadow-xl border border-white/10 h-14">
          <div className="flex items-center gap-8 pl-1">
            <a 
              href="#hero" 
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-none border border-bg-ivory/50 bg-white/15 flex items-center justify-center shrink-0 font-mono">
                <span className="text-bg-ivory font-black font-display text-sm tracking-widest">FW</span>
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-widest text-[#FFF] group-hover:text-accent-orange transition-colors">
                Facilissimo
              </span>
            </a>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-7">
              <a 
                href="#servizi" 
                className="text-[10px] font-bold uppercase tracking-widest text-[#BDBAB2] hover:text-white transition-colors"
              >
                Servizi
              </a>
              <button
                onClick={() => setChiSonoModalOpen(true)}
                className="text-[10px] font-bold uppercase tracking-widest text-[#BDBAB2] hover:text-white transition-colors cursor-pointer"
              >
                Chi Sono
              </button>
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
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#contatti" 
              className="hidden md:flex bg-white text-charcoal hover:bg-bg-ivory transition-all text-[9px] h-9 font-bold px-4 rounded-none items-center justify-center uppercase tracking-wider shrink-0 shadow"
            >
              Parliamo del tuo Progetto
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#BDBAB2] hover:text-white p-1 cursor-pointer pointer-events-auto"
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
            className="fixed inset-x-4 top-[84px] bg-charcoal text-white rounded-none p-6 z-[100] border-2 border-white/20 shadow-2xl flex flex-col gap-4 md:hidden"
            style={{ pointerEvents: 'auto' }}
          >
            <a 
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              href="#servizi" 
              className="text-xs uppercase font-bold tracking-widest text-white/80 py-2 border-b border-white/5"
            >
              I Miei Servizi
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setChiSonoModalOpen(true);
              }}
              className="text-xs uppercase font-bold tracking-widest text-white/80 py-2 border-b border-white/5 text-left cursor-pointer"
            >
              Chi Sono
            </button>
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
              href="#contatti" 
              className="text-xs uppercase font-bold tracking-widest text-charcoal bg-white py-3 px-4 rounded-none hover:bg-bg-ivory transition-all text-center block mt-2 shadow font-semibold"
            >
              Parliamo del tuo Progetto
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 space-y-24 md:space-y-40 mt-12">
          <>
            {/* 2. HERO LANDING SECTION */}
        <section className="pt-24 md:pt-36 flex flex-col items-center text-center relative max-w-4xl mx-auto pb-10" id="hero">
          {/* Active Work Tag */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-charcoal text-white rounded-none px-4 py-1.5 text-[9px] uppercase font-bold tracking-widest flex items-center gap-2 mb-6 shadow-md"
          >
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full live-beacon"></span>
            Maria Teresa Rogani • Freelance Web Designer &amp; Lead Generation
          </motion.div>

          <h1
            className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter text-charcoal leading-[1.05]"
          >
            Siti Web che vendono: Design e Strategia
          </h1>
          <div className="w-24 h-2 grad-sunset mx-auto mt-4 rounded-full"></div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-grey mt-6 max-w-2xl leading-relaxed font-sans font-light"
          >
            Sono Maria Teresa, freelance specializzata nella creazione di siti web moderni e sistemi per generare nuovi contatti. Ti aiuto a far crescere il tuo business con soluzioni dirette, efficaci e facili da gestire.
          </motion.p>

          {/* Quick Pillar Badge Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2.5 justify-center items-center mt-8"
          >
            {["WordPress, Wix & Squarespace", "Codice React su Misura", "Lead Generation Strategica", "Campagne ADS (Meta & Google)"].map((tag, idx) => (
              <span 
                key={idx} 
                className="text-[10px] font-bold bg-white text-charcoal px-3 py-1.5 border border-line-ivory rounded-none shadow-sm flex items-center gap-1.5 hover:border-accent-orange/40 transition-colors"
              >
                <Check className="w-3 h-3 text-accent-pink" />
                {tag}
              </span>
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
              className="bg-transparent border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-white transition-all font-bold px-8 py-4 rounded-none flex items-center justify-center uppercase tracking-widest text-[11px] w-full sm:w-auto cursor-pointer"
            >
              Cosa Posso Fare Per Te
            </a>
          </motion.div>
        </section>

        {/* 3. CORE VALUE PROPOSITIONS SERVICES */}
        <section className="space-y-12" id="servizi">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-pink bg-accent-pink/10 px-3.5 py-1 rounded-none">
              Servizi Freelance
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-2">
              Soluzioni Semplici per Crescere Online
            </h2>
            <p className="text-xs text-muted-grey">
              Ti aiuto a costruire una presenza digitale forte che attira nuovi clienti ogni giorno.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Box 1: Web Design Sartoriale */}
            <div className="glass-panel rounded-3xl p-6 border border-line-ivory flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-4">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold">Sito Web Professionale</h3>
                <p className="text-xs text-muted-grey leading-relaxed">
                  Realizzo il tuo sito web su misura, veloce e ottimizzato per i motori di ricerca. Che tu preferisca WordPress per gestirlo in autonomia o una soluzione su misura in codice per prestazioni massime, ho la soluzione giusta.
                </p>
              </div>
              <div className="pt-6 border-t border-line-ivory/50 mt-6 flex justify-between items-center text-xs">
                <span className="font-medium text-charcoal font-mono">Web Design</span>
                <a href="#comparativa" className="text-accent-blue hover:underline flex items-center gap-1">
                  Scopri di più <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Box 2: Lead Generation Specialist */}
            <div className="glass-panel rounded-3xl p-6 border border-line-ivory flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-accent-pink/10 flex items-center justify-center text-accent-pink mb-4">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold">Trovare Nuovi Clienti</h3>
                <p className="text-xs text-muted-grey leading-relaxed">
                  Non solo un bel sito, ma uno strumento che lavora per te. Creo sistemi per raccogliere contatti di persone interessate ai tuoi servizi e automatizzo il processo per farti risparmiare tempo prezioso.
                </p>
              </div>
              <div className="pt-6 border-t border-line-ivory/50 mt-6 flex justify-between items-center text-xs">
                <span className="font-medium text-charcoal font-mono">Lead Gen</span>
                <a href="#calcolatore" className="text-accent-pink hover:underline flex items-center gap-1">
                  Prova il simulatore <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Box 3: Social & Ads Management */}
            <div className="glass-panel rounded-3xl p-6 border border-line-ivory flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-accent-orange/10 flex items-center justify-center text-accent-orange mb-4">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold font-semibold text-charcoal">Pubblicità Google e Meta</h3>
                <p className="text-xs text-muted-grey leading-relaxed">
                  Porto traffico qualificato sul tuo sito attraverso campagne pubblicitarie mirate su Google, Facebook e Instagram. Massimizziamo insieme il tuo budget per ottenere il miglior risultato possibile.
                </p>
              </div>
              <div className="pt-6 border-t border-line-ivory/50 mt-6 flex justify-between items-center text-xs">
                <span className="font-medium text-charcoal font-mono">Marketing</span>
                <a href="#contatti" className="text-accent-orange hover:underline flex items-center gap-1">
                  Chiedi info <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. COMPARISON CHART SECTION (CLASSIC VS DESIGN CODE) */}
        <section className="space-y-12" id="comparativa">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
                La Tecnologia Giusta
              </span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal leading-tight">
                WordPress o Codice Su Misura?
              </h2>
              <p className="text-sm text-muted-grey leading-relaxed">
                Non esiste una soluzione universale. Se hai bisogno di un sito semplice da aggiornare da solo, <strong>WordPress</strong> è la scelta migliore. Se invece cerchi il massimo della velocità e un design unico, un sito in <strong>codice puro</strong> ti darà quel vantaggio competitivo necessario oggi.
              </p>
              <div className="space-y-4 text-xs font-semibold">
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <p className="text-charcoal/90">
                    WordPress: Ideale per blog, piccoli siti e per chi vuole gestire i testi in autonomia.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <p className="text-charcoal/90">
                    Codice Custom: Il top per velocità e sicurezza. Google lo ama perché è leggerissimo.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Contrast Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card Metodo Classico */}
              <div className="bg-white border border-line-ivory rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden group hover:border-[#BF5AF2]/35 transition-all">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#BF5AF2]/5 rounded-bl-3xl pointer-events-none transition-all group-hover:scale-130"></div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#BF5AF2] bg-[#BF5AF2]/10 px-2 py-0.5 rounded">
                  FACILE E VELOCE
                </span>
                <h4 className="font-display text-base font-bold text-charcoal">WordPress &amp; Co.</h4>
                <p className="text-[11px] text-muted-grey leading-relaxed">
                  Perfetto per chi vuole un sito professionale in tempi brevi.
                </p>
                <div className="space-y-2 text-[10px] text-charcoal pt-3 border-t border-line-ivory/50">
                  <div className="flex justify-between font-mono"><span>Gestione:</span><strong>Autonoma al 100%</strong></div>
                  <div className="flex justify-between font-mono"><span>Consegna:</span><strong>1-2 settimane</strong></div>
                  <div className="flex justify-between font-mono"><span>Costo:</span><strong>Contenuto</strong></div>
                  <div className="flex justify-between font-mono"><span>Performance:</span><b>Standard</b></div>
                </div>
              </div>

              {/* Card Pure Code Level */}
              <div className="bg-charcoal text-white rounded-2xl p-6 shadow-md space-y-4 relative overflow-hidden group hover:shadow-lg transition-all">
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent-orange/10 rounded-bl-3xl pointer-events-none transition-all group-hover:scale-130"></div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-accent-orange bg-accent-orange/10 px-2.5 py-0.5 rounded">
                  MASSIME PRESTAZIONI
                </span>
                <h4 className="font-display text-base font-bold text-white flex items-center gap-1">
                  Codice Puro <Code className="w-4 h-4 text-accent-orange" />
                </h4>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Creato riga per riga per chi vuole solo il meglio.
                </p>
                <div className="space-y-2 text-[10px] text-white/80 pt-3 border-t border-white/10">
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
        <section className="space-y-8 scroll-mt-24" id="calcolatore">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange bg-accent-orange/10 px-3.5 py-1 rounded-full">
              Strumento di Calcolo
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-charcoal">
              Quanto puoi guadagnare con la pubblicità?
            </h2>
            <p className="text-xs text-muted-grey">
              Usa questo simulatore per capire quanto può rendere il tuo investimento in pubblicità. Un sito che funziona meglio ti permette di ottenere più clienti a parità di spesa.
            </p>
          </div>

          <ROICalculator />
        </section>

        {/* 6. INTERACTIVE WIDGET 2: THE AI PLANNER (GEMINI INTEGRATION) */}
        <section className="space-y-12 scroll-mt-24" id="ai-planner">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#BF5AF2] bg-[#BF5AF2]/10 px-3.5 py-1 rounded-full flex items-center justify-center gap-1 mx-auto w-max">
              Assistente Strategico <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-charcoal">
              Ricevi un'Idea di Strategia Subito
            </h2>
            <p className="text-xs text-muted-grey">
              Rispondi a qualche domanda sulla tua attività e riceverai immediatamente alcuni suggerimenti su come migliorare la tua presenza online per trovare più contatti.
            </p>
          </div>

          <AIPlanner />
        </section>




        {/* 11. LEAD INTAKE CONTACT FORM WORKFLOW */}
        <section className="space-y-12 scroll-mt-24 pb-16" id="contatti">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange bg-accent-orange/10 px-3.5 py-1 rounded-full">
              Inizia Ora
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-charcoal">
              Raccontami il Tuo Progetto
            </h2>
            <p className="text-xs text-muted-grey">
              Compila il modulo qui sotto. Riceverò i tuoi dati e ti ricontatterò per fissare una breve chiamata gratuita.
            </p>
          </div>

          <div className="glass-panel rounded-none p-6 md:p-8 border border-line-ivory max-w-2xl mx-auto shadow-md relative overflow-hidden">
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
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal">Nome dell'Attività <span className="text-accent-pink">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Es. Officina del Gusto Verona"
                        className="w-full px-3 py-2 bg-white border border-line-ivory rounded-none text-xs focus:outline-none focus:border-accent-blue"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal">Nicchia / Settore</label>
                      <select 
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-line-ivory rounded-none text-xs focus:outline-none focus:border-accent-blue"
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
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal">Il Tuo Nome <span className="text-accent-pink">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Es. Matteo Bianchi"
                        className="w-full px-3 py-2 bg-white border border-line-ivory rounded-none text-xs focus:outline-none focus:border-accent-blue"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal">La Tua E-mail <span className="text-accent-pink">*</span></label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Es. m.bianchi@email.it"
                        className="w-full px-3 py-2 bg-white border border-line-ivory rounded-none text-xs focus:outline-none focus:border-accent-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal">Numero Telefonico</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Consigliato, Es: +39 340 9876543"
                        className="w-full px-3 py-2 bg-white border border-line-ivory rounded-none text-xs focus:outline-none focus:border-accent-blue font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal">Budget Stimato</label>
                      <select 
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-line-ivory rounded-none text-xs focus:outline-none focus:border-accent-blue"
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
        </section>
          </>
      </main>

      {/* 12. HIGH END GRAPHICAL SLATE FOOTER */}
      <footer className="bg-charcoal text-white pt-16 pb-10 px-6 sm:px-10 rounded-none border-t border-white/10 relative z-20 mt-16 w-full shrink-0">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Logo Column */}
            <div className="space-y-4 text-left">
              <div className="w-10 h-10 rounded-none border border-white/20 bg-white/10 flex items-center justify-center font-mono">
                <span className="text-white font-black font-display text-base tracking-widest">FW</span>
              </div>
              <h4 className="font-display font-black text-xs uppercase tracking-widest text-white">Facilissimo Web</h4>
              <p className="text-xs text-[#BDBAB2] leading-relaxed font-sans font-light">
                Metodo d'eccellenza per la digitalizzazione delle imprese locali in tutta Italia. Sviluppo custom-code, design, visibilità e monetizzazione.
              </p>
            </div>

            {/* Services Links column */}
            <div className="space-y-4 text-left">
              <h5 className="text-[10px] uppercase tracking-widest font-bold text-accent-orange">Servizi Principali</h5>
              <ul className="text-xs text-[#BDBAB2] space-y-2.5">
                <li><a href="#comparativa" className="hover:text-white transition-colors">Siti in Vero Codice (React)</a></li>
                <li><a href="#comparativa" className="hover:text-white transition-colors">Web Design Classico (WP/Wix)</a></li>
                <li><a href="#servizi" className="hover:text-white transition-colors">Campagne Pubblicitarie ADS</a></li>
                <li><a href="#servizi" className="hover:text-white transition-colors">Sistemi di Lead Generation</a></li>
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
            className="fixed bottom-0 inset-x-0 bg-charcoal text-white border-t border-white/10 shadow-2xl p-4 sm:p-5 z-[200] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-left max-w-3xl space-y-1">
              <h5 className="text-[10px] uppercase font-bold text-accent-orange tracking-widest font-mono">Informativa sui Cookie &amp; Tracciamenti</h5>
              <p className="text-[11px] text-[#BDBAB2] leading-relaxed">
                Questo sito utilizza esclusivamente cookie tecnici di sessione per garantire il corretto funzionamento dei simulatori interattivi (es. CRM e AI Planner). Questi cookie non profilano le tue abitudini e scadono automaticamente al termine della navigazione.
              </p>
            </div>
            <button 
              onClick={() => {
                try {
                  sessionStorage.setItem("fw_cookies_accepted", "true");
                } catch {}
                setCookiesAccepted(true);
              }}
              className="bg-white text-charcoal hover:bg-bg-ivory transition-all text-[10px] font-bold px-5 py-2 rounded-none uppercase tracking-widest shrink-0 shadow cursor-pointer w-full sm:w-auto text-center"
            >
              Accetto Cookie di Sessione
            </button>
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
                <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden shrink-0 shadow-lg border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
                    alt="Maria Teresa Rogani"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="space-y-4 text-left flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C7BE] bg-[#00C7BE]/10 px-3 py-1 rounded-full">
                    Freelance al tuo fianco
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-charcoal">
                    Chi Sono: Maria Teresa Rogani
                  </h3>
                  <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed font-sans font-light">
                    Sono una libera professionista che aiuta le piccole e medie imprese a farsi strada nel mondo digitale. Mi occupo di creare siti web che funzionano davvero e di portare nuovi clienti attraverso strategie di marketing mirate.
                  </p>
                  <p className="text-xs md:text-sm text-muted-grey leading-relaxed font-sans font-light">
                    A differenza delle grandi agenzie, con me avrai un rapporto diretto e trasparente. Il mio obiettivo è farti ottenere risultati concreti, senza tecnicismi inutili, lavorando insieme per far crescere la tua attività.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal">
                      <Check className="w-4 h-4 text-green-500 font-bold" /> Rapporto Diretto
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal">
                      <Check className="w-4 h-4 text-green-500 font-bold" /> Zero Costi Nascosti
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal">
                      <Check className="w-4 h-4 text-green-500 font-bold" /> Risultati Concreti
                    </div>
                  </div>

                  <div className="pt-6">
                    <a
                      href="https://wa.me/390000000000"
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

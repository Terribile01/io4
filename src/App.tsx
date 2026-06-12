import React, { useState, useCallback } from "react";
import { 
  Sparkles, MessageSquare, X, Check,
  Send, CheckCircle, ChevronRight
} from "lucide-react";
import ROICalculator from "./components/ROICalculator";
import AIPlanner from "./components/AIPlanner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ServicesSection } from "./components/ServicesSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { MarqueeBanner } from "./components/MarqueeBanner";
import { CMS_LOGOS, DEV_LOGOS, AI_LOGOS } from "./constants/logos";
import { Footer } from "./components/Footer";
import { ChatWidget } from "./components/ChatWidget";
import ContactForm from "./components/ContactForm";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";

export const SERVICES_DATA = {
  "WordPress, Wix & Squarespace": {
    title: "Web Design Classico",
    description: "La soluzione ideale per chi cerca un sito professionale, elegante e facile da gestire in totale autonomia.",
    technicalSheet: [
      { label: "Piattaforma", value: "WordPress / Wix / Squarespace" },
      { label: "Tempi di Consegna", value: "10-15 giorni lavorativi" },
      { label: "Target", value: "Liberi professionisti, Piccole Imprese, Blog" },
      { label: "Punti di Forza", value: "Facilità di aggiornamento, Costi contenuti" },
      { label: "Manutenzione", value: "Semplice / Autonoma" }
    ],
    whatsappMessage: "Ciao Maria Teresa! Vorrei informazioni per un sito WordPress/Wix. Ho visto la scheda tecnica sul sito."
  },
  "Codice React su Misura": {
    title: "Sviluppo Custom (React)",
    description: "Siti web ad altissime prestazioni, costruiti riga per riga per velocità estrema e design unico senza limiti.",
    technicalSheet: [
      { label: "Tecnologia", value: "React / Vite / Tailwind CSS" },
      { label: "Tempi di Consegna", value: "3-5 settimane" },
      { label: "Target", value: "Startup, Aziende High-End, Progetti SEO-focused" },
      { label: "Punti di Forza", value: "Velocità istantanea, Sicurezza totale, Design unico" },
      { label: "Manutenzione", value: "Inclusa / Tecnica" }
    ],
    whatsappMessage: "Ciao Maria Teresa! Sono interessato a un sito in codice puro (React). Vorrei capire come scalare le prestazioni."
  },
  "Lead Generation Strategica": {
    title: "Sistemi di Acquisizione",
    description: "Non solo un sito, ma un ecosistema progettato per trasformare i visitatori in contatti pronti all'acquisto.",
    technicalSheet: [
      { label: "Strumenti", value: "Funnel, Automazioni Email, CRM Integration" },
      { label: "Tempi di Consegna", value: "20-30 giorni (Setup)" },
      { label: "Target", value: "Attività locali e B2B che hanno bisogno di nuovi clienti" },
      { label: "Punti di Forza", value: "Automazione, Tracciamento ROI, Scalabilità" },
      { label: "Obiettivo", value: "Generazione contatti qualificati" }
    ],
    whatsappMessage: "Ciao Maria Teresa! Vorrei creare un sistema per trovare nuovi clienti (Lead Generation). Possiamo parlarne?"
  },
  "Campagne ADS (Meta & Google)": {
    title: "Advertising & Visibilità",
    description: "Strategie pubblicitarie mirate per portare traffico profilato e ottenere risultati immediati sui tuoi investimenti.",
    technicalSheet: [
      { label: "Canali", value: "Google Search, Meta (FB/IG) Ads" },
      { label: "Frequenza", value: "Gestione Mensile" },
      { label: "Target", value: "Chi vuole vendere subito o aumentare la notorietà" },
      { label: "Punti di Forza", value: "Risultati veloci, Analisi dati continua" },
      { label: "Budget Consigliato", value: "Minimo €300/mese (escl. gestione)" }
    ],
    whatsappMessage: "Ciao Maria Teresa! Vorrei lanciare delle campagne pubblicitarie (Google/Meta). Mi aiuti a gestire il budget?"
  }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<keyof typeof SERVICES_DATA | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(() => {
    try {
      return sessionStorage.getItem("fw_cookies_accepted") === "true";
    } catch {
      return false;
    }
  });
  
  const handleServiceSelect = useCallback((service: keyof typeof SERVICES_DATA) => {
    setSelectedService(service);
  }, []);

  const handleAboutOpen = useCallback(() => {
    setAboutOpen(true);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const handlePrivacyOpen = useCallback(() => {
    setPrivacyModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col font-sans relative overflow-x-hidden antialiased select-none">
      <Helmet>
        <title>Facilissimo Web | Creazione Siti Web e Strategia Lead Generation a Macerata</title>
        <meta name="description" content="Siti web professionali, veloci e ottimizzati per vendere. Freelance Web Designer a Macerata specializzata in Lead Generation, React e Marketing per piccole imprese." />
        <meta name="keywords" content="web designer macerata, creazione siti web macerata, lead generation macerata, siti web react, marketing piccole imprese" />
        <link rel="canonical" href="https://facilissimo-web.vercel.app/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://facilissimo-web.vercel.app/" />
        <meta property="og:title" content="Facilissimo Web | Siti Web che vendono a Macerata" />
        <meta property="og:description" content="Trasforma i visitatori in clienti. Web Design e Strategia Digitale per microimprese e professionisti a Macerata." />
        <meta property="og:image" content="https://facilissimo-web.vercel.app/assets/uploads/logo-facilissimo.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://facilissimo-web.vercel.app/" />
        <meta property="twitter:title" content="Facilissimo Web | Strategia Digital per Piccole Imprese" />
        <meta property="twitter:description" content="Web Design e Lead Generation a Macerata. Soluzioni digitali semplici ed efficaci." />
      </Helmet>

      {/* Global Site Background with Dark Consistent Overlay for Legibility */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: 'url("/assets/uploads/facilissimo%20web%20web%20design%20siti%20web.webp")' }}
        />
        {/* Consistent Deep Overlay Tint (Purple/Black blend) */}
        <div className="absolute inset-0 bg-[#0A0015]/85 mix-blend-multiply"></div>
        {/* Blur to keep UI elements isolated from background details */}
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
      </div>

      <Navbar
        onAboutOpen={handleAboutOpen}
        onServiceSelect={handleServiceSelect}
        onMobileMenuToggle={handleMobileMenuToggle}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* MOBILE MENU PORTAL - Z-INDEX 100 TO STAND OVER ALL CELLULAR OVERLAYS */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed inset-x-4 top-[84px] md:right-4 md:left-auto md:w-80 glass-purple-50 text-white rounded-none p-6 z-[100] flex flex-col gap-4"
            style={{ pointerEvents: 'auto' }}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAboutOpen(true);
              }}
              className="text-left text-xs uppercase font-bold tracking-widest text-white/95 py-2 border-b border-white/5"
            >
              Chi Sono
            </button>
            <div className="space-y-2 border-b border-white/5 pb-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-white/40 block mb-1">
                I Miei Servizi
              </span>
              <div className="grid grid-cols-1 gap-1">
                {Object.keys(SERVICES_DATA).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleServiceSelect(key as keyof typeof SERVICES_DATA);
                    }}
                    className="text-left text-[11px] uppercase font-bold tracking-widest text-white/90 py-2.5 px-3 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {SERVICES_DATA[key as keyof typeof SERVICES_DATA].title.replace('Web Design Classico', 'Web Design').replace('Sviluppo Custom (React)', 'Sviluppo React').replace('Sistemi di Acquisizione', 'Lead Generation').replace('Advertising & Visibilità', 'Marketing & Ads')}
                  </button>
                ))}
              </div>
            </div>
            <a 
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              href="#comparativa" 
              className="text-xs uppercase font-bold tracking-widest text-white/95 py-2 border-b border-white/5"
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
              className="text-xs uppercase font-bold tracking-widest text-white btn-brand py-3 px-4 rounded-none text-center block mt-2 shadow font-bold"
            >
              Parliamo del tuo Progetto
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHI SONO SIDE DRAWER */}
      <AnimatePresence>
        {aboutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAboutOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-purple-50 z-[210] overflow-y-auto border-l border-white/10"
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="font-display text-2xl font-black uppercase tracking-tighter">Chi Sono</h2>
                  <button
                    onClick={() => setAboutOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/90 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src="/assets/uploads/maria%20teresa%20rogani.jpg"
                      alt="Maria Teresa Rogani"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C7BE] bg-[#00C7BE]/10 px-3 py-1">
                      Freelance al tuo fianco
                    </span>
                    <h3 className="font-display text-2xl font-bold">Maria Teresa Rogani</h3>
                    <p className="text-sm text-white/90 leading-relaxed font-light">
                      Il mio approccio al web nasce da basi solide: un diploma in Grafica Pubblicitaria e una laurea in Comunicazione Visiva. Questo mi permette di non limitarmi all'aspetto estetico, ma di costruire progetti dove la forma serve la funzione.
                    </p>
                    <p className="text-sm text-white/95 leading-relaxed font-light">
                      Con Facilissimo Web, aiuto le microimprese a costruire una presenza digitale consapevole e autonoma. Mi occupo di creare siti Web che funzionano davvero e presentarti a nuovi clienti attraverso strategie di marketing mirate.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent-orange mb-2">Competenze Principali</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-xs font-medium text-white/80 uppercase tracking-wider">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        Grafica Pubblicitaria & Brand Identity
                      </li>
                      <li className="flex items-center gap-2 text-xs font-medium text-white/80 uppercase tracking-wider">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        Comunicazione Visiva & UX Design
                      </li>
                      <li className="flex items-center gap-2 text-xs font-medium text-white/80 uppercase tracking-wider">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        Web Design & Sviluppo Strategico
                      </li>
                      <li className="flex items-center gap-2 text-xs font-medium text-white/80 uppercase tracking-wider">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        Marketing per Microimprese
                      </li>
                      <li className="flex items-center gap-2 text-xs font-medium text-white/80 uppercase tracking-wider">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        Consulenza Digitale Indipendente
                      </li>
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => {
                        setAboutOpen(false);
                        window.location.hash = "#contatti";
                      }}
                      className="w-full btn-brand text-white font-bold py-4 rounded-none uppercase tracking-widest text-xs cursor-pointer transition-all"
                    >
                      Lavoriamo Insieme
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full space-y-24 md:space-y-40 mt-12">
        {/* Branding Separator 1 */}
        <div className="flex justify-center -mb-16 md:-mb-24 opacity-40 max-w-7xl mx-auto px-4 md:px-8">
          <img
            src="/assets/uploads/logo-facilissimo.jpg"
            alt=""
            className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full border border-white/10"
          />
        </div>

        <Hero onServiceSelect={handleServiceSelect} />

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ServicesSection />
        </div>

        {/* Branding Separator 2 */}
        <div className="flex justify-center py-10 opacity-30 max-w-7xl mx-auto px-4 md:px-8">
          <img
            src="/assets/uploads/logo-facilissimo.jpg"
            alt=""
            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full border border-white/5"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ComparisonSection />
        </div>

        <MarqueeBanner logos={DEV_LOGOS} color="accent-blue" />

        {/* 5. INTERACTIVE WIDGET 1: THE ROI CONVERSION CALCULATOR */}
        <section className="space-y-8 scroll-mt-24 max-w-7xl mx-auto px-4 md:px-8" id="calcolatore">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange bg-accent-orange/10 px-3.5 py-1 rounded-full">
              Strumento di Calcolo
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white/95">
              Quanto puoi guadagnare con la pubblicità?
            </h2>
            <p className="text-xs text-white/95">
              Usa questo simulatore per capire quanto può rendere il tuo investimento in pubblicità. Un sito che funziona meglio ti permette di ottenere più clienti a parità di spesa.
            </p>
          </div>

          <ROICalculator />
        </section>

        {/* 6. INTERACTIVE WIDGET 2: THE AI PLANNER (GEMINI INTEGRATION) */}
        <section className="space-y-12 scroll-mt-24 max-w-7xl mx-auto px-4 md:px-8" id="ai-planner">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#BF5AF2] bg-[#BF5AF2]/10 px-3.5 py-1 rounded-full flex items-center justify-center gap-1 mx-auto w-max">
              Assistente Strategico <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white/95 uppercase">
              Ricevi una Strategia di Crescita
            </h2>
            <p className="text-xs text-white/95">
              Rispondi a qualche domanda sulla tua attività e riceverai immediatamente alcuni suggerimenti su come migliorare la tua presenza online per trovare più contatti.
            </p>
          </div>

          <AIPlanner />
        </section>

        <MarqueeBanner logos={AI_LOGOS} color="accent-blue" />

        {/* 11. LEAD INTAKE CONTACT FORM WORKFLOW */}
        <section className="space-y-12 scroll-mt-24 pb-16 max-w-7xl mx-auto px-4 md:px-8" id="contatti">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange bg-accent-orange/10 px-3.5 py-1 rounded-full">
              Inizia Ora
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white/95 uppercase">
              Parliamo del Tuo Progetto
            </h2>
            <p className="text-xs text-white/95">
              Compila il modulo qui sotto. Riceverò i tuoi dati e ti ricontatterò per fissare una breve chiamata gratuita.
            </p>
          </div>

          <ContactForm />
        </section>
      </main>

      <Footer
        onPrivacyOpen={handlePrivacyOpen}
        onAboutOpen={handleAboutOpen}
        onServiceSelect={handleServiceSelect}
      />

      <ChatWidget />

      {/* COOKIES DISCLAIMER (USO COOKIES SOLO PER LA SESSIONE) */}
      <AnimatePresence>
        {!cookiesAccepted && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 inset-x-0 glass-purple-50 text-white border-t border-white/10 p-4 sm:p-5 z-[200] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-left max-w-3xl space-y-1">
              <h5 className="text-[10px] uppercase font-bold text-accent-orange tracking-widest font-mono">Informativa sui Cookie &amp; Tracciamenti</h5>
              <p className="text-[11px] text-white/90 leading-relaxed">
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
              className="text-white btn-brand text-[10px] font-bold px-5 py-2 rounded-none uppercase tracking-widest shrink-0 shadow cursor-pointer w-full sm:w-auto text-center"
            >
              Accetto Cookie di Sessione
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SERVICE TECHNICAL SHEET MODAL */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 bg-black/80 z-[300] backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-purple-50 max-w-lg w-full p-6 md:p-8 space-y-6 rounded-none shadow-2xl overflow-y-auto max-h-[90vh] text-left relative"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange">Scheda Tecnica</span>
                  <h4 className="font-display font-black text-2xl text-white tracking-tighter uppercase">
                    {SERVICES_DATA[selectedService].title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-white/60 hover:text-white p-1 cursor-pointer transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-white/90 leading-relaxed font-light italic">
                  "{SERVICES_DATA[selectedService].description}"
                </p>

                <div className="space-y-3">
                  <h5 className="text-[11px] font-bold uppercase tracking-widest text-white/50 border-l-2 border-accent-purple pl-2">Specifiche del Servizio</h5>
                  <div className="grid grid-cols-1 gap-2.5">
                    {SERVICES_DATA[selectedService].technicalSheet.map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 text-[11px]">
                        <span className="text-white/60 uppercase font-bold tracking-tight">{item.label}</span>
                        <span className="text-white font-mono font-bold text-right ml-4">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-[10px] text-white/80 leading-snug">
                      Include 15 minuti di call conoscitiva gratuita per definire i dettagli.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/393793603321?text=${encodeURIComponent(SERVICES_DATA[selectedService].whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-brand hover:shadow-xl hover:scale-[1.02] transition-all text-white font-bold py-4 rounded-none flex items-center justify-center gap-2 uppercase tracking-widest text-[11px] shadow-lg"
                  >
                    Prenota Consulenza Gratuita <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRIVACY POLICY MODAL (GDPR) */}
      <AnimatePresence>
        {privacyModalOpen && (
          <div className="fixed inset-0 bg-black/85 z-[200] backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-purple-50 max-w-md w-full p-6 md:p-8 space-y-4 rounded-none shadow-2xl overflow-y-auto max-h-[85vh] text-left border border-white/10"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h4 className="font-display font-bold text-lg text-white/95">Privacy Policy &amp; GDPR</h4>
                <button 
                  onClick={() => setPrivacyModalOpen(false)}
                  className="text-white/95 hover:text-white/95 p-1 cursor-pointer font-bold font-mono text-xs"
                >
                  CHIUDI [X]
                </button>
              </div>
              <div className="space-y-3 text-[11px] text-white/95 leading-relaxed">
                <p>
                  <strong>1. TITOLARE DEL TRATTAMENTO:</strong><br />
                  Il titolare del trattamento è Maria Teresa Rogani per FACILISSIMO WEB / FW di Maria Teresa Rogani.
                </p>
                <p>
                  <strong>2. DATI RACCOLTI:</strong><br />
                  La compilazione dei moduli interattivi (AI Planner) acquisisce in sicurezza dati quali nome dell'attività, nome del contatto, telefono e risposte di target strategico.
                </p>
                <p>
                  <strong>3. FINALITÀ:</strong><br />
                  I dati raccolti sono trattati al solo scopo di formulare la risposta simulata, preparare l'audit computazionale dell'AI e organizzare l'eventuale contatto su WhatsApp. Nessun dato viene ceduto a terzi.
                </p>
                <p>
                  <strong>4. COOKIES DI SESSIONE:</strong><br />
                  Utilizziamo solo cookie temporanei (session storage) per identificare lo stato delle selezioni dell'utente correnti. Questi spariscono chiudendo la finestra del browser.
                </p>
                <p>
                  <strong>5. DIRITTI DELL'INTERESSATO:</strong><br />
                  Ai sensi del Regolamento GDPR 2016/679, puoi chiedere in ogni momento la cancellazione, rettifica o visione dei tuoi dati contattandomi su WhatsApp al numero +39 379 360 3321.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button 
                  onClick={() => setPrivacyModalOpen(false)}
                  className="bg-[#121214] text-white hover:bg-[#202025] transition-all text-[10px] font-bold px-4 py-2 rounded-none uppercase tracking-widest cursor-pointer"
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

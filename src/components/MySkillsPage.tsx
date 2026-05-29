import React, { useState } from "react";
import { 
  ArrowLeft, Check, Sparkles, Code, Globe, Database, BarChart2, TrendingUp, ShieldCheck, 
  Terminal, Layers, Cpu, Server, Target, FileText, Settings, Heart, Hourglass, HelpCircle
} from "lucide-react";
import { motion } from "motion/react";

interface MySkillsPageProps {
  onBack: () => void;
  onSelectGoal: (goal: string) => void;
}

export default function MySkillsPage({ onBack, onSelectGoal }: MySkillsPageProps) {
  const [selectedObjective, setSelectedObjective] = useState<string>("speed");

  const businessObjectives = [
    {
      id: "speed",
      title: "Velocità & Performance",
      desc: "Superare i concorrenti su Google e ridurre la frequenza di rimbalzo del traffico mobile.",
      skills: ["Sviluppo React Custom", "Ottimizzazione Core Web Vitals", "Tailwind CSS", "Vite Compiler"],
      metricTitle: "Performance Target",
      metricValue: "Load < 0.5s",
      growthInfo: "+45% Tasso di Conversione stimato da dispositivi mobili"
    },
    {
      id: "leads",
      title: "Lead Generation Militare",
      desc: "Catturare contatti pronti ad acquistare limitando al minimo la dispersione e i costi dei click.",
      skills: ["Architettura Funnel AIDA", "Copywriting Persuasivo", "Integrazione Automatica CRM", "Conversion Rate Optimization (CRO)"],
      metricTitle: "Costo per Lead Promesso",
      metricValue: "-30% ad-spend",
      growthInfo: "Fino al 15% di tasso di compilazione form sui canali Meta Ads"
    },
    {
      id: "precision",
      title: "Tracciamento Omnicanale",
      desc: "Sapere al centesimo quale campagna genera fatturato e addestrare l'algoritmo di Meta e Google.",
      skills: ["Google Tag Manager Server-Side", "Conversions API (CAPI) di Meta", "Google Analytics 4 avanzato", "Attribution Models"],
      metricTitle: "Accuratezza dei Dati",
      metricValue: "99.4% Match",
      growthInfo: "Eliminazione immediata dello spreco di budget pubblicitario non tracciato"
    },
    {
      id: "autonomy",
      title: "Autonomia Operativa (CMS)",
      desc: "Piattaforme eleganti che il tuo team interno può aggiornare in 3 secondi senza dipendere da sviluppatori.",
      skills: ["WordPress & Gutenberg Custom", "Elementor Pro Config", "Squarespace & Wix Studio", "Sistemi E-commerce Leggeri"],
      metricTitle: "Aggiornamento Layout",
      metricValue: "0 dipendenze",
      growthInfo: "Nessun abbonamento mensile a licenze di terze parti non necessarie"
    }
  ];

  const categories = [
    {
      title: "1. Sviluppo Frontend d'Élite",
      subtitle: "Codice puro su misura per chi non ammette compromessi.",
      icon: <Code className="w-5 h-5 text-accent-blue" />,
      tag: "React / TS / Tailwind",
      bgClass: "bg-accent-blue/5 border-accent-blue/15",
      skillsList: [
        { name: "React 18+ & Hooks", level: "Senior Architect" },
        { name: "TypeScript & Type Safety", level: "Robusto, Error-Free" },
        { name: "Tailwind CSS & Fluid layouts", level: "Pixel Perfect" },
        { name: "Vite, esbuild & Bundling", level: "Caricamento istantaneo" },
        { name: "Framer Motion Animations", level: "Interazioni ultra-fluide" },
        { name: "Single Page App (SPA)", level: "Navigazione immediata" }
      ]
    },
    {
      title: "2. CMS & Web Design Classico",
      subtitle: "Unire la flessibilità visiva alla pulizia strutturale.",
      icon: <Globe className="w-5 h-5 text-accent-pink" />,
      tag: "WordPress / WP Engine / Wix Studio",
      bgClass: "bg-accent-pink/5 border-accent-pink/15",
      skillsList: [
        { name: "WordPress Custom Development", level: "Gutenberg & PHP" },
        { name: "Theme & Page Builder tuning", level: "Zero-bloat Elementor" },
        { name: "Squarespace Commerce & Wix", level: "Design Sartoriale" },
        { name: "WooCommerce & Shopify", level: "E-Commerce Fluidi" },
        { name: "Database Optimization (MySQL)", level: "Risanamento tabelle" },
        { name: "Security & Cloud Flare Shielding", level: "Protezione completa" }
      ]
    },
    {
      title: "3. Ingegneria dei Tracciamenti (Tracking)",
      subtitle: "Il cervello silenzioso che sconfigge iOS14 e blocchi pubblicitari.",
      icon: <Database className="w-5 h-5 text-accent-orange" />,
      tag: "Analytics / GTM / Server-Side",
      bgClass: "bg-accent-orange/5 border-accent-orange/15",
      skillsList: [
        { name: "GTM Client & Server-Side", level: "Standard d'Eccellenza" },
        { name: "Meta Conversions API (CAPI)", level: "Integrazione server reale" },
        { name: "GA4 Custom Event Mapping", level: "Modelli di attribuzione" },
        { name: "Google Consent Mode v2", level: "Adeguamento Legale UE" },
        { name: "Pixel / Pinterest / TikTok Tags", level: "Omnicanale" },
        { name: "Privacy Sandbox integration", level: "Cookie-less ready" }
      ]
    },
    {
      title: "4. Campagne ADS & Lead Specialist",
      subtitle: "Convertire il traffico freddo in appuntamenti e vendite ripetute.",
      icon: <TrendingUp className="w-5 h-5 text-[#BF5AF2]" />,
      tag: "Meta Ads / Google Ads & Funnel",
      bgClass: "bg-[#BF5AF2]/5 border-[#BF5AF2]/15",
      skillsList: [
        { name: "Strategie Funnel Multilivello", level: "TOFU / MOFU / BOFU" },
        { name: "Meta Ads (FB & Instagram)", level: "Algoritmo Scaling" },
        { name: "Google Search & Performance Max", level: "Keyword strategiche" },
        { name: "Sviluppo di Magnet Opt-In", level: "E-book & Mini-corsi" },
        { name: "CRM Connection (HubSpot, Lead)", level: "Flussi automatizzati" },
        { name: "A/B Testing Continuo", level: "Risparmio budget" }
      ]
    }
  ];

  const badges = [
    { name: "React Advanced Development", issuer: "Meta Developer Circle" },
    { name: "Google Analytics 4 Certification", issuer: "Google Academy" },
    { name: "Meta Certified Media Buying Specialist", issuer: "Meta Blueprint" },
    { name: "Google GTM Server-Side Advanced", issuer: "Analytics Academy" },
    { name: "Conversion Rate Optimization Master", issuer: "CXL Institute" },
    { name: "Securing Database Interfaces", issuer: "OWASP Standard" }
  ];

  const currentObj = businessObjectives.find(o => o.id === selectedObjective) || businessObjectives[0];

  const handleApplyObjective = () => {
    // Determine target goals category for contact form map
    let targetGoal = "Creare un nuovo Sito Web da zero";
    if (selectedObjective === "speed") {
      targetGoal = "Sviluppare un Sito in Codice Custom (React)";
    } else if (selectedObjective === "leads") {
      targetGoal = "Campagne Lead Generation (Meta & Google ADS)";
    } else if (selectedObjective === "precision") {
      targetGoal = "Ingegneria dei Tracciamenti e Analytics";
    } else if (selectedObjective === "autonomy") {
      targetGoal = "Rifare/Ottimizzare un sito WordPress o CMS";
    }
    
    onSelectGoal(targetGoal);
  };

  return (
    <div className="space-y-24 md:space-y-32 py-10 select-none text-left" id="skills-page-wrapper">
      
      {/* HEADER BAR AND BACK TRIGGER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-line-ivory pb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#BDBAB2] hover:text-charcoal transition-colors bg-white px-4 py-2 border border-line-ivory shadow-sm rounded-none pointer-events-auto cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-charcoal" /> Torna alla Home
        </button>
        <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#BDBAB2]">
          Maria Teresa Rogani • Competenze Tecnologiche
        </span>
      </div>

      {/* 2. CHIC INTRO HEADLINE */}
      <section className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-accent-blue/10 text-accent-blue text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-none border border-accent-blue/20">
          <Sparkles className="w-3.5 h-3.5" /> Competenze Multidisciplinari
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter text-charcoal leading-[1.05]">
          Dove il <span className="text-transparent bg-clip-text grad-sunset">Codice ad Alte Prestazioni</span> incontra l'Ingegneria dei Dati.
        </h1>
        <p className="text-sm md:text-base text-muted-grey max-w-2xl font-light leading-relaxed">
          Nessun'agenzia impersonale, nessun intermediario. Metto a tua disposizione un arsenale completo di competenze tecniche e di marketing finalizzate a un solo scopo: <strong>estrarre lead puliti e massimizzare i tuoi profitti digitali.</strong>
        </p>
      </section>

      {/* 3. THE INTERACTIVE WORK TARGETS SIMULATOR */}
      <section className="glass-panel border border-line-ivory p-6 md:p-8 bg-white/50 space-y-8" id="interactive-skills-selector">
        <div className="space-y-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-accent-pink bg-accent-pink/10 px-2.5 py-0.5 rounded-none font-mono">
            Simulatore Strategico di Competenze
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-charcoal">
            Qual è il tuo Obiettivo di Business Immediato?
          </h3>
          <p className="text-xs text-muted-grey">
            Seleziona la tua area d'interesse per scoprire quali competenze verranno messe in campo e i risultati stimati.
          </p>
        </div>

        {/* Dynamic Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessObjectives.map((obj) => (
            <button
              key={obj.id}
              onClick={() => setSelectedObjective(obj.id)}
              className={`p-4 border text-left flex flex-col justify-between cursor-pointer transition-all select-none rounded-none ${
                selectedObjective === obj.id
                  ? "bg-charcoal border-charcoal text-white shadow-md transform -translate-y-0.5"
                  : "bg-white border-line-ivory hover:border-charcoal/50 text-charcoal"
              }`}
            >
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2">{obj.title}</h4>
                <p className={`text-[11px] leading-relaxed ${
                  selectedObjective === obj.id ? "text-[#BDBAB2]" : "text-muted-grey"
                }`}>
                  {obj.desc}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-dashed border-current/10 mt-4">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Vedi Skills</span>
                <span className="text-xs">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Objective Output Panel */}
        <div className="bg-bg-ivory border border-line-ivory p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-none">
          {/* Target Info */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-[10px] font-bold text-accent-blue uppercase tracking-widest font-mono">
              Integrazione e Stack Attivato
            </span>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-charcoal">Infrastruttura per {currentObj.title}</h4>
              <p className="text-xs text-muted-grey leading-relaxed">
                Questo obiettivo richiede l'unione sinergica di sviluppo e tracciamento. Ecco le mie competenze specifiche pronte ad agire simultaneamente:
              </p>
            </div>

            {/* List of skills utilized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {currentObj.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-charcoal/90">
                  <span className="w-5 h-5 rounded-none bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0 border border-accent-blue/15">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="lg:col-span-5 bg-white border border-line-ivory p-6 space-y-4 rounded-none text-center shadow-inner relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-muted-grey block">
                {currentObj.metricTitle}
              </span>
              <span className="text-2xl md:text-3xl font-display font-black text-charcoal block">
                {currentObj.metricValue}
              </span>
            </div>
            
            <div className="py-2.5 px-3 bg-green-500/10 border border-green-500/20 text-[#21c55d] text-[10px] font-semibold text-center italic rounded-none leading-relaxed">
              {currentObj.growthInfo}
            </div>

            <button 
              onClick={handleApplyObjective}
              className="w-full bg-charcoal text-white hover:bg-black transition-colors py-2.5 rounded-none font-bold text-[9px] uppercase tracking-widest cursor-pointer shadow-sm pointer-events-auto"
            >
              Inizia con questo Setup
            </button>
          </div>
        </div>
      </section>

      {/* 4. EXQUISITE DEEP-DIVE GRID OF ALL CATEGORIES */}
      <section className="space-y-12">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A84FF] bg-[#0A84FF]/10 px-3 py-1 rounded-none font-mono">
            Schede Tecniche di Maria Teresa Rigani
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal">
            Esplora le 4 Macro-Aree di Competenza
          </h2>
          <p className="text-xs text-muted-grey max-w-xl">
            Tutti i linguaggi, i software, le piattaforme e le strategie che padroneggio quotidianamente per i progetti dei clienti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`border p-6 md:p-8 flex flex-col justify-between space-y-6 hover:shadow-lg transition-shadow bg-white rounded-none`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-line-ivory">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-charcoal text-white rounded-none">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-charcoal">{cat.title}</h3>
                      <p className="text-[11px] text-muted-grey">{cat.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-bg-ivory text-charcoal px-2.5 py-1 border border-line-ivory rounded-none">
                    {cat.tag}
                  </span>
                </div>

                {/* Sublist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {cat.skillsList.map((skill, sIdx) => (
                    <div key={sIdx} className="p-3 bg-bg-ivory/40 border border-line-ivory/50 flex flex-col justify-between space-y-1 rounded-none">
                      <span className="text-xs font-bold text-charcoal">{skill.name}</span>
                      <div className="flex items-center gap-1 text-[10px] text-muted-grey font-mono">
                        <span className="w-1.5 h-1.5 bg-accent-orange rounded-full live-beacon" />
                        <span>{skill.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box Footer info */}
              <div className="pt-3 border-t border-line-ivory/60 flex justify-between items-center text-[10px] font-mono text-muted-grey">
                <span>Standard di Qualità ISO</span>
                <span className="text-charcoal font-bold">100% Autonomo</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GTM & ANALYTICS WORKFLOW METHODOLOGY */}
      <section className="glass-panel border-2 border-line-ivory p-6 md:p-12 text-left bg-charcoal text-white rounded-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
        
        <div className="max-w-3xl space-y-8">
          <div className="space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-accent-orange bg-accent-orange/15 px-3 py-1 rounded-none font-mono inline-block">
              La Mia Metodologia Scientifica
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
              Perché lo sviluppo web fallisce senza tracciamento?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#BDBAB2] leading-relaxed">
            <div className="space-y-2">
              <span className="text-white font-mono font-black text-lg block">01 / SVILUPPO</span>
              <p>
                Un sito bello che non carica all'istante uccide il traffico mobile. Integro il codice in React e scarto plugin inutili per garantire la massima velocità di risposta.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-white font-mono font-black text-lg block">02 / TRACCIAMENTO</span>
              <p>
                Con il Server-Side Tracking di GTM e le Conversions API eliminiamo la cecità dei browser sui canali pubblicitari, trasmettendo a Meta dati di acquisto precisi.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-white font-mono font-black text-lg block">03 / SCALING</span>
              <p>
                La precisione dei dati converte l'algoritmo in un dipendente instancabile, concentrando il tuo budget ads esclusivamente su chi è pronto ad acquistare i tuoi servizi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ADVANCED INDUSTRIAL CERTS GRID BAR */}
      <section className="space-y-8 text-center sm:text-left">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#BDBAB2] font-mono">
            Credenziali &amp; Standard Professionali
          </span>
          <h3 className="font-display text-xl font-bold text-charcoal">
            Certificazioni &amp; Standard di Sviluppo
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, idx) => (
            <div key={idx} className="bg-white border border-line-ivory p-4 text-left flex flex-col justify-between space-y-4 rounded-none shadow-sm min-h-[110px]">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-charcoal leading-snug block">{badge.name}</span>
                <span className="text-[9px] text-[#BDBAB2] block">{badge.issuer}</span>
              </div>
              <span className="text-[8px] font-mono bg-bg-ivory text-green-600 px-1.5 py-0.5 border border-line-ivory w-max uppercase font-bold">
                Attivo ✓
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA TERMINAL BLOCK */}
      <section className="text-center max-w-2xl mx-auto space-y-6">
        <h4 className="font-display text-xl font-extrabold text-charcoal">
          Vuoi un esame per risanare la tua attuale infrastruttura?
        </h4>
        <p className="text-xs text-muted-grey leading-relaxed">
          Usa l'AI Planner interno oppure vai direttamente al modulo per inviarmi le specifiche tecniche del tuo sito attuale e concordare un piano d'intervento su misura.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button 
            onClick={() => {
              // Clear page view, navigate to contacts
              onBack();
              setTimeout(() => {
                const el = document.getElementById("contatti");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="w-full sm:w-auto grad-electric text-white font-bold px-6 py-3 text-xs uppercase tracking-widest shadow-lg pointer-events-auto cursor-pointer rounded-none hover:scale-101 transition-transform"
          >
            Parla Direttonamente Con Me
          </button>
          <button 
            onClick={onBack}
            className="w-full sm:w-auto bg-transparent text-charcoal border border-charcoal/30 font-bold px-6 py-3 text-xs uppercase tracking-widest pointer-events-auto cursor-pointer rounded-none hover:bg-charcoal hover:text-white transition-all"
          >
            Esplora Altri Simulatori
          </button>
        </div>
      </section>

    </div>
  );
}

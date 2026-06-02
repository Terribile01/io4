import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Send, Check, AlertCircle, FileText, Calendar, Clock, RotateCcw } from "lucide-react";

export default function AIPlanner() {
  const [step, setStep] = useState(0); // 0 to 4
  const [businessName, setBusinessName] = useState("");
  const [niche, setNiche] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [webType, setWebType] = useState("Da valutare insieme");
  const [budget, setBudget] = useState("Professional (€1.500 - €3.500)");
  const [currentWebsite, setCurrentWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Loading & generation status
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [strategy, setStrategy] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto incremental tips on the loading screen to maximize engagement
  const loadingPhrases = [
    "Analizzando la tua attività...",
    "Studiando i tuoi obiettivi...",
    "Cercando la soluzione tecnica migliore...",
    "Preparando i consigli per trovare più clienti...",
    "Compilando la tua strategia personalizzata...",
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      let idx = 0;
      setLoadingText(loadingPhrases[0]);
      interval = setInterval(() => {
        idx = (idx + 1) % loadingPhrases.length;
        setLoadingText(loadingPhrases[idx]);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleNext = () => {
    if (step === 1 && (!businessName.trim() || !niche.trim())) {
      setErrorMsg("Per favore, inserisci sia il nome del tuo business che il settore.");
      return;
    }
    if (step === 3 && (!clientName.trim() || !email.trim())) {
      setErrorMsg("Per favore, compila almeno Nome e Email per poterti inviare l'analisi.");
      return;
    }
    setErrorMsg(null);
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setErrorMsg(null);
    setStep(prev => Math.max(0, prev - 1));
  };

  const handleGenerate = async () => {
    if (!clientName.trim() || !email.trim()) {
      setErrorMsg("Compila Nome e Email prima di procedere.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setStrategy(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          niche,
          goals,
          budget,
          webType,
          currentWebsite,
          clientName,
          email
        })
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || data.error || "Errore nella comunicazione con il server");
        }
        setStrategy(data.text);
      } else {
        // Fallback for non-JSON responses (like HTML errors from proxy/host)
        const text = await response.text();
        console.error("Unexpected response format:", text);
        throw new Error("Il server ha risposto in un formato non valido. Riprova più tardi.");
      }
      setStep(4); // transition to result
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.message || 
        "Impossibile collegarsi al motore AI. Assicurati che Maria Teresa abbia inserito la API Key nel pannello secrets."
      );
    } finally {
      setLoading(false);
    }
  };

  const restartPlanner = () => {
    setStep(0);
    setBusinessName("");
    setNiche("");
    setGoals([]);
    setWebType("Da valutare insieme");
    setBudget("Professional (€1.500 - €3.500)");
    setCurrentWebsite("");
    setClientName("");
    setEmail("");
    setPhone("");
    setStrategy(null);
    setErrorMsg(null);
  };

  // Safe client-side Markdown-like renderer for structural outputs
  const parseBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <strong key={index} className="font-bold text-white bg-accent-orange/20 px-1 rounded">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  const renderStrategyMarkdown = (rawText: string) => {
    const lines = rawText.split("\n");
    return (
      <div className="space-y-4 text-white/90">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith("### ")) {
            return (
              <h4 key={idx} className="font-display text-lg font-bold text-white pt-4 border-b border-white/10 pb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-orange shrink-0" />
                {trimmed.replace("### ", "")}
              </h4>
            );
          }
          if (trimmed.startsWith("## ")) {
            return (
              <h3 key={idx} className="font-display text-xl font-bold text-white pt-6 pb-2 text-transparent bg-clip-text grad-electric">
                {trimmed.replace("## ", "")}
              </h3>
            );
          }
          if (trimmed.startsWith("# ")) {
            return (
              <h2 key={idx} className="font-display text-2xl font-bold text-white pt-8 mb-2">
                {trimmed.replace("# ", "")}
              </h2>
            );
          }
          if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            const listText = trimmed.replace(/^[-*]\s+/, "");
            return (
              <div key={idx} className="flex gap-2 pl-3 items-start my-1 text-sm">
                <span className="text-accent-pink shrink-0 mt-1.5 font-bold">•</span>
                <span className="leading-relaxed">{parseBold(listText)}</span>
              </div>
            );
          }
          if (trimmed === "") {
            return <div key={idx} className="h-1"></div>;
          }
          return (
            <p key={idx} className="text-sm leading-relaxed my-2 text-white/70">
              {parseBold(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl max-w-4xl mx-auto" id="ai-planner-wizard">
      {/* ERROR BANNER */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-accent-pink/10 border border-accent-pink/35 text-white text-xs flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-accent-pink shrink-0" />
          <div>
            <p className="font-semibold text-accent-pink">Attenzione</p>
            <p className="mt-0.5 opacity-90">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* LOADING OVERLAY SCREEN */}
      {loading && (
        <div className="py-16 flex flex-col items-center text-center justify-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-accent-blue animate-spin"></div>
            <Sparkles className="w-6 h-6 text-accent-orange absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce" />
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-white">Sto preparando i tuoi consigli...</h4>
            <div className="text-xs text-white/60 mt-2 block h-6 font-medium animate-pulse text-accent-blue">
              {loadingText}
            </div>
          </div>
        </div>
      )}

      {/* STEP 0: Landing / Accetta Sfida */}
      {!loading && step === 0 && (
        <div className="text-center py-8 space-y-6">
          <div className="w-16 h-16 rounded-none bg-accent-blue/10 flex items-center justify-center mx-auto mb-2 border border-white/10">
            <Sparkles className="w-8 h-8 text-accent-blue" />
          </div>
          <div className="max-w-xl mx-auto">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Ricevi un Consiglio Strategico Gratis</h3>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              Vuoi far crescere la tua attività online? Rispondi a 3 semplici domande e ricevi subito dei suggerimenti personalizzati e un'idea di spesa per il tuo progetto.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setStep(1)}
              className="grad-electric hover:shadow-lg text-white font-bold px-6 py-3 rounded-none flex items-center gap-2 select-none cursor-pointer text-xs uppercase tracking-widest transition-transform hover:scale-105"
            >
              Crea la mia Strategia <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: Attività & Nicchia */}
      {!loading && step === 1 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-xs font-mono text-white/40 font-bold">FASE 1 DI 3: IL TUO BUSINESS</span>
            <span className="text-xs bg-accent-blue/10 text-accent-blue font-bold px-2.5 py-0.5 rounded-none">Anagrafica</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-white">
                Come si chiama la tua attività? <span className="text-accent-pink">*</span>
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Es. Atelier Spose Milano, Studio Dentistico Rossini"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent-blue text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-white">
                In quale settore o nicchia operi? <span className="text-accent-pink">*</span>
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent-blue text-white"
              >
                <option value="">Seleziona un settore</option>
                <option value="Ristorazione e Food">Ristorazione &amp; Food</option>
                <option value="Servizi Professionali (Legali, Medici, Fiscale)">Servizi Professionali / Studi</option>
                <option value="Salute, Wellness &amp; Bellezza">Salute, Wellness &amp; Bellezza</option>
                <option value="E-commerce e Vendita Prodotti">E-commerce e Retail</option>
                <option value="Immobiliare e Costruzioni">Immobiliare &amp; Design d'Interni</option>
                <option value="Turismo, Hotel e Accommodation">Turismo &amp; Strutture Ricettive</option>
                <option value="Artigianato e Servizi Locali">Artigianato &amp; Servizi Locali</option>
                <option value="Formazione, Coaching, Startup">Formazione, Coaching o Startup</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 text-xs font-bold uppercase text-white/40 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" /> Indietro
            </button>
            <button
              onClick={handleNext}
              className="grad-electric hover:shadow text-white font-bold px-5 py-2.5 rounded-none flex items-center gap-1.5 text-xs uppercase tracking-widest cursor-pointer"
            >
              Prosegui <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Obiettivi del Business */}
      {!loading && step === 2 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-xs font-mono text-white/40 font-bold">FASE 2 DI 3: OBIETTIVI DIGITALI</span>
            <span className="text-xs bg-accent-purple/10 text-accent-purple font-bold px-2.5 py-0.5 rounded-none">Scelta Canali</span>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-white">
              Quali sono i tuoi obiettivi principali di visibilità? <span className="text-white/40">(Seleziona tutto ciò che serve)</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Creare un nuovo Sito Web da zero",
                "Ridisegnare il mio Sito attuale (Restyling)",
                "Ottenere più contatti e richiedenti preventivo (Lead Gen)",
                "Migliorare la presenza sui canali Social",
                "Gestire Campagne ADS (Meta / Google) per vendere subito",
                "Posizionarmi su Google (Ottimizzazione SEO)",
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleGoal(item)}
                  className={`p-4 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                    goals.includes(item)
                      ? "border-accent-purple bg-accent-purple/10 shadow-sm"
                      : "border-white/10 hover:border-accent-purple/35 hover:bg-white/5"
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                    goals.includes(item) 
                      ? "bg-accent-purple border-accent-purple text-white" 
                      : "border-white/20 text-transparent"
                  }`}>
                    {goals.includes(item) && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-xs font-medium text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 text-xs font-bold uppercase text-white/40 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" /> Indietro
            </button>
            <button
              onClick={handleNext}
              className="grad-electric hover:shadow text-white font-bold px-5 py-2.5 rounded-none flex items-center gap-1.5 text-xs uppercase tracking-widest cursor-pointer"
            >
              Prosegui <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Dati di Contatto & Invio */}
      {!loading && step === 3 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-xs font-mono text-white/40 font-bold">FASE 3 DI 3: TECNOLOGIA & CONTATTO</span>
            <span className="text-xs bg-accent-orange/10 text-accent-orange font-bold px-2.5 py-0.5 rounded-none">Finalizza</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white">
                  Preferenza Esecutiva del Sito
                </label>
                <select
                  value={webType}
                  onChange={(e) => setWebType(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue text-white"
                >
                  <option value="Da valutare insieme">Consigliami tu (Sceglieremo insieme)</option>
                  <option value="Codice Custom (React / HTML5) per prestazioni incredibili">In Puro Codice Custom (React / CSS / SEO d'Elite)</option>
                  <option value="WordPress per gestione autonoma e classica">WordPress (Ottimo ed autonomo)</option>
                  <option value="Squarespace / Wix per progetti leggeri">Squarespace / Wix (Progetto rapido)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white">
                  Budget indicativo stimato
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue text-white"
                >
                  <option value="Starter (€500 - €1.500)">Starter (€500 - €1.500) - Ottimizzazione Standard</option>
                  <option value="Professional (€1.500 - €3.500)">Professional (€1.500 - €3.500) - Sito + Tracciamenti Ads</option>
                  <option value="Scalabile (€3.500+)">Premium / Scalabile (€3.500+) - Macchina Acquisizione Completa</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white">
                  Sito Web Attuale (se esiste)
                </label>
                <input
                  type="text"
                  value={currentWebsite}
                  onChange={(e) => setCurrentWebsite(e.target.value)}
                  placeholder="Es: www.miobusiness.it"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white font-semibold">
                  Il tuo nome <span className="text-accent-pink">*</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Es. Maria Rossi"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue font-medium text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white font-semibold">
                  La tua e-mail <span className="text-accent-pink">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Es. maria.rossi@email.it"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue font-medium text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white">
                  Telefono cellulare <span className="text-white/40">(Consigliato)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Es. +39 333 1234567"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-white/40 leading-relaxed">
            Continuando, acconsenti al trattamento dei dati personali forniti nel pieno rispetto del GDPR per la formulazione della proposta di web design e lead generation personalizzata.
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 text-xs font-bold uppercase text-white/40 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" /> Indietro
            </button>
            <button
              onClick={handleGenerate}
              className="grad-sunset hover:shadow-lg text-white font-bold px-6 py-2.5 rounded-none flex items-center gap-1.5 text-xs uppercase tracking-widest cursor-pointer transition-transform hover:scale-102"
            >
              Fatto, Calcola Strategia <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Strategy Result */}
      {!loading && step === 4 && strategy && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs uppercase font-mono bg-accent-orange/10 text-accent-orange font-bold px-3 py-1 rounded-none">
                I Tuoi Consigli Personalizzati
              </span>
              <h3 className="font-display text-2xl font-bold mt-1 text-white">Ecco come puoi crescere</h3>
            </div>
            <button
              onClick={restartPlanner}
              className="text-xs flex items-center gap-1 text-white/40 hover:text-white border border-white/10 px-2.5 py-1.5 rounded-none bg-white/5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Compila Nuovo
            </button>
          </div>

          {/* RENDERED BLUEPRINT */}
          <div className="bg-white/5 rounded-none p-6 md:p-8 border border-white/10 shadow-inner max-h-[500px] overflow-y-auto cursor-auto select-text scrollbar-thin scrollbar-white/10">
            {renderStrategyMarkdown(strategy)}
          </div>

          {/* CTA BOARD NEXT STEPS */}
          <div className="p-6 rounded-none bg-white/10 backdrop-blur-md text-white flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 border border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-accent-orange font-bold text-xs uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                PARLIAMONE INSIEME
              </div>
              <h4 className="font-display text-lg font-bold text-white">Fissa una chiamata gratuita (15 min)</h4>
              <p className="text-xs text-white/60">
                Approfondiremo questi consigli e vedremo come applicarli alla tua attività. Senza impegno.
              </p>
            </div>
            <a
              href="https://calendly.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-charcoal hover:bg-white/90 transition-all font-bold px-5 py-3 rounded-none flex items-center justify-center gap-2 text-xs uppercase tracking-widest pointer-events-auto shadow-md"
            >
              <Calendar className="w-4 h-4 text-accent-blue" />
              Prenota Ora su Calendly
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

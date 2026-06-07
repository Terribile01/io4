import React, { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Send, Check, AlertCircle, RotateCcw, MessageSquare } from "lucide-react";

const AIPlanner = React.memo(() => {
  const [step, setStep] = useState(0); // 0 to 4
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [niche, setNiche] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [webType, setWebType] = useState("Da valutare insieme");
  const [budget, setBudget] = useState("Professional (€1.500 - €3.500)");
  const [currentWebsite, setCurrentWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    if (step === 3 && (!clientName.trim() || !phone.trim())) {
      setErrorMsg("Per favore, compila almeno Nome e Telefono per procedere.");
      return;
    }
    setErrorMsg(null);
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setErrorMsg(null);
    setStep(prev => Math.max(0, prev - 1));
  };

  const restartPlanner = () => {
    setStep(0);
    setPrivacyAccepted(false);
    setBusinessName("");
    setNiche("");
    setGoals([]);
    setWebType("Da valutare insieme");
    setBudget("Professional (€1.500 - €3.500)");
    setCurrentWebsite("");
    setClientName("");
    setPhone("");
    setErrorMsg(null);
  };

  const handleWhatsApp = () => {
    const goalsText = goals.length > 0 ? goals.join(", ") : "Non specificati";
    const message = `Ciao Maria Teresa! Sono ${clientName}. Ho configurato il mio progetto web:\n\n` +
      `🏢 *Business*: ${businessName}\n` +
      `📍 *Settore*: ${niche}\n` +
      `🎯 *Obiettivi*: ${goalsText}\n` +
      `💻 *Tecnologia*: ${webType}\n` +
      `💰 *Budget*: ${budget}\n` +
      `${currentWebsite ? `🌐 *Sito attuale*: ${currentWebsite}\n` : ""}\n` +
      `Mi piacerebbe ricevere una tua proposta di strategia e collaborazione!`;

    window.open(`https://wa.me/393793603321?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl max-w-4xl mx-auto" id="ai-planner-wizard">
      {/* ERROR BANNER */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-accent-pink/10 border border-accent-pink/35 text-white/95 text-xs flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-accent-pink shrink-0" />
          <div>
            <p className="font-semibold text-accent-pink">Attenzione</p>
            <p className="mt-0.5 opacity-90">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* STEP 0: Landing */}
      {step === 0 && (
        <div className="text-center py-8 space-y-6">
          <div className="w-16 h-16 rounded-none bg-accent-blue/10 flex items-center justify-center mx-auto mb-2 border border-white/10">
            <Sparkles className="w-8 h-8 text-accent-blue" />
          </div>
          <div className="max-w-xl mx-auto">
            <h3 className="font-display text-2xl md:text-3xl font-bold">Ricevi una Strategia di Crescita</h3>
            <p className="text-sm text-white/90 mt-2 leading-relaxed">
              Vuoi far crescere la tua attività online? Rispondi a 3 semplici domande e inviami subito i tuoi obiettivi per ricevere un'idea di strategia personalizzata e un preventivo.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setStep(1)}
              className="grad-electric hover:shadow-lg text-white font-bold px-6 py-3 rounded-none flex items-center gap-2 select-none cursor-pointer text-xs uppercase tracking-widest transition-transform hover:scale-105"
            >
              Configura il mio Progetto <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: Attività & Nicchia */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/10/50">
            <span className="text-xs font-mono text-white/90 font-bold">FASE 1 DI 3: IL TUO BUSINESS</span>
            <span className="text-xs bg-accent-blue/10 text-accent-blue font-bold px-2.5 py-0.5 rounded-none">Anagrafica</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-white/95">
                Come si chiama la tua attività? <span className="text-accent-pink">*</span>
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Es. Atelier Spose Milano, Studio Dentistico Rossini"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent-blue"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-white/95">
                In quale settore o nicchia operi? <span className="text-accent-pink">*</span>
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-accent-blue"
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

          <div className="flex justify-between items-center pt-4 border-t border-white/10/50">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 text-xs font-bold uppercase text-white/90 hover:text-white/95"
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

      {/* STEP 2: Obiettivi */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/10/50">
            <span className="text-xs font-mono text-white/90 font-bold">FASE 2 DI 3: OBIETTIVI DIGITALI</span>
            <span className="text-xs bg-accent-purple/10 text-accent-purple font-bold px-2.5 py-0.5 rounded-none">Scelta Canali</span>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-white/95">
              Quali sono i tuoi obiettivi principali?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Creare un nuovo Sito Web da zero",
                "Ridisegnare il mio Sito attuale (Restyling)",
                "Ottenere più contatti (Lead Gen)",
                "Migliorare la presenza sui Social",
                "Gestire Campagne Ads (Meta / Google)",
                "Posizionarmi su Google (SEO)",
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleGoal(item)}
                  className={`p-4 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                    goals.includes(item)
                      ? "border-accent-purple bg-accent-purple/5 shadow-sm"
                      : "border-white/10 hover:border-accent-purple/35 hover:bg-black/50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                    goals.includes(item) 
                      ? "bg-accent-purple border-accent-purple text-white" 
                      : "border-muted-grey text-transparent"
                  }`}>
                    {goals.includes(item) && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-xs font-medium text-white/95">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10/50">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 text-xs font-bold uppercase text-white/90 hover:text-white/95"
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

      {/* STEP 3: Tecnologia & Contatto */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/10/50">
            <span className="text-xs font-mono text-white/90 font-bold">FASE 3 DI 3: TECNOLOGIA & CONTATTO</span>
            <span className="text-xs bg-accent-orange/10 text-accent-orange font-bold px-2.5 py-0.5 rounded-none">Finalizza</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/95">
                  Preferenza Esecutiva
                </label>
                <select
                  value={webType}
                  onChange={(e) => setWebType(e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue"
                >
                  <option value="Da valutare insieme">Consigliami tu</option>
                  <option value="Codice Custom (React / HTML5)">Puro Codice Custom (React / SEO d'Elite)</option>
                  <option value="WordPress">WordPress (Ottimo ed autonomo)</option>
                  <option value="Squarespace / Wix">Squarespace / Wix (Progetto rapido)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/95">
                  Budget indicativo
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue"
                >
                  <option value="Starter (€500 - €1.500)">Starter (€500 - €1.500)</option>
                  <option value="Professional (€1.500 - €3.500)">Professional (€1.500 - €3.500)</option>
                  <option value="Scalabile (€3.500+)">Premium / Scalabile (€3.500+)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/95 font-semibold">
                  Il tuo nome <span className="text-accent-pink">*</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Es. Maria Rossi"
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/95 font-semibold">
                  Telefono <span className="text-accent-pink">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Es. +39 333 1234567"
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-xs focus:outline-none focus:border-accent-blue font-medium"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10/50">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 text-xs font-bold uppercase text-white/90 hover:text-white/95"
            >
              <ArrowLeft className="w-4 h-4" /> Indietro
            </button>
            <button
              onClick={handleNext}
              className="grad-sunset hover:shadow-lg text-white font-bold px-6 py-2.5 rounded-none flex items-center gap-1.5 text-xs uppercase tracking-widest cursor-pointer transition-transform hover:scale-102"
            >
              Riepilogo Progetto <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Riepilogo & WhatsApp */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center pb-4 border-b border-white/10">
            <span className="text-xs uppercase font-mono bg-accent-orange/10 text-accent-orange font-bold px-3 py-1 rounded-none">
              Quasi Fatto!
            </span>
            <h3 className="font-display text-2xl font-bold mt-1 text-white/95">Ecco il riepilogo del tuo progetto</h3>
          </div>

          <div className="bg-black/50 rounded-none p-6 border border-white/10 shadow-inner space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs font-bold text-white/90 uppercase tracking-widest">Business</p>
                <p className="font-medium text-white/95">{businessName} ({niche})</p>
              </div>
              <div>
                <p className="text-xs font-bold text-white/90 uppercase tracking-widest">Obiettivi</p>
                <p className="font-medium text-white/95">{goals.join(", ")}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-white/90 uppercase tracking-widest">Tecnologia</p>
                <p className="font-medium text-white/95">{webType}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-white/90 uppercase tracking-widest">Budget Stimato</p>
                <p className="font-medium text-white/95">{budget}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10/50">
              <p className="text-sm italic text-white/95/70">
                "Ciao Maria Teresa, ho appena configurato i dettagli per il mio progetto. Inviami una proposta su come possiamo collaborare per raggiungere questi obiettivi!"
              </p>
            </div>
          </div>

          <div className="p-6 rounded-none glass-nav text-white flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
            <div className="space-y-4 md:space-y-1 max-w-md">
              <div className="flex items-center gap-2 text-accent-orange font-bold text-xs uppercase tracking-widest">
                <MessageSquare className="w-4 h-4" />
                PARLIAMONE SU WHATSAPP
              </div>
              <h4 className="font-display text-lg font-bold">Ricevi la tua strategia</h4>
              <p className="text-xs text-white/90">
                Clicca il pulsante qui sotto per inviarmi questi dettagli. Ti risponderò subito con una proposta concreta.
              </p>

              {/* Privacy Checkbox */}
              <div className="pt-2 flex items-start gap-2 cursor-pointer group" onClick={() => setPrivacyAccepted(!privacyAccepted)}>
                <div className={`mt-0.5 w-4 h-4 border rounded flex items-center justify-center transition-colors ${privacyAccepted ? 'bg-[#25D366] border-[#25D366]' : 'border-white/30 group-hover:border-white/50'}`}>
                  {privacyAccepted && <Check className="w-3 h-3 text-white" />}
                </div>
                <p className="text-[10px] text-white/70 leading-tight">
                  Accetto il trattamento dei dati personali secondo la <a href="/privacy-policy" className="underline hover:text-white" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>.
                </p>
              </div>
            </div>
            <button
              onClick={() => privacyAccepted && handleWhatsApp()}
              disabled={!privacyAccepted}
              className={`transition-all font-bold px-8 py-4 rounded-none flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg ${
                privacyAccepted
                  ? "bg-[#25D366] text-white hover:bg-[#20ba5a] cursor-pointer"
                  : "bg-white/10 text-white/30 cursor-not-allowed border border-white/5"
              }`}
            >
              <div
                className="w-5 h-5 bg-current"
                style={{
                  maskImage: 'url(https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/whatsapp.svg)',
                  WebkitMaskImage: 'url(https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/whatsapp.svg)',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain'
                }}
              />
              Invia
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={restartPlanner}
              className="text-xs text-white/90 hover:text-white/95 flex items-center gap-1 mx-auto"
            >
              <RotateCcw className="w-3 h-3" /> Ricomincia da capo
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default AIPlanner;

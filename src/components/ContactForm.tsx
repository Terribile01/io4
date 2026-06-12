import React, { useState, useCallback } from "react";
import { Send, CheckCircle, ChevronRight, ChevronLeft, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ContactForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [clientName, setClientName] = useState("");
  const [niche, setNiche] = useState("Salute, Wellness & Bellezza");
  const [services, setServices] = useState<string[]>([]);

  // Dynamic Step 3 details
  const [hasWebsite, setHasWebsite] = useState<string>("");
  const [leadGoal, setLeadGoal] = useState("");
  const [marketingExperience, setMarketingExperience] = useState("");
  const [presidioGoal, setPresidioGoal] = useState("");

  const [vision, setVision] = useState("");
  const [budget, setBudget] = useState("Professional (€1.500 - €3.500)");
  const [phone, setPhone] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const totalSteps = 4;

  const handleServiceToggle = (service: string) => {
    setServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps + 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const openChat = useCallback(() => {
    // Assuming the ChatWidget has a global way to be opened or just scrolling to it/clicking its trigger
    const chatToggle = document.querySelector('button[aria-label="Open chat"]') as HTMLButtonElement;
    if (chatToggle) chatToggle.click();
  }, []);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) return;

    const dynamicDetails = services.map(s => {
      if (s === "Sito Web Professionale") return `- Sito Attuale: ${hasWebsite || 'N/D'}`;
      if (s === "Automazione Contatti (Lead Gen)") return `- Obiettivo Lead: ${leadGoal || 'N/D'}`;
      if (s === "Marketing Google/Meta") return `- Esperienza Marketing: ${marketingExperience || 'N/D'}`;
      if (s === "Presidio Digitale") return `- Focus Presidio: ${presidioGoal || 'N/D'}`;
      return null;
    }).filter(Boolean).join("\n");

    const message = `Ciao Maria Teresa! Ti contatto dal sito Facilissimo Web per iniziare un progetto.

*STEP 1: CHI SONO*
- Nome: ${clientName}
- Attività: ${businessName}
- Settore: ${niche}

*STEP 2: SERVIZI SCELTI*
${services.map(s => `• ${s}`).join("\n")}

*STEP 3: DETTAGLI TECNICI*
${dynamicDetails}

*STEP 4: VISIONE & BUDGET*
- Risultato Desiderato: ${vision}
- Budget Stimato: ${budget}
- WhatsApp: ${phone}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/393793603321?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setFormSubmitted(true);

    setTimeout(() => {
      setFormSubmitted(false);
      setStep(1);
      setBusinessName("");
      setClientName("");
      setServices([]);
      setVision("");
      setPhone("");
      setPrivacyAccepted(false);
    }, 5000);
  };

  const renderSupportLink = () => (
    <button
      type="button"
      onClick={openChat}
      className="mt-6 flex items-center gap-2 text-[10px] text-accent-blue hover:text-white transition-colors uppercase tracking-widest font-bold group"
    >
      <MessageSquare className="w-3 h-3 group-hover:scale-110 transition-transform" />
      <span>Hai dubbi tecnici? Chiedimi in chat</span>
    </button>
  );

  return (
    <div className="glass-panel rounded-none p-6 md:p-10 border border-white/10 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Progress Bar */}
      {!formSubmitted && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div
            className="h-full bg-accent-blue shadow-[0_0_10px_rgba(10,132,255,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {formSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-12 text-center space-y-6"
          >
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-none flex items-center justify-center mx-auto border border-green-500/30">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-display text-2xl font-bold text-white uppercase tracking-tighter">Progetto Ricevuto!</h4>
              <p className="text-sm text-white/80 mt-2 max-w-sm mx-auto leading-relaxed">
                Ottimo lavoro. Ho ricevuto i dettagli del tuo progetto. Ti risponderò su WhatsApp per fissare un primo check tecnico.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* STEP 1: CONOSCENZA */}
            {step === 1 && (
              <div className="space-y-6">
                <header>
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">Step 1: Conoscenza</h3>
                  <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">Raccontami chi sei e cosa fai</p>
                </header>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Nome dell'Attività *</label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Es. Officina del Gusto Verona"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Il Tuo Nome *</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Come vuoi che ti chiami?"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Nicchia / Settore</label>
                    <select
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue appearance-none cursor-pointer"
                    >
                      <option value="Salute, Wellness & Bellezza">Salute, Wellness & Bellezza</option>
                      <option value="Ristorazione e Food">Ristorazione & Food</option>
                      <option value="Servizi Professionali">Servizi Professionali / Studi</option>
                      <option value="E-commerce e Retail">E-commerce e Retail</option>
                      <option value="Artigianato & Produzione">Artigianato & Produzione</option>
                      <option value="Turismo e Hospitality">Turismo e Hospitality</option>
                      <option value="Immobiliare e Real Estate">Immobiliare e Real Estate</option>
                      <option value="Formazione e Coaching">Formazione e Coaching</option>
                      <option value="Automotive e Concessionarie">Automotive e Concessionarie</option>
                      <option value="Pet Services">Pet Services</option>
                      <option value="Eventi e Matrimoni">Eventi e Matrimoni</option>
                      <option value="Altro">Altro</option>
                    </select>
                  </div>
                </div>
                {renderSupportLink()}
              </div>
            )}

            {/* STEP 2: LA DIREZIONE */}
            {step === 2 && (
              <div className="space-y-6">
                <header>
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">Step 2: La Direzione</h3>
                  <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">Quali pilastri servono alla tua impresa?</p>
                </header>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "Sito Web Professionale", desc: "Visibilità e identità digitale chiara" },
                    { id: "Automazione Contatti (Lead Gen)", desc: "Ricevere richieste contatti in automatico" },
                    { id: "Marketing Google/Meta", desc: "Farti trovare da chi cerca i tuoi servizi" },
                    { id: "Presidio Digitale", desc: "Sicurezza, SEO e aggiornamenti costanti" }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleServiceToggle(s.id)}
                      className={`text-left p-4 border transition-all ${
                        services.includes(s.id)
                        ? "bg-accent-blue/10 border-accent-blue shadow-[0_0_15px_rgba(10,132,255,0.2)]"
                        : "bg-black/40 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wide text-white">{s.id}</span>
                        {services.includes(s.id) && <CheckCircle className="w-4 h-4 text-accent-blue" />}
                      </div>
                      <p className="text-[10px] text-white/50 mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
                {renderSupportLink()}
              </div>
            )}

            {/* STEP 3: SINCRONIZZAZIONE (DINAMICO) */}
            {step === 3 && (
              <div className="space-y-6">
                <header>
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">Step 3: Dettagli Tecnici</h3>
                  <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">Sincronizziamo gli obiettivi</p>
                </header>

                <div className="space-y-5">
                  {services.length === 0 && (
                    <p className="text-xs text-accent-pink italic">Torna indietro e seleziona almeno un servizio per continuare.</p>
                  )}

                  {services.includes("Sito Web Professionale") && (
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Hai già un sito o un dominio attivo?</label>
                      <div className="flex gap-4">
                        {["Sì", "No"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setHasWebsite(opt)}
                            className={`flex-1 py-3 text-xs border transition-all ${
                              hasWebsite === opt ? "bg-accent-blue/20 border-accent-blue" : "bg-black/40 border-white/10"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {services.includes("Automazione Contatti (Lead Gen)") && (
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Obiettivo mensile nuovi contatti?</label>
                      <input
                        type="text"
                        value={leadGoal}
                        onChange={(e) => setLeadGoal(e.target.value)}
                        placeholder="Es. 10-15 nuovi clienti al mese"
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue"
                      />
                    </div>
                  )}

                  {services.includes("Marketing Google/Meta") && (
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Hai mai investito in ADS online?</label>
                      <div className="flex gap-4">
                        {["Sì, con agenzia", "Sì, da solo", "No, mai"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => setMarketingExperience(opt)}
                            className={`flex-1 py-3 text-[10px] border transition-all uppercase tracking-tighter ${
                              marketingExperience === opt ? "bg-accent-blue/20 border-accent-blue" : "bg-black/40 border-white/10"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {services.includes("Presidio Digitale") && (
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Qual è la tua priorità?</label>
                      <select
                        value={presidioGoal}
                        onChange={(e) => setPresidioGoal(e.target.value)}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue appearance-none"
                      >
                        <option value="">Seleziona...</option>
                        <option value="Visibilità Locale (Google Maps)">Visibilità Locale (Google Maps)</option>
                        <option value="Sicurezza e Backup">Sicurezza e Backup</option>
                        <option value="SEO (Posizionamento)">SEO (Posizionamento)</option>
                        <option value="Tutto il pacchetto">Tutto il pacchetto</option>
                      </select>
                    </div>
                  )}
                </div>
                {renderSupportLink()}
              </div>
            )}

            {/* STEP 4: VISIONE & BUDGET */}
            {step === 4 && (
              <div className="space-y-6">
                <header>
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">Step 4: Visione & Budget</h3>
                  <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">Definiamo i binari del successo</p>
                </header>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Risultato desiderato?</label>
                    <textarea
                      value={vision}
                      onChange={(e) => setVision(e.target.value)}
                      placeholder="Es. Voglio smettere di cercare clienti manualmente e avere un sistema automatico..."
                      rows={3}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Budget Stimato</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue appearance-none"
                    >
                      <option value="Starter (€500 - €1.500)">Starter (€500 - €1.500)</option>
                      <option value="Professional (€1.500 - €3.500)">Professional (€1.500 - €3.500)</option>
                      <option value="Premium (€3.500+)">Premium (€3.500+)</option>
                    </select>
                    <p className="text-[9px] text-white/40 italic mt-1">Questo ci serve per proporti la soluzione più efficiente senza sprechi.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/90">Numero WhatsApp *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Es: +39 340 9876543"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue font-mono"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-1 accent-accent-blue"
                    />
                    <label htmlFor="privacy" className="text-[10px] text-white/60 leading-tight">
                      Accetto il trattamento dei dati personali secondo la <a href="/privacy" className="text-accent-blue underline">Privacy Policy</a> di Facilissimo Web.
                    </label>
                  </div>
                </div>
                {renderSupportLink()}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6 border-t border-white/5">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 border-[4px] border-white hover:bg-white/5 text-white/70 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  Indietro
                </button>
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  disabled={step === 1 && (!businessName || !clientName)}
                  onClick={nextStep}
                  className="flex-[2] bg-white text-black hover:bg-accent-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed py-3 border-[4px] border-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all group"
                >
                  Continua
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitContact}
                  disabled={!privacyAccepted || !phone}
                  className="flex-[2] btn-brand text-white hover:shadow-[0_0_20px_rgba(255,55,95,0.4)] disabled:opacity-30 disabled:cursor-not-allowed py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  Invia Progetto
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(ContactForm);

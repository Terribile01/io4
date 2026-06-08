import React, { useState, useCallback } from "react";
import { Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ContactForm: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [niche, setNiche] = useState("Salute, Wellness & Bellezza");
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [goals, setGoals] = useState<string[]>(["Creare un nuovo Sito Web da zero"]);
  const [budget, setBudget] = useState("Professional (€1.500 - €3.500)");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !clientName || !phone) return;

    const message = `Ciao Maria Teresa! Ti contatto dal sito Facilissimo Web.
Ecco i dettagli della mia richiesta:
- *Nome*: ${clientName}
- *Attività*: ${businessName}
- *Settore*: ${niche}
- *Obiettivi*: ${goals.join(", ")}
- *Budget*: ${budget}
- *Telefono*: ${phone}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/393793603321?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setFormSubmitted(true);

    setTimeout(() => {
      setFormSubmitted(false);
      setBusinessName("");
      setClientName("");
      setPhone("");
    }, 5000);
  };

  return (
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
              <p className="text-xs text-white/95 mt-1 max-w-sm mx-auto">
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
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/95">Nome dell'Attività <span className="text-accent-pink">*</span></label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Es. Officina del Gusto Verona"
                  className="w-full px-3 py-2 bg-[#0A0A0B]/50 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/95">Nicchia / Settore</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0A0B]/50 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue"
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
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/95">Il Tuo Nome <span className="text-accent-pink">*</span></label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Es. Matteo Bianchi"
                  className="w-full px-3 py-2 bg-[#0A0A0B]/50 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/95">Numero Telefonico <span className="text-accent-pink">*</span></label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Es: +39 340 9876543"
                  className="w-full px-3 py-2 bg-[#0A0A0B]/50 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/95">Budget Stimato</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0A0B]/50 border border-white/10 rounded-none text-xs focus:outline-none focus:border-accent-blue"
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
                className="w-full glass-orange-50 hover:shadow-lg text-white font-bold py-3 px-6 rounded-none flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer transition-transform hover:scale-101"
              >
                Invia Richiesta e Traccia <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(ContactForm);

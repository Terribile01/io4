import React from 'react';
import { Laptop, Flame, BarChart2, ArrowRight } from 'lucide-react';

export const ServicesSection = React.memo(() => {
  return (
    <section className="space-y-12" id="servizi">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent-pink bg-accent-pink/10 px-3.5 py-1 rounded-none">
          Servizi Freelance
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold mt-2 tracking-tight">
          Soluzioni Semplici per Crescere Online
        </h2>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2 border-t border-white/5">
          {["WEB DESIGN", "CUSTOM CODE", "LEAD GEN", "MARKETING"].map((sub, i) => (
            <span key={i} className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
              {sub}
            </span>
          ))}
        </div>

        <p className="text-xs text-white/95 max-w-md mx-auto pt-2">
          Ti aiuto a costruire una presenza digitale forte che attira nuovi clienti ogni giorno.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-4">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold">Sito Web Professionale</h3>
            <p className="text-xs text-white/95 leading-relaxed">
              Realizzo il tuo sito web su misura, veloce e ottimizzato per i motori di ricerca. Che tu preferisca WordPress per gestirlo in autonomia o una soluzione su misura in codice per prestazioni massime, ho la soluzione giusta.
            </p>
          </div>
          <div className="pt-6 border-t border-white/10/50 mt-6 flex justify-between items-center text-xs">
            <span className="font-medium text-white/95 font-mono">Web Design</span>
            <a href="#comparativa" className="text-accent-blue hover:underline flex items-center gap-1">
              Scopri di più <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-accent-pink/10 flex items-center justify-center text-accent-pink mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold">Trovare Nuovi Clienti</h3>
            <p className="text-xs text-white/95 leading-relaxed">
              Non solo un bel sito, ma uno strumento che lavora per te. Creo sistemi per raccogliere contatti di persone interessate ai tuoi servizi e automatizzo il processo per farti risparmiare tempo prezioso.
            </p>
          </div>
          <div className="pt-6 border-t border-white/10/50 mt-6 flex justify-between items-center text-xs">
            <span className="font-medium text-white/95 font-mono">Lead Gen</span>
            <a href="#calcolatore" className="text-accent-pink hover:underline flex items-center gap-1">
              Prova il simulatore <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:shadow-xl transition-all">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-accent-orange/10 flex items-center justify-center text-accent-orange mb-4">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold font-semibold text-white/95">Pubblicità Google e Meta</h3>
            <p className="text-xs text-white/95 leading-relaxed">
              Porto traffico qualificato sul tuo sito attraverso campagne pubblicitarie mirate su Google, Facebook e Instagram. Massimizziamo insieme il tuo budget per ottenere il miglior risultato possibile.
            </p>
          </div>
          <div className="pt-6 border-t border-white/10/50 mt-6 flex justify-between items-center text-xs">
            <span className="font-medium text-white/95 font-mono">Marketing</span>
            <a href="#contatti" className="text-accent-orange hover:underline flex items-center gap-1">
              Chiedi info <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

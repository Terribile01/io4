import React from 'react';
import { Check, Code } from 'lucide-react';

export const ComparisonSection = React.memo(() => {
  return (
    <section className="space-y-12" id="comparativa">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
            La Tecnologia Giusta
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white/95 leading-tight">
            WordPress o Codice Su Misura?
          </h2>
          <p className="text-sm text-white/95 leading-relaxed">
            Non esiste una soluzione universale. Se hai bisogno di un sito semplice da aggiornare da solo, <strong>WordPress</strong> è la scelta migliore. Se invece cerchi il massimo della velocità e un design unico, un sito in <strong>codice puro</strong> ti darà quel vantaggio competitivo necessario oggi.
          </p>
          <div className="space-y-4 text-xs font-semibold">
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <p className="text-white/95/90">
                WordPress: Ideale per blog, piccoli siti e per chi vuole gestire i testi in autonomia.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <p className="text-white/95/90">
                Codice Custom: Il top per velocità e sicurezza. Google lo ama perché è leggerissimo.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden group hover:border-[#BF5AF2]/50 transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#BF5AF2]/5 rounded-bl-3xl pointer-events-none transition-all group-hover:scale-130"></div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-[#BF5AF2] bg-[#BF5AF2]/10 px-2 py-0.5 rounded">
              FACILE E VELOCE
            </span>
            <h4 className="font-display text-base font-bold text-white/95">WordPress & Co.</h4>
            <p className="text-[11px] text-white/95 leading-relaxed">
              Perfetto per chi vuole un sito professionale in tempi brevi.
            </p>
            <div className="space-y-2 text-[10px] text-white/95 pt-3 border-t border-white/10/50">
              <div className="flex justify-between font-mono"><span>Gestione:</span><strong>Autonoma al 100%</strong></div>
              <div className="flex justify-between font-mono"><span>Consegna:</span><strong>1-2 settimane</strong></div>
              <div className="flex justify-between font-mono"><span>Costo:</span><strong>Contenuto</strong></div>
              <div className="flex justify-between font-mono"><span>Performance:</span><b>Standard</b></div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 shadow-md space-y-4 relative overflow-hidden group hover:border-accent-orange/50 transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent-orange/10 rounded-bl-3xl pointer-events-none transition-all group-hover:scale-130"></div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-accent-orange bg-accent-orange/10 px-2.5 py-0.5 rounded">
              MASSIME PRESTAZIONI
            </span>
            <h4 className="font-display text-base font-bold text-white flex items-center gap-1">
              Codice Puro <Code className="w-4 h-4 text-accent-orange" />
            </h4>
            <p className="text-[11px] text-white/95 leading-relaxed">
              Creato riga per riga per chi vuole solo il meglio.
            </p>
            <div className="space-y-2 text-[10px] text-white/95 pt-3 border-t border-white/10">
              <div className="flex justify-between font-mono"><span>Velocità:</span><strong className="text-green-400">Istantanea</strong></div>
              <div className="flex justify-between font-mono"><span>SEO:</span><strong className="text-green-400">Superiore</strong></div>
              <div className="flex justify-between font-mono"><span>Design:</span><strong>Senza Limiti</strong></div>
              <div className="flex justify-between font-mono"><span>Sicurezza:</span><strong>Totale</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

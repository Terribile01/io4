import React from 'react';
import { MessageSquare, Compass } from 'lucide-react';

export const Footer = React.memo(({ onPrivacyOpen }: { onPrivacyOpen: () => void }) => {
  return (
    <footer className="glass-nav text-white pt-16 pb-10 px-6 sm:px-10 rounded-none relative z-20 mt-16 w-full shrink-0">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4 text-left">
            <div className="w-20 h-20 rounded-none border border-white/10 overflow-hidden flex items-center justify-center">
              <img
                src="/assets/uploads/def.logo%20facilissimo%20web%20.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-display font-black text-sm uppercase tracking-widest text-white">FACILISSIMO WEB</h4>
            <p className="text-xs text-white/90 leading-relaxed font-sans font-light">
              Metodo d'eccellenza per la digitalizzazione delle imprese locali in tutta Italia. Sviluppo custom-code, design, visibilità e monetizzazione.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-accent-orange">Servizi Principali</h5>
            <ul className="text-xs text-white/90 space-y-2.5">
              <li><a href="#comparativa" className="hover:text-white transition-colors">Siti in Vero Codice (React)</a></li>
              <li><a href="#comparativa" className="hover:text-white transition-colors">Web Design Classico (WP/Wix)</a></li>
              <li><a href="#servizi" className="hover:text-white transition-colors">Campagne Pubblicitarie ADS</a></li>
              <li><a href="#servizi" className="hover:text-white transition-colors">Sistemi di Lead Generation</a></li>
            </ul>
          </div>

          <div className="space-y-4 text-left">
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-accent-pink">Consulenza Istantanea</h5>
            <p className="text-xs text-white/90 leading-relaxed">
              Tutte le consulenze partono da una mini-call conoscitiva gratuita di 15 minuti su zoom o whatsapp.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/393793603321"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-white/15 flex items-center justify-center hover:bg-white/5 text-white/90 hover:text-white transition-colors"
                title="Contatta via WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="#hero"
                className="w-9 h-9 rounded-none border border-white/15 flex items-center justify-center hover:bg-white/5 text-white/90 hover:text-white transition-colors"
                title="Torna all'inizio"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#8C8880] font-mono">
          <p>© 2026 FACILISSIMO WEB / FW di Maria Teresa Rogani. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <a href="#contatti" className="hover:text-white">P.IVA: 01234567890</a>
            <span>•</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPrivacyOpen();
              }}
              className="hover:text-white underline cursor-pointer"
            >
              Privacy Policy & GDPR
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

import React from 'react';
import { MessageSquare, Compass, Facebook, Linkedin, Send, MessageCircle, ChevronRight } from 'lucide-react';
import { SERVICES_DATA } from '../App';

interface FooterProps {
  onPrivacyOpen: () => void;
  onAboutOpen: () => void;
  onServiceSelect: (service: keyof typeof SERVICES_DATA) => void;
}

export const Footer = React.memo(({ onPrivacyOpen, onAboutOpen, onServiceSelect }: FooterProps) => {
  const currentUrl = "https://facilissimo-web.vercel.app/";

  return (
    <footer className="glass-nav text-white pt-16 pb-10 px-6 sm:px-10 rounded-none relative z-20 mt-16 w-full shrink-0">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4 text-left">
            <div className="w-20 h-20 rounded-none border border-white/10 overflow-hidden flex items-center justify-center">
              <img
                src="/assets/uploads/logo-facilissimo.jpg"
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
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-accent-orange">MENU</h5>
            <div className="flex flex-col gap-3">
              <button
                onClick={onAboutOpen}
                className="text-left text-[10px] font-bold uppercase tracking-widest text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                CHI SONO
              </button>
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/90 flex items-center gap-1">
                  Servizi
                </div>
                <div className="flex flex-col gap-2 pl-2 border-l border-white/10">
                  {Object.keys(SERVICES_DATA).map((key) => (
                    <button
                      key={key}
                      onClick={() => onServiceSelect(key as keyof typeof SERVICES_DATA)}
                      className="text-left text-[9px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      {SERVICES_DATA[key as keyof typeof SERVICES_DATA].title.replace('Web Design Classico', 'Web Design').replace('Sviluppo Custom (React)', 'Sviluppo React').replace('Sistemi di Acquisizione', 'Lead Generation').replace('Advertising & Visibilità', 'Marketing & Ads')}
                    </button>
                  ))}
                </div>
              </div>
              <a
                href="#comparativa"
                className="text-[10px] font-bold uppercase tracking-widest text-white/90 hover:text-white transition-colors"
              >
                Codice vs WP
              </a>
              <a
                href="#ai-planner"
                className="text-[10px] font-bold uppercase tracking-widest text-accent-orange hover:text-white transition-colors"
              >
                AI Planner
              </a>
              <a
                href="#contatti"
                className="text-[10px] font-bold uppercase tracking-widest text-white/90 hover:text-white transition-colors"
              >
                Parliamo del tuo Progetto
              </a>
            </div>
          </div>

          <div className="space-y-4 text-left">
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-accent-pink">Condividi</h5>
            <div className="flex gap-4">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:scale-110 transition-transform"
                title="Condividi su LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-transform"
                title="Condividi su Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent("Guarda questo sito: " + currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform"
                title="Condividi su WhatsApp"
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
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent("Guarda questo sito!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0088CC] flex items-center justify-center text-white hover:scale-110 transition-transform"
                title="Condividi su Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-6">
              <h5 className="text-[10px] uppercase tracking-widest font-bold text-accent-cyan">Torna su</h5>
              <a
                href="#hero"
                className="mt-2 w-9 h-9 rounded-none border border-white/15 flex items-center justify-center hover:bg-white/5 text-white/90 hover:text-white transition-colors"
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
            <a href="#contatti" className="hover:text-white">P.IVA: 02136780430</a>
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

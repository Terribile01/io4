import React from 'react';
import { ChevronRight, Sparkles, X, Menu } from 'lucide-react';
import { SERVICES_DATA } from '../App';

interface NavbarProps {
  onAboutOpen: () => void;
  onServiceSelect: (service: keyof typeof SERVICES_DATA) => void;
  onMobileMenuToggle: () => void;
  mobileMenuOpen: boolean;
}

export const Navbar = React.memo(({ onAboutOpen, onServiceSelect, onMobileMenuToggle, mobileMenuOpen }: NavbarProps) => {
  return (
    <nav className="fixed top-5 left-0 right-0 z-[100] flex items-center justify-center px-4 w-full pointer-events-none">
      <div className="pointer-events-auto w-full max-w-5xl flex items-center justify-between glass-nav rounded-none px-5 py-2.5 h-14">
        <div className="flex items-center gap-8 pl-1">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', '#hero');
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-none border border-white/20 bg-white/15 flex items-center justify-center shrink-0 font-mono">
              <span className="text-white font-black font-display text-sm tracking-widest">FW</span>
            </div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-white group-hover:text-accent-orange transition-colors">
              FACILISSIMO WEB
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            <button
              onClick={onAboutOpen}
              className="text-[10px] font-bold uppercase tracking-widest text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              CHI SONO
            </button>
            <div className="relative group/servizi">
              <a
                href="#servizi"
                className="text-[10px] font-bold uppercase tracking-widest text-white/90 hover:text-white transition-colors flex items-center gap-1"
              >
                Servizi <ChevronRight className="w-2.5 h-2.5 rotate-90" />
              </a>
              <div className="absolute top-[calc(100%+10px)] left-0 w-48 glass-nav shadow-2xl opacity-0 invisible group-hover/servizi:opacity-100 group-hover/servizi:visible transition-all duration-200 py-3 z-[110]">
                {Object.keys(SERVICES_DATA).map((key) => (
                  <button
                    key={key}
                    onClick={() => onServiceSelect(key as keyof typeof SERVICES_DATA)}
                    className="w-full text-left px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
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
              className="text-[10px] font-bold uppercase tracking-widest text-accent-orange hover:text-white transition-colors flex items-center gap-1"
            >
              AI Planner <Sparkles className="w-3 h-3 text-accent-orange" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contatti"
            className="hidden md:flex glass-purple-50 text-white/95 hover:bg-accent-purple/30 transition-all text-[9px] h-9 font-bold px-4 rounded-none items-center justify-center uppercase tracking-wider shrink-0"
          >
            Parliamo del tuo Progetto
          </a>

          <button
            onClick={onMobileMenuToggle}
            className="md:hidden text-white/90 hover:text-white p-1 cursor-pointer pointer-events-auto"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
});

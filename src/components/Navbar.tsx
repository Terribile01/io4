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
            <div className="w-10 h-10 rounded-none border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
              <img
                src="/assets/uploads/logo-facilissimo.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-white group-hover:text-accent-orange transition-colors">
              FACILISSIMO WEB
            </span>
          </a>

        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="text-white/90 hover:text-white p-2 md:p-4 cursor-pointer pointer-events-auto border-[4px] border-white transition-all active:scale-95"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 md:w-10 md:h-10" /> : <Menu className="w-6 h-6 md:w-10 md:h-10" />}
          </button>
        </div>
      </div>
    </nav>
  );
});

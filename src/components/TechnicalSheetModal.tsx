import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Globe, Code, TrendingUp, BarChart2, Info } from 'lucide-react';
import { TechnicalSheet } from '../data';

interface TechnicalSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  sheet: TechnicalSheet | null;
}

const IconMap: Record<string, any> = {
  Globe,
  Code,
  TrendingUp,
  BarChart2
};

export default function TechnicalSheetModal({ isOpen, onClose, sheet }: TechnicalSheetModalProps) {
  if (!sheet) return null;

  const Icon = IconMap[sheet.icon] || Info;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-accent-purple/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden rounded-none"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
                  <Icon className="w-6 h-6 text-accent-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">{sheet.title}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-accent-pink font-bold">Scheda Tecnica Servizio</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white p-2 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-white/10">
              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Panoramica</h4>
                <p className="text-sm text-white/80 leading-relaxed italic">"{sheet.description}"</p>
              </div>

              {/* Grid: Features & Tech Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Features */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Cosa Include</h4>
                  <ul className="space-y-3">
                    {sheet.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-xs text-white/70">
                        <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Specs Table */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Dettagli Tecnici</h4>
                  <div className="space-y-3 bg-white/5 p-4 border border-white/10">
                    {sheet.techSpecs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2 last:border-0 last:pb-0">
                        <span className="text-white/40 font-mono">{spec.label}:</span>
                        <span className="text-white font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    onClose();
                    document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full grad-electric text-white font-bold py-3 uppercase tracking-widest text-xs hover:shadow-lg transition-all cursor-pointer"
                >
                  Richiedi Preventivo per questo Servizio
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

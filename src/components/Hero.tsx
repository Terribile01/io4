import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../App';

interface HeroProps {
  onServiceSelect: (service: keyof typeof SERVICES_DATA) => void;
}

export const Hero = React.memo(({ onServiceSelect }: HeroProps) => {
  return (
    <section className="pt-24 md:pt-36 flex flex-col items-center text-center relative max-w-4xl mx-auto pb-10" id="hero">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 text-white rounded-none px-4 py-1.5 text-[9px] uppercase font-bold tracking-widest flex items-center gap-2 mb-6 shadow-md"
      >
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full live-beacon"></span>
        Maria Teresa Rogani • Freelance Web Designer & Lead Generation
      </motion.div>

      <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter text-white/95 leading-[1.05]">
        Siti Web che vendono: Design e Strategia
      </h1>
      <div className="w-24 h-2 grad-sunset mx-auto mt-4 rounded-full"></div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-base text-white/95 mt-6 max-w-2xl leading-relaxed font-sans font-light"
      >
        Sono Maria Teresa, freelance specializzata nella creazione di siti web moderni e sistemi per generare nuovi contatti. Ti aiuto a far crescere il tuo business con soluzioni dirette, efficaci e facili da gestire.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-2.5 justify-center items-center mt-8"
      >
        {Object.keys(SERVICES_DATA).map((tag, idx) => (
          <button
            key={idx}
            onClick={() => onServiceSelect(tag as keyof typeof SERVICES_DATA)}
            className="text-[10px] font-bold bg-accent-purple/20 text-white/95 px-4 py-2 border border-accent-purple/30 rounded-none shadow-sm flex items-center gap-2 hover:bg-accent-purple/40 hover:border-accent-purple/50 transition-all cursor-pointer backdrop-blur-sm group"
          >
            <div className="w-1.5 h-1.5 bg-accent-pink rounded-full group-hover:scale-125 transition-transform"></div>
            {tag}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mt-10 w-full max-w-2xl"
      >
        <a
          href="#contatti"
          className="glass-orange-50 hover:shadow-xl hover:scale-[1.03] transition-all text-white font-bold px-8 py-4 rounded-none flex items-center justify-center gap-2 uppercase tracking-widest text-[11px] w-full sm:w-auto cursor-pointer"
        >
          Inizia Ora - Parlami del tuo Progetto <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#servizi"
          className="bg-transparent border border-white/30 text-white/95 hover:bg-[#121214] hover:text-white transition-all font-bold px-8 py-4 rounded-none flex items-center justify-center uppercase tracking-widest text-[11px] w-full sm:w-auto cursor-pointer"
        >
          Cosa Posso Fare Per Te
        </a>
      </motion.div>

      {/* Brand Logos Marquee */}
      <div className="mt-20 w-full overflow-hidden relative py-6 border-y border-white/5">
        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0015] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0015] to-transparent z-10"></div>

        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }}
          style={{ width: "max-content" }}
        >
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <BrandLogo name="WordPress" url="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/wordpress.svg" />
              <BrandLogo name="Wix" url="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/wix.svg" />
              <BrandLogo name="Squarespace" url="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/squarespace.svg" />
              <BrandLogo name="Shopify" url="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/shopify.svg" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

const BrandLogo = ({ name, url }: { name: string; url: string }) => (
  <div className="flex items-center gap-3 opacity-30 hover:opacity-60 transition-opacity group cursor-default">
    <img
      src={url}
      alt={name}
      className="w-6 h-6 md:w-8 md:h-8 invert"
      loading="lazy"
    />
    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white">
      {name}
    </span>
  </div>
);

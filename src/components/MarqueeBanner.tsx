import React from 'react';
import { motion } from 'motion/react';

const BrandLogo = ({ name, url }: { name: string; url: string }) => (
  <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity group cursor-default">
    <div
      className="w-6 h-6 md:w-8 md:h-8 bg-accent-pink"
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskSize: 'contain'
      }}
    />
    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent-pink">
      {name}
    </span>
  </div>
);

export const MarqueeBanner = React.memo(() => {
  return (
    <div className="w-full relative overflow-hidden py-24 border-y border-white/10">
      {/* Background Image with dark purple overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url('/assets/uploads/banner-bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#0A0015]/90 backdrop-blur-[1px]"></div>
      </div>

      {/* Fading Edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0015] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0015] to-transparent z-10"></div>

      <motion.div
        className="relative z-10 flex whitespace-nowrap gap-16 md:gap-28 items-center"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear"
        }}
        style={{ width: "max-content" }}
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            <BrandLogo name="WordPress" url="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/wordpress.svg" />
            <BrandLogo name="Hostinger" url="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/hostinger.svg" />
            <BrandLogo name="Wix" url="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/wix.svg" />
            <BrandLogo name="Squarespace" url="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/squarespace.svg" />
            <BrandLogo name="Shopify" url="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/shopify.svg" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
});

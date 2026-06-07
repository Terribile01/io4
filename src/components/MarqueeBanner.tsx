import React from 'react';
import { motion } from 'motion/react';

interface Logo {
  name: string;
  url: string;
}

interface MarqueeBannerProps {
  logos: Logo[];
  duration?: number;
  color?: string; // Tailwind class like "accent-pink" or "white"
}

const BrandLogo = ({ name, url, color }: { name: string; url: string; color: string; key?: string }) => {
  // Determine if the color is a utility class or a raw color
  const isUtility = !color.startsWith('#') && !color.startsWith('rgb');
  const iconClass = isUtility ? `bg-${color}` : '';
  const textClass = isUtility ? `text-${color}` : '';

  return (
    <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity group cursor-default">
      <div
        className={`w-6 h-6 md:w-8 md:h-8 ${iconClass}`}
        style={{
          backgroundColor: isUtility ? undefined : color,
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
      <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ${textClass}`}
            style={{ color: isUtility ? undefined : color }}>
        {name}
      </span>
    </div>
  );
};

export const MarqueeBanner = React.memo(({ logos, duration = 15, color = "accent-pink" }: MarqueeBannerProps) => {
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
          duration: duration,
          ease: "linear"
        }}
        style={{ width: "max-content" }}
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {logos.map((logo, idx) => (
              <BrandLogo key={`${i}-${idx}`} name={logo.name} url={logo.url} color={color} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
});

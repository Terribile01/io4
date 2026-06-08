import React from 'react';
import { motion } from 'motion/react';
import { Logo } from '../constants/logos';

interface MarqueeBannerProps {
  logos: Logo[];
  duration?: number;
  color?: string; // Tailwind color key or hex
}

interface BrandLogoProps {
  logo: Logo;
  color: string;
}

const BrandLogo = React.memo(({ logo, color }: BrandLogoProps) => {
  // Use standard img tag for better compatibility and visibility
  // If the URL already contains the color (SimpleIcons), it will render in that color.
  // For SVGL fallbacks, we use a grayscale filter and then apply a blue tint via CSS filter if possible,
  // or just rely on the SVG itself. To be safe and consistent with the "mask" effect without CORS issues:

  const getFilterStyle = () => {
    // If it's the requested vivid blue (#0A84FF), we can attempt to color SVGL icons
    // But since SimpleIcons is our primary source and already has the color,
    // we only need a fallback for the 3-4 SVGL icons.
    if (logo.url.includes('svgl.app')) {
      // Approximate filter for #0A84FF: invert(41%) sepia(99%) saturate(4156%) hub-rotate(195deg) brightness(101%) contrast(106%)
      return { filter: 'invert(41%) sepia(99%) saturate(4156%) hue-rotate(195deg) brightness(101%) contrast(106%)' };
    }
    return {};
  };

  const getTextColor = () => {
    if (color === 'accent-blue') return 'var(--color-accent-blue)';
    return color;
  };

  return (
    <div className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity group cursor-default">
      <img
        src={logo.url}
        alt={logo.name}
        className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] object-contain"
        style={getFilterStyle()}
        loading="eager"
      />
      <span
        className="text-[11px] md:text-sm font-bold uppercase tracking-[0.2em]"
        style={{ color: getTextColor() }}
      >
        {logo.name}
      </span>
    </div>
  );
});

BrandLogo.displayName = 'BrandLogo';

export const MarqueeBanner = React.memo(({ logos, duration = 15, color = "accent-blue" }: MarqueeBannerProps) => {
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
              <BrandLogo key={`${i}-${idx}`} logo={logo} color={color} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
});

MarqueeBanner.displayName = 'MarqueeBanner';

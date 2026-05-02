import React from 'react';
import { motion } from 'framer-motion';

interface SponsorCardProps {
  logo: string;
  name: string;
  tier: 'platinum' | 'gold' | 'stream' | 'community';
}

const SponsorCard: React.FC<SponsorCardProps> = ({ logo, name, tier }) => {
  const logoSizeClasses = {
    platinum: 'h-20 sm:h-24 md:h-32',
    gold: 'h-16 sm:h-20 md:h-24',
    stream: 'h-14 sm:h-16 md:h-20',
    community: 'h-10 sm:h-12 md:h-16',
  };

  const nameSizeClasses = {
    platinum: 'text-4xl sm:text-5xl md:text-6xl',
    gold: 'text-3xl sm:text-4xl md:text-5xl',
    stream: 'text-2xl sm:text-3xl md:text-4xl',
    community: 'text-xl sm:text-2xl md:text-3xl',
  };

  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="relative cursor-pointer group flex flex-col items-center justify-center gap-4 px-2 py-4"
    >
      {/* Normal Logo (No filters or outlines on the image itself) */}
      <motion.img
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.08 },
        }}
        transition={{ duration: 0.35, type: 'spring', stiffness: 300, damping: 20 }}
        src={logo}
        alt={name}
        className={`${logoSizeClasses[tier]} w-auto object-contain`}
      />

      {/* Name Label: Sticker Outline Effect (no rectangle) */}
      <motion.div
        variants={{
          rest: { opacity: 0.85, y: 0 },
          hover: { opacity: 1, y: -2 },
        }}
        transition={{ duration: 0.3 }}
        className="relative mt-2"
      >
        <span
          className={`${nameSizeClasses[tier]} leading-none text-center tracking-wide relative block`}
          style={{ fontFamily: 'var(--font-peachy)' }}
        >
          {/* Black Outer Outline */}
          <span 
            className="absolute inset-0 z-0" 
            style={{ WebkitTextStroke: '10px #1a1a1a', color: 'transparent' }}
          >
            {name}
          </span>
          {/* White Inner "Background" Outline */}
          <span 
            className="absolute inset-0 z-10" 
            style={{ WebkitTextStroke: '6px white', color: 'transparent' }}
          >
            {name}
          </span>
          {/* Main Black Text */}
          <span className="relative z-20 text-[#1a1a1a]">
            {name}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SponsorCard;

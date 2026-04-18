import React from 'react';
import { motion } from 'framer-motion';

interface SponsorCardProps {
  logo: string;
  name: string;
  tier: 'platinum' | 'gold' | 'stream' | 'community';
}

const SponsorCard: React.FC<SponsorCardProps> = ({ logo, name, tier }) => {
  const sizeClasses = {
    platinum: 'h-16 sm:h-24 md:h-28',
    gold: 'h-12 sm:h-16 md:h-20',
    stream: 'h-10 sm:h-14 md:h-18',
    community: 'h-8 sm:h-12 md:h-14',
  };

  return (
    <motion.div
      whileHover="hover"
      className="relative flex items-center justify-center p-6 cursor-pointer group"
    >
      {/* Animated Box Background */}
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.9, rotate: -2 },
          hover: { opacity: 1, scale: 1, rotate: 0 }
        }}
        initial="initial"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 bg-[#e8e2c8] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_0px_#1a1a1a] rounded-lg z-0"
      />

      {/* Sponsor Logo */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <motion.img 
          variants={{
            initial: { filter: "grayscale(100%)", opacity: 0.5, scale: 1 },
            hover: { filter: "grayscale(0%)", opacity: 1, scale: 1.05 }
          }}
          transition={{ duration: 0.4 }}
          src={logo} 
          alt={name}
          className={`${sizeClasses[tier]} w-auto object-contain`}
        />
        
        {/* Optional: Name reveal */}
        <motion.span
          variants={{
            initial: { opacity: 0, y: 5 },
            hover: { opacity: 0.4, y: 0 }
          }}
          className="font-mono text-[10px] uppercase font-bold text-[#1a1a1a] tracking-widest mt-2"
        >
          {name}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default SponsorCard;

import React from 'react';
import { motion } from 'framer-motion';

interface PrizeCardProps {
  title: string;
  amount: string;
  mainColor: string;
  accentColor: string;
  isMain?: boolean;
  metalGradient?: string;
}

const PrizeCard: React.FC<PrizeCardProps> = ({
  title,
  amount,
  mainColor,
  accentColor,
  isMain = false,
  metalGradient
}) => {
  const getTextPalette = () => {
    // Shared Golden Glow for all cards
    const whiteGlow = '#FFFFFF';
    const goldenGlow = '#F2C94C';
    const blackFill = '#000000';

    if (title.toUpperCase().includes('1ST')) {
      return {
        amountFill: blackFill,
        amountStroke: '#6B4E0E',
        titleFill: '#996B1C',
        titleStroke: '#5A3C0B',
        amountGlow: whiteGlow,
        amountHoverGlow: goldenGlow,
        titleGlow: '#F9E7A155',
      };
    }
    if (title.toUpperCase().includes('2ND')) {
      return {
        amountFill: blackFill,
        amountStroke: '#4A505A',
        titleFill: '#5A5F69',
        titleStroke: '#3A3F49',
        amountGlow: goldenGlow,
        amountHoverGlow: goldenGlow,
        titleGlow: '#E5E7EB55',
      };
    }
    if (title.toUpperCase().includes('3RD')) {
      return {
        amountFill: blackFill,
        amountStroke: '#5A3C1F',
        titleFill: '#7A4E2D',
        titleStroke: '#4E3217',
        amountGlow: goldenGlow,
        amountHoverGlow: goldenGlow,
        titleGlow: '#D9A06655',
      };
    }
    if (title.toUpperCase().includes('CONSOLATION')) {
      return {
        amountFill: blackFill,
        amountStroke: '#1E182D',
        titleFill: '#2E2545',
        titleStroke: '#161221',
        amountGlow: goldenGlow,
        amountHoverGlow: whiteGlow,
        titleGlow: '#C3B1E155',
      };
    }
    return {
      amountFill: blackFill,
      amountStroke: '#1E182D',
      titleFill: '#2E2545',
      titleStroke: '#161221',
      amountGlow: goldenGlow,
      titleGlow: '#C3B1E155',
    };
  };

  const palette = getTextPalette();

  return (
    <motion.div
      className="relative w-full h-full group outline-none"
      whileHover={{ y: -14, scale: 1.04, rotate: isMain ? -0.5 : 0.8 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >

      <div
        className={`relative z-10 w-full h-full border-[4px] border-[#1a1a1a] flex flex-col overflow-hidden rounded-[28px]
          ${isMain ? 'p-6 sm:p-8' : 'p-5 sm:p-7'}
        `}
        style={{
          background: metalGradient || mainColor,
        }}
      >
        {/* Metallic Reflection Overlay - Subtle vertical light streak */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/6 via-white/2 to-transparent opacity-50 rounded-[24px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1/3 h-full bg-gradient-to-b from-white/3 via-white/1 to-transparent opacity-30 rounded-full blur-2xl" />
        </div>

        {/* High-Fidelity Organic Laurel Wreaths */}
        <div className="absolute top-4 left-4 w-16 sm:w-20 h-16 sm:h-20 opacity-40 pointer-events-none -rotate-[15deg] group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 40 40" fill={palette.amountFill}>
            {/* Stem - smoother curve */}
            <path d="M22,38 C22,38 12,28 12,18 C12,10 18,4 18,4" fill="none" stroke={palette.amountFill} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
            
            {/* Attachment Points tuned to the stem curve: (17,32), (12,25), (12,18), (14,11) approx */}
            {/* Left side leaves */}
            <path d="M17,32 C12,34 9,31 10,28 C11,25 15,28 17,32 Z" />
            <path d="M12,25 C6,26 3,22 4,19 C5,16 10,19 12,25 Z" />
            <path d="M12,18 C6,18 3,13 5,10 C7,7 10,13 12,18 Z" />
            <path d="M14,11 C10,10 8,6 10,3 C12,0 13,6 14,11 Z" />
            
            {/* Right side leaves */}
            <path d="M17,32 C22,34 25,31 24,28 C23,25 19,28 17,32 Z" />
            <path d="M12,25 C18,26 21,22 20,19 C19,16 14,19 12,25 Z" />
            <path d="M12,18 C18,18 21,13 19,10 C17,7 14,13 12,18 Z" />
            <path d="M14,11 C18,10 20,6 18,3 C16,0 15,6 14,11 Z" />

            {/* Apex Terminal Leaf */}
            <path d="M18,4 C19,0 22,0 20,4 C18,8 15,8 18,4 Z" />
          </svg>
        </div>

        <div className="absolute top-4 right-4 w-16 sm:w-20 h-16 sm:h-20 opacity-40 pointer-events-none rotate-[15deg] group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 40 40" fill={palette.amountFill}>
            {/* Stem - smoother curve */}
            <path d="M18,38 C18,38 28,28 28,18 C28,10 22,4 22,4" fill="none" stroke={palette.amountFill} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
            
            {/* Attachment Points tuned to the stem curve: (23,32), (28,25), (28,18), (26,11) approx */}
            {/* Right side leaves */}
            <path d="M23,32 C28,34 31,31 30,28 C29,25 25,28 23,32 Z" />
            <path d="M28,25 C34,26 37,22 36,19 C35,16 30,19 28,25 Z" />
            <path d="M28,18 C34,18 37,13 35,10 C33,7 30,13 28,18 Z" />
            <path d="M26,11 C30,10 32,6 30,3 C28,0 27,6 26,11 Z" />
            
            {/* Left side leaves */}
            <path d="M23,32 C18,34 15,31 16,28 C17,25 21,28 23,32 Z" />
            <path d="M28,25 C22,26 19,22 20,19 C21,16 26,19 28,25 Z" />
            <path d="M28,18 C22,18 19,13 21,10 C23,7 26,13 28,18 Z" />
            <path d="M26,11 C22,10 20,6 22,3 C24,0 25,6 26,11 Z" />

            {/* Apex Terminal Leaf */}
            <path d="M22,4 C21,0 18,0 20,4 C22,8 25,8 22,4 Z" />
          </svg>
        </div>

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1a1a1a]/40" />

        <div className="relative z-10 flex flex-col justify-start items-center pt-8 mb-4">
          <h3 className={`font-display font-bold leading-none tracking-tight
             ${isMain ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`
          }
            style={{
              // 3-Layer Text Style for Title
              color: palette.titleFill,
              WebkitTextStroke: `1px ${palette.titleStroke}`,
              textShadow: `
              0 1.5px 3px rgba(0, 0, 0, 0.35),
              0 0 8px ${palette.titleGlow}
            `,
            }}
          >
            {title}
          </h3>
        </div>

        <div className="relative z-10 flex-grow flex flex-col justify-center items-center mt-1 group-hover:scale-[1.04] transition-transform duration-300">
          {/* Radial burst glow - single color family */}
          <div
            className={`absolute rounded-full blur-3xl opacity-30 transition-opacity duration-300 group-hover:opacity-45 ${isMain ? 'w-[95%] h-32 sm:h-36' : 'w-[92%] h-28 sm:h-32'}`}
            style={{
              background: `radial-gradient(circle, ${accentColor}88 0%, ${mainColor}66 30%, rgba(255,255,255,0) 70%)`,
            }}
          />

          {/* Secondary subtle burst - depth layer */}
          <div
            className={`absolute rounded-full blur-2xl opacity-15 transition-opacity duration-300 group-hover:opacity-25 ${isMain ? 'w-[80%] h-24 sm:h-28' : 'w-[76%] h-20 sm:h-24'}`}
            style={{
              background: `radial-gradient(circle, ${mainColor}66 0%, rgba(255,255,255,0) 60%)`,
            }}
          />

          <p 
            className={`font-display font-black leading-none text-black relative z-20 transition-all duration-300
              ${isMain ? 'text-5xl sm:text-[64px]' : 'text-4xl sm:text-[48px]'}
            `}
            style={{
              textShadow: `0 0 10px ${palette.amountGlow}, 0 0 20px ${palette.amountGlow}, 0 0 35px ${palette.amountGlow}aa`
            }}
          >
            ₹{amount}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrizeCard;
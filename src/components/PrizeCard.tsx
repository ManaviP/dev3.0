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

const CelebrationSVG: React.FC<{ mainColor: string }> = ({ mainColor }) => (
  <svg className="absolute w-full h-full inset-0 pointer-events-none overflow-visible" viewBox="0 0 100 140" preserveAspectRatio="none">
    {/* === DECORATIVE BADGE/RIBBON AT TOP === */}
    {/* Minimal ribbon banner effect */}
    <g opacity="0.2">
      <path d="M 35 8 L 50 5 L 65 8 L 60 12 L 50 10 L 40 12 Z" fill={mainColor} stroke={mainColor} strokeWidth="0.4"/>
      <circle cx="50" cy="8" r="1.8" fill="none" stroke={mainColor} strokeWidth="0.4" opacity="0.3"/>
    </g>

    {/* === TOP-LEFT CORNER CLUSTER === */}
    <g opacity="0.22">
      {/* Sparkle */}
      <path d="M 6 8 L 8 6 L 10 8 L 8 10 Z" fill={mainColor}/>
      <path d="M 8 4 L 8 12 M 2 8 L 14 8" stroke={mainColor} strokeWidth="0.3" opacity="0.5"/>
      {/* Confetti circles */}
      <circle cx="12" cy="14" r="0.8" fill={mainColor} opacity="0.6"/>
      <circle cx="5" cy="18" r="0.5" fill={mainColor} opacity="0.5"/>
      {/* Small triangle */}
      <path d="M 8 16 L 10 20 L 6 20 Z" fill={mainColor} opacity="0.4"/>
    </g>

    {/* === TOP-RIGHT CORNER CLUSTER === */}
    <g opacity="0.2">
      {/* Confetti rectangles */}
      <rect x="88" y="6" width="3.5" height="1.5" fill={mainColor} opacity="0.5" transform="rotate(-35 89.75 6.75)"/>
      <rect x="92" y="12" width="2.8" height="1.2" fill={mainColor} opacity="0.4" transform="rotate(25 93.4 12.6)"/>
      {/* Dot clusters */}
      <circle cx="87" cy="18" r="0.6" fill={mainColor} opacity="0.5"/>
      <circle cx="94" cy="20" r="0.4" fill={mainColor} opacity="0.4"/>
    </g>

    {/* === MIDDLE-LEFT ACCENT === */}
    <g opacity="0.18">
      <path d="M 4 60 Q 6 58 8 60" stroke={mainColor} strokeWidth="0.5" fill="none" opacity="0.6"/>
      <circle cx="6" cy="68" r="0.9" fill={mainColor} opacity="0.45"/>
      <path d="M 3 75 L 5 78 L 7 75 Z" fill={mainColor} opacity="0.35"/>
    </g>

    {/* === MIDDLE-RIGHT ACCENT === */}
    <g opacity="0.19">
      <path d="M 96 65 Q 94 62 92 65" stroke={mainColor} strokeWidth="0.5" fill="none" opacity="0.6"/>
      <circle cx="94" cy="73" r="0.85" fill={mainColor} opacity="0.45"/>
      <path d="M 97 80 L 95 83 L 93 80 Z" fill={mainColor} opacity="0.35"/>
    </g>

    {/* === BOTTOM-LEFT CORNER === */}
    <g opacity="0.21">
      {/* Star shape */}
      <path d="M 10 128 L 11.2 131 L 14.5 131 L 12 133 L 13 136 L 10 134 L 7 136 L 8 133 L 5.5 131 L 8.8 131 Z" fill={mainColor} opacity="0.5"/>
      {/* Small circles */}
      <circle cx="18" cy="135" r="0.7" fill={mainColor} opacity="0.4"/>
      <circle cx="8" cy="142" r="0.5" fill={mainColor} opacity="0.35"/>
    </g>

    {/* === BOTTOM-RIGHT CORNER === */}
    <g opacity="0.2">
      {/* Confetti elements */}
      <rect x="90" y="130" width="3" height="1.8" fill={mainColor} opacity="0.5" transform="rotate(-40 91.5 131.5)"/>
      <circle cx="92" cy="125" r="1.2" fill="none" stroke={mainColor} strokeWidth="0.3" opacity="0.4"/>
      {/* Small triangle */}
      <path d="M 87 138 L 89 142 L 85 142 Z" fill={mainColor} opacity="0.35"/>
    </g>

    {/* === CENTER AREA BURST LINES === */}
    <g opacity="0.15" strokeWidth="0.4" stroke={mainColor} fill="none">
      {/* Radial lines behind amount */}
      <line x1="50" y1="65" x2="50" y2="50"/>
      <line x1="50" y1="65" x2="60" y2="55" strokeWidth="0.3"/>
      <line x1="50" y1="65" x2="40" y2="55" strokeWidth="0.3"/>
      <line x1="50" y1="65" x2="62" y2="65" strokeWidth="0.3"/>
      <line x1="50" y1="65" x2="38" y2="65" strokeWidth="0.3"/>
      {/* Subtle arc */}
      <path d="M 42 70 Q 50 75 58 70" strokeWidth="0.35" opacity="0.4"/>
    </g>

    {/* === EDGE CURVES === */}
    <path d="M 20 0 Q 50 3 80 0" stroke={mainColor} strokeWidth="0.5" fill="none" opacity="0.12"/>
    <path d="M 15 140 Q 50 136 85 140" stroke={mainColor} strokeWidth="0.5" fill="none" opacity="0.12"/>
  </svg>
);

const PrizeCard: React.FC<PrizeCardProps> = ({ 
  title, 
  amount, 
  mainColor,
  accentColor,
  isMain = false,
  metalGradient
}) => {
  const getTextPalette = () => {
    if (title.includes('1ST')) {
      return {
        // Gold family - light to dark
        amountFill: '#AA7F1F',
        amountStroke: '#6B4E0E',
        titleFill: '#996B1C',
        titleStroke: '#5A3C0B',
        // Gold glow - same family
        amountGlow: '#F2C94C77',
        titleGlow: '#F9E7A155',
      };
    }
    if (title.includes('2ND')) {
      return {
        // Silver family - light to dark
        amountFill: '#6B7079',
        amountStroke: '#4A505A',
        titleFill: '#5A5F69',
        titleStroke: '#3A3F49',
        // Silver glow - same family
        amountGlow: '#C9CCD177',
        titleGlow: '#E5E7EB55',
      };
    }
    if (title.includes('3RD')) {
      return {
        // Bronze family - light to dark
        amountFill: '#8B5A2B',
        amountStroke: '#5A3C1F',
        titleFill: '#7A4E2D',
        titleStroke: '#4E3217',
        // Bronze glow - same family
        amountGlow: '#B8733377',
        titleGlow: '#D9A06655',
      };
    }
    if (title.includes('CONSOLATION')) {
      return {
        // Deep Violet family - premium indie metallic
        amountFill: '#382D54',
        amountStroke: '#1E182D',
        titleFill: '#2E2545',
        titleStroke: '#161221',
        // Violet glow - same family
        amountGlow: '#8E7AB577',
        titleGlow: '#C3B1E155',
      };
    }
    return {
      // Fallback - Violet
      amountFill: '#382D54',
      amountStroke: '#1E182D',
      titleFill: '#2E2545',
      titleStroke: '#161221',
      amountGlow: '#8E7AB577',
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
      {/* Enhanced Card Depth Shadow - Strong black shadow with enhanced offset for main card */}
      <div
        className={`absolute inset-0 bg-black transition-all duration-300 rounded-[28px]
          ${isMain 
            ? 'translate-x-4 translate-y-5 shadow-[0_28px_56px_rgba(0,0,0,0.55)] group-hover:translate-x-5 group-hover:translate-y-6 group-hover:shadow-[0_36px_72px_rgba(0,0,0,0.68)]'
            : 'translate-x-3 translate-y-4 shadow-[0_24px_48px_rgba(0,0,0,0.48)] group-hover:translate-x-4 group-hover:translate-y-5 group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.6)]'
          }
        `}
      />

      <div
        className={`relative z-10 w-full h-full border-[4px] border-[#1a1a1a] flex flex-col overflow-hidden rounded-[28px]
          ${isMain ? 'p-6 sm:p-8' : 'p-5 sm:p-7'}
        `}
        style={{
          background: metalGradient || mainColor,
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.22), inset 0 2px 0 rgba(255,255,255,0.25)',
        }}
      >
        {/* Metallic Reflection Overlay - Subtle vertical light streak */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/6 via-white/2 to-transparent opacity-50 rounded-[24px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1/3 h-full bg-gradient-to-b from-white/3 via-white/1 to-transparent opacity-30 rounded-full blur-2xl" />
        </div>

        {/* Celebration SVG Elements */}
        <CelebrationSVG mainColor={mainColor} />

        <div
          className="absolute inset-0 opacity-[0.11] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />

        <div className="absolute inset-x-0 top-[26%] h-[18%] bg-[#1a1a1a]/[0.07] pointer-events-none" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[9%] bg-[#1a1a1a]/[0.06] pointer-events-none" />
        <div className="absolute top-3 right-3 w-7 h-7 rounded-md border-2 border-[#1a1a1a]/35 bg-[#fdfaf1]/30 rotate-6 pointer-events-none" />
        <div className="absolute top-4 right-[18px] w-2 h-2 rounded-full border border-[#1a1a1a]/45 pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1a1a1a]/40" />

        <div className="relative z-10 flex flex-col justify-start items-center pt-8 mb-4">
          <h3 className={`font-display font-bold uppercase leading-none tracking-tight
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

          <p className={`font-display font-black leading-none relative inline-block
            ${isMain ? 'text-5xl sm:text-[80px]' : 'text-4xl sm:text-6xl'}
          `}>
            <span
              aria-hidden="true"
              className="absolute inset-0 blur-[6px] opacity-45 group-hover:opacity-60 transition-opacity duration-300"
              style={{
                color: palette.amountGlow,
                WebkitTextStroke: `1px ${palette.amountGlow}`,
                textShadow: `0 0 8px ${palette.amountGlow}, 0 0 14px ${palette.amountGlow}`,
              }}
            >
              ₹{amount}
            </span>
            <span
              style={{
                // Single-tone text with proper contrast
                color: palette.amountFill,
                WebkitTextStroke: `1.4px ${palette.amountStroke}`,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15)',
                transition: 'text-shadow 0.3s ease, color 0.3s ease',
              }}
              className="group-hover:drop-shadow-lg"
            >
              ₹{amount}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrizeCard;

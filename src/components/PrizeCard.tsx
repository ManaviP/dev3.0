import React, { useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface PrizeCardProps {
  title: string;
  amount: string;
  isMain?: boolean;
  pinColor?: string;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ title, amount, isMain = false, pinColor = "#f97028" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to rotation degrees

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate relative position (-0.5 to 0.5)
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={`relative perspective-1000 ${isMain ? 'z-10' : 'z-0'}`}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{

          transformStyle: "preserve-3d",
        }}
        className={`relative w-full bg-[#fdfaf1] border-2 border-[#1a1a1a] p-4 sm:p-5 transition-shadow duration-300 hover:shadow-2xl group overflow-hidden`}
      >
        {/* Subtle Paper Texture Overlay */}

        {/* Realistic Pushpin */}
        <motion.div
          className="absolute -top-2 -left-2 w-10 h-10 z-40 pointer-events-none"
          initial={{ rotate: -10 }}
          whileHover={{ rotate: [-10, 10, -10], transition: { repeat: Infinity, duration: 1 } }}
          style={{ transformStyle: "preserve-3d", translateZ: "60px" }}
        >
          {/* Pin Shadow on paper */}
          <div className="absolute top-5 left-5 w-3 h-3 bg-black/30 rounded-full blur-md" />

          {/* Pin Needle - The part "stuck" in the paper */}
          <div className="absolute top-[60%] left-[50%] -translate-x-1/2 w-[1.5px] h-5 bg-gradient-to-b from-[#b0b0b0] to-transparent origin-top -rotate-[25deg] shadow-sm" />

          {/* Pin Head - Spherical with highlight */}
          <div
            className="absolute inset-2.5 rounded-full shadow-lg border border-black/20"
            style={{
              backgroundColor: pinColor,
              backgroundImage: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, transparent 60%)`,
              boxShadow: `inset -2px -2px 6px rgba(0,0,0,0.4), 4px 8px 12px rgba(0,0,0,0.3)`
            }}
          />
        </motion.div>


        {/* Content Container with translateZ for depth */}
        <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]" style={{ transform: "translateZ(40px)" }}>
          {/* Header */}
          <div className="border-b-2 border-[#1a1a1a] pb-2 mb-4">
            <h3 className={`font-display ${title.length > 10 ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'} text-[#1a1a1a] leading-tight transition-all duration-300 whitespace-nowrap`}>
              {title}
            </h3>
          </div>

          {/* Body */}
          <div className="flex-grow flex flex-col justify-center items-center py-2">
            <div className="w-full flex items-center gap-3 mb-1">
              <div className="h-[1px] flex-grow bg-[#1a1a1a]/10" />
              <p className="font-sans text-[9px] uppercase font-bold tracking-[0.2em] text-[#1a1a1a]/50 whitespace-nowrap">
                Cash prize
              </p>
              <div className="h-[1px] flex-grow bg-[#1a1a1a]/10" />
            </div>

            <div className="relative group/amount">
              <p className="font-display text-4xl sm:text-5xl text-[#1a1a1a] relative z-20 transition-transform group-hover/amount:scale-105 duration-300">
                ₹{amount}
              </p>
              {/* Vibrant Highlight Line */}
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-1.5 rounded-full -rotate-1 -z-10"
                style={{ backgroundColor: pinColor + "33" }} // 20% opacity of the pin color
                whileInView={{ width: ["0%", "100%"] }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-between items-center opacity-40">
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <div key={i} className="w-1 h-2 bg-[#1a1a1a] rounded-sm" />)}
            </div>
            <p className="font-sans text-[7px] font-bold uppercase tracking-tighter">Classified</p>
          </div>
        </div>

        {/* "Groovy" edge highlight */}
        <div className="absolute top-0 left-0 w-full h-[6px] bg-[#1a1a1a]/5 animate-pulse" />
      </motion.div>

      {/* 3D Drop Shadow Effect */}
      <div className="absolute inset-0 bg-black/10 blur-xl translate-y-8 scale-90 -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default PrizeCard;

import React from 'react';
import SponsorCard from '../components/SponsorCard';
import DotGrid from '../components/DotGrid';
import { motion } from 'framer-motion';

const Sponsors: React.FC = () => {

  const goldSponsors = [
    { name: "AIC DSU Innovation Foundation", logo: "/logos/aic-dsu.png" },
    { name: "CodeCrafters.io", logo: "/logos/codecraft.svg" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 }
    },
  };

  const TierLabel = ({ label }: { label: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center gap-4 mb-12"
    >
      <div className="h-[2px] flex-1 bg-[#f97028]/40" />
      <span className="font-sans font-black text-sm md:text-xl uppercase tracking-[0.4em] text-[#f97028]">
        {label}
      </span>
      <div className="h-[2px] flex-1 bg-[#f97028]/40" />
    </motion.div>
  );

  return (
    <section id="sponsors" className="pt-16 pb-24 px-6 sm:px-10 bg-[#1a1a1a] relative scroll-mt-20 overflow-hidden rounded-t-[2.5rem] rounded-b-[2.5rem] md:rounded-t-[4rem] md:rounded-b-[4rem] shadow-[0px_-6px_0px_#f97028,0px_6px_0px_#f97028] sm:shadow-[0px_-10px_0px_#f97028,0px_10px_0px_#f97028] z-20">
      {/* Interactive DotGrid Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <DotGrid
          dotSize={6}
          gap={32}
          baseColor="#3a3a3a"
          activeColor="#f97028"
          proximity={120}
          shockRadius={200}
          shockStrength={5}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">

        {/* Sponsors Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-[2px] w-20 bg-[#f97028] mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 40, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0em" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="font-display text-cream drop-shadow-sm uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1 }}
          >
            Sponsors
          </motion.h2>

        </div>
        { /*
       { Platinum }
        <div className="w-full mb-20">
          <TierLabel label="Platinum Sponsors" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap justify-center gap-10 sm:gap-16"
          >
            {platinumSponsors.map((s, i) => (
              <motion.div key={i} variants={itemVariants}>
                <SponsorCard {...s} tier="platinum" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        */
        }
        {/* Gold */}
        <div className="w-full">
          <TierLabel label="Gold Sponsors" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-row flex-nowrap justify-center items-center gap-10 sm:gap-20"
          >
            {goldSponsors.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex justify-center">
                <SponsorCard {...s} tier="gold" />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Sponsors;

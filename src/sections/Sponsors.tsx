import React from 'react';
import SponsorCard from '../components/SponsorCard';
import DotGrid from '../components/DotGrid';
import { motion } from 'framer-motion';

const Sponsors: React.FC = () => {

  const platinumSponsors = [
    { name: "Webflow", logo: "/logos/logoo 1(main).png" },
    { name: "Finsweet", logo: "/logos/logoo 2.png" },
  ];

  const goldSponsors = [
    { name: "Weglot", logo: "/logos/logoo 3.png" },
    { name: "LottieFiles", logo: "/logos/logoo 4.png" },
    { name: "Refokus", logo: "/logos/logoo 5.png" },
    { name: "Edgar Allan", logo: "/logos/logoo6.png" },
    { name: "Jetboost", logo: "/logos/logoo7.png" },
  ];

  const streamSponsors = [
    { name: "Stream A", logo: "/logos/logoo8.png" },
    { name: "Stream B", logo: "/logos/logoo9(main).png" },
    { name: "Stream C", logo: "/logos/logoo 3.png" },
  ];

  const communitySponsors = [
    { name: "Community A", logo: "/logos/logoo 4.png" },
    { name: "Community B", logo: "/logos/logoo 5.png" },
    { name: "Community C", logo: "/logos/logoo6.png" },
    { name: "Community D", logo: "/logos/logoo7.png" },
    { name: "Community E", logo: "/logos/logoo8.png" },
    { name: "Community F", logo: "/logos/logoo9(main).png" },
    { name: "Community G", logo: "/logos/logoo 1(main).png" },
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-sans text-cream/40 text-sm mt-4 tracking-widest uppercase"
          >
            The teams making DevHack 3.0 possible
          </motion.p>
        </div>

        {/* Platinum */}
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

        {/* Gold */}
        <div className="w-full mb-20">
          <TierLabel label="Gold Sponsors" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-16 max-w-4xl mx-auto items-center"
          >
            {goldSponsors.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex justify-center">
                <SponsorCard {...s} tier="gold" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stream */}
        <div className="w-full mb-20">
          <TierLabel label="Stream Sponsors" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {streamSponsors.map((s, i) => (
              <motion.div key={i} variants={itemVariants}>
                <SponsorCard {...s} tier="stream" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Community */}
        <div className="w-full">
          <TierLabel label="Community Sponsors" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-12 max-w-5xl mx-auto items-center"
          >
            {communitySponsors.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex justify-center">
                <SponsorCard {...s} tier="community" />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Sponsors;

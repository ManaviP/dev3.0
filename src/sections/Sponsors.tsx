import React from 'react';
// import SponsorCard from '../components/SponsorCard';
import { motion } from 'framer-motion';

const Sponsors: React.FC = () => {
/* 
  const platinumSponsors = [
      { name: "Webflow", logo: "/logos/logoo 1(main).png" }, // Mock data
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
*/

/*
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
*/

  // Gradient Wavy Divider Component
  /*
  const WavyLine = () => (
    <div className="w-full h-10 flex justify-center items-center overflow-hidden my-12">
      <svg width="100%" height="40" viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-[150%] sm:w-full opacity-60">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f489a3" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#f97028" />
          </linearGradient>
        </defs>
        <path 
          d="M0 20C50 20 50 15 100 15C150 15 150 20 200 20C250 20 250 25 300 25C350 25 350 20 400 20C450 20 450 15 500 15C550 15 550 20 600 20C650 20 650 25 700 25C750 25 750 20 800 20C850 20 850 15 900 15C950 15 950 20 1000 20C1050 20 1050 25 1100 25C1150 25 1150 20 1200 20" 
          stroke="url(#waveGradient)" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
  */

  return (
    <section id="sponsors" className="py-24 px-6 sm:px-10 bg-[#f3ecd2] relative scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Sponsors Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-block mb-4"
          >
            <div className="h-[2px] w-20 bg-[#f97028] mx-auto" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0em" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="font-display text-[#1a1a1a] drop-shadow-sm uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1 }}
          >
            Sponsors
          </motion.h2>
        </div>

        {/* Platinum Content (Coming Soon) */}
        <div className="w-full text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <span className="font-display text-4xl sm:text-5xl text-[#1a1a1a]/30 uppercase tracking-widest italic">
              Coming Soon
            </span>
            {/* 
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="flex flex-wrap justify-center gap-12 sm:gap-24"
            >
              {platinumSponsors.map((s, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <SponsorCard {...s} tier="platinum" />
                </motion.div>
              ))}
            </motion.div>
            */}
          </motion.div>
        </div>

        {/* 
        <WavyLine />

        <div className="w-full text-center mb-16">
          <h2 className="font-sans font-black text-xs sm:text-sm uppercase tracking-[0.4em] text-[#f97028] mb-12">Gold Sponsors</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-20 max-w-4xl mx-auto items-center"
          >
            {goldSponsors.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex justify-center">
                <SponsorCard {...s} tier="gold" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <WavyLine />

        <div className="w-full text-center mb-16">
          <h2 className="font-sans font-black text-xs sm:text-sm uppercase tracking-[0.4em] text-[#f97028] mb-12">Stream Sponsors</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap justify-center gap-10 sm:gap-20"
          >
            {streamSponsors.map((s, i) => (
              <motion.div key={i} variants={itemVariants}>
                <SponsorCard {...s} tier="stream" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <WavyLine />

        <div className="w-full text-center mb-16">
          <h2 className="font-sans font-black text-xs sm:text-sm uppercase tracking-[0.4em] text-[#f97028] mb-12">Community Sponsors</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-16 max-w-5xl mx-auto items-center"
          >
            {communitySponsors.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex justify-center">
                <SponsorCard {...s} tier="community" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        */}

      </div>
    </section>
  );
};

export default Sponsors;

import React from 'react';
import SponsorCard from '../components/SponsorCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Sponsors: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const titlesponsor = [
    {
      name: "GitHub",
      logo: "/logos/github.svg",
      scale: isMobile ? 1.0 : 1.3,
      hoverScale: isMobile ? 1.1 : 1.4,
      url: "https://github.com"
    }
  ]
  const goldSponsors = [
    {
      name: "AIC DSU Innovation Foundation",
      logo: "/logos/aic-dsu copy.webp",
      scale: isMobile ? 2.8 : 2.1,
      hoverScale: isMobile ? 2.8 : 2.3,
      url: "https://aicdsu.foundation/"
    },
    { name: "CodeCrafters.io", logo: "/logos/codecraft.svg", url: "https://codecrafters.io/" },
    { name: ".xyz", logo: "/logos/xyz.webp", scale: 1.2, hoverScale: 1.3, url: "https://gen.xyz/" },
    { name: "n8n", logo: "/logos/n8n.webp", scale: 1.2, hoverScale: 1.3, url: "https://n8n.io/" },
    { name: "Render", logo: "/logos/render.webp", scale: 1.8, hoverScale: 1.9, url: "https://render.com/" },
  ]

  const communityPartners = [
    { name: "DEVFOLIO LOGO", logo: "/logos/devfolio.webp", url: "https://devfolio.co/" },
  ]

  const communityPartnersSection = [
    { name: "SponFest", logo: "/logos/sf_logo.webp", scale: 2.5, hoverScale: 2.7, url: "http://sponfest.com/" },
    { name: "Student Forge", logo: "/logos/student_forge.svg", scale: 2.5, hoverScale: 2.7, url: "https://www.studentforge.in/" }
  ]
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
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1 }}
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
        {/* Title sponsor */}
        <div className="w-full mb-20">
          <TierLabel label="Title Sponsor" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap justify-center gap-10 sm:gap-16"
          >
            {titlesponsor.map((s, i) => (
              <motion.div key={i} variants={itemVariants}>
                <SponsorCard {...s} tier="platinum" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Gold */}
        <div className="w-full max-w-4xl">
          <TierLabel label="Gold Sponsors" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 justify-items-center items-center"
          >
            {goldSponsors.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="w-full flex justify-center">
                <SponsorCard {...s} tier="gold" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Platform Partners */}
        <div className="w-full max-w-4xl mt-20">
          <TierLabel label="Platform Partners" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {communityPartners.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex justify-center">
                <SponsorCard {...s} tier="community" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Community Partners */}
        <div className="w-full max-w-4xl mt-20">
          <TierLabel label="Community Partners" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            {communityPartnersSection.map((s, i) => (
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

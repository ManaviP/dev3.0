import React from 'react';
import PrizeCard from '../components/PrizeCard';
import { motion } from 'framer-motion';

const Prizes: React.FC = () => {
  const prizesData = [
    { title: "1st Prize", amount: "100,000", isMain: true, pinColor: "#f97028" },
    { title: "2nd Prize", amount: "50,000", pinColor: "#f489a3" },
    { title: "3rd Prize", amount: "25,000", pinColor: "#f3a20f" },
    { title: "Consolation Prize", amount: "25,000", pinColor: "#f97028" },
  ];

  // Variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      rotate: -3,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      scale: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 80, 
        damping: 12,
        duration: 0.8 
      }
    },
  };

  return (
    <section id="prizes" className="py-16 px-6 sm:px-10 bg-[#f3ecd2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            className="inline-block mb-4"
          >
             <div className="h-[2px] w-20 bg-[#f97028]" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 40, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0em" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display text-[#1a1a1a] drop-shadow-sm uppercase"
          >
            PRIZES
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 pb-4"
        >
          {prizesData.map((prize, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <PrizeCard
                title={prize.title}
                amount={prize.amount}
                isMain={prize.isMain}
                pinColor={prize.pinColor}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle Floating Shapes for extra polish */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-10 -left-10 w-40 h-40 border-4 border-[#1a1a1a]/5 rounded-full pointer-events-none"
      />
    </section>
  );
};

export default Prizes;

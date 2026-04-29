import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';

export type Theme = {
  id: number;
  icon: string;
  color: string;
  bg: string;
  title: string;
  desc: string;
  tags: string[];
};

const themes: Theme[] = [
  {
    id: 1,
    icon: '/assets/ml.png',
    color: '#F0BB0D',
    bg: '#ffffff',
    title: 'AI / ML',
    desc: 'Build intelligent systems, chatbots, predictive models, and generative AI tools that think, learn, and adapt.',
    tags: ['LLMs', 'Computer Vision', 'NLP', 'Deep Learning'],
  },
  {
    id: 2,
    icon: '/assets/ag.png',
    color: '#F97028',
    bg: '#ffffff',
    title: 'Agentic AI',
    desc: 'Develop autonomous agents that can plan, reason, and execute complex workflows without human intervention.',
    tags: ['Autonomous Agents', 'Reasoning', 'Workflows', 'Multi-Agent'],
  },
  {
    id: 3,
    icon: '/assets/i.png',
    color: '#F489A3',
    bg: '#ffffff',
    title: 'IOT & Sustainability',
    desc: 'Bridge physical and digital worlds with embedded systems, sensor networks, edge intelligence, and sustainable tech solutions.',
    tags: ['Embedded', 'Edge AI', 'Sensors', 'GreenTech'],
  },
  {
    id: 4,
    icon: '/assets/h.png',
    color: '#F3A20F',
    bg: '#ffffff',
    title: 'Healthcare',
    desc: 'Revolutionise patient care and medical research with modern health-tech, accessibility tools, and data analysis.',
    tags: ['HealthAI', 'Telemed', 'Accessibility', 'Bioinformatics'],
  },
  {
    id: 5,
    icon: '/assets/b.png',
    color: '#8b5cf6',
    bg: '#ffffff',
    title: 'Blockchain & Fintech',
    desc: 'Build the future of finance and trust — decentralised protocols, smart contracts, digital payments, and financial innovation.',
    tags: ['Smart Contracts', 'DeFi', 'Fintech', 'Crypto'],
  },
  {
    id: 6,
    icon: '/assets/open-innovation.png',
    color: '#ec4899',
    bg: '#ffffff',
    title: 'Open Innovation',
    desc: 'No boundaries. Build whatever crazy, groundbreaking idea you have that doesn\'t fit into a box.',
    tags: ['Moonshots', 'Creative', 'Anything Goes', 'Wildcard'],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
};

function ThemeCard({ theme, className }: { theme: Theme; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div variants={cardVariants} className={`w-full relative ${className}`}>
      <div 
        className="flex flex-col w-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Wrapper to lift the whole assembly */}
        <motion.div 
          animate={{ y: isHovered ? -8 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-20 w-full"
        >
          {/* Top colored container */}
          <div 
            className="relative border-[2.5px] border-black flex items-center justify-center z-20 w-full bg-white"
            style={{ backgroundColor: theme.color, height: '300px', boxShadow: '6px 6px 0px rgba(255,255,255,1)' }}
          >
            {/* Category Badge - ROUNDED */}
            <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 bg-white border-[2.5px] border-black px-6 py-1.5 text-[14px] font-black z-30 whitespace-nowrap text-black rounded-xl tracking-wide">
              {theme.title}
            </div>

            {/* Resizer handles */}
            <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] bg-white border-[2.5px] border-black z-30"></div>
            <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] bg-white border-[2.5px] border-black z-30"></div>
            <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] bg-white border-[2.5px] border-black z-30"></div>
            <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] bg-white border-[2.5px] border-black z-30"></div>

            {/* Icon */}
            <motion.img 
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              src={theme.icon} 
              alt={theme.title}
              className="w-36 h-36 object-contain z-20"
              style={{ filter: 'drop-shadow(6px 6px 0px rgba(0,0,0,0.7))' }}
            />
          </div>

          {/* Bottom Text container - DYNAMICALLY EXPANDS ON HOVER */}
          <div className="w-[88%] mx-auto relative z-10 flex flex-col">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full border-[2.5px] border-black border-t-0 bg-white p-5 flex flex-col items-center text-center"
                  >
                    <p className="text-[13px] md:text-[14px] font-bold text-black leading-snug">
                      {theme.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                      {theme.tags.map(tag => (
                        <span key={tag} className="font-black text-[9px] md:text-[10px] uppercase tracking-wider text-black bg-[#f4eed4] px-2 py-0.5 border-[1.5px] border-black">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Themes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={sectionRef}
      id="themes"
      className="relative bg-black overflow-hidden font-sans pt-16"
    >
      {/* Outermost Lines - Top to Bottom */}
      <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none flex justify-center">
        <div className="w-full max-w-[1280px] px-4 md:px-8 h-full">
          <div className="w-full h-full border-x-[2px] border-white/30"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 md:px-8">
        
        {/* Centered Title Block */}
        <div className="flex flex-col items-center justify-center pt-8 text-center">
          
          
          <div className="mb-12">
            <div 
              className="bg-[#f97028] border-[3px] border-black text-white px-12 py-4 shadow-[6px_6px_0px_rgba(255,255,255,1)] inline-block"
              style={{ fontFamily: "'Sugar Peachy', sans-serif", fontSize: '5rem', lineHeight: 1 }}
            >
              Themes
            </div>
          </div>
        </div>
      </div>

      {/* Grid Area - Inner lines start here and go to bottom */}
      <div className="relative w-full pb-32">
        {/* <p> Box */}
        <div className="flex justify-center relative z-20">
          <div className="bg-white border-[3px] border-black px-8 py-3 rounded-2xl shadow-[6px_6px_0px_rgba(255,255,255,1)]">
            <p className="text-black font-black text-[16px] md:text-[18px] tracking-wide">
              Yep, we got an incredible set of themes for you to build on.
            </p>
          </div>
        </div>

        {/* Inner 4 lines absolute layer */}
        <div className="absolute top-[30px] bottom-0 left-0 right-0 pointer-events-none flex justify-center z-0">
          <div className="w-full max-w-[1280px] px-4 md:px-8 h-full">
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-x-8">
              <div className="border-r-[2px] border-white/30 h-full"></div>
              <div className="border-x-[2px] border-white/30 h-full hidden md:block"></div>
              <div className="border-l-[2px] border-white/30 h-full hidden md:block"></div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 md:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-8 w-full pt-16"
          >
            {themes.map((theme, idx) => {
              // Stagger the middle column down for masonry look
              let paddingClass = '';
              if (idx % 3 === 1) paddingClass = 'md:pt-16';
              
              return (
                <div key={theme.id} className={`w-full flex flex-col ${paddingClass} pb-16`}>
                  <ThemeCard theme={theme} />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
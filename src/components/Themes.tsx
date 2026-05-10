import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  type Variants,
} from 'framer-motion';

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
    color: '#f97028',
    bg: '#ffffff',
    title: 'AI / ML',
    desc: 'Build intelligent systems, chatbots, predictive models, and generative AI tools that think, learn, and adapt.',
    tags: ['Computer Vision', 'NLP', 'Deep Learning'],
  },
  {
    id: 2,
    icon: '/assets/ag.png',
    color: '#00cccb',
    bg: '#ffffff',
    title: 'Agentic AI',
    desc: 'Develop autonomous agents that can plan, reason, and execute complex workflows without human intervention.',
    tags: ['Autonomous Agents', 'Reasoning', 'Workflows', 'Multi-Agent', 'LLMs'],
  },
  {
    id: 3,
    icon: '/assets/i.png',
    color: '#f3a20f',
    bg: '#ffffff',
    title: 'IOT & Sustainability',
    desc: 'Bridge physical and digital worlds with embedded systems, sensor networks, edge intelligence, and sustainable tech solutions.',
    tags: ['Embedded', 'Edge AI', 'Sensors', 'GreenTech'],
  },
  {
    id: 4,
    icon: '/assets/h.png',
    color: '#10b981',
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
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 16,
    },
  },
};

/** Returns true when viewport is below the given px width */
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
}

function ThemeCard({ theme, isMobile }: { theme: Theme; isMobile: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  // On desktop: hover controls reveal; on mobile: tap toggles
  const showContent = isMobile ? isOpen : isOpen;

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => { if (!isMobile) setIsOpen(true); }}
      onHoverEnd={() => { if (!isMobile) setIsOpen(false); }}
      onClick={() => { if (isMobile) setIsOpen((v) => !v); }}
      className="relative w-full cursor-pointer h-full"
    >
      <motion.div
        animate={{
          y: showContent ? -6 : 0,
          boxShadow: showContent
            ? '12px 12px 0px 0px #1a1a1a'
            : '8px 8px 0px 0px #1a1a1a',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative overflow-hidden rounded-[2.5rem] w-full bg-white h-auto"
        style={{
          border: `4.5px solid #f97028`,
        }}
      >
        <div className="flex flex-col h-full min-h-[160px] sm:min-h-[190px]">
          {/* Header Tab (Title only) */}
          <div
            className="self-start px-5 py-3 pr-10 min-w-[65%] relative flex items-center justify-between"
            style={{
              backgroundColor: '#f0f7ff',
              borderBottom: '4.5px solid #f97028',
              borderRight: '4.5px solid #f97028',
              borderBottomRightRadius: '2.5rem',
              borderTopLeftRadius: '2rem', // Match outer corner
              marginLeft: '-1px',
              marginTop: '-1px',
            }}
          >
            {/* Title */}
            <div className="flex-1 min-w-0">
              <h3
                className="text-[#1a1a1a] leading-tight uppercase font-black"
                style={{
                  fontFamily: 'var(--font-groovy)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                  letterSpacing: '0.02em',
                }}
              >
                {theme.title}
              </h3>
            </div>

            {/* Tap indicator on mobile/tablet */}
            {isMobile && (
              <motion.div
                animate={{ rotate: showContent ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-4"
                style={{
                  backgroundColor: `${theme.color}20`,
                  border: `2px solid ${theme.color}40`,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.div>
            )}
          </div>

          {/* Main Area: Emoji (Shrink) or Content (Expand) */}
          <div className="flex-1 relative flex flex-col pt-2 pb-5 px-5">
            <AnimatePresence mode="wait" initial={false}>
              {showContent ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  {/* Description */}
                  <p className="text-[13px] sm:text-sm text-[#3a3a3a] leading-relaxed mb-4 font-medium font-sans">
                    {theme.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {theme.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none font-sans"
                        style={{
                          backgroundColor: `${theme.color}15`,
                          color: '#1a1a1a',
                          border: `1px solid ${theme.color}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="visual"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex items-center justify-center"
                >
                  <img
                    src={theme.icon}
                    alt={theme.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
                    style={{
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Themes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(1024);

  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  const blobY1 = useTransform(smoothY, [0, 1], [0, -80]);
  const blobY2 = useTransform(smoothY, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      id="themes"
      className="relative bg-[#f3ecd2] pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden"
    >
      {/* Decorative background blobs */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full opacity-20 pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full sunburst-bg rounded-full blur-2xl scale-75" />
      </motion.div>

      <motion.div
        style={{ y: blobY2 }}
        className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full opacity-10 pointer-events-none shadow-[20px_20px_100px_rgba(244,137,163,0.5)]"
        aria-hidden
      >
        <div className="w-full h-full bg-[#f489a3] rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section heading — more prominent */}
        <motion.div
          ref={headingRef}
          className="text-center mb-14 md:mb-20"
        >
          {/* Decorative top line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="mx-auto mb-5 h-[3px] w-24 md:w-32 bg-[#1a1a1a]"
          />

          <motion.h2
            initial={{ opacity: 0, y: 40, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-display text-[#1a1a1a] uppercase mb-3"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 1,
              textShadow: '4px 4px 0px rgba(249, 112, 40, 0.25)',
            }}
          >
            Themes
          </motion.h2>



          {/* Decorative bottom line */}

        </motion.div>

        {/* Theme cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0 items-start"
        >
          {themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
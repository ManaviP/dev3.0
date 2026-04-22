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
  emoji: string;
  color: string;
  bg: string;
  title: string;
  desc: string;
  tags: string[];
};

const themes: Theme[] = [
  {
    id: 1,
    emoji: '🤖',
    color: '#f97028',
    bg: '#fffdf9',
    title: 'AI / ML',
    desc: 'Build intelligent systems, chatbots, predictive models, and generative AI tools that think, learn, and adapt.',
    tags: ['LLMs', 'Computer Vision', 'NLP', 'Deep Learning'],
  },
  {
    id: 2,
    emoji: '🧠',
    color: '#f489a3',
    bg: '#fffdf9',
    title: 'Agentic AI',
    desc: 'Develop autonomous agents that can plan, reason, and execute complex workflows without human intervention.',
    tags: ['Autonomous Agents', 'Reasoning', 'Workflows', 'Multi-Agent'],
  },
  {
    id: 3,
    emoji: '📡',
    color: '#f3a20f',
    bg: '#fffdf9',
    title: 'IOT & Sustainability',
    desc: 'Bridge physical and digital worlds with embedded systems, sensor networks, edge intelligence, and sustainable tech solutions.',
    tags: ['Embedded', 'Edge AI', 'Sensors', 'GreenTech'],
  },
  {
    id: 4,
    emoji: '⚕️',
    color: '#4ade80',
    bg: '#fffdf9',
    title: 'Healthcare',
    desc: 'Revolutionise patient care and medical research with modern health-tech, accessibility tools, and data analysis.',
    tags: ['HealthAI', 'Telemed', 'Accessibility', 'Bioinformatics'],
  },
  {
    id: 5,
    emoji: '🔗',
    color: '#22d3ee',
    bg: '#fffdf9',
    title: 'Blockchain & Fintech',
    desc: 'Build the future of finance and trust — decentralised protocols, smart contracts, digital payments, and financial innovation.',
    tags: ['Smart Contracts', 'DeFi', 'Fintech', 'Crypto'],
  },
  {
    id: 6,
    emoji: '💡',
    color: '#a855f7',
    bg: '#fffdf9',
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
      className="relative w-full cursor-pointer"
    >
      <motion.div
        animate={{
          y: showContent ? -6 : 0,
          boxShadow: showContent
            ? '10px 10px 0px #1a1a1a'
            : '6px 6px 0px #1a1a1a',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative overflow-hidden rounded-2xl w-full"
        style={{
          backgroundColor: theme.bg,
          border: `3px solid #1a1a1a`,
        }}
      >
        {/* Accent stripe at top */}
        <div
          className="w-full h-[6px]"
          style={{ backgroundColor: theme.color }}
        />

        <div className="p-5 sm:p-6 md:p-8">
          {/* Emoji + Title row — always visible */}
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              animate={{
                scale: showContent ? 1.1 : 1,
                rotate: showContent ? -4 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${theme.color}18`,
                border: `2px solid ${theme.color}40`,
              }}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl">{theme.emoji}</span>
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3
                className="text-[#1a1a1a] leading-tight uppercase"
                style={{
                  fontFamily: 'var(--font-groovy)',
                  fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                  lineHeight: 1.15,
                  fontWeight: 400,
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
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${theme.color}20`,
                  border: `2px solid ${theme.color}40`,
                }}
              >
                <svg
                  width="14"
                  height="14"
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

          {/* Dropdown content — smooth reveal */}
          <AnimatePresence initial={false}>
            {showContent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2, delay: 0.05 },
                }}
                className="overflow-hidden"
              >
                {/* Divider */}
                <div
                  className="w-full h-[2px] mt-4 mb-3 sm:mb-4 opacity-30"
                  style={{ backgroundColor: theme.color }}
                />

                {/* Description */}
                <p className="text-[13px] sm:text-sm md:text-base text-[#3a3a3a] leading-relaxed mb-4 sm:mb-5 font-medium font-sans">
                  {theme.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {theme.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-sans"
                      style={{
                        backgroundColor: `${theme.color}15`,
                        color: '#1a1a1a',
                        border: `1.5px solid ${theme.color}50`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-1"
          style={{ backgroundColor: theme.color }}
        />
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
      className="relative bg-[#f3ecd2] py-16 md:py-24 overflow-hidden"
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#3a3a3a] font-sans text-base md:text-lg font-medium tracking-wide max-w-xl mx-auto"
          >
            Choose your domain. Build your vision.
          </motion.p>

          {/* Decorative bottom line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
            className="mx-auto mt-5 h-[3px] w-24 md:w-32 bg-[#1a1a1a]"
          />
        </motion.div>

        {/* Theme cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0"
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

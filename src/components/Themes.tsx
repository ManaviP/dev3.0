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
  rotate: string;
  year: string;
};

const themes: Theme[] = [
  {
    id: 1,
    emoji: '🤖',
    color: '#f97028', // Orange
    bg: '#fffdf9', // Very light cream
    title: 'AI ML',
    desc: 'Build intelligent systems, chatbots, predictive models, and generative AI tools that think, learn, and adapt.',
    tags: ['LLMs', 'Computer Vision', 'NLP', 'Deep Learning'],
    rotate: '-3deg',
    year: '2026',
  },
  {
    id: 2,
    emoji: '🧠',
    color: '#f489a3', // Pink
    bg: '#fffdf9',
    title: 'Agentic AI',
    desc: 'Develop autonomous agents that can plan, reason, and execute complex workflows without human intervention.',
    tags: ['Autonomous Agents', 'Reasoning', 'Workflows', 'Multi-Agent'],
    rotate: '2deg',
    year: '2026',
  },
  {
    id: 3,
    emoji: '📡',
    color: '#f3a20f', // Yellow/Gold
    bg: '#fffdf9',
    title: 'IOT & Smart Cities',
    desc: 'Bridge physical and digital worlds with embedded systems, sensor networks, edge intelligence, and urban tech.',
    tags: ['Embedded', 'Edge AI', 'Sensors', 'Urban Tech'],
    rotate: '-2deg',
    year: '2026',
  },
  {
    id: 4,
    emoji: '⚕️',
    color: '#4ade80', // Green
    bg: '#fffdf9',
    title: 'Healthcare',
    desc: 'Revolutionise patient care and medical research with modern health-tech, accessibility tools, and data analysis.',
    tags: ['HealthAI', 'Telemed', 'Accessibility', 'Bioinformatics'],
    rotate: '3deg',
    year: '2026',
  },
  {
    id: 5,
    emoji: '🌐',
    color: '#22d3ee', // Cyan
    bg: '#fffdf9',
    title: 'Web3 / Sustain',
    desc: 'Decentralise the future and protect the planet — DeFi protocols, DAOs, green-tech, and sustainable innovation.',
    tags: ['Smart Contracts', 'DeFi', 'GreenTech', 'NFTs'],
    rotate: '-1deg',
    year: '2026',
  },
  {
    id: 6,
    emoji: '💡',
    color: '#a855f7', // Purple
    bg: '#fffdf9',
    title: 'Open Innovation',
    desc: 'No boundaries. Build whatever crazy, groundbreaking idea you have that doesn’t fit into a box.',
    tags: ['Moonshots', 'Creative', 'Anything Goes', 'Wildcard'],
    rotate: '2deg',
    year: '2026',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 15,
    },
  },
};

function ThemeCard({ theme, onClick }: { theme: Theme; onClick: () => void }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -15,
        rotate: '0deg',
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      style={{ rotate: theme.rotate }}
      className="relative group cursor-pointer w-full"
      onClick={onClick}
    >
      {/* Outer wrapper provides the thick colorful border */}
      <div
        className="relative overflow-hidden rounded-[2.5rem] shadow-[8px_8px_0_#1a1a1a] group-hover:shadow-[14px_14px_0_#1a1a1a] transition-all duration-300 w-full"
        style={{
          backgroundColor: theme.bg,
          border: `6px solid ${theme.color}`,
          aspectRatio: '1 / 1.1',
        }}
      >
        {/* Top-left subtle branding / corner decoration if desired */}
        <div className="absolute top-6 left-6 flex items-center gap-2 opacity-50 z-10 transition-opacity group-hover:opacity-100">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.color }} />
          <span className="text-xs font-bold font-sans tracking-widest text-[#1a1a1a] uppercase">Theme {theme.id < 10 ? `0${theme.id}` : theme.id}</span>
        </div>

        {/* Central Graphic (Emoji) */}
        <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-500 group-hover:scale-110">
          <span
            className="text-[7rem] sm:text-[9rem] md:text-[10rem] drop-shadow-2xl"
            style={{
              filter: `drop-shadow(0 20px 30px ${theme.color}40) drop-shadow(0 0 40px ${theme.color}20)`
            }}
          >
            {theme.emoji}
          </span>
        </div>

        {/* The bottom-right Cutout/Tab mimicking Lando Norris helmet view */}
        <div
          className="absolute bottom-0 right-0 flex items-center pr-6 pl-8 py-3 rounded-tl-[2rem]"
          style={{
            backgroundColor: theme.bg,
            borderTop: `6px solid ${theme.color}`,
            borderLeft: `6px solid ${theme.color}`,
            // We use margin to pull it into the corner perfectly against the parent's border overflow
            marginRight: '-2px',
            marginBottom: '-2px',
          }}
        >
          <span className="font-display text-[#1a1a1a] text-lg sm:text-xl tracking-wide whitespace-nowrap">
            {theme.title} <span style={{ color: theme.color }} className="ml-2 font-sans font-black text-base">{theme.year}</span>
          </span>
        </div>

        {/* Hover overlay hint */}
        <div className="absolute inset-x-0 top-1/2 -mt-4 opacity-0 group-hover:opacity-100 flex justify-center transition-opacity duration-300 z-20 pointer-events-none">
          <span className="bg-[#1a1a1a] text-[#f3ecd2] px-4 py-2 rounded-full font-bold text-sm tracking-widest uppercase shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all">
            Click to View
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Shared Modal component ──
function ThemeModal({ theme, onClose }: { theme: Theme; onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-[#f3ecd2] rounded-[2rem] border-[6px] border-[#1a1a1a] shadow-[16px_16px_0_rgba(26,26,26,0.5)] overflow-hidden flex flex-col md:flex-row z-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-[#1a1a1a] hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors duration-200 z-50 shadow-lg border-2 border-transparent"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side (Visuals) */}
        <div
          className="w-full md:w-2/5 p-8 flex flex-col items-center justify-center relative min-h-[250px] md:min-h-[400px]"
          style={{ backgroundColor: `${theme.color}20` }} // 20% opacity of theme color
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.1, damping: 15 }}
            className="text-[8rem] sm:text-[10rem] md:text-[12rem] drop-shadow-2xl z-10"
            style={{
              filter: `drop-shadow(0 20px 40px ${theme.color}60)`
            }}
          >
            {theme.emoji}
          </motion.div>

          <div
            className="absolute bottom-6 left-6 font-sans font-black text-7xl md:text-9xl opacity-10 pointer-events-none"
            style={{ color: theme.color }}
          >
            0{theme.id}
          </div>
        </div>

        {/* Right Side (Details) */}
        <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.color }} />
            <span className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]/60">Domain</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1a1a1a] leading-tight mb-6">
            {theme.title}
          </h2>

          <p className="text-lg md:text-xl text-[#3a3a3a] leading-relaxed mb-8 font-medium">
            {theme.desc}
          </p>

          <div className="mt-auto">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]/50 mb-3">Key Focus Areas</h4>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {theme.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm md:text-base font-bold uppercase tracking-wider px-4 py-2 rounded-full border-[3px] border-[#1a1a1a]"
                  style={{ backgroundColor: theme.color, color: '#1a1a1a' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Themes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-5% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  const blobY1 = useTransform(smoothY, [0, 1], [0, -80]);
  const blobY2 = useTransform(smoothY, [0, 1], [0, 80]);

  return (
    <>
      <section
        ref={sectionRef}
        id="themes"
        className="relative bg-[#f3ecd2] py-24 md:py-36 overflow-hidden"
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

        <div className="relative z-10 max-w-[85rem] mx-auto px-4 md:px-8">
          {/* Section heading */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-24"
          >
            <motion.div
              initial={{ scale: 0, rotate: -6 }}
              animate={headingInView ? { scale: 1, rotate: -3 } : {}}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 font-bold font-sans text-sm md:text-base uppercase tracking-[0.25em] bg-[#f3ecd2] text-[#1a1a1a] px-6 py-2.5 rounded-full border-[3px] border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a]">
                ✦ Hackathon Themes ✦
              </span>
            </motion.div>

            <h2 className="font-display text-[#1a1a1a] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1 }}>
              Choose Your
              <br />
              <span
                className="rainbow-text"
                style={{ WebkitTextStroke: '0px' }}
              >
                Themes
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-6 text-[#1a1a1a]/70 font-semibold text-base md:text-xl max-w-2xl mx-auto font-sans leading-relaxed"
            >
              Six cutting-edge domains. One stage. Pick your battle and ship
              something that the world hasn't seen yet.
            </motion.p>
          </motion.div>

          {/* Theme cards grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16"
          >
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                onClick={() => setSelectedTheme(theme)}
              />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 md:mt-32 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <span className="font-display text-2xl md:text-3xl text-[#1a1a1a] rotate-[-2deg]">
              Not sure which theme to pick?
            </span>
            <a
              href="#faq"
              className="groovy-btn font-display tracking-widest text-sm md:text-base bg-[#f3a20f] text-[#1a1a1a] px-8 py-3 rounded-full border-[4px] border-[#1a1a1a] shadow-[6px_6px_0_#1a1a1a]"
            >
              Read the FAQ →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedTheme && (
          <ThemeModal
            theme={selectedTheme}
            onClose={() => setSelectedTheme(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

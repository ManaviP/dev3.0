import { useRef } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from 'framer-motion';

const themes = [
  {
    id: 1,
    emoji: '🤖',
    color: '#f97028',
    bg: '#fff3ec',
    title: 'AI & Machine Learning',
    desc: 'Build intelligent systems, chatbots, predictive models, and generative AI tools that think, learn, and adapt.',
    tags: ['LLMs', 'Computer Vision', 'NLP', 'Deep Learning'],
    rotate: '-3deg',
  },
  {
    id: 2,
    emoji: '🌐',
    color: '#f489a3',
    bg: '#fff0f4',
    title: 'Web3 & Blockchain',
    desc: 'Decentralise the future — from DeFi protocols and DAO governance to NFT platforms and smart contracts.',
    tags: ['DeFi', 'Smart Contracts', 'NFTs', 'DAOs'],
    rotate: '2deg',
  },
  {
    id: 3,
    emoji: '📡',
    color: '#f3a20f',
    bg: '#fffbec',
    title: 'IoT & Hardware',
    desc: 'Bridge physical and digital worlds with embedded systems, sensor networks, and edge intelligence.',
    tags: ['Embedded', 'Edge AI', 'Sensors', 'Robotics'],
    rotate: '-2deg',
  },
  {
    id: 4,
    emoji: '🔐',
    color: '#a855f7',
    bg: '#f9f0ff',
    title: 'Cybersecurity',
    desc: 'Defend, detect, and disrupt — ethical hacking, threat analysis, zero-trust systems, and privacy tools.',
    tags: ['Ethical Hacking', 'Zero-Trust', 'Privacy', 'Forensics'],
    rotate: '3deg',
  },
  {
    id: 5,
    emoji: '☁️',
    color: '#22d3ee',
    bg: '#f0fffe',
    title: 'Cloud & DevOps',
    desc: 'Architect scalable, reliable solutions using cloud infra, CI/CD pipelines, and container orchestration.',
    tags: ['Kubernetes', 'Serverless', 'CI/CD', 'Microservices'],
    rotate: '-1deg',
  },
  {
    id: 6,
    emoji: '⚕️',
    color: '#4ade80',
    bg: '#f0fff4',
    title: 'HealthTech & Social Good',
    desc: 'Use technology to uplift communities — healthcare, accessibility, sustainability, and social impact.',
    tags: ['HealthAI', 'Accessibility', 'GreenTech', 'EdTech'],
    rotate: '2deg',
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
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 90,
      damping: 18,
    },
  },
};

function ThemeCard({ theme }: { theme: typeof themes[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        rotate: '0deg',
        scale: 1.04,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      style={{ rotate: theme.rotate }}
      className="relative group cursor-pointer"
    >
      <div
        className="relative rounded-3xl border-[4px] border-[#1a1a1a] overflow-hidden shadow-[6px_6px_0_#1a1a1a] group-hover:shadow-[10px_10px_0_#1a1a1a] transition-shadow duration-200"
        style={{ backgroundColor: theme.bg }}
      >
        {/* Emoji badge */}
        <div
          className="absolute -top-5 -right-3 w-16 h-16 rounded-full border-[4px] border-[#1a1a1a] flex items-center justify-center text-3xl shadow-[4px_4px_0_#1a1a1a] z-10"
          style={{ backgroundColor: theme.color }}
        >
          {theme.emoji}
        </div>

        <div className="p-6 pt-8">
          {/* Title */}
          <h3
            className="font-display text-2xl md:text-3xl leading-tight mb-3"
            style={{ color: '#1a1a1a' }}
          >
            {theme.title}
          </h3>

          {/* Divider */}
          <div
            className="h-1 w-12 rounded-full mb-4"
            style={{ backgroundColor: theme.color }}
          />

          {/* Description */}
          <p className="text-[#3a3a3a] text-sm md:text-base leading-relaxed mb-5">
            {theme.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {theme.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border-2 border-[#1a1a1a]"
                style={{ backgroundColor: theme.color, color: '#1a1a1a' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Themes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-5% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Parallax for the decorative blobs
  const blobY1 = useTransform(smoothY, [0, 1], [0, -80]);
  const blobY2 = useTransform(smoothY, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      id="themes"
      className="relative bg-[#1a1a1a] py-24 md:py-36 overflow-hidden"
    >
      {/* Decorative sunburst blob top-right */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full opacity-20 pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full sunburst-bg rounded-full blur-2xl scale-75" />
      </motion.div>

      {/* Decorative blob bottom-left */}
      <motion.div
        style={{ y: blobY2 }}
        className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full opacity-10 pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full bg-[#f489a3] rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ scale: 0, rotate: -6 }}
            animate={headingInView ? { scale: 1, rotate: -3 } : {}}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center gap-2 font-bold font-sans text-sm uppercase tracking-[0.25em] bg-[#f3ecd2] text-[#1a1a1a] px-5 py-2 rounded-full border-[3px] border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a]">
              ✦ Hackathon Themes ✦
            </span>
          </motion.div>

          <h2 className="font-display text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-[0.9] text-[#f3ecd2] tracking-tight">
            Build What
            <br />
            <span
              className="rainbow-text"
              style={{ WebkitTextStroke: '2px #1a1a1a' }}
            >
              Matters.
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 text-[#c5b99a] text-base md:text-xl max-w-2xl mx-auto font-sans leading-relaxed"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <span className="font-display text-2xl md:text-3xl text-[#f3ecd2] rotate-[-1deg]">
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
  );
}

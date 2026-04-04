import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const cards = [
  {
    num: 1,
    tag: 'Intro',
    title: 'DevHack 3.0',
    body: [
      'National-level hackathon pushing boundaries in AI, ML, IoT, Blockchain, Cybersecurity & Cloud at DSU Harohalli, Bangalore.',
      'A platform to transform ideas, showcase skills, and network with the brightest minds.',
    ],
    hint: 'scroll down →',
  },
  {
    num: 2,
    tag: 'Why Join?',
    title: 'Why Participate?',
    items: [
      { icon: '🏆', text: 'Showcase technical skills & creativity' },
      { icon: '🤝', text: 'Network with industry professionals' },
      { icon: '🎁', text: 'Win exciting prizes & recognition' },
      { icon: '📚', text: 'Learn new technologies' },
    ],
    hint: 'keep scrolling ↓',
  },
  {
    num: 3,
    tag: 'Vision',
    title: 'Our Goal',
    body: [
      'To foster a culture of innovation, providing students with the resources and mentorship to solve real-world problems.',
      'Building the future of the decentralized web and intelligent systems together.',
    ],
    hint: 'Next section below ↓',
  }
];

function Card({ card, index, scrollYProgress }: { card: typeof cards[0], index: number, scrollYProgress: any }) {
  const step = 1 / cards.length;
  const center = (index + 0.5) * step;
  
  const position = useTransform(scrollYProgress, (v: number) => (v - center) / step);

  const rotateY = useTransform(position, [-1, 0, 1], [45, 0, -45]);
  const scale = useTransform(position, [-1, 0, 1], [0.8, 1, 0.8]);
  const z = useTransform(position, [-1, 0, 1], [-400, 0, -400]);
  const x = useTransform(position, [-1, 0, 1], ["-50%", "0%", "50%"]);
  const opacity = useTransform(position, [-1.5, -0.5, 0, 0.5, 1.5], [0, 1, 1, 1, 0]);

  return (
    <motion.div 
      style={{ 
        rotateY, 
        scale, 
        z, 
        x, 
        opacity,
        transformStyle: "preserve-3d" 
      }}
      className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
    >
      <div className="relative w-[420px] max-w-[90vw] aspect-[3/4.5] md:aspect-[4/3] rounded-3xl bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,0.3)] border border-white/20 select-none pointer-events-auto">
        <div className="absolute inset-x-2 -bottom-2 h-4 rounded-b-3xl bg-gray-200/50" />
        <div className="absolute inset-x-4 -bottom-4 h-4 rounded-b-3xl bg-gray-100/30" />

        <div className="flex items-center gap-4 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange to-pink text-white font-black shadow-lg">
            {card.num}
          </span>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
            {card.tag}
          </span>
        </div>

        <h3 className="text-3xl md:text-5xl font-display mb-6 bg-clip-text text-transparent bg-gradient-to-br from-orange to-pink leading-tight">
          {card.title}
        </h3>

        <div className="space-y-4">
          {'body' in card && card.body?.map((p, i) => (
            <p key={i} className="text-gray-600 text-sm md:text-lg leading-relaxed">{p}</p>
          ))}
          {'items' in card && card.items?.map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-gray-600 font-bold italic">
              <span className="text-2xl">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 right-10">
          <div className="h-1 w-16 bg-gradient-to-r from-orange to-pink rounded-full mb-2" />
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 text-right">{card.hint}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="about" ref={containerRef} className="relative h-[400vh] bg-base">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 sunburst-bg scale-150 rotate-45 blur-3xl" />
        </div>

        <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center" style={{ perspective: 1200 }}>
          {cards.map((card, idx) => (
            <Card 
              key={card.num} 
              card={card} 
              index={idx} 
              scrollYProgress={smoothProgress} 
            />
          ))}
        </div>

        <div className="absolute bottom-12 flex gap-3 z-30">
          {cards.map((_, i) => (
            <Dot key={i} index={i} progress={smoothProgress} total={cards.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Dot({ index, progress, total }: { index: number, progress: any, total: number }) {
  const step = 1 / total;
  const center = (index + 0.5) * step;
  
  // Directly calculate width and opacity from the main progress
  const opacity = useTransform(progress, [center - step, center, center + step], [0.3, 1, 0.3]);
  const width = useTransform(progress, [center - step, center, center + step], [16, 48, 16]);

  return (
    <motion.div 
      style={{ opacity, width }}
      className="h-2 rounded-full bg-cream"
    />
  );
}

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';

/* ─────────────────────────────────────
   DATA
   ───────────────────────────────────── */
interface TimelineEvent {
  month: string;
  day: string;
  year: number;
  title: string;
  description: string;
}

const timelineData: TimelineEvent[] = [
  { month: 'JUN', day: '10', year: 2026, title: 'Registration Starts', description: 'The Race Begins — Register. Team Up. Get Set to Hack!' },
  { month: 'JUN', day: '25', year: 2026, title: 'Idea Submissions Start', description: 'Time to Spark Ideas — Let the Innovation Flow!' },
  { month: 'AUG', day: '10', year: 2026, title: 'Registration Deadline', description: 'Last Call to Enter the Arena — Register Before It\'s Too Late!' },
  { month: 'AUG', day: '25', year: 2026, title: 'Idea Submission Deadline', description: 'Ideas Lock In — Let the Best Concepts Win!' },
  { month: 'AUG', day: '31', year: 2026, title: 'Shortlisted Teams Announcement', description: 'And the Chosen Ones Are... Meet the Finalists!' },
  { month: 'SEP', day: '18', year: 2026, title: 'Hacking Starts', description: 'Code. Create. Conquer — The 36-Hour Sprint Begins!' },
  { month: 'SEP', day: '19', year: 2026, title: 'Final Submission', description: 'Time\'s Up — Submit Your Best Work and Let It Shine!' },
  { month: 'SEP', day: '19', year: 2026, title: 'Final Results', description: 'The Moment of Truth — Winners Announced!' },
];

const COLORS = ['#f97028', '#f489a3', '#f3a20f', '#f97028', '#f489a3', '#f3a20f', '#f97028', '#f489a3'];
const MONTH_NUM: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
};

function googleCalLink(ev: TimelineEvent) {
  const mm = String(MONTH_NUM[ev.month]).padStart(2, '0');
  const dd = ev.day.padStart(2, '0');
  const start = `${ev.year}${mm}${dd}`;
  const next = new Date(ev.year, MONTH_NUM[ev.month] - 1, parseInt(dd) + 1);
  const end = `${next.getFullYear()}${String(next.getMonth() + 1).padStart(2, '0')}${String(next.getDate()).padStart(2, '0')}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE`
    + `&text=${encodeURIComponent('DevHack 3.0: ' + ev.title)}`
    + `&dates=${start}/${end}`
    + `&details=${encodeURIComponent(ev.description)}`;
}

/* ─────────────────────────────────────
   COMPONENT: PaperClip (Single Binder Clip connecting line to card)
   ───────────────────────────────────── */
function PaperClip({ x, y, color, isActive }: { x: number; y: number; color: string; isActive: boolean }) {
  return (
    <g transform={`translate(${x - 10}, ${y - 8})`}>
      {/* String/thread from line to clip */}
      <path
        d="M 10 0 L 10 6"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="2 2"
        opacity={0.6}
      />

      {/* Clip body - the metal part that grips the card */}
      <motion.rect
        x="0"
        y="6"
        width="20"
        height="14"
        rx="2"
        fill={isActive ? color : '#e0d5b8'}
        stroke="#1a1a1a"
        strokeWidth="2"
        animate={{
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />

      {/* Clip arms/handles */}
      <motion.path
        d="M 4 6 L 4 0 Q 4 -2 6 -2 L 7 -2 Q 9 -2 9 0 L 9 6"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{
          rotate: isActive ? -4 : 0,
        }}
      />
      <motion.path
        d="M 11 6 L 11 0 Q 11 -2 13 -2 L 14 -2 Q 16 -2 16 0 L 16 6"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{
          rotate: isActive ? 4 : 0,
        }}
      />

      {/* Clip hinge detail */}
      <line x1="2" y1="10" x2="18" y2="10" stroke="#1a1a1a" strokeWidth="1.5" opacity={0.4} />

      {/* Paper grip texture */}
      <line x1="3" y1="16" x2="17" y2="16" stroke="#1a1a1a" strokeWidth="0.8" opacity={0.3} />
      <line x1="3" y1="18" x2="17" y2="18" stroke="#1a1a1a" strokeWidth="0.8" opacity={0.3} />
    </g>
  );
}

/* ─────────────────────────────────────
   COMPONENT: WeaveLine (The Progress Line with Paper Clips)
   ───────────────────────────────────── */
function WeaveLine({
  scrollX,
  progress,
  activeProgress,
  firstCenterX,
  step,
  lastCenterX,
  svgWidth,
  yLine,
}: {
  scrollX: any;
  progress: any;
  activeProgress: number;
  firstCenterX: number;
  step: number;
  lastCenterX: number;
  svgWidth: number;
  yLine: number;
}) {
  const pathD = `M ${firstCenterX} ${yLine} L ${lastCenterX} ${yLine}`;

  return (
    <motion.svg
      className="absolute top-0 left-0 h-full pointer-events-none z-30"
      style={{ x: scrollX }}
      width={svgWidth}
      height={400}
      viewBox={`0 0 ${svgWidth} 400`}
      fill="none"
    >
      {/* Main thread/string line */}
      <motion.path
        d={pathD}
        stroke="#1a1a1a"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.3 }}
      />

      {/* Colored progress thread */}
      <motion.path
        d={pathD}
        stroke="#f97028"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: progress }}
      />

      {/* Thread knots and paper clips */}
      {timelineData.map((_, i) => {
        const markerX = firstCenterX + i * step;
        const threshold = i / (timelineData.length - 1);
        const done = activeProgress >= threshold - 0.02;
        const color = COLORS[i];

        return (
          <g key={`marker-${i}`}>
            {/* Thread knot (the dot on the line) */}
            <circle
              cx={markerX}
              cy={yLine}
              r={7}
              fill={done ? color : '#f3ecd2'}
              stroke="#1a1a1a"
              strokeWidth={2.5}
            />

            {/* Inner knot detail */}
            <circle
              cx={markerX}
              cy={yLine}
              r={2.5}
              fill={done ? '#1a1a1a' : '#1a1a1a'}
              opacity={done ? 0.8 : 0.3}
            />

            {/* Single paper clip connecting line to card */}
            {done && (
              <PaperClip x={markerX} y={yLine} color={color} isActive={activeProgress >= threshold} />
            )}

            {/* Small thread stitches for non-active cards */}
            {!done && (
              <>
                <path
                  d={`M ${markerX - 4} ${yLine + 5} L ${markerX} ${yLine + 9} L ${markerX + 4} ${yLine + 5}`}
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  fill="none"
                  opacity={0.4}
                  strokeLinecap="round"
                />
                <path
                  d={`M ${markerX - 3} ${yLine + 9} L ${markerX} ${yLine + 13} L ${markerX + 3} ${yLine + 9}`}
                  stroke="#1a1a1a"
                  strokeWidth="1"
                  fill="none"
                  opacity={0.25}
                  strokeLinecap="round"
                />
              </>
            )}
          </g>
        );
      })}
    </motion.svg>
  );
}

/* ─────────────────────────────────────
   COMPONENT: TimelineItem (Clipped Card Style)
   ───────────────────────────────────── */
function TimelineItem({
  event, index, isActive, cardWidth
}: {
  event: TimelineEvent;
  index: number;
  isActive: boolean;
  cardWidth: number;
}) {
  const color = COLORS[index];
  const borderRadius = index % 2 === 0 ? "40px 10px 40px 10px" : "10px 40px 10px 40px";

  return (
    <div className="relative flex flex-col items-center shrink-0 px-8 box-border z-20" style={{ width: cardWidth }}>
      {/* Background Year Highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[12rem] text-[#1a1a1a]/5 pointer-events-none select-none z-0">
        {index + 1}
      </div>

      {/* Clipped corner effect - where the paper clip attaches */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-8 h-8 z-30">
        {/* Fold/crease effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-[#1a1a1a]/5 rounded-b-full" />
        {/* Small tear/dent where clip grips */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-[#1a1a1a]/10 rounded-sm" />
      </div>

      <motion.div
        animate={{
          scale: isActive ? 1.05 : 0.95,
          opacity: isActive ? 1 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative p-[3px] group overflow-visible w-full h-[380px] z-10"
        style={{
          borderRadius,
          background: isActive
            ? `linear-gradient(45deg, ${color}, #1a1a1a, ${color})`
            : "rgba(26, 26, 26, 0.1)"
        }}
      >
        <div
          className="relative bg-white/70 backdrop-blur-xl p-8 overflow-hidden h-full flex flex-col"
          style={{ borderRadius: "calc(inherit - 3px)" }}
        >
          <div className="flex justify-between items-baseline mb-6">
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] opacity-40">ITEM_{index + 1}</span>
            <span className="font-display text-2xl text-[#1a1a1a]/20">2026</span>
          </div>

          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 font-display text-sm border-2 border-[#1a1a1a] shadow-[3px_3px_0_#1a1a1a] -rotate-3"
              style={{ backgroundColor: color, color: '#1a1a1a' }}
            >
              {event.day} {event.month}
            </span>
          </div>

          <h3 className="font-display text-2xl leading-tight text-[#1a1a1a] mb-4 tracking-tight">
            {event.title}
          </h3>

          <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
            {event.description}
          </p>

          <div className="flex justify-between items-center pt-4 border-t border-[#1a1a1a]/10">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <div className="w-2 h-2 rounded-full bg-[#1a1a1a]/10" />
            </div>
            <a
              href={googleCalLink(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-widest hover:underline transition-all"
              style={{ color: '#1a1a1a' }}
            >
              + ADD CAL
            </a>
          </div>
        </div>

        {isActive && (
          <motion.div
            layoutId="jewelGlow"
            className="absolute -inset-8 z-[-1] opacity-30 blur-3xl rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────── */
export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const cardWidth = isMobile ? 300 : 340;
  const cardGap = isMobile ? 32 : 48;
  const step = cardWidth + cardGap;
  const firstCenterX = cardWidth / 2;
  const lastCenterX = firstCenterX + (timelineData.length - 1) * step;
  const svgWidth = lastCenterX + firstCenterX;

  // Greatly reduced gap between line and cards for clipped look
  const lineY = isMobile ? 24 : 32;
  const cardsYOffset = 38; // Reduced significantly to make cards look clipped to the line

  // Scroll progress for vertical scroll area
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const [progressValue, setProgressValue] = useState(0);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    setProgressValue(latest);
    const idx = Math.max(0, Math.min(timelineData.length - 1, Math.round(latest * (timelineData.length - 1))));
    setActiveIdx(idx);
  });

  // Horizontal translation logic
  const translateX = useTransform(
    smoothProgress,
    [0, 1],
    [`calc(50vw - ${firstCenterX}px)`, `calc(50vw - ${lastCenterX}px)`]
  );

  // Navigation functions
  const handleScrollTo = (index: number) => {
    if (!sectionRef.current) return;

    const targetProgress = index / (timelineData.length - 1);
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const windowHeight = window.innerHeight;

    const distance = sectionHeight - windowHeight;
    const targetScrollY = sectionTop + (targetProgress * distance);

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const goToPrev = () => handleScrollTo(Math.max(0, activeIdx - 1));
  const goToNext = () => handleScrollTo(Math.min(timelineData.length - 1, activeIdx + 1));

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative bg-[#f3ecd2] w-full"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section Header - Tucked closer to content */}
        <div className="text-center shrink-0 z-40 px-4 pt-4 pb-0 relative">
          <h2
            className="font-display tracking-tight flex flex-wrap justify-center items-center gap-x-6"
            style={{ fontSize: 'clamp(2.5rem, 8.5vw, 6.5rem)', color: '#1a1a1a', lineHeight: 0.8 }}
          >
            <span className="opacity-20 uppercase">Road</span>
            <span className="text-[#f97028] uppercase">Map</span>
          </h2>
        </div>

        {/* Unified Horizontal View - Reduced top padding */}
        <div className="flex flex-col items-center relative overflow-visible z-10 min-h-0 pt-0">
          <div className="relative w-full flex items-center h-[500px]">
          <WeaveLine
            scrollX={translateX}
            progress={smoothProgress}
            activeProgress={progressValue}
            firstCenterX={firstCenterX}
            step={step}
            lastCenterX={lastCenterX}
            svgWidth={svgWidth}
            yLine={lineY}
          />

          <motion.div
            style={{ x: translateX, y: cardsYOffset }}
            className="flex items-center w-max relative z-20"
          >
            <div className={`flex items-center w-max ${isMobile ? 'gap-8' : 'gap-12'}`}>
              {timelineData.map((event, i) => (
                <TimelineItem
                  key={i}
                  event={event}
                  index={i}
                  isActive={i === activeIdx}
                  cardWidth={cardWidth}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-30 px-6">
          <button
            onClick={goToPrev}
            disabled={activeIdx === 0}
            className={`group w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#1a1a1a] shadow-[6px_6px_0_#1a1a1a] transition-all duration-300 flex items-center justify-center ${activeIdx === 0
                ? 'opacity-30 cursor-not-allowed shadow-none translate-x-1 translate-y-1'
                : 'hover:bg-[#f97028] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5'
              }`}
            aria-label="Previous event"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#1a1a1a' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-3">
            {timelineData.map((_, i) => (
              <button
                key={i}
                onClick={() => handleScrollTo(i)}
                className={`transition-all duration-300 rounded-full border-2 border-[#1a1a1a] ${i === activeIdx
                    ? 'w-10 h-3 bg-[#f97028]'
                    : 'w-3 h-3 bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/40'
                  }`}
                aria-label={`Go to event ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={activeIdx === timelineData.length - 1}
            className={`group w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#1a1a1a] shadow-[6px_6px_0_#1a1a1a] transition-all duration-300 flex items-center justify-center ${activeIdx === timelineData.length - 1
                ? 'opacity-30 cursor-not-allowed shadow-none translate-x-1 translate-y-1'
                : 'hover:bg-[#f97028] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5'
              }`}
            aria-label="Next event"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#1a1a1a' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-10 right-10 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1a1a]/30 hidden md:block">
          Explore the journey →
        </div>
      </div>
    </section>
  );
}
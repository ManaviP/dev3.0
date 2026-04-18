import { useRef, useState, useEffect } from 'react';
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

/* Palette cycles */
const COLORS = ['#f97028', '#f489a3', '#f3a20f', '#f97028', '#f489a3', '#f3a20f', '#f97028', '#f489a3'];
const BGS = ['#fff3ec', '#fff0f4', '#fffbec', '#fff3ec', '#fff0f4', '#fffbec', '#fff3ec', '#fff0f4'];

/* Subtle Countdown Hook */
function useCountdown(event: TimelineEvent) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0, expired: false });

  useEffect(() => {
    const y = event.year;
    const m = MONTH_NUM[event.month] - 1; 
    const d = parseInt(event.day, 10);
    const targetTime = new Date(y, m, d, 10, 0, 0).getTime();

    const update = () => {
      let diff = targetTime - Date.now();
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0, expired: true });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60),
        expired: false,
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [event]);

  return timeLeft;
}

/* ─────────────────────────────────────
   CARD
   Key fixes vs previous version:
   • Date badge is a SIBLING of the overflow-hidden shell,
     not a child — so it is never clipped.
   • Card wrapper (motion.div) uses overflow-visible.
   • No background track bar.
   • No node dots.
   ───────────────────────────────────── */
function TimelineItem({
  event, index, isActive, isAdjacent,
}: {
  event: TimelineEvent;
  index: number;
  isActive: boolean;
  isAdjacent: boolean;
}) {
  const isTop = index % 2 === 0;
  const color = COLORS[index];
  const PASTEL_BGS = ['#FEF4E8', '#FCE9F1', '#FEF6E1', '#EBF4F6', '#FEF4E8', '#FCE9F1', '#FEF6E1', '#EBF4F6'];
  const bg = PASTEL_BGS[index];
  const timeLeft = useCountdown(event);

  const scale = isActive ? 1.05 : isAdjacent ? 0.97 : 0.90;
  const yOff = isActive ? 0 : isAdjacent ? (isTop ? -6 : 6) : (isTop ? -14 : 14);
  const stemH = isActive ? 52 : isAdjacent ? 46 : 38;
  const stemW = isActive ? 4 : isAdjacent ? 3 : 2;
  const rotation = isTop ? 1 : -1;

  return (
    <div className="relative flex flex-col items-center shrink-0" style={{ width: 300 }}>

      {/* Stem */}
      <div className={`${isTop ? 'order-2' : 'order-1'} flex flex-col items-center`}>
        <motion.div
          className="rounded-full"
          animate={{ height: stemH, width: stemW }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ backgroundColor: color }}
        />
      </div>

      <motion.div
        className={`relative ${isTop ? 'order-1' : 'order-2'} cursor-pointer group`}
        style={{ paddingTop: 28, paddingRight: 14 }}
        animate={{ scale, y: yOff, rotate: isActive ? 0 : rotation }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        whileHover={{
          scale: isActive ? 1.06 : 1.03,
          y: yOff - 5,
          rotate: 0,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        {/* Date badge — smaller, lighter, but distinctly indie borders */}
        <div
          className="absolute -top-3 -right-3 w-[52px] h-[52px] rounded-full
                     border-[3px] border-[#1a1a1a] flex flex-col items-center
                     justify-center shadow-[2px_2px_0_#1a1a1a] z-20 bg-white"
        >
          <span className="text-[0.4rem] font-bold uppercase tracking-widest text-[#1a1a1a]/70 leading-none mb-0.5">
            {event.month}
          </span>
          <span className="font-display text-base text-[#1a1a1a] leading-none" style={{ color }}>
            {event.day}
          </span>
        </div>

        {/* Card shell — prominent indie dark borders with distinct hard inset shadow */}
        <motion.div
          className="rounded-[20px] border-[3px] border-[#1a1a1a] overflow-hidden relative"
          style={{ backgroundColor: bg }}
          animate={{
            boxShadow: isActive 
              ? `6px 6px 0px #1a1a1a`
              : `4px 4px 0px #1a1a1a`
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ boxShadow: `8px 8px 0px #1a1a1a` }}
        >
          <div className="p-6 pt-6 relative">
            {/* Indie Tag: Running Time */}
            {!timeLeft.expired ? (
              <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 bg-[#1a1a1a] border-[2px] border-[#1a1a1a] rounded-sm shadow-[3px_3px_0_rgba(0,0,0,0.15)] -rotate-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest tabular-nums">
                  Starts in {String(timeLeft.d).padStart(2, '0')}d {String(timeLeft.h).padStart(2, '0')}h
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 bg-[#1a1a1a]/10 border-[2px] border-[#1a1a1a]/20 rounded-sm -rotate-1">
                <span className="text-[10px] font-bold text-[#1a1a1a]/50 uppercase tracking-widest">
                  Completed
                </span>
              </div>
            )}

            {/* Title Design with accent vertical bar */}
            <div className="flex gap-3 items-start mb-4">
              <div className="w-[3px] rounded-full shrink-0" style={{ backgroundColor: color, height: '1.2em', marginTop: '0.2em' }} />
              <h3 className="font-display text-[1.2rem] leading-tight pr-6 text-[#1a1a1a] tracking-tight">
                {event.title}
              </h3>
            </div>

            <p className="text-[#3a3a3a] text-sm leading-relaxed mb-6">
              {event.description}
            </p>

            {/* Tags (Action row) -> Softer background fill, thinner border */}
            <div className="flex justify-start">
              <a
                href={googleCalLink(event)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-1.5 text-[0.7rem] font-bold uppercase
                           tracking-widest px-4 py-1.5 rounded-full border-[1.5px] border-[#1a1a1a]/20
                           hover:-translate-y-0.5 hover:shadow-sm active:scale-95 transition-all"
                style={{ backgroundColor: `${color}1A`, color: '#1a1a1a' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: color }}>
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
                Calendar
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  const containerX = useTransform(smoothProgress, [0, 1], ['15%', '-145%']);

  /* Dynamically calculate which card is physically closest to the screen center! */
  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const START_PCT = 15;
    const END_PCT = -145;
    const cxPct = START_PCT + latest * (END_PCT - START_PCT);
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const cxPx = (cxPct / 100) * vw;
    const padPx = 0.08 * vw;
    const cardW = 300;
    const gapW = 64;
    const center = vw / 2;

    let closestIdx = 0;
    let minDiff = Infinity;

    for (let i = 0; i < timelineData.length; i++) {
      const cardCenter = cxPx + padPx + i * (cardW + gapW) + (cardW / 2);
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    setActiveIdx(closestIdx);
  });



  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative bg-[#f3ecd2]"
      style={{ height: '300vh' }}
    >
      <div
        className="sticky top-0 h-screen flex flex-col justify-center"
        style={{ overflowX: 'clip', overflowY: 'visible' }}
      >
        <div className="text-center shrink-0 z-20 px-4 mb-6 md:mb-10 pt-8">
          <motion.div
            initial={{ scale: 0, rotate: -6 }}
            whileInView={{ scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            className="inline-block mb-5"
          >
            <span
              className="inline-flex items-center gap-2 font-bold font-sans text-sm
                         uppercase tracking-[0.25em] bg-[#f3ecd2] text-[#1a1a1a]
                         px-5 py-2 rounded-full border-[3px] border-[#1a1a1a]
                         shadow-[4px_4px_0_#1a1a1a]"
            >
              ✦ The Journey Ahead ✦
            </span>
          </motion.div>

          <h2
            className="font-display tracking-tight flex flex-wrap justify-center items-center gap-3 md:gap-4"
            style={{ fontSize: 'clamp(2.2rem,7vw,5rem)', lineHeight: 0.95, color: '#1a1a1a' }}
          >
            <span>Event</span>
            <span 
              className="inline-block bg-[#f97028] px-5 pb-1 pt-2 text-[#f3ecd2] border-[4px] border-[#1a1a1a] rounded-2xl shadow-[6px_6px_0_#1a1a1a] rotate-[-2deg] hover:rotate-1 transition-transform"
            >
              Timeline
            </span>
          </h2>
          <p className="mt-4 text-[#5a4a3a] text-sm md:text-base max-w-lg mx-auto font-sans leading-relaxed">
            Scroll to journey through every milestone — from registration to the grand finale.
          </p>
        </div>

        <div
          className="hidden lg:flex flex-1 min-h-0 items-center relative"
          style={{ overflowX: 'clip', overflowY: 'visible' }}
        >
          <div
            className="absolute left-0 right-0 h-[3px] bg-[#1a1a1a]/20 rounded-full"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          />

          <motion.div
            style={{ x: containerX }}
            className="flex gap-16 items-center w-max"
          >
            <div className="flex gap-16 items-center py-8 px-[8vw]">
              {timelineData.map((event, i) => (
                <TimelineItem
                  key={i}
                  event={event}
                  index={i}
                  isActive={i === activeIdx}
                  isAdjacent={Math.abs(i - activeIdx) === 1}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:hidden flex-1 min-h-0 flex items-center">
          <div
            className="w-full overflow-x-auto snap-x snap-mandatory px-6 py-12"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex gap-10 items-center min-w-max pr-[20vw]">
              <div className="absolute left-0 right-0 h-[2px] bg-[#1a1a1a]/15 rounded-full top-1/2" />

              {timelineData.map((event, i) => (
                <div key={i} className="snap-center shrink-0" style={{ paddingTop: 28, paddingRight: 14 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    whileHover={{ y: -5, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                    className="relative group cursor-pointer"
                  >
                    <div
                      className="absolute top-[-28px] right-0 w-[56px] h-[56px] rounded-full
                                 border-[4px] border-[#1a1a1a] flex flex-col items-center
                                 justify-center z-20"
                      style={{ backgroundColor: COLORS[i] }}
                    >
                      <span className="text-[0.45rem] font-bold uppercase tracking-wider text-[#1a1a1a] leading-none">
                        {event.month}
                      </span>
                      <span className="font-display text-lg text-[#1a1a1a] leading-none">
                        {event.day}
                      </span>
                    </div>

                    <div
                      className="rounded-3xl border-[4px] border-[#1a1a1a] overflow-hidden
                                 shadow-[6px_6px_0_#1a1a1a] group-hover:shadow-[10px_10px_0_#1a1a1a]
                                 transition-shadow duration-200 w-[270px]"
                      style={{ backgroundColor: BGS[i] }}
                    >
                      <div className="p-5">
                        <h3 className="font-display text-lg leading-tight mb-2" style={{ color: '#1a1a1a' }}>
                          {event.title}
                        </h3>
                        <div className="h-1 w-10 rounded-full mb-3" style={{ backgroundColor: COLORS[i] }} />
                        <p className="text-[#3a3a3a] text-sm leading-relaxed mb-3">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span
                            className="text-xs font-bold uppercase tracking-wider px-3 py-1
                                       rounded-full border-2 border-[#1a1a1a]"
                            style={{ backgroundColor: COLORS[i], color: '#1a1a1a' }}
                          >
                            {event.month} {event.day}
                          </span>
                          <a
                            href={googleCalLink(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold uppercase
                                       tracking-wider px-3 py-1 rounded-full border-2 border-[#1a1a1a]
                                       hover:brightness-90 transition-all"
                            style={{ backgroundColor: COLORS[i], color: '#1a1a1a' }}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                            </svg>
                            + Calendar
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

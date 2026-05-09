import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
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
  { month: 'AUG', day: '20', year: 2026, title: 'Idea Submission Deadline', description: 'Ideas Lock In — Let the Best Concepts Win!' },
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
   SVG TRAIN ICON
   ───────────────────────────────────── */
function TrainSVG({ color }: { color: string }) {
  return (
    <svg
      width="64"
      height="38"
      viewBox="0 0 64 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Smokestack smoke puffs */}
      <ellipse cx="12" cy="5" rx="3" ry="2.5" fill="#1a1a1a" opacity="0.2" />
      <ellipse cx="10" cy="2" rx="2" ry="1.8" fill="#1a1a1a" opacity="0.12" />

      {/* Main body */}
      <rect x="2" y="10" width="54" height="18" rx="4" fill="#1a1a1a" />

      {/* Cabin / dome */}
      <rect x="6" y="5" width="18" height="10" rx="3" fill="#1a1a1a" />

      {/* Accent stripe */}
      <rect x="2" y="22" width="54" height="3" rx="1" fill={color} />

      {/* Windows */}
      <rect x="9" y="7" width="6" height="5" rx="1.5" fill="#f3ecd2" />
      <rect x="17" y="7" width="6" height="5" rx="1.5" fill="#f3ecd2" />

      {/* Cab window */}
      <rect x="34" y="13" width="8" height="6" rx="1.5" fill="#f3ecd2" opacity="0.9" />
      <rect x="44" y="13" width="8" height="6" rx="1.5" fill="#f3ecd2" opacity="0.9" />

      {/* Front bumper / cowcatcher */}
      <rect x="54" y="22" width="8" height="3" rx="1" fill="#1a1a1a" />
      <path d="M54 22 L62 26 L62 28 L54 28 Z" fill="#1a1a1a" />

      {/* Wheels */}
      <circle cx="12" cy="30" r="5" fill="#1a1a1a" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="30" r="2" fill={color} />
      <circle cx="30" cy="30" r="5" fill="#1a1a1a" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="2" fill={color} />
      <circle cx="48" cy="30" r="5" fill="#1a1a1a" stroke={color} strokeWidth="2" />
      <circle cx="48" cy="30" r="2" fill={color} />

      {/* Chimney */}
      <rect x="10" y="4" width="5" height="7" rx="1.5" fill="#1a1a1a" />
      <rect x="8" y="3" width="9" height="3" rx="1.5" fill="#1a1a1a" />
    </svg>
  );
}

/* ─────────────────────────────────────
   SVG SUBMARINE ICON (FOR MOBILE)
   ───────────────────────────────────── */
function SubmarineSVG({ color }: { color: string }) {
  return (
    <svg
      width="64"
      height="38"
      viewBox="0 0 64 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Submarine Body (Oval/Capsule) */}
      <rect x="8" y="10" width="48" height="22" rx="11" fill="#1a1a1a" />

      {/* Conning Tower */}
      <rect x="26" y="5" width="12" height="7" rx="2" fill="#1a1a1a" />
      {/* Periscope */}
      <path d="M30 5 L30 2 L33 2" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Portholes */}
      <circle cx="24" cy="21" r="3" fill="#f3ecd2" />
      <circle cx="32" cy="21" r="3" fill="#f3ecd2" />
      <circle cx="40" cy="21" r="3" fill="#f3ecd2" />

      {/* Accent Stripe */}
      <rect x="15" y="26" width="34" height="3" rx="1.5" fill={color} />

      {/* Rear Propeller Handle/Base */}
      <rect x="2" y="18" width="6" height="6" rx="1" fill="#1a1a1a" />
      {/* Propeller Blades */}
      <rect x="4" y="14" width="2" height="14" rx="1" fill="#1a1a1a" />
    </svg>
  );
}

/* ─────────────────────────────────────
   TRACK COMPONENT
   ───────────────────────────────────── */
function Track({
  totalWidth,
  progress,
  stationPositions,
  activeProgress,
}: {
  totalWidth: number;
  progress: any;
  stationPositions: number[];
  activeProgress: number;
}) {
  const TRACK_Y = 0;

  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none"
      width={totalWidth}
      height={60}
      style={{ overflow: 'visible' }}
    >
      {/* Rail ties / sleepers */}
      {Array.from({ length: Math.ceil(totalWidth / 40) }).map((_, i) => (
        <rect
          key={`tie-${i}`}
          x={i * 40 + 4}
          y={TRACK_Y + 14}
          width={16}
          height={6}
          rx={2}
          fill="#1a1a1a"
          opacity={0.18}
        />
      ))}

      {/* Background rail */}
      <line
        x1={0}
        y1={TRACK_Y + 17}
        x2={totalWidth}
        y2={TRACK_Y + 17}
        stroke="#1a1a1a"
        strokeWidth={5}
        strokeOpacity={0.15}
        strokeLinecap="round"
      />
      <line
        x1={0}
        y1={TRACK_Y + 23}
        x2={totalWidth}
        y2={TRACK_Y + 23}
        stroke="#1a1a1a"
        strokeWidth={5}
        strokeOpacity={0.15}
        strokeLinecap="round"
      />

      {/* Progress glow rail (top) */}
      <motion.line
        x1={0}
        y1={TRACK_Y + 17}
        x2={totalWidth}
        y2={TRACK_Y + 17}
        stroke="#f97028"
        strokeWidth={4}
        strokeLinecap="round"
        style={{ pathLength: progress, filter: 'drop-shadow(0 0 6px #f97028)' }}
      />
      {/* Progress glow rail (bottom) */}
      <motion.line
        x1={0}
        y1={TRACK_Y + 23}
        x2={totalWidth}
        y2={TRACK_Y + 23}
        stroke="#f97028"
        strokeWidth={4}
        strokeLinecap="round"
        style={{ pathLength: progress, filter: 'drop-shadow(0 0 6px #f97028)' }}
      />

      {/* Station nodes on track */}
      {stationPositions.map((cx, i) => {
        const threshold = i / (timelineData.length - 1);
        const passed = activeProgress >= threshold - 0.01;
        const color = COLORS[i];
        return (
          <g key={`station-node-${i}`}>
            {/* Station pole */}
            <line
              x1={cx}
              y1={TRACK_Y + 20}
              x2={cx}
              y2={TRACK_Y + 40}
              stroke="#1a1a1a"
              strokeWidth={2}
              strokeOpacity={passed ? 0.7 : 0.25}
            />
            {/* Outer ring */}
            <circle
              cx={cx}
              cy={TRACK_Y + 20}
              r={10}
              fill={passed ? color : '#f3ecd2'}
              stroke="#1a1a1a"
              strokeWidth={2.5}
            />
            {/* Inner dot */}
            <circle
              cx={cx}
              cy={TRACK_Y + 20}
              r={4}
              fill={passed ? '#1a1a1a' : '#1a1a1a'}
              opacity={passed ? 0.9 : 0.3}
            />
            {/* Glowing halo when active */}
            {passed && (
              <circle
                cx={cx}
                cy={TRACK_Y + 20}
                r={14}
                fill="none"
                stroke={color}
                strokeWidth={2}
                opacity={0.35}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────
   STATION CARD
   ───────────────────────────────────── */
function StationCard({
  event,
  index,
  isRevealed,
  isActive,
  cardWidth,
  position, // 'top' | 'bottom'
  isMobile,
}: {
  event: TimelineEvent;
  index: number;
  isRevealed: boolean;
  isActive: boolean;
  cardWidth: number;
  position: 'top' | 'bottom';
  isMobile?: boolean;
}) {
  const color = COLORS[index];
  const isTop = position === 'top';

  return (
    <div
      className="absolute"
      style={{
        width: cardWidth,
        left: 0,
        // bottom: 100% → card bottom at station-wrapper top  (card above track)
        // top: 100%    → card top at station-wrapper bottom   (card below track)
        bottom: isTop ? '100%' : undefined,
        top: isTop ? undefined : '100%',
        paddingBottom: isTop ? (isMobile ? '25px' : '10px') : '0',
        paddingTop: isTop ? '0' : '10px',
      }}
    >
      {/* Connecting stem — anchors between card edge and track node */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: '2px',
          height: isMobile ? '25px' : '10px',
          background: isRevealed ? color : 'rgba(26,26,26,0.15)',
          // stem sits between card padding edge and track
          bottom: isTop ? '0px' : undefined,
          top: isTop ? undefined : '0px',
          transition: 'background 0.4s ease',
        }}
      />

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: isTop ? 8 : -8, rotate: isMobile ? -90 : 0 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: isMobile ? -90 : 0 }}
            exit={{ scale: 0.9, opacity: 0, rotate: isMobile ? -90 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.04 }}
            className="relative w-full"
            style={
              isMobile
                ? {
                  overflow: 'visible',
                  originX: 0.5,
                  originY: 1,
                  top: '-105px',
                  left: '125px', // Reduced offset
                }
                : { overflow: 'visible', originX: 0.5, originY: 1 }
            }
          >
            {/* ── RAILWAY STATION BOARD ── */}
            <div
              style={{
                border: '2.5px solid #1a1a1a',
                borderRadius: '3px',
                background: isActive
                  ? `linear-gradient(160deg, ${color}18, #fff9f4)`
                  : 'rgba(255,255,255,0.92)',
                boxShadow: isActive
                  ? `5px 5px 0 #1a1a1a, 0 0 18px ${color}44`
                  : '4px 4px 0 #1a1a1a',
                transition: 'box-shadow 0.3s ease',
                willChange: 'transform',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              {/* Corner Rivets */}
              {[
                { top: -5, left: -5 } as React.CSSProperties,
                { top: -5, right: -5 } as React.CSSProperties,
                { bottom: -5, left: -5 } as React.CSSProperties,
                { bottom: -5, right: -5 } as React.CSSProperties,
              ].map((pos, ri) => (
                <div
                  key={ri}
                  style={{
                    position: 'absolute',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#1a1a1a',
                    border: '2px solid #f3ecd2',
                    zIndex: 20,
                    ...pos,
                  }}
                />
              ))}

              {/* Platform header bar */}
              <div
                style={{
                  background: color,
                  borderBottom: '2.5px solid #1a1a1a',
                  padding: '4px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.22em', color: '#1a1a1a', textTransform: 'uppercase' }}
                >
                  PLATFORM {String(index + 1).padStart(2, '0')}
                </span>
                {/* Signal lights */}
                <div style={{ display: 'flex', gap: '3px' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a1a1a', opacity: 0.25 }} />
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a1a1a', opacity: 0.55 }} />
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a1a1a', opacity: isActive ? 1 : 0.85 }} />
                </div>
              </div>

              {/* Content area */}
              <div style={{ padding: '8px 10px 0 10px', overflow: 'hidden' }}>
                {/* Departure flip-board date */}
                <div style={{ display: 'flex', alignItems: 'stretch', gap: '2px', marginBottom: '8px' }}>
                  <div
                    style={{
                      background: '#1a1a1a', color: color,
                      fontFamily: 'monospace', fontSize: '23px', fontWeight: 900,
                      padding: '3px 8px', lineHeight: 1,
                      display: 'flex', alignItems: 'center',
                      minWidth: '40px', justifyContent: 'center', letterSpacing: '0.04em',
                    }}
                  >
                    {event.day}
                  </div>
                  <div
                    style={{
                      background: '#1a1a1a', padding: '3px 7px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: '11px', fontWeight: 800, color: '#f3ecd2', letterSpacing: '0.1em' }}>{event.month}</span>
                  </div>
                  <div
                    style={{
                      flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                      paddingLeft: '7px', gap: '1px',
                      border: '1px solid rgba(26,26,26,0.08)', borderLeft: 'none',
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: '12px', fontWeight: 900, color: '#1a1a1a', opacity: 0.55, letterSpacing: '0.04em', lineHeight: 1 }}>
                      {event.year}
                    </span>
                    <span className="font-mono" style={{ fontSize: '7.5px', color: '#1a1a1a', opacity: 0.3, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      YEAR
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-display text-[#1a1a1a] leading-tight"
                  style={{ fontSize: 'clamp(0.92rem, 1.5vw, 1.15rem)', letterSpacing: '-0.01em', marginBottom: '5px' }}
                >
                  {event.title}
                </h3>

                {/* Description */}
                <p
                  className="font-sans text-[#1a1a1a]/60 leading-snug"
                  style={{
                    fontSize: 'clamp(0.72rem, 1.0vw, 0.82rem)',
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    marginBottom: '8px',
                  }}
                >
                  {event.description}
                </p>
              </div>

              {/* Dashed tear-off ticket footer */}
              <div
                style={{
                  margin: '0 6px',
                  borderTop: '1.5px dashed rgba(26,26,26,0.18)',
                  padding: '6px 4px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                {/* Track signal indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <div style={{ width: 14, height: 2, background: color, borderRadius: 1 }} />
                  <div style={{ width: 7, height: 7, borderRadius: '50%', border: `2px solid ${color}`, background: isActive ? color : 'transparent', transition: 'background 0.3s ease' }} />
                  <div style={{ width: 14, height: 2, background: 'rgba(26,26,26,0.15)', borderRadius: 1 }} />
                </div>
                {/* Calendar icon-only button */}
                <a
                  href={googleCalLink(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Add to calendar"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '24px', height: '24px',
                    textDecoration: 'none', color: '#1a1a1a',
                    border: '1.5px solid #1a1a1a', borderRadius: '3px',
                    background: 'transparent',
                    transition: 'background 0.2s ease, color 0.2s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = color; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.75" y="1.5" width="8.5" height="7.75" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="0.75" y1="4" x2="9.25" y2="4" stroke="currentColor" strokeWidth="1.1" />
                    <line x1="3" y1="0.5" x2="3" y2="2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="7" y1="0.5" x2="7" y2="2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <rect x="1.8" y="5.3" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                    <rect x="4.25" y="5.3" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                    <rect x="6.7" y="5.3" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                  </svg>
                </a>
              </div>

              {/* Active glow bar at bottom */}
              {isActive && <div style={{ height: '3px', background: color, filter: `drop-shadow(0 0 6px ${color})` }} />}

              {/* Active overlay */}
              {isActive && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 40%, ${color}12 0%, transparent 65%)`, borderRadius: 'inherit' }} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ghost — unoccupied station board */}
      {!isRevealed && (
        <div
          style={{
            width: '100%', height: '130px', borderRadius: '3px',
            border: '2px dashed rgba(26,26,26,0.10)', background: 'rgba(26,26,26,0.02)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', opacity: 0.12 }}>
            <div style={{ width: 24, height: 2, background: '#1a1a1a', borderRadius: 1 }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', border: '2px solid #1a1a1a' }} />
            <div style={{ width: 24, height: 2, background: '#1a1a1a', borderRadius: 1 }} />
          </div>
          <span className="font-mono" style={{ fontSize: '7px', letterSpacing: '0.2em', color: '#1a1a1a', opacity: 0.12, textTransform: 'uppercase' }}>
            NEXT STATION
          </span>
        </div>
      )}
    </div>
  );
}
/* ─────────────────────────────────────
   MAIN TIMELINE SECTION
   ───────────────────────────────────── */
export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set([0]));
  // Available height for the flex-1 track area (computed in JS so we can do real math)
  const [trackAreaH, setTrackAreaH] = useState(500);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallScreen(window.innerHeight < 700);
      // Estimate: sticky viewport minus header (~60px, no subtitle now) minus nav (~72px)
      setTrackAreaH(Math.max(320, window.innerHeight - 60 - 72));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Compact sizes — CARD_WIDTH 220 & STATION_GAP 245 keep Platform 05 inside the 1280px viewport at 100% zoom
  // Station 5 center = 160 + 4*245 = 1140px; right edge = 1140 + 110 = 1250px < 1280px ✓
  const CARD_WIDTH = isSmallScreen ? 230 : isMobile ? 260 : 260;
  const STATION_GAP = isMobile ? 280 : 245;
  const PADDING_SIDE = isMobile ? 60 : 160;
  const END_PADDING = isMobile ? 350 : 160;
  const TRACK_HEIGHT = 60;

  // Estimated card content height (used for centering the track)
  // card = top bar 4px + padding+content ~170px + padding 20px ≈ 194px
  const CARD_EST_H = isSmallScreen ? 160 : 190;

  // Place track so top cards and bottom cards both fit in the track area
  // track_top + CARD_EST_H (above) < trackAreaH  AND  track_top + TRACK_HEIGHT + CARD_EST_H < trackAreaH
  // Ideal: track_top = (trackAreaH - TRACK_HEIGHT) / 2  →  equal space top & bottom
  // But top cards consume CARD_EST_H ABOVE that, bottom cards CARD_EST_H BELOW.
  // So available per side = (trackAreaH - TRACK_HEIGHT) / 2
  // We nudge slightly upward to give bottom cards a tiny bit more room (nav overlap)
  const trackTopPx = isMobile ? 140 : Math.max(
    CARD_EST_H + 16,
    (trackAreaH - TRACK_HEIGHT) / 2 - 10
  );

  const stationPositions = timelineData.map((_, i) => PADDING_SIDE + i * STATION_GAP);
  const totalWidth = PADDING_SIDE + (timelineData.length - 1) * STATION_GAP + END_PADDING;

  // VERTICAL SCROLL → HORIZONTAL TRANSFORM
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    restDelta: 0.001,
  });

  const [progressValue, setProgressValue] = useState(0);
  const ANIMATION_END = 0.85;

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    let adjusted = latest / ANIMATION_END;
    if (adjusted > 1) adjusted = 1;
    setProgressValue(adjusted);
    const idx = Math.max(0, Math.min(timelineData.length - 1, Math.round(adjusted * (timelineData.length - 1))));
    setActiveIdx(idx);
    const revealThreshold = adjusted * (timelineData.length - 1);
    setRevealedSet((prev) => {
      const next = new Set(prev);
      timelineData.forEach((_, i) => {
        if (i <= revealThreshold + 0.3) next.add(i);
      });
      return next;
    });
  });

  const translateX = useTransform(
    smoothProgress,
    [0, ANIMATION_END],
    [0, -(totalWidth - (typeof window !== 'undefined' ? window.innerWidth : 1200))],
    { clamp: true }
  );

  const mobileTranslateY = useTransform(
    smoothProgress,
    [0, ANIMATION_END],
    [0, -(totalWidth - (typeof window !== 'undefined' ? window.innerHeight : 800) + 120)], // Added buffer to keep last card centered
    { clamp: true }
  );

  const trainX = useTransform(
    smoothProgress,
    [0, ANIMATION_END],
    [stationPositions[0] - 32, stationPositions[stationPositions.length - 1] - 32],
    { clamp: true }
  );

  // Sync progress bar path length to match train center exactly
  const trackPathLength = useTransform(
    smoothProgress,
    [0, ANIMATION_END],
    [stationPositions[0] / totalWidth, stationPositions[stationPositions.length - 1] / totalWidth],
    { clamp: true }
  );

  const handleScrollTo = (index: number) => {
    if (!sectionRef.current) return;
    const targetProgress = (index / (timelineData.length - 1)) * ANIMATION_END;
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const distance = sectionHeight - window.innerHeight;
    window.scrollTo({ top: sectionTop + targetProgress * distance, behavior: 'smooth' });
  };
  const goToPrev = () => handleScrollTo(Math.max(0, activeIdx - 1));
  const goToNext = () => handleScrollTo(Math.min(timelineData.length - 1, activeIdx + 1));

  // FAQ gap: adding margin-bottom to the sticky container parent so FAQ section doesn't overlap immediately
  const SECTION_BOTTOM_GAP = isMobile ? '25vh' : '0vh';

  // trackTopPx is now a real pixel number computed from actual available height
  const VIEWPORT_CENTER_Y = `${trackTopPx}px`;

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative bg-[#f3ecd2] w-full"
      style={{ height: '400vh', marginBottom: SECTION_BOTTOM_GAP }}
    >
      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen flex flex-col">

        {/* Section Header — title only, no subtitle */}
        <div className="text-center shrink-0 z-40 px-4 pt-2 pb-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-block mb-4"
          >
            <div className="h-[2px] w-20 bg-[#f97028] mx-auto" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0em" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="font-display tracking-tight flex justify-center items-center uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 0.9 }}
          >
            {"TIMELINE".split('').map((char, i) => (
              <motion.span
                key={i}
                className="uppercase"
                initial={{ color: '#1a1a1a' }}
                animate={{
                  color: ['#1a1a1a', COLORS[i % COLORS.length], '#1a1a1a'],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* ── SCROLLABLE TRACK AREA ── */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* The whole train world slides horizontally or vertically */}
          <motion.div
            key={isMobile ? 'mobile-world' : 'desktop-world'}
            className="absolute top-0 h-full"
            style={
              isMobile
                ? {
                  left: '50px', // Pull track slightly left to reduce side padding
                  y: mobileTranslateY,
                  rotate: 90,
                  transformOrigin: `0px ${trackTopPx + 20}px`,
                  width: totalWidth,
                  willChange: 'transform',
                }
                : {
                  left: 0,
                  x: translateX,
                  width: totalWidth,
                  willChange: 'transform',
                }
            }
          >
            {/* ── TRACK (centered vertically in this div) ── */}
            <div
              className="absolute left-0"
              style={{
                top: VIEWPORT_CENTER_Y,
                width: totalWidth,
                height: TRACK_HEIGHT,
              }}
            >
              <Track
                totalWidth={totalWidth}
                progress={trackPathLength}
                stationPositions={stationPositions}
                activeProgress={progressValue}
              />
            </div>

            {/* ── STATION CARDS (zig-zag top/bottom) ── */}
            {timelineData.map((event, i) => {
              // Force all to 'top' on mobile so they align to the right of the vertical track
              const isTop = isMobile ? true : i % 2 === 0;
              const cx = stationPositions[i];
              return (
                <div
                  key={`station-${i}`}
                  className="absolute"
                  style={{
                    left: cx - CARD_WIDTH / 2,
                    top: VIEWPORT_CENTER_Y,
                    width: CARD_WIDTH,
                    height: TRACK_HEIGHT,
                  }}
                >
                  <StationCard
                    event={event}
                    index={i}
                    isRevealed={revealedSet.has(i)}
                    isActive={i === activeIdx}
                    cardWidth={CARD_WIDTH}
                    position={isTop ? 'top' : 'bottom'}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}

            {/* ── TRAIN ── */}
            <motion.div
              className="absolute"
              style={{
                x: trainX,
                top: VIEWPORT_CENTER_Y,
                marginTop: '-10px',       // Align wheels (cy=30) with track circles (cy=20)
                willChange: 'transform',
                zIndex: 40,
              }}
            >
              {/* Puffs or Bubbles animation */}
              <motion.div
                className="absolute"
                style={{ left: isMobile ? 4 : 12, top: isMobile ? 12 : -22, zIndex: 50 }}
                animate={{ opacity: [0.7, 0, 0.7], y: isMobile ? [0, 0, 0] : [-2, -12, -2], x: isMobile ? [-2, -15, -2] : [0, 0, 0], scale: [0.7, 1.3, 0.7] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div
                  style={{
                    width: isMobile ? 8 : 14,
                    height: isMobile ? 8 : 14,
                    borderRadius: '50%',
                    background: isMobile ? 'rgba(255,255,255,0.45)' : 'rgba(26,26,26,0.18)',
                    border: isMobile ? '1px solid rgba(255,255,255,0.2)' : 'none',
                    filter: isMobile ? 'none' : 'blur(3px)',
                  }}
                />
              </motion.div>
              <motion.div
                className="absolute"
                style={{ left: isMobile ? 0 : 6, top: isMobile ? 18 : -34, zIndex: 50 }}
                animate={{ opacity: [0.5, 0, 0.5], y: isMobile ? [0, 0, 0] : [-2, -16, -2], x: isMobile ? [-2, -20, -2] : [0, 0, 0], scale: [0.5, 1.1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <div
                  style={{
                    width: isMobile ? 12 : 10,
                    height: isMobile ? 12 : 10,
                    borderRadius: '50%',
                    background: isMobile ? 'rgba(255,255,255,0.35)' : 'rgba(26,26,26,0.12)',
                    border: isMobile ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    filter: isMobile ? 'none' : 'blur(4px)',
                  }}
                />
              </motion.div>

              {/* Vehicle body with bounce */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              >
                {isMobile ? <SubmarineSVG color={COLORS[activeIdx]} /> : <TrainSVG color={COLORS[activeIdx]} />}
              </motion.div>

              {/* Active station name label on train */}
              <motion.div
                key={`train-label-${activeIdx}-${isMobile}`}
                initial={{ opacity: 0, y: 4, x: "-50%", rotate: isMobile ? -90 : 0 }}
                animate={{ opacity: 1, y: 0, x: "-50%", rotate: isMobile ? -90 : 0 }}
                className="absolute left-1/2 whitespace-nowrap"
                style={
                  isMobile
                    ? { bottom: -22, originX: 0.5, originY: 0.5 }
                    : { bottom: -22 }
                }
              >
                <span
                  className="font-mono text-[9px] font-black uppercase tracking-widest px-2 py-0.5"
                  style={{
                    background: COLORS[activeIdx],
                    color: '#1a1a1a',
                    border: '1.5px solid #1a1a1a',
                    boxShadow: '2px 2px 0 #1a1a1a',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {timelineData[activeIdx].month} {timelineData[activeIdx].day}
                </span>
              </motion.div>
            </motion.div>

            {/* ── BACKGROUND LANDSCAPE DETAILS ── */}
            {/* Hills / ground line */}
            <div
              className="absolute left-0 right-0 pointer-events-none"
              style={{ bottom: 0, height: '30%', opacity: 0.04 }}
            >
              <svg width={totalWidth} height="100%" viewBox={`0 0 ${totalWidth} 200`} preserveAspectRatio="none">
                <path
                  d={`M0 200 ${Array.from({ length: 20 }, (_, i) =>
                    `Q${(i + 0.5) * (totalWidth / 20)} ${140 + Math.sin(i * 1.7) * 40} ${(i + 1) * (totalWidth / 20)} ${160 + Math.cos(i * 1.3) * 30}`
                  ).join(' ')} L${totalWidth} 200 Z`}
                  fill="#1a1a1a"
                />
              </svg>
            </div>

            {/* Tree decorations along bottom */}
            {Array.from({ length: Math.floor(totalWidth / 130) }).map((_, i) => {
              const treeX = 80 + i * 130 + (i % 3) * 20;
              const treeH = 24 + (i % 4) * 10;
              return (
                <div
                  key={`tree-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: treeX,
                    bottom: '15%',
                    opacity: 0.06 + (i % 3) * 0.02,
                  }}
                >
                  <svg width={18} height={treeH} viewBox={`0 0 18 ${treeH}`}>
                    <polygon points={`9,0 18,${treeH} 0,${treeH}`} fill="#1a1a1a" />
                  </svg>
                </div>
              );
            })}
          </motion.div>

          {/* ── FADE EDGES ── */}
          <div
            className="hidden md:block absolute left-0 top-0 h-full w-24 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, #f3ecd2, transparent)' }}
          />
          <div
            className="hidden md:block absolute right-0 top-0 h-full w-24 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to left, #f3ecd2, transparent)' }}
          />
        </div>

        {/* ── NAVIGATION ── */}
        <div className={`absolute left-0 right-0 flex justify-center items-center gap-4 z-50 px-6 ${isMobile ? 'bottom-4 scale-90' : 'bottom-8'}`}>
          <button
            onClick={goToPrev}
            disabled={activeIdx === 0}
            className={`hidden md:flex group w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#1a1a1a] shadow-[5px_5px_0_#1a1a1a] transition-all duration-300 items-center justify-center ${activeIdx === 0
              ? 'opacity-30 cursor-not-allowed shadow-none translate-x-0.5 translate-y-0.5'
              : 'hover:bg-[#f97028] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-0.5 hover:translate-y-0.5'
              }`}
            aria-label="Previous station"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#1a1a1a' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Station dots */}
          <div className="flex gap-2 items-center">
            {timelineData.map((_, i) => (
              <button
                key={i}
                onClick={() => handleScrollTo(i)}
                className="transition-all duration-300 rounded-full border-2 border-[#1a1a1a]"
                style={{
                  width: i === activeIdx ? 32 : 10,
                  height: 10,
                  background: i === activeIdx ? COLORS[i] : 'rgba(26,26,26,0.2)',
                }}
                aria-label={`Go to station ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={activeIdx === timelineData.length - 1}
            className={`hidden md:flex group w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#1a1a1a] shadow-[5px_5px_0_#1a1a1a] transition-all duration-300 items-center justify-center ${activeIdx === timelineData.length - 1
              ? 'opacity-30 cursor-not-allowed shadow-none translate-x-0.5 translate-y-0.5'
              : 'hover:bg-[#f97028] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-0.5 hover:translate-y-0.5'
              }`}
            aria-label="Next station"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#1a1a1a' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Hint label */}
        <div className="absolute bottom-10 right-10 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1a1a]/30 hidden md:block">
          {activeIdx + 1} / {timelineData.length} stations
        </div>
      </div>
    </section>
  );
}
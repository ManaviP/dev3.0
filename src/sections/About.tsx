import { useState, useEffect, useRef, useCallback } from "react";

interface CountdownInfo {
  t: Date;
  title: string;
  sub: string;
  msg: string;
}

interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}

const REG_DEADLINE = new Date("2026-04-10T23:59:59");
const HACK_START   = new Date("2026-04-15T09:00:00");
const HACK_END     = new Date("2026-04-17T17:00:00");
const RESULTS      = new Date("2026-04-20T18:00:00");

const PHRASES = [
  "Build something extraordinary ✦",
  "Code with creative freedom 🎨",
  "36 hours of pure innovation 🚀",
  "Join the creative revolution ✨",
  "Where pixels meet passion 🎮",
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_HDRS = ["SU","MO","TU","WE","TH","FR","SA"];
const CALENDAR_EVENTS = [10, 15, 16, 17, 20];

const pad = (n: number) => String(n).padStart(2, "0");

function getCountdownTarget(): CountdownInfo | null {
  const now = new Date();
  if (now < REG_DEADLINE) return { t: REG_DEADLINE, title: "Registration Closes In", sub: "Don't miss the deadline!", msg: "⏳ Registration closing soon!" };
  if (now < HACK_START)  return { t: HACK_START,   title: "Hackathon Starts In",     sub: "Get ready to build!",      msg: "🚀 Event starting soon!"        };
  if (now < HACK_END)    return { t: HACK_END,      title: "Hackathon Ends In",       sub: "Keep hacking!",            msg: "🔥 Hackathon is LIVE!"           };
  if (now < RESULTS)     return { t: RESULTS,       title: "Results In",              sub: "Stay tuned…",              msg: "🏆 Results coming soon!"         };
  return null;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor((diff % 864e5) / 36e5),
    m: Math.floor((diff % 36e5) / 6e4),
    s: Math.floor((diff % 6e4) / 1e3),
  };
}

function calcRegProgress(): number {
  const now = new Date();
  if (now >= REG_DEADLINE) return 100;
  const start = new Date("2026-03-15T00:00:00");
  const total = REG_DEADLINE.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

function Typewriter() {
  const [text, setText] = useState("");
  const state = useRef({ phraseIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function tick() {
      const { phraseIdx, charIdx, deleting } = state.current;
      const phrase = PHRASES[phraseIdx];
      let delay = 80;
      if (!deleting) {
        const next = charIdx + 1;
        setText(phrase.substring(0, next));
        state.current.charIdx = next;
        if (next === phrase.length) { state.current.deleting = true; delay = 2200; }
        else delay = 55 + Math.random() * 35;
      } else {
        const next = charIdx - 1;
        setText(phrase.substring(0, next));
        state.current.charIdx = next;
        if (next === 0) {
          state.current.deleting = false;
          state.current.phraseIdx = (phraseIdx + 1) % PHRASES.length;
          delay = 350;
        } else delay = 25;
      }
      timer = setTimeout(tick, delay);
    }
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.95rem",
        color: "#f97028",
        borderRight: "2px solid #f97028",
        animation: "blink-caret 0.7s step-end infinite",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

function MiniCalendar() {
  const now = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const first = new Date(year, month, 1).getDay();
  const dim   = new Date(year, month + 1, 0).getDate();
  const prevDim = new Date(year, month, 0).getDate();

  const cells: { label: number; cls: string }[] = [];
  for (let i = first - 1; i >= 0; i--) cells.push({ label: prevDim - i, cls: "inactive" });
  for (let d = 1; d <= dim; d++) {
    let cls = "normal";
    if (d === today) cls = "today";
    else if (CALENDAR_EVENTS.includes(d)) cls = "event";
    cells.push({ label: d, cls });
  }
  const rem = 7 - ((first + dim) % 7);
  if (rem < 7) for (let i = 1; i <= rem; i++) cells.push({ label: i, cls: "inactive" });

  const dayStyle = (cls: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.6rem",
      textAlign: "center",
      padding: "3px 1px",
      borderRadius: "4px",
      color: "#8a7a6a",
    };
    if (cls === "today")   return { ...base, background: "#f97028", color: "#fff", fontWeight: 700, borderRadius: "5px" };
    if (cls === "event")   return { ...base, background: "rgba(244,137,163,0.18)", color: "#f489a3", fontWeight: 600 };
    if (cls === "inactive") return { ...base, opacity: 0.25 };
    return base;
  };

  return (
    <div style={{ marginTop: 12, padding: 12, background: "#F3ecd2", borderRadius: 10, border: "1px solid rgba(249,112,40,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "'Righteous', cursive", fontSize: "0.9rem", color: "#2a1f14" }}>{MONTHS[month]}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#8a7a6a" }}>{year}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
        {DAY_HDRS.map((d) => (
          <div key={d} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", textAlign: "center", padding: "3px 1px", fontWeight: 700, color: "#5a4a3a" }}>{d}</div>
        ))}
        {cells.map((c, i) => (
          <div key={i} style={dayStyle(c.cls)}>{c.label}</div>
        ))}
      </div>
    </div>
  );
}

function CountdownPanel() {
  const info = getCountdownTarget();
  const [time, setTime] = useState<TimeLeft>(info ? calcTimeLeft(info.t) : { d: 0, h: 0, m: 0, s: 0 });
  const [tickSec, setTickSec] = useState(false);
  const prevS = useRef(-1);
  const [regPct, setRegPct] = useState(calcRegProgress());

  useEffect(() => {
    const id = setInterval(() => {
      const inf = getCountdownTarget();
      if (!inf) return;
      const tl = calcTimeLeft(inf.t);
      setTime(tl);
      setRegPct(calcRegProgress());
      if (tl.s !== prevS.current) {
        prevS.current = tl.s;
        setTickSec(true);
        setTimeout(() => setTickSec(false), 350);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const title    = info ? info.title : "Event Completed!";
  const subtitle = info ? info.sub   : "Thanks for participating!";
  const msg      = info ? info.msg   : "🎉 See you next time!";

  const unitStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "8px 4px",
    background: "#F3ecd2",
    borderRadius: 10,
    border: "1.5px solid rgba(249,112,40,0.08)",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(18px)", borderRadius: 28, border: "2px solid rgba(249,112,40,0.12)", overflow: "hidden", boxShadow: "0 12px 40px rgba(249,112,40,0.08),0 2px 8px rgba(0,0,0,0.04)" }}>
      <div style={{ background: "linear-gradient(135deg,#f97028,#f489a3)", padding: "14px 18px", textAlign: "center" }}>
        <div style={{ fontSize: "1.3rem", marginBottom: 2 }}>⏳</div>
        <div style={{ fontFamily: "'Righteous', cursive", fontSize: "1.05rem", color: "#fff" }}>{title}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.85)", marginTop: 3, letterSpacing: 1, textTransform: "uppercase" }}>{subtitle}</div>
      </div>
      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
          {[
            { val: pad(time.d), lbl: "Days"  },
            { val: pad(time.h), lbl: "Hrs"   },
            { val: pad(time.m), lbl: "Min"   },
            { val: pad(time.s), lbl: "Sec", tick: true },
          ].map(({ val, lbl, tick }) => (
            <div key={lbl} style={unitStyle}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: "linear-gradient(90deg,#f97028,#f3a20f)" }} />
              <div
                style={{
                  fontFamily: "'Righteous', cursive",
                  fontSize: "clamp(1.5rem,2.5vw,2rem)",
                  color: "#2a1f14",
                  lineHeight: 1,
                  marginBottom: 3,
                  transition: "transform 0.35s ease, color 0.35s ease",
                  transform: tick && tickSec ? "scale(1.12)" : "scale(1)",
                }}
              >
                {val}
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#8a7a6a", letterSpacing: 1.5, textTransform: "uppercase" }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: 12, background: "rgba(249,112,40,0.05)", borderRadius: 10, border: "1px dashed rgba(249,112,40,0.18)" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#f97028", fontWeight: 600 }}>{msg}</span>
        </div>
        {info && info.title === "Registration Closes In" && (
          <div style={{ marginTop: 12, height: 4, background: "rgba(249,112,40,0.08)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${regPct}%`, background: "linear-gradient(90deg,#f97028,#f3a20f)", borderRadius: 4, transition: "width 1s ease", position: "relative" }}>
              <div style={{ position: "absolute", right: -1, top: -3, width: 8, height: 8, borderRadius: "50%", background: "#f3a20f", boxShadow: "0 0 6px rgba(243,162,15,0.5)" }} />
            </div>
          </div>
        )}
        <MiniCalendar />
      </div>
    </div>
  );
}

interface AboutCardProps {
  id: number;
  badge: string;
  badgeColor: string;
  imgAlt: string;
  imgBg: string;
  number: string;
  title: string;
  desc: string;
  tags: string[];
  style?: React.CSSProperties;
}

function AboutCard({ badge, badgeColor, imgBg, imgAlt, number, title, desc, tags, style }: AboutCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        position: "absolute",
        width: 360,
        maxWidth: "90vw",
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(16px)",
        borderRadius: 28,
        border: "1.5px solid rgba(249,112,40,0.1)",
        boxShadow: "0 12px 40px rgba(249,112,40,0.08),0 2px 8px rgba(0,0,0,0.04)",
        overflow: "hidden",
        willChange: "transform,opacity",
        transformStyle: "preserve-3d",
        cursor: "default",
        transition: "box-shadow 0.4s ease",
        transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        padding: "26px 24px", // ✅ added padding since top section removed
        ...style,
      }}
    >
      {/* CONTENT ONLY */}

      <div style={{
        fontFamily: "'Righteous', cursive",
        fontSize: "2.6rem",
        background: "linear-gradient(135deg,#f97028,#f3a20f)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        lineHeight: 1,
        marginBottom: 6,
        opacity: 0.25
      }}>
        {number}
      </div>

      <h2 style={{
        fontFamily: "'Righteous', cursive",
        fontSize: "1.25rem",
        color: "#2a1f14",
        marginBottom: 10,
        lineHeight: 1.3
      }}>
        {title}
      </h2>

      <p style={{
        fontSize: "0.9rem",
        color: "#5a4a3a",
        lineHeight: 1.65
      }}>
        {desc}
      </p>

      
    </div>
  );
}

interface TlEventProps {
  title: string;
  date: string;
  desc: string;
  status: "completed" | "active" | "upcoming";
  statusLabel: string;
  progress?: number;
  revealed: boolean;
}

function TlEvent({ title, date, desc, status, statusLabel, progress, revealed }: TlEventProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const dotStyle: React.CSSProperties =
    status === "completed"
      ? { background: "#f97028", borderColor: "#f97028", boxShadow: "0 0 10px rgba(249,112,40,0.35)" }
      : status === "active"
      ? { background: "#f3a20f", borderColor: "#f3a20f", boxShadow: "0 0 18px rgba(243,162,15,0.5)", animation: "pulse-node 2s ease-in-out infinite" }
      : { background: "#F3ecd2", borderColor: "rgba(249,112,40,0.25)" };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    marginBottom: 28,
    padding: "20px 22px",
    background: status === "active" ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.55)",
    backdropFilter: "blur(10px)",
    borderRadius: 22,
    border: status === "active" ? "1.5px solid #f3a20f" : status === "completed" ? "1.5px solid rgba(249,112,40,0.15)" : "1.5px solid rgba(249,112,40,0.08)",
    boxShadow: status === "active" ? "0 8px 32px rgba(243,162,15,0.12)" : "0 4px 16px rgba(0,0,0,0.03)",
    opacity: !revealed ? 0 : status === "upcoming" ? 0.5 : 1,
    transform: revealed
      ? `scale(${status === "active" ? 1.02 : 1}) translateZ(${status === "active" ? 10 : 0}px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
      : "translateX(-40px) scale(0.95)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
    transformStyle: "preserve-3d",
    willChange: "transform,opacity",
    filter: status === "upcoming" ? "blur(0.3px)" : "none",
  };

  const statusBg =
    status === "completed" ? "rgba(249,112,40,0.1)" :
    status === "active"    ? "rgba(243,162,15,0.12)" : "rgba(0,0,0,0.05)";
  const statusColor =
    status === "completed" ? "#f97028" :
    status === "active"    ? "#c98a00" : "#8a7a6a";

  return (
    <div
      ref={ref}
      style={cardStyle}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 6, y: -((e.clientY - r.top) / r.height - 0.5) * 6 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div style={{ position: "absolute", left: -30, top: 24, width: 13, height: 13, borderRadius: "50%", border: "3px solid", zIndex: 2, transition: "all 0.4s ease", ...dotStyle }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4, gap: 8 }}>
        <h3 style={{ fontFamily: "'Righteous', cursive", fontSize: "1.05rem", color: "#2a1f14" }}>{title}</h3>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", padding: "2px 9px", borderRadius: 50, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap", background: statusBg, color: statusColor, animation: status === "active" ? "pulse-badge 2s ease-in-out infinite" : "none" }}>{statusLabel}</span>
      </div>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#8a7a6a", marginBottom: 6 }}>{date}</p>
      <p style={{ fontSize: "0.85rem", color: "#5a4a3a", lineHeight: 1.55 }}>{desc}</p>
      {progress !== undefined && (
        <div style={{ marginTop: 10, height: 4, background: "rgba(249,112,40,0.08)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#f97028,#f3a20f)", borderRadius: 4, position: "relative", transition: "width 1s ease" }}>
            <div style={{ position: "absolute", right: -1, top: -3, width: 8, height: 8, borderRadius: "50%", background: "#f3a20f", boxShadow: "0 0 6px rgba(243,162,15,0.5)" }} />
          </div>
        </div>
      )}
    </div>
  );
}


export default function About() {
  const [cardPhase, setCardPhase] = useState(0);
  const [revealedEvents, setRevealedEvents] = useState<boolean[]>([false, false, false, false, false, false]);
  const [tlFillPct, setTlFillPct] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const aboutRef    = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const tlTrackRef  = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const aboutEl = aboutRef.current;

    if (aboutEl) {
      const { top, height } = aboutEl.getBoundingClientRect();

      // ✅ FIXED SAFE CALCULATION (important for mobile)
      const scrollRange = height - window.innerHeight;
      const progress = scrollRange > 0 ? (-top) / scrollRange : 0;
      const p = Math.max(0, Math.min(1, progress));

      if (p > 0.66) setCardPhase(2);
      else if (p > 0.33) setCardPhase(1);
      else setCardPhase(0);
    }

    const tlEl = timelineRef.current;
    if (tlEl) {
      const { top, height } = tlEl.getBoundingClientRect();

      const scrollRange = height - window.innerHeight;
      const raw = scrollRange > 0 ? (-top) / scrollRange : 0;
      const p   = Math.max(0, Math.min(1, raw));

      if (raw >= 0 && raw <= 1.05) {
        setTlFillPct(p * 100);

        const total = 6;
        setRevealedEvents((prev) => {
          const next = [...prev];
          for (let i = 0; i < total; i++) {
            if (p > (i / total) * 0.85) next[i] = true;
          }
          return next;
        });

        const track = tlTrackRef.current;
        if (track) {
          const max = track.scrollHeight - track.clientHeight;
          if (max > 0) track.scrollTop = p * max;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const cardStyles = (() => {
    if (isMobile) {
      if (cardPhase === 0) return [
        { x: 0,    y: 0,  scale: 1,    opacity: 1,    z: 3, blur: 0  },
        { x: 20,   y: 10, scale: 0.9,  opacity: 0,    z: 2, blur: 0  },
        { x: 40,   y: 20, scale: 0.8,  opacity: 0,    z: 1, blur: 0  },
      ];
      if (cardPhase === 1) return [
        { x: -40,  y: 15, scale: 0.85, opacity: 0.3,  z: 1, blur: 2  },
        { x: 0,    y: 0,  scale: 1,    opacity: 1,    z: 3, blur: 0  },
        { x: 40,   y: 20, scale: 0.9,  opacity: 0.2,  z: 2, blur: 0  },
      ];
      return [
        { x: -50,  y: 25, scale: 0.75, opacity: 0.1,  z: 1, blur: 3  },
        { x: -30,  y: 15, scale: 0.85, opacity: 0.3,  z: 2, blur: 1.5 },
        { x: 0,    y: 0,  scale: 1,    opacity: 1,    z: 3, blur: 0  },
      ];
    }
    if (cardPhase === 0) return [
      { x: 0,    y: 0,  scale: 1,    opacity: 1,    z: 3, blur: 0  },
      { x: 80,   y: 20, scale: 0.88, opacity: 0,    z: 2, blur: 0  },
      { x: 160,  y: 40, scale: 0.76, opacity: 0,    z: 1, blur: 0  },
    ];
    if (cardPhase === 1) return [
      { x: -200, y: 10, scale: 0.82, opacity: 0.4,  z: 1, blur: 2  },
      { x: 0,    y: 0,  scale: 1,    opacity: 1,    z: 3, blur: 0  },
      { x: 120,  y: 30, scale: 0.84, opacity: 0.25, z: 2, blur: 0  },
    ];
    return [
      { x: -280, y: 20, scale: 0.7,  opacity: 0.15, z: 1, blur: 4  },
      { x: -160, y: 15, scale: 0.82, opacity: 0.35, z: 2, blur: 1.5 },
      { x: 0,    y: 0,  scale: 1.03, opacity: 1,    z: 3, blur: 0  },
    ];
  })();

  const cardData = [
    { id: 0, badge: "Explore", badgeColor: "orange" as const, imgBg: "linear-gradient(135deg,rgba(249,112,40,0.2),rgba(243,162,15,0.2))", imgAlt: "☕", number: "01", title: "What is this Hackathon?", desc: "A 36-hour creative coding playground where indie developers, designers, and dreamers come together to build something extraordinary. No boring lectures — just pure creation, retro vibes, and good coffee. ☕", tags: ["36 hrs","open source","indie"] },
    { id: 1, badge: "Join In", badgeColor: "pink"   as const, imgBg: "linear-gradient(135deg,rgba(244,137,163,0.2),rgba(249,112,40,0.2))", imgAlt: "🎁", number: "02", title: "Why Participate?",          desc: "Meet creative minds, learn cutting-edge skills, win amazing prizes, and add a stunning project to your portfolio. Plus, you'll get exclusive mentorship from industry leaders and free swag! 🎁",              tags: ["mentors","prizes","networking"] },
    { id: 2, badge: "Unique",  badgeColor: "yellow" as const, imgBg: "linear-gradient(135deg,rgba(243,162,15,0.2),rgba(244,137,163,0.2))", imgAlt: "🎮", number: "03", title: "What Makes It Unique?",      desc: "An indie retro aesthetic, no-judgment zone, creative freedom, and a community-first approach. We don't just build apps — we craft experiences. Think pixel art meets modern code. 🎮",                            tags: ["retro vibes","creative","community"] },
  ];

  const tlEvents = [
    { title: "📝 Registration Open",    date: "March 15, 2026",          desc: "The gates are open! Register your team and secure your spot at DevHack.",                                       status: "completed" as const, statusLabel: "✓ Done",          progress: 100 },
    { title: "🔒 Registration Closes",  date: "April 10, 2026",          desc: "Last call! Lock in your team before the deadline. Don't miss out!",                                              status: "active"    as const, statusLabel: "⏳ Live",          progress: calcRegProgress() },
    { title: "🚀 Hackathon Kickoff",    date: "April 15, 2026",          desc: "Let the hacking begin! 36 hours of pure coding creativity and innovation.",                                      status: "upcoming"  as const, statusLabel: "Coming Soon 👀" },
    { title: "🧑‍🏫 Mentorship Phase",  date: "April 15–16, 2026",       desc: "Get guidance from industry experts. Office hours, workshops, and 1-on-1 sessions.",                              status: "upcoming"  as const, statusLabel: "Coming Soon 👀" },
    { title: "📤 Submission Deadline",  date: "April 17, 2026 — 5:00 PM",desc: "Time's up! Submit your project, demo video, and presentation deck.",                                             status: "upcoming"  as const, statusLabel: "Coming Soon 👀" },
    { title: "🏆 Results Announcement", date: "April 20, 2026",          desc: "The moment of truth! Winners announced live. Prizes, glory, and bragging rights!",                              status: "upcoming"  as const, statusLabel: "Stay Tuned…"    },
  ];

  return (
    <div ref={aboutRef} id="about" className="bg-[#f3ecd2]">

   {/* ✅ FIX: give enough scroll space on mobile */}
  
      <style>{`
        @keyframes blink-caret { from,to{border-color:transparent;} 50%{border-color:#f97028;} }
        @keyframes pulse-node { 0%,100%{box-shadow:0 0 8px rgba(243,162,15,0.3);transform:scale(1);} 50%{box-shadow:0 0 22px rgba(243,162,15,0.6);transform:scale(1.2);} }
        @keyframes pulse-badge { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
      `}</style>

      <div style={{ position: "relative", height: isMobile ? "320vh" : "400vh" }}>
 <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            // small mobile spacing tweak
            paddingTop: isMobile ? 80 : 50,
            paddingBottom: isMobile ? 40 : 0,
          }}
        >
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%,rgba(249,112,40,0.06) 0%,transparent 60%),radial-gradient(ellipse at 70% 60%,rgba(244,137,163,0.06) 0%,transparent 60%),radial-gradient(ellipse at 50% 80%,rgba(243,162,15,0.05) 0%,transparent 60%)" }} />
          </div>

          <div style={{ position:"relative",zIndex:2,width:"100%",maxWidth:1200,padding:"0 40px",display:"flex",flexDirection:"column",alignItems:"center" }}>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span style={{ display:"inline-block",fontFamily:"'Space Mono',monospace",fontSize:"0.8rem",color:"#f97028",background:"rgba(249,112,40,0.08)",padding:"5px 16px",borderRadius:50,border:"1.5px solid rgba(249,112,40,0.2)",letterSpacing:2,textTransform:"uppercase",marginBottom:14 }}>// discover the vibe</span>
              <h1 style={{ fontFamily:"'Righteous',cursive",fontSize:"clamp(2.4rem,5vw,3.8rem)",color:"#2a1f14",lineHeight:1.15,marginBottom:8 }}>
                About <span style={{ background:"linear-gradient(135deg,#f97028,#f489a3)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>DevHack</span>
              </h1>
              <div style={{ minHeight:28,marginTop:10 }}>
                <Typewriter />
              </div>
            </div>

            <div style={{ position:"relative",width:"100%",height:420,perspective:1200,display:"flex",alignItems:"center",justifyContent:"center" }}>
              {cardData.map((card, i) => {
                const cs = cardStyles[i];
                return (
                  <AboutCard
                    key={card.id}
                    {...card}
                    style={{
                      transform: `translateX(${cs.x}px) translateY(${cs.y}px) scale(${cs.scale})`,
                      opacity: cs.opacity,
                      zIndex: cs.z,
                      filter: cs.blur > 0 ? `blur(${cs.blur}px)` : "none",
                      transition: "transform 0.6s ease, opacity 0.6s ease, filter 0.6s ease",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={timelineRef}
        id="timeline"
        style={{ position:"relative", height: isMobile ? "auto" : "150vh", scrollMarginTop: 120 }}
      >
        <div style={{ 
          position: isMobile ? "relative" : "sticky", 
          top: 0, 
          height: isMobile ? "auto" : "100vh", 
          overflow: isMobile ? "visible" : "hidden", 
          display: "flex", 
          flexDirection: "column", 
          paddingTop: 70,
          paddingBottom: isMobile ? 40 : 0
        }}>
          <div style={{ textAlign:"center",padding:"0 40px 12px" }}>
            <span style={{ display:"inline-block",fontFamily:"'Space Mono',monospace",fontSize:"0.8rem",color:"#f97028",background:"rgba(249,112,40,0.08)",padding:"5px 16px",borderRadius:50,border:"1.5px solid rgba(249,112,40,0.2)",letterSpacing:2,textTransform:"uppercase",marginBottom:14 }}>// the journey ahead</span>
            <h1 style={{ fontFamily:"'Righteous',cursive",fontSize:"clamp(2.4rem,5vw,3.8rem)",color:"#2a1f14",lineHeight:1.15,marginBottom:8 }}>
              Hackathon <span style={{ background:"linear-gradient(135deg,#f97028,#f489a3)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Timeline</span>
            </h1>
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-32 items-start flex-1 min-height-0 overflow-visible">
            <div ref={tlTrackRef} style={{ position:"relative",paddingLeft:36,paddingBottom:80,overflowY:"auto",height:"100%",scrollbarWidth:"none" }}>
              <div style={{ position:"absolute",top:0,left:13,width:3,height:"100%",background:"rgba(249,112,40,0.12)",borderRadius:3 }} />
              <div style={{ position:"absolute",top:0,left:13,width:3,borderRadius:3,background:"linear-gradient(180deg,#f97028,#f489a3,#f3a20f)",zIndex:1,boxShadow:"0 0 14px rgba(249,112,40,0.25)",height:`${tlFillPct}%`,transition:"height 0.15s linear" }} />

              {tlEvents.map((ev, i) => (
                <TlEvent
                  key={i}
                  {...ev}
                  revealed={revealedEvents[i]}
                />
              ))}
            </div>

            <div style={{ height:"100%",overflowY:"auto",paddingRight:4 }}>
              <CountdownPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

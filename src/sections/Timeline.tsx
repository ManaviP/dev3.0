import { useState, useEffect, useRef, useCallback } from "react";

const REG_DEADLINE = new Date("2026-04-10T23:59:59");

type TimelineStatus = "done" | "active" | "upcoming";

interface TimelineEvent {
  title: string;
  date: string;
  desc: string;
  status: TimelineStatus;
}

interface TlEventProps extends TimelineEvent {
  revealed: boolean;
}

const EVENTS: TimelineEvent[] = [
  { title: "Registration Open", date: "March 15", desc: "Start registering", status: "done" },
  { title: "Registration Close", date: "April 10", desc: "Last chance!", status: "active" },
  { title: "Hackathon Start", date: "April 15", desc: "Begin coding", status: "upcoming" },
  { title: "Results", date: "April 20", desc: "Winners announced", status: "upcoming" },
];

function calcRegProgress() {
  const now = new Date();
  const start = new Date("2026-07-25T00:00:00");
  const total = REG_DEADLINE.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

function TlEvent({ title, date, desc, status, revealed }: TlEventProps) {
  const statusClass =
    status === "done"
      ? "border-orange/20 bg-white/75"
      : status === "active"
      ? "border-yellow/40 bg-white/85"
      : "border-orange/10 bg-white/60";

  const badgeClass =
    status === "done"
      ? "bg-orange/15 text-orange"
      : status === "active"
      ? "bg-yellow/20 text-yellow"
      : "bg-black/5 text-black/45";

  const badgeText =
    status === "done" ? "Done" : status === "active" ? "Live" : "Upcoming";

  return (
    <div
      className={`mb-7 rounded-[22px] border px-5.5 py-5 backdrop-blur-sm transition-all duration-700 ${statusClass} ${
        revealed ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
      }`}
    >
      <div className="mb-1 flex items-center justify-between gap-3">
        <h3 className="font-display text-base text-[16px]">{title}</h3>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
          {badgeText}
        </span>
      </div>
      <p className="mb-1 text-xs text-black/50">{date}</p>
      <p className="text-sm text-[#5a4a3a]">{desc}</p>
    </div>
  );
}

function CountdownPanel() {
  const [progress, setProgress] = useState(calcRegProgress());
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setProgress(calcRegProgress()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${progress}%`;
    }
  }, [progress]);

  return (
    <div className="rounded-2xl border border-orange/15 bg-white p-5 shadow-sm">
      <h3 className="mb-2.5 font-display text-base text-[16px]">Registration Progress</h3>
      <div className="h-1.5 overflow-hidden rounded bg-black/10">
        <div ref={progressFillRef} className="h-full w-0 rounded bg-orange transition-[width] duration-300" />
      </div>
      <p className="mt-2 text-xs text-black/50">{Math.round(progress)}% complete</p>
    </div>
  );
}

export default function TimelineSection() {
  const [revealed, setRevealed] = useState<boolean[]>(Array(EVENTS.length).fill(false));
  const [progress, setProgress] = useState(0);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const trackFillRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    const el = timelineRef.current;
    if (!el) return;

    const { top, height } = el.getBoundingClientRect();
    const scrollRange = height - window.innerHeight;
    const rawProgress = scrollRange > 0 ? (-top) / scrollRange : 0;
    const p = Math.max(0, Math.min(1, rawProgress));

    setProgress(p * 100);

    setRevealed((prev) => {
      const next = [...prev];
      EVENTS.forEach((_, i) => {
        if (p > i / EVENTS.length) next[i] = true;
      });
      return next;
    });
  }, []);

  useEffect(() => {
    if (trackFillRef.current) {
      trackFillRef.current.style.height = `${progress}%`;
    }
  }, [progress]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section ref={timelineRef} className="relative h-[150vh] pt-20">
      <h1 className="mb-10 text-center font-display text-4xl text-[#2a1f14]">Hackathon Timeline</h1>

      <div className="grid gap-10 px-4 md:grid-cols-[2fr_1fr] md:px-8">
        {/* TIMELINE */}
        <div className="relative pl-7.5">
          <div className="absolute left-2.5 top-0 h-full w-0.75 rounded bg-black/10" />
          <div
            ref={trackFillRef}
            className="absolute left-2.5 top-0 h-0 w-0.75 rounded bg-orange transition-[height] duration-150"
          />

          {EVENTS.map((e, i) => (
            <TlEvent key={i} {...e} revealed={revealed[i]} />
          ))}
        </div>

        {/* SIDE PANEL */}
        <CountdownPanel />
      </div>
    </section>
  );
}
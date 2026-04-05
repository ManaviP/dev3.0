import { useEffect, useRef, useState } from "react";

export default function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const { top, height } = ref.current.getBoundingClientRect();
      const span = Math.max(1, height - window.innerHeight);
      const raw = (-top) / span;
      const p = Math.max(0, Math.min(1, raw));

      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} style={{ height: 400, position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "visible", 
        }}
      >
        <h1 className="text-[#f3ecd2] text-4xl mb-10">Timeline</h1>

        <div style={{ marginTop: 50 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="text-[#f3ecd2]/80 text-xl"
              style={{
                opacity: progress > i * 0.15 ? 1 : 0,
                transform: progress > i * 0.15 ? "translateX(0)" : "translateX(-40px)",
                transition: "all 0.6s ease",
                marginBottom: 20,
              }}
            >
              Event {i}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

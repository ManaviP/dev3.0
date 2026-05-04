import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DevHackHeroCompact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoFrameRef = useRef<HTMLDivElement | null>(null);
  const dateStickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const videoFrame = videoFrameRef.current;
    const sticker = dateStickerRef.current;

    if (!section || !videoFrame || !sticker) return;

    const isMobile = window.innerWidth < 768;

    const context = gsap.context(() => {
      gsap.set(videoFrame, {
        opacity: 1,
        scale: 1,
        top: isMobile ? "75px" : "9px",
        height: isMobile ? "auto" : "100vh",
        width: "100vw",
        left: 0,
        xPercent: 0,
        borderRadius: 0,
      });

      gsap.set(sticker, {
        opacity: 1,
        y: 0,
        top: isMobile ? "calc(75px + 56vw)" : "auto",
        bottom: isMobile ? "auto" : "2rem",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
        },
      });

      timeline
        .to(
          videoFrame,
          {
            scale: isMobile ? 1 : 1.8,
            opacity: isMobile ? 1 : 0,
            duration: 2.0,
          },
          0
        )
        .to(
          sticker,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          0
        );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative h-[200vh] md:h-[350vh] bg-cream text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cream" />

        <div ref={videoFrameRef} className="absolute inset-x-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto md:h-full md:object-cover"
          >
            <source src="/assets/devhack3.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Date Sticker */}
        <div
          ref={dateStickerRef}
          className="absolute inset-x-0 bottom-10 flex justify-center z-20 pointer-events-none"
        >
          <div className="hero-date-badge text-center whitespace-nowrap">
            SEPTEMBER 18TH &amp; 19TH, 2026
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import photos from "./photos";
import BlurText from "../components/BlurText";

const offsetCount = Math.floor(photos.length / 4);
const col1Photos = photos;
const col2Photos = [...photos.slice(offsetCount), ...photos.slice(0, offsetCount)];
const col3Photos = [...photos.slice(offsetCount * 2), ...photos.slice(0, offsetCount * 2)];
const col4Photos = [...photos.slice(offsetCount * 3), ...photos.slice(0, offsetCount * 3)];

const Column = ({ reverse = false, speed = 40, offset = false, className = "", photoSubset }: { reverse?: boolean; speed?: number; offset?: boolean; className?: string; photoSubset: typeof photos }) => {
  const colPhotos = [...photoSubset, ...photoSubset];

  return (
    <div className={`h-full overflow-hidden w-full relative ${className}`}>
      <div
        className={`flex flex-col gap-5 w-full ${reverse ? 'animate-scroll-y-reverse' : 'animate-scroll-y'}`}
        style={{ animationDuration: `${speed}s`, paddingTop: offset ? '120px' : '0' }}
      >
        {[1, 2].map(key => (
          <div key={key} className="flex flex-col gap-5 w-full px-[10px]">
            {colPhotos.map((p, i) => (
              <img
                key={i}
                src={p.src}
                loading="lazy"
                className="w-full h-auto object-cover rounded-xl transition-opacity duration-300"
                alt=""
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DevHackHeroCompact() {
  const [triggerBlur, setTriggerBlur] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const baseLayerRef = useRef<HTMLDivElement | null>(null);
  const imagesFrameRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const videoFrameRef = useRef<HTMLDivElement | null>(null);
  const dateStickerRef = useRef<HTMLDivElement | null>(null);
  const memoryTitleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const baseLayer = baseLayerRef.current;
    const imagesFrame = imagesFrameRef.current;
    const reveal = revealRef.current;
    const videoFrame = videoFrameRef.current;
    const memoryTitle = memoryTitleRef.current;

    if (!section || !baseLayer || !imagesFrame || !reveal || !videoFrame || !dateStickerRef.current || !memoryTitle) {
      return;
    }
    const sticker = dateStickerRef.current;

    const initialize = async () => {
      const context = gsap.context(() => {
        const isMobile = window.innerWidth < 768;

        gsap.set(imagesFrame, {
          opacity: 0,
          top: 0,
          height: "100vh",
        });

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

        gsap.set(baseLayer, { opacity: 1 });
        gsap.set(reveal, {
          opacity: 1,
          top: isMobile ? "calc(75px + 56vw + 60px)" : "100vh"
        });
        gsap.set(imagesFrame, {
          opacity: 0,
        });
        gsap.set(memoryTitle, {
          opacity: 0,
          y: 40,
          scale: 0.95,
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
            reveal,
            {
              top: isMobile ? "75px" : "0",
              duration: isMobile ? 4.0 : 1.5,
              ease: "power2.inOut",
            },
            0.5
          )
          .to(
            imagesFrame,
            {
              opacity: isMobile ? 0.7 : 0.8,
              duration: 1.5,
            },
            isMobile ? 0.8 : 3.0
          )
          .to(
            memoryTitle,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
              onStart: () => setTriggerBlur(true),
              onReverseComplete: () => setTriggerBlur(false),
            },
            isMobile ? 1.0 : 3.2
          )
          .to(
            {},
            { duration: 1 }
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

      const onResize = () => {
        // Handle resize if needed
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        context.revert();
      };
    };

    initialize();

    return () => {
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative h-[200vh] md:h-[700vh] bg-cream text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={baseLayerRef} className="absolute inset-0 bg-cream" />

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

        <div ref={revealRef} className="absolute inset-x-0 min-h-screen z-10 pointer-events-none">

          {/* Vertical Scrolling Gallery Background */}
          <div ref={imagesFrameRef} className="absolute inset-0 pointer-events-none opacity-0 z-0 overflow-hidden bg-[#0a0a0a]">
            <div className="grid grid-cols-2 md:grid-cols-4 w-full h-full bg-[#0a0a0a]">
              <Column speed={120} photoSubset={col1Photos} />
              <Column reverse speed={140} offset photoSubset={col2Photos} />
              <Column speed={130} className="hidden md:block" photoSubset={col3Photos} />
              <Column reverse speed={150} offset className="hidden md:block" photoSubset={col4Photos} />
            </div>
            <div className="hero-images-overlay absolute inset-0" />
          </div>

          {/* Memories Title Overlay — positioned near top */}
          <div ref={memoryTitleRef} className="relative z-10 text-center pointer-events-none px-4 pt-40 md:pt-36">
            <BlurText
              text="Memories"
              delay={150}
              animateBy="letters"
              direction="top"
              className="text-white font-display text-6xl md:text-7xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] justify-center"
              animateTrigger={triggerBlur}
            />
          </div>
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
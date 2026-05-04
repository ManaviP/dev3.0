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

const Column = ({
  reverse = false,
  speed = 40,
  offset = false,
  className = "",
  photoSubset,
}: {
  reverse?: boolean;
  speed?: number;
  offset?: boolean;
  className?: string;
  photoSubset: typeof photos;
}) => {
  const colPhotos = [...photoSubset, ...photoSubset];

  return (
    <div className={`h-full overflow-hidden w-full relative ${className}`}>
      <div
        className={`flex flex-col gap-5 w-full ${reverse ? "animate-scroll-y-reverse" : "animate-scroll-y"}`}
        style={{ animationDuration: `${speed}s`, paddingTop: offset ? "120px" : "0" }}
      >
        {[1, 2].map((key) => (
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

export default function Memories() {
  const [triggerBlur, setTriggerBlur] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const imagesFrameRef = useRef<HTMLDivElement | null>(null);
  const memoryTitleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const imagesFrame = imagesFrameRef.current;
    const memoryTitle = memoryTitleRef.current;

    if (!section || !imagesFrame || !memoryTitle) return;

    const context = gsap.context(() => {
      gsap.set(imagesFrame, { opacity: 0 });
      gsap.set(memoryTitle, { opacity: 0, y: 40, scale: 0.95 });

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
          imagesFrame,
          { opacity: 1, duration: 1.5 },
          0
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
          0.2
        )
        .to({}, { duration: 1 });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative h-[350vh] bg-[#0a0a0a] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Scrolling photo gallery */}
        <div
          ref={imagesFrameRef}
          className="absolute inset-0 opacity-0 z-0 overflow-hidden bg-[#0a0a0a]"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-full">
            <Column speed={120} photoSubset={col1Photos} />
            <Column reverse speed={140} offset photoSubset={col2Photos} />
            <Column speed={130} className="hidden md:block" photoSubset={col3Photos} />
            <Column reverse speed={150} offset className="hidden lg:block" photoSubset={col4Photos} />
          </div>
          <div className="hero-images-overlay absolute inset-0" />
        </div>

        {/* "Memories" title overlay */}
        <div
          ref={memoryTitleRef}
          className="relative z-10 text-center pointer-events-none px-4 pt-40 md:pt-36"
        >
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
    </section>
  );
}

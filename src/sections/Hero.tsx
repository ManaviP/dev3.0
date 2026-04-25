import { useEffect, useRef } from "react";


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const images: string[] = [
  "/assets/hero1.jpg",
  "/assets/hero2.jpg",
  "/assets/hero3.jpg",
  "/assets/hero4.jpg",
  "/assets/hero5.jpg",
  "/assets/hero6.jpg",
];

type RowProps = {
  reverse?: boolean;
  speed?: string;
  imageClassName?: string;
};

const speedClassMap: Record<string, string> = {
  "18s": "hero-scroll-speed-18",
  "20s": "hero-scroll-speed-20",
  "24s": "hero-scroll-speed-24",
  "25s": "hero-scroll-speed-25",
};

const Row = ({ reverse = false, speed = "25s" }: RowProps) => {
  const speedClass = speedClassMap[speed] ?? "hero-scroll-speed-25";

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex gap-1 sm:gap-3 md:gap-4 w-max ${reverse ? "hero-scroll-row-reverse" : "hero-scroll-row"
          } ${speedClass}`}
      >
        {[...images, ...images].map((src, i) => {
          const sizeVariants = [
            "h-[120px] sm:h-[110px] md:h-[140px] lg:h-[170px]",
            "h-[140px] sm:h-[130px] md:h-[160px] lg:h-[200px]",
            "h-[130px] sm:h-[120px] md:h-[150px] lg:h-[180px]",
          ];

          const randomSize = sizeVariants[i % sizeVariants.length];

          return (
            <img
              key={i}
              src={src}
              alt=""
              className={`${randomSize} w-auto object-cover rounded-md sm:rounded-lg shrink-0`}
            />
          );
        })}
      </div>
    </div>
  );
};
export default function DevHackHeroCompact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const baseLayerRef = useRef<HTMLDivElement | null>(null);
  const imagesFrameRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const videoFrameRef = useRef<HTMLDivElement | null>(null);
  const dateStickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const baseLayer = baseLayerRef.current;
    const imagesFrame = imagesFrameRef.current;
    const reveal = revealRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const videoFrame = videoFrameRef.current;

    if (!section || !baseLayer || !imagesFrame || !reveal || !card1 || !card2 || !videoFrame || !dateStickerRef.current) {
      return;
    }
    const sticker = dateStickerRef.current;



    const initialize = async () => {
      const context = gsap.context(() => {
        const isMobile = window.innerWidth < 768;

        // MOBILE FIX
        if (isMobile) {
          gsap.set(imagesFrame, {
            opacity: 1,
            position: "relative",
            height: "auto",
          });

          gsap.set(videoFrame, {
            opacity: 1,
            scale: 1,
            position: "relative",
            height: "auto",
            width: "100%",
            borderRadius: 0,
          });

          gsap.set(baseLayer, { opacity: 1 });

          gsap.set(reveal, {
            opacity: 1,
            position: "relative",
            marginTop: "1rem",
          });

          gsap.set([card1, card2], {
            opacity: 1,
            y: 0,
          });

          gsap.set(sticker, {
            opacity: 1,
            y: 0,
            position: "relative",
            marginTop: "1rem",
            marginBottom: "1rem",
          });

          return;
        }

        // DESKTOP / TABLET (UNCHANGED)
        gsap.set(imagesFrame, {
          opacity: 0,
          top: 0,
          height: "100vh",
        });

        gsap.set(videoFrame, {
          opacity: 1,
          scale: 1,
          top: "9px",
          height: "100vh",
          width: "100vw",
          left: 0,
          xPercent: 0,
          borderRadius: 0,
        });

        gsap.set(baseLayer, { opacity: 1 });
        gsap.set(reveal, {
          opacity: 1,
          top: "100vh",
        });
        gsap.set(imagesFrame, {
          opacity: 0,
        });
        gsap.set([card1, card2], {
          opacity: 0,
          y: 50,
        });
        gsap.set(sticker, {
          opacity: 1,
          y: 0,
          bottom: "2rem",
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
          .to(videoFrame, {
            scale: 1.8,
            opacity: 0,
            duration: 2.0,
          }, 1.5)
          .to(reveal, {
            top: "0",
            duration: 1.5,
            ease: "power2.inOut",
          }, 0.5)
          .to(imagesFrame, {
            opacity: 0.8,
            duration: 1.0,
          }, 1.5)
          .to(card1, {
            opacity: 1,
            y: 0,
            duration: 1.0,
          }, 1.8)
          .to(card2, {
            opacity: 1,
            y: 0,
            duration: 1.0,
          }, 2.0)
          .to({}, { duration: 1 })
          .to(sticker, {
            opacity: 0,
            y: 20,
            duration: 0.5,
          }, 0);
      }, section);

      return () => context.revert();
    };

    initialize();

    return () => { };
  }, []);

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`relative bg-cream text-white ${!isMobile ? "md:h-[300vh]" : ""}`}
    >
      <div
        className={`${!isMobile ? "sticky md:sticky top-0 h-screen overflow-hidden" : ""}`}
      >
        <div ref={baseLayerRef} className="absolute inset-0 bg-cream" />

        <div
          ref={videoFrameRef}
          className={`${!isMobile
            ? "absolute inset-x-0 z-0 overflow-hidden"
            : "relative w-full z-0 overflow-hidden"
            }`}
        >
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

        <div
          ref={revealRef}
          className={`${!isMobile
            ? "absolute inset-x-0 min-h-screen z-10 flex flex-col md:flex-row items-center justify-start md:justify-center gap-4 md:gap-6 px-6 pointer-events-none md:pointer-events-none pb-10 md:pb-20 pt-24 md:pt-0"
            : "relative z-10 flex flex-col gap-4 px-6 pb-10 pt-6"
            }`}
        >
          {/* Restricted Scrolling Background */}
          <div
            ref={imagesFrameRef}
            className={`${!isMobile
              ? "absolute inset-0 pointer-events-none opacity-0 z-0 overflow-hidden"
              : "relative w-full z-0 overflow-hidden"
              }`}
          >
            <div className="h-full grid grid-rows-3 gap-1 sm:gap-3 p-1 sm:p-3 opacity-100">
              <Row speed="18s" />
              <Row reverse speed="24s" />
              <Row speed="20s" />
              <div className="block sm:hidden">
                <Row reverse speed="22s" />
              </div>
            </div>
            <div className="hero-images-overlay absolute inset-0 bg-black/40 pointer-events-none" />
          </div>

          <div
            ref={card1Ref}
            className="w-full max-w-90 bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-[28px] border border-orange/10 shadow-2xl relative z-10 pt-1 pointer-events-auto"
          >
            <div className="text-orange font-bold text-4xl mb-4 opacity-30">01</div>
            <h2 className="text-[#2a1f14] font-display text-2xl mb-4">What is DevHack?</h2>
            <p className="text-[#5a4a3a] text-sm leading-relaxed">
              DSU DEVHACK 2026 is a national-level hackathon pushing the boundaries of innovation in AI, ML, IoT, Blockchain, Cybersecurity, and Cloud
            </p>
          </div>
          <div
            ref={card2Ref}
            className="w-full max-w-90 bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-[28px] border border-pink/10 shadow-2xl relative z-10 pointer-events-auto"
          >
            <div className="text-pink font-bold text-4xl mb-4 opacity-30">02</div>
            <h2 className="text-[#2a1f14] font-display text-2xl mb-4">Why Participate?</h2>
            <p className="text-[#5a4a3a] text-sm leading-relaxed">
              Connect with creative minds, build cutting-edge solutions, win exciting prizes, and showcase your skills while transforming ideas into impactful innovations.
            </p>
          </div>
        </div>

        {/* Date Sticker */}
        <div
          ref={dateStickerRef}
          className={`${!isMobile
            ? "absolute inset-x-0 bottom-10 md:bottom-10 flex justify-center z-20 pointer-events-none"
            : "relative flex justify-center z-20 py-4"
            }`}
        >
          <div className="hero-date-badge text-center whitespace-nowrap">
            SEPTEMBER 18TH & 19TH, 2026
          </div>
        </div>
      </div>
    </section>
  );
}

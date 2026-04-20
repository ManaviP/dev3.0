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

const Row = ({ reverse = false, speed = "5s" }: RowProps) => {
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const baseLayer = baseLayerRef.current;
    const imagesFrame = imagesFrameRef.current;
    const reveal = revealRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const videoFrame = videoFrameRef.current;

    if (!section || !baseLayer || !imagesFrame || !reveal || !card1 || !card2 || !videoFrame) {
      return;
    }



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
          top: isMobile ? "12vh" : "0",
          height: isMobile ? "50vh" : "100vh",
          width: isMobile ? "90vw" : "100vw",
          left: isMobile ? "50%" : "0",
          xPercent: isMobile ? -50 : 0,
        });

        gsap.set(baseLayer, { opacity: 1 });
        gsap.set(reveal, {
          opacity: isMobile ? 1 : 0,
          top: isMobile ? "100vh" : "0"
        });
        gsap.set([card1, card2], { opacity: 0, y: 50 });

        const video = videoFrame.querySelector("video") as HTMLVideoElement;
        if (!video) return;

        let tickerFn: (() => void) | null = null;

        const setup = () => {
          // Reset video state
          video.pause();
          video.currentTime = 0;

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });

          let targetTime = 0;

          // 🎥 VIDEO SYST (SCROLL SYNC)
          timeline.to(
            {},
            {
              duration: 1,
              onUpdate: function () {
                const videoEnd = 0.6;
                let p = this.progress();

                // Map the scroll progress to video duration with a clamp
                if (p < videoEnd) {
                  p = p / videoEnd;
                } else {
                  p = 1;
                }

                if (video.duration) {
                  targetTime = p * (video.duration - 0.05); // buffer for end
                }
              },
            },
            0
          );

          // Smooth interpolation loop (Lerp)
          tickerFn = () => {
            const current = video.currentTime;
            const delta = targetTime - current;

            // Only update if the gap is significant but not too small to avoid micro-stutters
            if (Math.abs(delta) > 0.005) {
              video.currentTime = current + delta * 0.15;
            }
          };

          gsap.ticker.add(tickerFn);

          // 🎬 OTHER ANIMATIONS (Parallel to Video)
          timeline
            .to(
              videoFrame,
              {
                scale: isMobile ? 1.2 : 1.8,
                opacity: isMobile ? 1 : 0,
                duration: 2.0,
              },
              0
            )
            .to(
              reveal,
              {
                top: isMobile ? "65vh" : "0",
                opacity: 1,
                duration: isMobile ? 3.0 : 1.5,
                ease: "power2.out",
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
              card1,
              {
                opacity: 1,
                y: 0,
                duration: 1.5,
              },
              isMobile ? 1.2 : 3.2
            )
            .to(
              card2,
              {
                opacity: 1,
                y: 0,
                duration: 1.5,
              },
              isMobile ? 1.5 : 3.4
            );
        };

        // ✅ HANDLE VIDEO LOAD
        if (video.readyState >= 1) {
          setup();
        } else {
          video.addEventListener("loadedmetadata", setup);
        }

        // Cleanup the ticker specifically when context reverts
        return () => {
          if (tickerFn) gsap.ticker.remove(tickerFn);
          video.removeEventListener("loadedmetadata", setup);
        };
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
    <section id="hero" ref={sectionRef} className="relative h-[400vh] bg-cream text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={baseLayerRef} className="absolute inset-0 bg-cream" />

        <div ref={videoFrameRef} className="absolute inset-0 z-0 overflow-hidden">
          <video
            id="heroVideo"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/assets/Hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div ref={imagesFrameRef} className="hero-images-frame absolute inset-0 pointer-events-none opacity-0 z-5">
          <div className="h-full grid grid-rows-3 md:grid-rows-3 gap-1 sm:gap-3 md:gap-4 p-1 sm:p-3 md:p-4 opacity-100">
            <Row speed="18s" />
            <Row reverse speed="24s" />
            <Row speed="20s" />
            <div className="block sm:hidden">
              <Row reverse speed="22s" />
            </div>
          </div>
          <div className="hero-images-overlay absolute inset-0" />
        </div>


        <div ref={revealRef} className="absolute inset-x-0 h-screen z-10 flex flex-col md:flex-row items-center justify-center gap-14 md:gap-6 px-6 pointer-events-none">
          <div ref={card1Ref} className="w-full max-w-90 bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-[28px] border border-orange/10 shadow-2xl relative">
            <div className="text-orange font-bold text-4xl mb-4 opacity-30">01</div>
            <h2 className="text-[#2a1f14] font-display text-2xl mb-4">What is DevHack?</h2>
            <p className="text-[#5a4a3a] text-sm leading-relaxed">
              DSU DEVHACK 2026 is a national-level hackathon pushing the boundaries of innovation in AI, ML, IoT, Blockchain, Cybersecurity, and Cloud
            </p>
          </div>
          <div ref={card2Ref} className="w-full max-w-90 bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-[28px] border border-pink/10 shadow-2xl relative">
            <div className="text-pink font-bold text-4xl mb-4 opacity-30">02</div>
            <h2 className="text-[#2a1f14] font-display text-2xl mb-4">Why Participate?</h2>
            <p className="text-[#5a4a3a] text-sm leading-relaxed">
              Connect with creative minds, build cutting-edge solutions, win exciting prizes, and showcase your skills while transforming ideas into impactful innovations.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
}
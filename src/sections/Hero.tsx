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
        gsap.set(imagesFrame, {
          top: 0,
          height: "100vh",
          opacity: 0,
          scale: 1,
        });

        gsap.set(videoFrame, {
          opacity: 1,
          scale: 1,
        });

        gsap.set(baseLayer, { opacity: 1 });
        gsap.set(reveal, { opacity: 0 });
        gsap.set([card1, card2], { opacity: 0, y: 100, scale: 0.9 });

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
              scale: 1.8,
              opacity: 0,
              ease: "power2.inOut",
              duration: 3.0,
            },
            0
          )
          .to(
            baseLayer,
            {
              opacity: 0.05,
              duration: 2.0,
            },
            1.5
          )
          .to(
            imagesFrame,
            {
              opacity: 0.8,
              duration: 2.0,
            },
            3.0
          )
          .to(
            reveal,
            {
              opacity: 1,
              duration: 1.0,
            },
            2.5
          )
          .to(
            card1,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "back.out(1.2)",
            },
            2.6
          )
          .to(
            card2,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "back.out(1.2)",
            },
            2.8
          )
          .to(
            [reveal, card1, card2],
            {
              opacity: 0,
              scale: 1.1,
              y: -100,
              duration: 1,
              ease: "power2.in",
            },
            6.7
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
    <section id="hero" ref={sectionRef} className="relative h-[400vh] bg-cream text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={baseLayerRef} className="absolute inset-0 bg-cream" />

        <div ref={videoFrameRef} className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/devhack3.mp4" type="video/mp4" />
          </video>
        </div>

        <div ref={imagesFrameRef} className="hero-images-frame absolute inset-0 pointer-events-none opacity-0 z-5">
          <div className="h-full grid grid-rows-4 sm:grid-rows-3 gap-1 sm:gap-3 md:gap-4 p-1 sm:p-3 md:p-4 opacity-100">
            <Row speed="18s" />
            <Row reverse speed="24s" />
            <Row speed="20s" />
            <div className="block sm:hidden">
              <Row reverse speed="22s" />
            </div>
          </div>
          <div className="hero-images-overlay absolute inset-0" />
        </div>


        <div ref={revealRef} className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-center gap-14 md:gap-6 px-6 pointer-events-none opacity-0">
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
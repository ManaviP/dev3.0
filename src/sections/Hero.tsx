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
  const titleLayerRef = useRef<HTMLDivElement | null>(null);
  const imagesFrameRef = useRef<HTMLDivElement | null>(null);
  const powderCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const splitImageRef = useRef<HTMLDivElement | null>(null);
  const splitLeftRef = useRef<HTMLDivElement | null>(null);
  const splitRightRef = useRef<HTMLDivElement | null>(null);
  const fullImageRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const baseLayer = baseLayerRef.current;
    const titleLayer = titleLayerRef.current;
    const imagesFrame = imagesFrameRef.current;
    const powderCanvas = powderCanvasRef.current;
    const splitImage = splitImageRef.current;
    const splitLeft = splitLeftRef.current;
    const splitRight = splitRightRef.current;
    const fullImage = fullImageRef.current;
    const reveal = revealRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    if (!section || !baseLayer || !titleLayer || !imagesFrame || !powderCanvas || !splitImage || !splitLeft || !splitRight || !fullImage || !reveal || !card1 || !card2) {
      return;
    }

    let isCancelled = false;

    type PowderParticle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      wobble: number;
    };

    let powderParticles: PowderParticle[] = [];

    const createPowderParticles = async () => {
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });

      if (!offCtx) {
        powderParticles = [];
        return;
      }

      offCtx.fillStyle = "#000";
      offCtx.fillRect(0, 0, width, height);

      const loadedImages = await Promise.all(
        images.map(
          (src) =>
            new Promise<HTMLImageElement | null>((resolve) => {
              const image = new Image();
              image.crossOrigin = "anonymous";
              image.onload = () => resolve(image);
              image.onerror = () => resolve(null);
              image.src = src;
            })
        )
      );

      const validImages = loadedImages.filter((image): image is HTMLImageElement => !!image);
      const rowHeight = height / 3;
      const imageWidth = rowHeight * 1.6;

      if (validImages.length > 0) {
        for (let row = 0; row < 3; row += 1) {
          const offset = row % 2 === 0 ? 0 : imageWidth * 0.5;
          const y = row * rowHeight;

          for (let x = -imageWidth + offset; x < width + imageWidth; x += imageWidth) {
            const imageIndex = Math.abs(Math.floor((x + row * imageWidth) / imageWidth)) % validImages.length;
            const image = validImages[imageIndex];
            offCtx.drawImage(image, x, y, imageWidth, rowHeight);
          }
        }
      } else {
        offCtx.fillStyle = "#1a1a1a";
        offCtx.fillRect(0, 0, width, height);
        offCtx.fillStyle = "#f3ecd2";
        offCtx.globalAlpha = 0.22;
        offCtx.fillRect(0, rowHeight * 0.15, width, rowHeight * 2.5);
        offCtx.globalAlpha = 1;
      }

      const sampledParticles: PowderParticle[] = [];

      try {
        const imageData = offCtx.getImageData(0, 0, width, height).data;
        const step = 10;

        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const index = (y * width + x) * 4;
            const r = imageData[index];
            const g = imageData[index + 1];
            const b = imageData[index + 2];
            const a = imageData[index + 3] / 255;

            if (a < 0.25) continue;

            const seed = ((x * 73856093) ^ (y * 19349663)) >>> 0;
            const random = (seed % 1000) / 1000;
            if (random > 0.75) continue;

            const angle = random * Math.PI * 2;
            const drift = 55 + random * 120;

            sampledParticles.push({
              x,
              y,
              vx: Math.cos(angle) * drift,
              vy: Math.sin(angle) * drift - 35,
              size: 6 + random * 6,
              color: `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`,
              wobble: random * 10,
            });
          }
        }
      } catch {
        for (let y = 0; y < height; y += 12) {
          for (let x = 0; x < width; x += 12) {
            const seed = ((x * 2654435761) ^ (y * 97531)) >>> 0;
            const random = (seed % 1000) / 1000;
            if (random > 0.72) continue;

            sampledParticles.push({
              x,
              y,
              vx: (random - 0.5) * 180,
              vy: (random - 0.5) * 140 - 25,
              size: 5 + random * 5,
              color: random > 0.5 ? "rgba(243, 236, 210, 0.9)" : "rgba(244, 137, 163, 0.75)",
              wobble: random * 8,
            });
          }
        }
      }

      powderParticles = sampledParticles;
    };

    const renderPowder = (progress: number) => {
      const ctx = powderCanvas.getContext("2d");
      if (!ctx) return;

      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);

      if (powderCanvas.width !== width || powderCanvas.height !== height) {
        powderCanvas.width = width;
        powderCanvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);
      if (progress <= 0 || powderParticles.length === 0) return;

      for (let i = 0; i < powderParticles.length; i += 1) {
        const particle = powderParticles[i];
        const t = progress;
        const travel = 0.25 + t * 0.95;
        const x = particle.x + particle.vx * travel + Math.sin(t * 10 + particle.wobble) * (5 * t);
        const y = particle.y + particle.vy * travel - t * t * 34;
        const alpha = Math.max(0, 1 - t * 1.35);
        const size = Math.max(1.2, particle.size * (1 - t * 0.72));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.fillRect(x, y, size, size);
      }

      ctx.globalAlpha = 1;
    };

    const initialize = async () => {
      await createPowderParticles();
      if (isCancelled) return;

      const context = gsap.context(() => {
        gsap.set(imagesFrame, {
          top: window.innerWidth < 640 ? "35vh" : "25vh", // 👈 more space on mobile
          height: window.innerWidth < 640 ? "65vh" : "75vh",
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(titleLayer, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(baseLayer, { opacity: 1 });
        gsap.set(powderCanvas, { opacity: 0 });
        gsap.set(fullImage, { opacity: 0, scale: 0.8 });
        gsap.set(splitImage, { opacity: 0, scale: 1.3 }); // Matches fullImage's final scale
        gsap.set(splitLeft, { xPercent: 0 });
        gsap.set(splitRight, { xPercent: 0 });
        gsap.set(reveal, { opacity: 0 });
        gsap.set([card1, card2], { opacity: 0, y: 100, scale: 0.9 });
        renderPowder(0);

        const dissolveState = { progress: 0 };

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
            titleLayer,
            {
              yPercent: -125,
              opacity: 0,
              filter: "blur(10px)",
              ease: "power2.out",
              duration: 1.2,
            },
            0
          )
          .to(
            imagesFrame,
            {
              top: 0,
              height: "100vh",
              ease: "power2.out",
              duration: 1.2,
            },
            0
          )
          .to({}, { duration: 0.5 })
          .to(
            powderCanvas,
            {
              opacity: 1,
              duration: 0.2,
              ease: "power1.out",
            },
            1.7
          )
          .to(
            dissolveState,
            {
              progress: 1,
              duration: 3.35,
              ease: "none",
              onUpdate: () => {
                renderPowder(dissolveState.progress);
              },
            },
            1.7
          )
          .to(
            imagesFrame,
            {
              opacity: 0.14,
              filter: "blur(14px)",
              ease: "power2.inOut",
              duration: 2.0,
            },
            1.8
          )
          .to(
            powderCanvas,
            {
              opacity: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            2.9
          )
          .to(
            imagesFrame,
            {
              opacity: 0.2,
              duration: 0.55,
              ease: "power2.out",
            },
            3
          )
          .to(
            baseLayer,
            {
              opacity: 0.65,
              duration: 0.55,
              ease: "power2.out",
            },
            3.02
          )
          .to(
            fullImage,
            {
              opacity: 1,
              scale: 0.9,
              duration: 3.0,
              ease: "back.out(1.4)",
            },
            1.7
          )
          .set(
            fullImage,
            {
              opacity: 0,
            },
            4.8
          )
          .set(
            splitImage,
            {
              opacity: 1,
              scale: 0.9,
            },
            4.8
          )
          .to(
            splitLeft,
            {
              xPercent: -100,
              duration: 1.5,
              ease: "power3.inOut",
            },
            4.8
          )
          .to(
            splitRight,
            {
              xPercent: 100,
              duration: 1.5,
              ease: "power3.inOut",
            },
            4.8
          )
          .to(
            reveal,
            {
              opacity: 1,
              duration: 0.5,
            },
            4.9
          )
          .to(
            card1,
            {
              opacity: 1,
              y: window.innerWidth < 768 ? -20 : 0,
              scale: 1,
              duration: 1.2,
              ease: "back.out(1.2)",
            },
            4.9
          )
          .to(
            card2,
            {
              opacity: 1,
              y: window.innerWidth < 768 ? -60 : 0,
              scale: 1,
              duration: 1.2,
              ease: "back.out(1.2)",
            },
            5.0
          )
          .to(
            splitImage,
            {
              opacity: 0,
              duration: 1.2,
              ease: "power2.in",
            },
            6.5
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
        createPowderParticles().then(() => {
          if (!isCancelled) renderPowder(0);
        });
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        context.revert();
      };
    };

    let cleanup: (() => void) | undefined;
    initialize().then((fn) => {
      cleanup = fn;
    });

    return () => {
      isCancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative h-[400vh] bg-cream text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={baseLayerRef} className="absolute inset-0 bg-cream" />

        <div ref={imagesFrameRef} className="hero-images-frame absolute left-0 right-0">
          <div className="h-full grid grid-rows-4 sm:grid-rows-3 gap-1 sm:gap-3 md:gap-4 p-1 sm:p-3 md:p-4">
            <Row speed="18s" />
            <Row reverse speed="24s" />
            <Row speed="20s" />
            <div className="block sm:hidden">
              <Row reverse speed="22s" />
            </div>
          </div>
          <div className="hero-images-overlay absolute inset-0" />
        </div>

        <div
          ref={titleLayerRef}
          className="hero-title-layer absolute top-0 left-0 right-0 h-[60vh] sm:h-[50vh] md:h-[40vh] z-30 flex items-start justify-center px-4 pt-45 sm:pt-35 bg-black/40 backdrop-blur-lg"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between w-full max-w-5xl gap-3 sm:gap-0">

            {/* LEFT: Title + Subtitle */}
            <div className="flex flex-col items-center sm:items-start ml-0 sm:ml-10">

              {/* Title */}
              <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.14em] sm:tracking-[0.2em] text-white whitespace-nowrap [text-shadow:-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,2px_2px_0_#000]">
                DEVHACK 3.0
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle font-display uppercase text-cream whitespace-nowrap">
                A 36hr National Hackathon
              </p>
            </div>

            {/* RIGHT: Date Badge */}
            <div className="hero-date-badge relative inline-flex items-center justify-center font-sans uppercase tracking-widest rounded-full backdrop-blur-sm mt-2 sm:mt-0">
              September 18–19, 2026
            </div>

          </div>

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

        <div ref={fullImageRef} className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center opacity-0 overflow-hidden">
          <img
            src="/assets/logo1.png"
            alt=""
           className="max-w-[70vw] max-h-[70vh] object-contain"
          />
        </div>

        <div ref={splitImageRef} className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex opacity-0">
  
  {/* LEFT HALF */}
  <div ref={splitLeftRef} className="w-1/2 h-full overflow-hidden">
    <img
      src="/assets/logo1.png"
      alt="DevHack logo left half"
      className="w-full h-full object-contain origin-left hero-split-left"
    />
  </div>

  {/* RIGHT HALF */}
  <div ref={splitRightRef} className="w-1/2 h-full overflow-hidden">
    <img
      src="/assets/logo1.png"
      alt="DevHack logo right half"
      className="w-full h-full object-contain origin-right hero-split-right"
    />
  </div>

</div>
        <canvas ref={powderCanvasRef} className="hero-powder-canvas absolute inset-0 pointer-events-none" />
      </div>
    </section>
  );
}
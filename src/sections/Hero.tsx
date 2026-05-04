import { useState, useEffect, useRef } from 'react';
import DotField from '../components/DotField';

export default function DevHackHeroCompact() {
  const [mobileScrollY, setMobileScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMobileScrollY(0);
      return;
    }
    const handleScroll = () => {
      if (!heroSectionRef.current) return;
      const scrollY = window.scrollY;
      const heroRect = heroSectionRef.current.getBoundingClientRect();
      const heroTopOffset = heroRect.top + scrollY;
      const scrolledFromTop = Math.max(0, scrollY - heroTopOffset);

      // Calculate progress for "pulling out" the about image like movie credits
      let progress = Math.min(1, scrolledFromTop / 500);
      const translate = -Math.min(280, progress * 350); // Increased pull for credits effect
      setMobileScrollY(translate);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section id="hero" ref={heroSectionRef} className="relative w-full bg-cream text-white">
      {/* Interactive Dot Field Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <DotField
          dotSpacing={20}
          dotRadius={1.2}
          bulgeStrength={40}
          gradientFrom="#1a1a1a"
          gradientTo="#1a1a1a"
          glowColor="#f3ecd2"
        />
      </div>
      {/* Sticky Background */}
      <div className="hidden md:flex sticky top-0 h-[70vh] xl:h-screen z-0 justify-end pt-32 pr-6 md:pr-12 xl:pr-16">
        <img
          src="/assets/herot.png"
          loading="lazy"
          alt="DevHack Background"
          className="w-full md:w-[70%] xl:w-full h-full object-contain object-center md:object-right drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500 pointer-events-auto"
        />
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10 mt-0 md:-mt-[100vh]">
        {/* Initial Hero Screen Content */}
        <div className="h-[70vh] md:h-screen flex flex-col items-center md:items-start justify-center pointer-events-none pl-0 md:pl-12 xl:pl-32 pt-0 md:pt-78 xl:pt-36">
          <div
            className="flex flex-col items-center mt-0 md:-mt-24"
            style={{
              transform: isMobile ? `translateY(${mobileScrollY}px)` : 'none',
              transition: isMobile ? 'transform 0.1s ease-out' : 'none',
              willChange: 'transform'
            }}
          >
            <h1 className="text-center font-bold flex flex-col items-center z-10 -translate-y-8 md:-translate-y-12">
              <div className="text-[clamp(3.5rem,8vw,6rem)] xl:text-[clamp(4.5rem,10vw,7rem)] leading-none mb-1 hero-main-title pointer-events-auto">DSU</div>
              <div className="text-[clamp(3.8rem,9vw,7rem)] xl:text-[clamp(4.8rem,12vw,8.5rem)] leading-none -mt-2 md:-mt-4 xl:-mt-8 mb-1 hero-main-title pointer-events-auto">DEVHACK</div>
              <div className="text-[clamp(3.2rem,8vw,5.5rem)] xl:text-[clamp(4.2rem,10vw,6rem)] leading-none -mt-2 md:-mt-4 xl:-mt-8 hero-main-title pointer-events-auto">3.0</div>
            </h1>

            {/* Date Badge and Hanging About Section */}
            <div className="relative -mt-2 md:-mt-6 xl:-mt-10 flex flex-col items-center z-20 pointer-events-auto">
              <div className="hero-date-badge text-center whitespace-nowrap shadow-2xl relative z-20">
                SEPTEMBER 18TH & 19TH, 2026
              </div>

              {/* Small Hero Image on Mobile only - Tucked UNDER the About section */}
              <div className="md:hidden absolute top-full mt-12 w-[120px] z-0 opacity-90">
                <img
                  src="/assets/herot.png"
                  alt="Hero Graphic"
                  loading="lazy"
                  className="w-full h-auto drop-shadow-xl"
                />
              </div>

              {/* Hanging Image (Positioned directly below the badge) */}
              <div
                className="absolute top-full -mt-2 w-[85vw] md:w-[260px] xl:w-[420px] flex justify-center z-10 pb-20 -rotate-1 origin-top"
              >
                <img
                  src="/assets/ABOUT.png"
                  alt="About DevHack"
                  className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Spacer to allow scrolling the About section into full view, stops right after it */}
        <div className="h-[45vh] md:h-[90vh] pointer-events-none" />
      </div>
    </section>
  );
}
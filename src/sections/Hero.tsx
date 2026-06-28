import { useState, useEffect, useRef } from 'react';
import DotField from '../components/DotField';

export default function DevHackHeroCompact() {
  const [mobileScrollY, setMobileScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTwentyNine, setIsTwentyNine] = useState(false);
  const [isNothing20x9, setIsNothing20x9] = useState(false);
  const [isTightHeroSpacingDevice, setIsTightHeroSpacingDevice] = useState(false);
  const [isZFoldDevice, setIsZFoldDevice] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [isXLDesktop, setIsXLDesktop] = useState(false);
  const [deviceModel, setDeviceModel] = useState('');
  const heroSectionRef = useRef<HTMLElement>(null);

  // Countdown state for event (September 18)
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number; total: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });
  // Target: September 18, 2026 (local timezone, midnight)
  const registrationDate = new Date(2026, 8, 18, 0, 0, 0);

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const total = registrationDate.getTime() - now;
      const totalSeconds = Math.floor(total / 1000);
      const seconds = Math.max(0, totalSeconds % 60);
      const minutes = Math.max(0, Math.floor((totalSeconds / 60) % 60));
      const hours = Math.max(0, Math.floor((totalSeconds / 3600) % 24));
      const days = Math.max(0, Math.floor(totalSeconds / 3600 / 24));
      setCountdown({ days, hours, minutes, seconds, total });
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const uaData = (navigator as Navigator & {
      userAgentData?: {
        getHighEntropyValues: (hints: string[]) => Promise<{ model?: string }>;
      };
    }).userAgentData;
    if (!uaData?.getHighEntropyValues) return;

    uaData.getHighEntropyValues(['model']).then((details: { model?: string }) => {
      setDeviceModel(details.model || '');
    }).catch(() => {
      setDeviceModel('');
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = width / height;
      const aspectRatio = Math.max(width, height) / Math.min(width, height);
      const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';

      const isCompactPortraitPhone = width < 500 && ratio > 0.43 && ratio < 0.48;
      // broadened to include foldables and tablets with similar proportions (captures Galaxy Z Fold unfolded/folded variances)
      const isFoldOrSurfaceLayout = width >= 600 && width < 1800 && (aspectRatio > 1.45 && aspectRatio < 1.9);
      const isNothingPhone = /Nothing/i.test(ua) || /\bA063\b|\bA065\b|\bA142\b|\bA142P\b/i.test(deviceModel);
      const is20x9 = Math.abs(ratio - 9 / 20) < 0.05;
      const isZFold = /SM-F|Galaxy Z Fold|GalaxyZFold|Fold/i.test(ua);
      const navEl = typeof document !== 'undefined' ? document.querySelector('nav') : null;
      const measuredNavHeight = navEl ? Math.round(navEl.getBoundingClientRect().bottom) : 0;

      setIsMobile(width < 768);
      setIsTwentyNine(width < 768 && Math.abs(ratio - 20 / 9) < 0.06);
      setIsNothing20x9(width < 768 && isNothingPhone && is20x9);
      setIsTightHeroSpacingDevice(isCompactPortraitPhone || isFoldOrSurfaceLayout || isZFold);
      setIsZFoldDevice(isZFold);
      setNavHeight(measuredNavHeight);
      setIsXLDesktop(width >= 1280);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [deviceModel]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
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
      <div className="hidden xl:flex sticky top-0 h-[70vh] xl:h-screen z-0 justify-end pt-32 pr-6 md:pr-0 xl:pr-16 w-full md:w-[50%] xl:w-[45%] ml-auto">
        <img
          src="/assets/herot.png"
          loading="lazy"
          alt="DevHack Background"
          className="w-full h-full max-h-[65vh] xl:max-h-[75vh] object-contain object-center md:object-right drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500 pointer-events-auto"
        />
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10 mt-0 xl:-mt-[100vh]">
        {/* Initial Hero Screen Content */}
        <div className="h-[104vh] md:h-screen flex flex-col items-center xl:items-start justify-center pl-0 xl:pl-24 pt-0">
          <div
            className={`flex flex-col items-center tall-screen-fix ${isNothing20x9 ? 'mt-0' : isTightHeroSpacingDevice ? 'mt-2 md:mt-8 xl:mt-40' : isTwentyNine ? 'mt-6' : 'mt-65 md:mt-20 xl:mt-40'}`}
            style={{
              transform: isMobile ? `translateY(${mobileScrollY}px)` : 'none',
              transition: isMobile ? 'transform 0.1s ease-out' : 'none',
              willChange: 'transform',
              paddingTop: !isXLDesktop && navHeight > 0 ? `${navHeight + 8}px` : !isXLDesktop ? '110px' : undefined,
              marginTop: isNothing20x9
                ? '-24px'
                : isTightHeroSpacingDevice
                  ? (isZFoldDevice && navHeight > 0
                    ? `-${Math.max(16, navHeight - 6)}px`
                    : (isMobile ? '-48px' : '-24px'))
                  : undefined
            }}
          >
            {/* GitHub presents banner + title — single translated block */}
            <div className="flex flex-col items-center z-10 pointer-events-none">
              {/* GitHub presents — always above title */}
              <div className="flex flex-col items-center mb-2 pointer-events-auto select-none">
                <img
                  src="/logos/github_black.svg"
                  alt="GitHub logo"
                  className="h-12 md:h-20 w-auto object-contain"
                  draggable={false}
                />
                <span className="text-[0.55rem] md:text-[0.7rem] uppercase tracking-[0.25em] font-semibold text-black/70 mt-[2px]">
                  presents
                </span>
              </div>

              {/* Main title */}
              <h1 className="text-center font-bold flex flex-col items-center pointer-events-none">
              <div className="text-[clamp(3.8rem,8.5vw,6.5rem)] md:text-[5rem] xl:text-[clamp(4.8rem,9.5vw,7rem)] leading-none mb-1 hero-main-title pointer-events-auto">DSU</div>
              <div className="text-[clamp(4.2rem,10vw,7.5rem)] md:text-[6rem] xl:text-[clamp(5.2rem,11.5vw,8.2rem)] leading-none -mt-1 md:-mt-2 xl:-mt-2 mb-1 hero-main-title pointer-events-auto">DEVHACK</div>
              <div className="text-[clamp(3.5rem,8.5vw,6rem)] md:text-[4.5rem] xl:text-[clamp(4.5rem,9.5vw,6.2rem)] leading-none -mt-1 md:-mt-2 xl:-mt-2 hero-main-title pointer-events-auto">3.0</div>
            </h1>
            </div>{/* end single translated block */}


            {/* Small Hero Image on Mobile and Tablet - Positioned between Title and Date Bar */}
            <div className="xl:hidden relative z-10 w-[330px] sm:w-[340px] md:w-[410px] -mt-3 mb-8 flex justify-center drop-shadow-2xl pointer-events-auto">
              <img
                src="/assets/hero.webp"
                alt="Hero Graphic"
                loading="lazy"
                className="w-full h-auto object-contain hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
              <a
                href="https://dsudevhack3.devfolio.co/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-[250px] h-[44px] rounded-none bg-[#2b2a2a] text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                Register on Devfolio
              </a>

              <div
                className="apply-button relative z-50 pointer-events-auto cursor-pointer block"
                data-hackathon-slug="dsudevhack3"
                data-button-theme="dark"
                role="button"
                aria-label="Apply to DevHack"
                style={{ height: '44px', width: '312px' }}
              ></div>
            </div>
            {/* Date Badge and Hanging About Section */}
            <div className="relative mt-6 md:mt-4 xl:mt-6 flex flex-col items-center z-20 pointer-events-auto">
              {/* Registration countdown for June 1 (placed above the date badge, no heading) */}
              <div className="mt-3 text-center z-20">
                <div
                  className="mb-2 text-[0.7rem] sm:text-base md:text-base lg:text-lg font-bold uppercase text-black"
                  style={{
                    WebkitTextStroke: '0.5px #f97028',
                  }}
                >
                  DEVHACK 3.0 Begins In
                </div>
                {countdown.total > 0 ? (
                  <div className="flex gap-2 items-center justify-center mb-2">
                    <div className="bg-white/90 text-black px-3 py-1 rounded-lg text-sm font-semibold border-2 border-black">
                      <div>{countdown.days}</div>
                      <div className="text-xs opacity-70">Days</div>
                    </div>
                    <div className="bg-white/90 text-black px-3 py-1 rounded-lg text-sm font-semibold border-2 border-black">
                      <div>{String(countdown.hours).padStart(2, '0')}</div>
                      <div className="text-xs opacity-70">Hours</div>
                    </div>
                    <div className="bg-white/90 text-black px-3 py-1 rounded-lg text-sm font-semibold border-2 border-black">
                      <div>{String(countdown.minutes).padStart(2, '0')}</div>
                      <div className="text-xs opacity-70">Min</div>
                    </div>
                    <div className="bg-white/90 text-black px-3 py-1 rounded-lg text-sm font-semibold border-2 border-black">
                      <div>{String(countdown.seconds).padStart(2, '0')}</div>
                      <div className="text-xs opacity-70">Sec</div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <div className="bg-white/90 text-black px-4 py-1 rounded-lg text-sm font-semibold">Registration Open</div>
                  </div>
                )}
              </div>

              <div className="hero-date-badge text-center whitespace-nowrap shadow-2xl relative z-20">
                SEPTEMBER 18TH & 19TH, 2026
              </div>

              {/* Hanging Image (Positioned directly below the badge) */}
              <div
                className="absolute top-full -mt-2 w-[72vw] sm:w-[80vw] md:w-[400px] xl:w-[370px] flex justify-center z-10 pb-20 -rotate-1 origin-top"
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

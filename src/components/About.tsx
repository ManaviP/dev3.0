import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(Observer, ScrollTrigger);

/* ─── Slide data ─────────────────────────────────────────── */
const slides = [
  {
    num: '01',
    label: 'INTRO',
    heading: 'DevHack 3.0',
    bg: '#f97028',
    accent: '#f3ecd2',
    body: 'National-level hackathon pushing boundaries in AI, ML, IoT, Blockchain, Cybersecurity & Cloud at DSU Harohalli, Bangalore.',
    tag: 'A platform for brilliance',
  },
  {
    num: '02',
    label: 'WHY JOIN',
    heading: 'Build.',
    bg: '#5d275d',
    accent: '#f489a3',
    body: 'Showcase skills, network with industry leaders, win prizes, and learn cutting-edge tech — all in 24 hours of intense innovation.',
    tag: 'Compete · Connect · Create',
  },
  {
    num: '03',
    label: 'VISION',
    heading: 'Impact.',
    bg: '#1a3a5c',
    accent: '#f3a20f',
    body: 'Foster a culture of innovation — giving students the resources and mentorship to solve real-world problems and build tomorrow.',
    tag: 'Make it matter',
  },
];

/* ─── Component ──────────────────────────────────────────── */
export default function About() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  /* ── Measure real viewport height (works at any zoom) ── */
  const setVH = useCallback(() => {
    const vh = window.innerHeight;
    if (wrapperRef.current)  wrapperRef.current.style.height  = `${vh * (slides.length + 1)}px`;
    if (stickyRef.current)   stickyRef.current.style.height   = `${vh}px`;
  }, []);

  useEffect(() => {
    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, [setVH]);

  /* ── GSAP setup ─────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const slideEls = gsap.utils.toArray<HTMLElement>('.ab-slide');
      const outers   = gsap.utils.toArray<HTMLElement>('.ab-outer');
      const inners   = gsap.utils.toArray<HTMLElement>('.ab-inner');
      const n        = slideEls.length;
      const wrap     = gsap.utils.wrap(0, n);

      let current   = 0;
      let animating = false;

      /* Initial state */
      gsap.set(outers,      { xPercent: 100 });
      gsap.set(inners,      { xPercent: -100 });
      gsap.set(slideEls,    { autoAlpha: 0 });
      gsap.set(slideEls[0], { autoAlpha: 1 });
      gsap.set(outers[0],   { xPercent: 0 });
      gsap.set(inners[0],   { xPercent: 0 });

      /* Transition */
      function gotoSection(index: number, dir: number) {
        animating = true;
        index     = wrap(index);
        setSlideIdx(index);

        const curH  = slideEls[current].querySelector<HTMLElement>('.ab-heading');
        const nextH = slideEls[index].querySelector<HTMLElement>('.ab-heading');
        const curB  = slideEls[current].querySelector<HTMLElement>('.ab-body');
        const nextB = slideEls[index].querySelector<HTMLElement>('.ab-body');

        gsap.set(slideEls,          { zIndex: 0, autoAlpha: 0 });
        gsap.set(slideEls[current], { zIndex: 1, autoAlpha: 1 });
        gsap.set(slideEls[index],   { zIndex: 2, autoAlpha: 1 });

        gsap.timeline({
          defaults: { duration: 1, ease: 'expo.inOut' },
          onComplete: () => { animating = false; },
        })
          .fromTo(outers[index], { xPercent:  100 * dir }, { xPercent: 0 }, 0)
          .fromTo(inners[index], { xPercent: -100 * dir }, { xPercent: 0 }, 0)
          .to(curH,  { scaleX: 1.3, xPercent:  18 * dir, transformOrigin: dir > 0 ? 'left center' : 'right center' }, 0)
          .fromTo(nextH,
            { scaleX: 1.3, xPercent: -18 * dir },
            { scaleX: 1,   xPercent: 0, transformOrigin: 'center center' }, 0)
          .to(curB,  { opacity: 0, y: -12 }, 0)
          .fromTo(nextB, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0.15)
          .timeScale(0.85);

        current = index;
      }

      /* ScrollTrigger pin — recalculates after resize */
      const st = ScrollTrigger.create({
        trigger:    wrapperRef.current,
        pin:        stickyRef.current,
        pinSpacing: false,
        start:      'top top',
        end:        () => `+=${window.innerHeight * n}`,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const next = Math.min(Math.floor(self.progress * n), n - 1);
          if (next !== current && !animating) {
            gotoSection(next, next > current ? 1 : -1);
          }
        },
      });

      /* Rebuild on resize so pin end stays accurate */
      const onResize = () => { st.refresh(); };
      window.addEventListener('resize', onResize);

      /* Keyboard */
      const onKey = (e: KeyboardEvent) => {
        if (animating) return;
        if (e.code === 'ArrowRight' || e.code === 'ArrowDown') gotoSection(current + 1,  1);
        if (e.code === 'ArrowLeft'  || e.code === 'ArrowUp')   gotoSection(current - 1, -1);
      };
      window.addEventListener('keydown', onKey);

      return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('keydown', onKey);
      };
    }, stickyRef);

    return () => ctx.revert();
  }, []);

  const s = slides[slideIdx];

  return (
    <section id="about">
      {/* Wrapper height set by JS (accurate at any zoom) */}
      <div ref={wrapperRef}>

        {/* Sticky viewport-height container */}
        <div ref={stickyRef} className="w-full overflow-hidden relative">

          {slides.map((slide, i) => (
            <div key={i} className="ab-slide absolute inset-0 w-full h-full">
              <div className="ab-outer w-full h-full overflow-hidden">
                <div className="ab-inner w-full h-full overflow-hidden">

                  <div
                    className="w-full h-full flex flex-col relative overflow-hidden"
                    style={{
                      backgroundColor: slide.bg,
                      padding: 'clamp(1.5rem, 4vw, 4rem) clamp(1.25rem, 5vw, 5rem)',
                    }}
                  >

                    {/* Top row */}
                    <div className="flex justify-between items-start shrink-0">
                      <span
                        className="font-sans font-bold uppercase"
                        style={{
                          color: slide.accent,
                          opacity: 0.7,
                          fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)',
                          letterSpacing: '0.3em',
                        }}
                      >
                        {slide.label}
                      </span>
                      <span
                        className="font-display font-bold leading-none"
                        style={{
                          color: slide.accent,
                          opacity: 0.15,
                          fontSize: 'clamp(3rem, 8vw, 8rem)',
                        }}
                      >
                        {slide.num}
                      </span>
                    </div>

                    {/* Center heading */}
                    <div className="flex-1 flex flex-col justify-center min-h-0">
                      <h2
                        className="ab-heading font-display m-0 p-0"
                        style={{
                          fontSize: 'clamp(3.5rem, 13vw, 13rem)',
                          lineHeight: 0.9,
                          color: '#f3ecd2',
                          WebkitTextStroke: 'clamp(1px, 0.15vw, 2px) rgba(26,26,26,0.35)',
                          willChange: 'transform',
                          wordBreak: 'keep-all',
                        }}
                      >
                        {slide.heading}
                      </h2>

                      <div
                        className="rounded-full shrink-0"
                        style={{
                          marginTop: 'clamp(0.75rem, 2vw, 1.5rem)',
                          height: '4px',
                          width: 'clamp(4rem, 10vw, 10rem)',
                          backgroundColor: slide.accent,
                        }}
                      />
                    </div>

                    {/* Bottom text */}
                    <div className="shrink-0">
                      <p
                        className="ab-body font-sans leading-relaxed"
                        style={{
                          color: '#f3ecd2',
                          opacity: 0.9,
                          fontSize: 'clamp(0.85rem, 1.8vw, 1.4rem)',
                          maxWidth: '36rem',
                          marginBottom: 'clamp(0.5rem, 1.2vw, 1rem)',
                        }}
                      >
                        {slide.body}
                      </p>
                      <p
                        className="font-display"
                        style={{
                          fontSize: 'clamp(1rem, 2vw, 1.6rem)',
                          color: slide.accent,
                        }}
                      >
                        {slide.tag}
                      </p>
                    </div>

                    {/* Ghost watermark number */}
                    <div
                      className="absolute font-display leading-none select-none pointer-events-none"
                      style={{
                        right: '-2%',
                        bottom: '-5%',
                        fontSize: 'clamp(10rem, 28vw, 28rem)',
                        color: slide.accent,
                        opacity: 0.05,
                        lineHeight: 0.8,
                      }}
                    >
                      {slide.num}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide counter — top right */}
          <div className="absolute z-20 pointer-events-none" style={{ top: 'clamp(1.5rem,4vw,4rem)', right: 'clamp(1.25rem,5vw,5rem)' }}>
            <p
              className="font-sans font-bold m-0"
              style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 3.5rem)',
                color: s.accent,
                borderBottom: `4px solid ${s.accent}`,
                lineHeight: 1.2,
                transition: 'color 0.4s ease, border-color 0.4s ease',
              }}
            >
              0{slideIdx + 1}
            </p>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  height: '3px',
                  width: slideIdx === i ? 48 : 16,
                  backgroundColor: '#f3ecd2',
                  opacity: slideIdx === i ? 1 : 0.3,
                }}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <div
            className="absolute z-20 font-sans font-bold uppercase animate-bounce"
            style={{
              bottom: 'clamp(1rem,2vw,2rem)',
              right: 'clamp(1.25rem,5vw,5rem)',
              fontSize: 'clamp(0.55rem, 1vw, 0.7rem)',
              letterSpacing: '0.25em',
              color: '#f3ecd2',
              opacity: 0.4,
            }}
          >
            scroll ↓
          </div>

        </div>
      </div>
    </section>
  );
}

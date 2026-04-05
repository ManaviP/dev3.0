import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BookScrollSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.panel');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.3,
            ease: 'power1.inOut',
          },
          end: '+=2000',
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden bg-gradient-to-br from-[#f5f0e0] to-[#e8e0cc]">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#f5f0e0] to-[#e8e0cc]" />
      <div ref={containerRef} className="relative h-screen">
        <div className="flex h-full w-[200%]">
          <div className="panel flex h-full w-full items-center justify-center">
            <div className="w-96 max-w-[90%] rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#f97028] to-[#f489a3] text-xs font-bold text-white">1</div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">About</span>
              </div>
              <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f97028] to-[#f489a3]">DevHack 2025</h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-600">National-level hackathon pushing boundaries in AI, ML, IoT, Blockchain, Cybersecurity & Cloud at DSU Harohalli, Bangalore.</p>
              <p className="text-sm leading-relaxed text-gray-600">A platform for developers, designers, and enthusiasts to transform ideas, showcase skills, and network.</p>
            </div>
          </div>

          <div className="panel flex h-full w-full items-center justify-center">
            <div className="w-96 max-w-[90%] rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#f97028] to-[#f489a3] text-xs font-bold text-white">2</div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Why Join?</span>
              </div>
              <h3 className="mb-4 text-xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f97028] to-[#f489a3]">Why Participate?</h3>
              <div className="space-y-2">
                {[{ icon: '🏆', text: 'Showcase technical skills & creativity' }, { icon: '🤝', text: 'Network with industry professionals' }, { icon: '🎁', text: 'Win exciting prizes & recognition' }, { icon: '📚', text: 'Learn new technologies' }, { icon: '💡', text: 'Build real-world solutions' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "../components/BlurText";
import photos from "./photos";

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
    photoSubset
}: {
    reverse?: boolean;
    speed?: number;
    offset?: boolean;
    className?: string;
    photoSubset: typeof photos
}) => {
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

export default function MemorySection() {
    const [triggerBlur, setTriggerBlur] = useState(false);

    const sectionRef = useRef<HTMLElement | null>(null);
    const imagesFrameRef = useRef<HTMLDivElement | null>(null);
    const memoryTitleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const imagesFrame = imagesFrameRef.current;
        const memoryTitle = memoryTitleRef.current;

        if (!section || !imagesFrame || !memoryTitle) {
            return;
        }

        const initialize = async () => {
            const context = gsap.context(() => {
                const isMobile = window.innerWidth < 768;

                // Set initial states - gallery visible from start, no opacity transition
                gsap.set(imagesFrame, {
                    opacity: 1,
                    top: 0,
                    height: "100vh",
                });

                gsap.set(memoryTitle, {
                    opacity: 0,
                    y: 40,
                    scale: 0.95,
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

                // Only animate the title, no gallery fade transition
                timeline
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
                        0
                    );
            }, section);

            return () => {
                context.revert();
            };
        };

        initialize();

        return () => {
        };
    }, []);

    return (
        <section id="memory" ref={sectionRef} className="relative h-[130vh] md:h-[200vh] bg-[#0a0a0a]">
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Vertical Scrolling Gallery Background - Always visible, no fade transition */}
                <div ref={imagesFrameRef} className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-full bg-[#0a0a0a]">
                        <Column speed={120} photoSubset={col1Photos} />
                        <Column reverse speed={140} offset photoSubset={col2Photos} />
                        <Column speed={130} className="hidden md:block" photoSubset={col3Photos} />
                        <Column reverse speed={150} offset className="hidden lg:block" photoSubset={col4Photos} />
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
        </section>
    );
}
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface TimelineEvent {
  dateHeader: string;
  title: string;
  description: string;
}

const timelineData: TimelineEvent[] = [
  { dateHeader: "JUN 10", title: "Registration Starts", description: "Kickstart your journey by registering for the hackathon." },
  { dateHeader: "JUN 25", title: "Idea Submission Starts", description: "Start submitting your innovative ideas for evaluation." },
  { dateHeader: "AUG 10", title: "Registration Deadline", description: "Last chance to register for the event." },
  { dateHeader: "AUG 25", title: "Idea Submission Deadline", description: "Final date to submit your project ideas." },
  { dateHeader: "AUG 31", title: "Shortlisted Teams", description: "Announcement of teams selected for the hackathon." },
  { dateHeader: "SEPT 18", title: "Hacking Starts", description: "The hacking phase begins. Build your ideas into reality." },
  { dateHeader: "SEPT 19", title: "Final Submission", description: "Submit your completed projects for judging." },
  { dateHeader: "SEPT 19", title: "Final Result", description: "Winners are announced and celebration begins." },
];

const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 MORE WIDTH
  const leftX = isMobile ? 30 : 60;
  const rightX = isMobile ? 320 : 420; // ⬅️ pushed further right
  const segH = 280; // ⬅️ more vertical spacing

  const generatePath = () => {
    let d = `M ${leftX} 0 `;

    for (let i = 0; i < timelineData.length; i++) {
        const y = (i + 1) * segH;
        const currX = i % 2 === 0 ? leftX : rightX;
        const nextX = i % 2 === 0 ? rightX : leftX;

        // Down to the corner
        d += `L ${currX} ${y} `;
        // Across to the next side
        if (i !== timelineData.length - 1) {
            d += `L ${nextX} ${y} `;
        }
    }

    const lastY = timelineData.length * segH + 120;
    d += `L ${leftX} ${lastY}`;
    d += `L ${rightX} ${lastY}`;
    d += `L ${rightX} ${lastY + 120}`;
    d += `L ${leftX} ${lastY + 120} Z`;

    return d;
  };

  const path = generatePath();

  return (
    <section
      ref={ref}
      className="bg-[#f3ecd2] py-32 min-h-[500vh] relative text-[#1a1a1a]"
    >
      {/* 🔥 WIDER CONTAINER */}
      <div className="relative max-w-6xl mx-auto px-6">

        <svg className="absolute w-full h-full" viewBox="0 0 500 3000">
          <path
            d={path}
            stroke="#1a1a1a"
            strokeWidth="5"
            fill="none"
            opacity="0.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            d={path}
            stroke="#1a1a1a"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
          />
        </svg>

        {timelineData.map((item, i) => {
          const isLeft = i % 2 === 0;
          const x = isLeft ? leftX : rightX;
          const y = (i + 1) * segH;

          return (
            <div key={i} className="absolute" style={{ top: y, left: x }}>

              {/* DATE */}
              <div
                className={`absolute ${isLeft ? "left-0" : "-translate-x-full text-right"
                  } -top-20`}
              >
                <h2 className="text-5xl sm:text-7xl font-bold tracking-widest">
                  {item.dateHeader}
                </h2>
              </div>

              {/* CONTENT */}
              <div
                className={`absolute ${isLeft ? "left-4 text-left" : "-translate-x-full text-right"
                  } top-8 max-w-[300px]`} // ⬅️ more width
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}

        {/* END */}
        <div
          className="absolute text-center"
          style={{
            top: timelineData.length * segH + 160,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <h2 className="text-3xl font-bold">END</h2>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
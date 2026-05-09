import React from 'react';
import { motion } from 'framer-motion';

const Prizes: React.FC = () => {
  const prizesData = [
    { label: "Winner", amount: "100,000", image: "/assets/1st-price.png" },
    { label: "1st Runner Up", amount: "50,000", image: "/assets/2nd-price.png" },
    { label: "2nd Runner Up", amount: "25,000", image: "/assets/3rd-price.png" },
    { label: "Consolation", amount: "25,000", image: "/assets/consolation-price.png" },
  ];

  return (
    <section id="prizes" className="py-16 px-4 sm:px-10 bg-[#f3ecd2] relative overflow-hidden flex flex-col justify-center min-h-[90vh] z-0">
      <style>{`
        .trophy-wrapper {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: flex-end;
          width: 100%;
          cursor: pointer;
        }

        .trophy-wrapper::after {
          content: "";
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 20px;
          background: radial-gradient(
            ellipse at center,
            rgba(0,0,0,0.25) 0%,
            rgba(0,0,0,0.1) 40%,
            transparent 70%
          );
          filter: blur(6px);
          opacity: 0.6;
          pointer-events: none;
          transition: all 0.4s ease;
        }

        .trophy-wrapper:hover::after {
          width: 80%;
          opacity: 0.3;
          bottom: -18px;
        }

        /* Subtle light gloss */
       

        .trophy {
          transform: perspective(1000px) rotateX(4deg) scale(1);
          transition: all 0.4s ease;
          filter: 
            drop-shadow(0px 25px 35px rgba(0,0,0,0.18))
            drop-shadow(0px 8px 12px rgba(0,0,0,0.12));
          will-change: transform, filter;
        }

        .trophy-wrapper:hover .trophy {
          transform: perspective(1000px) rotateX(0deg) scale(1.05);
          filter: 
            drop-shadow(0px 35px 50px rgba(0,0,0,0.25))
            drop-shadow(0px 12px 20px rgba(0,0,0,0.18));
        }

        .trophy.winner {
          transform: perspective(1000px) rotateX(3deg) scale(1.08);
          filter: drop-shadow(0px 40px 60px rgba(0,0,0,0.28));
        }

        .trophy-wrapper:hover .trophy.winner {
          transform: perspective(1000px) rotateX(0deg) scale(1.12);
        }
      `}</style>
      {/* Background Enhancement removed to match website background color */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute left-3 sm:left-6 lg:left-10 top-8 sm:top-10 w-14 h-14 sm:w-20 sm:h-20 opacity-15 sm:opacity-20" viewBox="0 0 64 64" fill="none">
          <rect x="10" y="24" width="44" height="30" rx="4" stroke="#1a1a1a" strokeWidth="2.6" />
          <path d="M32 24V54M10 34H54" stroke="#1a1a1a" strokeWidth="2.6" />
          <path d="M20 24C14 24 14 14 22 14C27 14 30 19 32 24M44 24C50 24 50 14 42 14C37 14 34 19 32 24" stroke="#1a1a1a" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
        <svg className="absolute right-3 sm:right-6 lg:right-10 top-10 sm:top-12 w-16 h-16 sm:w-24 sm:h-24 opacity-15 sm:opacity-20" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="25" stroke="#1a1a1a" strokeWidth="2.4" />
          <path d="M36 24V48M26 27C28.5 24.5 31.5 23 36 23C42.5 23 46 26.3 46 31C46 34.7 43.5 37.2 38 38.1L33 39C29 39.7 27 41.5 27 44.3C27 47.8 30.3 50 36 50C40.8 50 44 48.6 46.5 45.8" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <svg className="absolute left-[4%] sm:left-[8%] bottom-8 sm:bottom-10 w-16 h-16 sm:w-24 sm:h-24 opacity-15 sm:opacity-20" viewBox="0 0 80 80" fill="none">
          <rect x="12" y="20" width="56" height="46" rx="8" stroke="#1a1a1a" strokeWidth="2.4" />
          <path d="M26 20L40 10L54 20M24 32H56" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 32V66" stroke="#1a1a1a" strokeWidth="2.4" />
        </svg>
        <svg className="absolute right-[4%] sm:right-[8%] bottom-6 sm:bottom-8 w-16 h-16 sm:w-24 sm:h-24 opacity-15 sm:opacity-20" viewBox="0 0 80 80" fill="none">
          <path d="M14 62H66M20 62L28 20H52L60 62M33 30C33 25 36.5 21.5 40 21.5C43.5 21.5 47 25 47 30" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="28" cy="20" r="3.5" fill="#1a1a1a" />
          <circle cx="52" cy="20" r="3.5" fill="#1a1a1a" />
        </svg>
        <span className="absolute left-[12%] top-[30%] w-2 h-2 rounded-full bg-[#f3c972]/65 opacity-40" />
        <span className="absolute left-[80%] top-[24%] w-2.5 h-2.5 rounded-full bg-[#b7a0c3]/60 opacity-35" />
        <span className="absolute left-[86%] top-[62%] w-1.5 h-1.5 rounded-full bg-[#95b8c8]/70 opacity-30" />
      </div>

      <div className="max-w-[1440px] w-full mx-auto relative z-10 flex flex-col items-center">

        {/* Retro Header layout */}
        <div className="text-center mb-6 sm:mb-10 z-20">
          <div className="h-[3px] w-24 bg-[#1a1a1a] mx-auto mb-4 origin-center opacity-80" />

          <h2
            className="font-display text-[#1a1a1a] uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1, letterSpacing: '0.05em' }}
          >
            PRIZES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-end justify-center w-full max-w-[1200px] px-2 sm:px-4 gap-y-12 gap-x-2 sm:gap-x-8 lg:gap-4 xl:gap-8 mx-auto">
          {prizesData.map((prize, index) => {
            let orderClass = "";
            let imgWidthClass = "";
            let amountSizeClass = "";

            if (index === 0) { // Winner
              orderClass = "order-1 lg:order-2 transform scale-105 lg:mx-4";
              imgWidthClass = "w-[40%] max-w-[100px] lg:w-full lg:max-w-[180px] mb-2 md:mb-3";
              amountSizeClass = "text-4xl md:text-5xl lg:text-6xl";
            }
            else if (index === 1) { // 1st Runner Up
              orderClass = "order-2 lg:order-1 transform scale-105 lg:scale-100";
              imgWidthClass = "w-[40%] max-w-[100px] lg:w-[90%] lg:max-w-[150px] mb-2 md:mb-3";
              amountSizeClass = "text-4xl md:text-5xl lg:text-5xl";
            }
            else if (index === 2) { // 2nd Runner Up
              orderClass = "order-3 lg:order-3 transform scale-105 lg:scale-100";
              imgWidthClass = "w-[40%] max-w-[100px] lg:w-[85%] lg:max-w-[130px] mb-2 md:mb-3";
              amountSizeClass = "text-4xl md:text-5xl lg:text-5xl";
            }
            else { // Consolation
              orderClass = "order-4 lg:order-4 lg:-ml-6 xl:-ml-10 transform scale-105 lg:scale-100";
              imgWidthClass = "w-[40%] max-w-[100px] lg:w-[80%] lg:max-w-[110px] mb-2 md:mb-3";
              amountSizeClass = "text-4xl md:text-5xl lg:text-4xl";
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                  delay: (3 - index) * 0.4
                }}
                className={`${orderClass} flex-1 flex flex-col items-center justify-end text-center transition-transform duration-500 h-full pt-4 min-w-0`}
              >
                {/* Image Container */}
                <div className="flex items-end justify-center mb-1 min-h-[120px] xl:min-h-[180px] w-full">
                  <div className="trophy-wrapper">
                    <img
                      src={prize.image}
                      alt={prize.label}
                      className={`trophy ${index === 0 ? "winner" : ""} ${imgWidthClass} h-auto object-contain mx-auto`}
                    />
                  </div>
                </div>

                {/* Amount */}
                <h3
                  className={`font-display font-black ${amountSizeClass} mb-1 leading-none tracking-wide lg:mt-8`}
                  style={{
                    color: "#B45309",
                    // textShadow: "0px -1px 1px rgba(255,255,255,0.4), 0px 4px 10px rgba(0,0,0,0.25), 0px 8px 16px rgba(0,0,0,0.15)" 
                  }}
                >
                  <span className="font-sans font-black text-[0.75em] mr-1 align-baseline relative -top-[0.05em]">{'\u20B9'}</span>{prize.amount}
                </h3>

                {/* Label */}
                <p className="font-sans text-[#3A342E] font-bold text-xs md:text-sm uppercase tracking-widest mt-0">
                  {prize.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Prizes;
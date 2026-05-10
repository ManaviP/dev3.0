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
    <section id="prizes" className="py-16 px-4 sm:px-10 bg-[#00040D] relative overflow-hidden flex flex-col justify-center min-h-[90vh] rounded-t-[2.5rem] rounded-b-[2.5rem] md:rounded-t-[4rem] md:rounded-b-[4rem] shadow-[0px_-6px_0px_#f97028,0px_6px_0px_#f97028] sm:shadow-[0px_-10px_0px_#f97028,0px_10px_0px_#f97028] z-20">
      <style>{`
        .trophy-wrapper {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: flex-end;
          width: 100%;
          cursor: pointer;
        }

        .trophy {
          transform: perspective(1000px) rotateX(4deg) scale(1);
          transition: all 0.4s ease;
          will-change: transform;
        }

        .trophy-wrapper:hover .trophy {
          transform: perspective(1000px) rotateX(0deg) scale(1.05);
        }

        .trophy.winner {
          transform: perspective(1000px) rotateX(3deg) scale(1.08);
        }

        .trophy-wrapper:hover .trophy.winner {
          transform: perspective(1000px) rotateX(0deg) scale(1.12);
        }

        .isometric-bg {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='103.923' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23FBBF24' stroke-width='1.5' stroke-opacity='0.25' fill='none'%3E%3Cpath d='M 0 0 L 103.923 60 M 0 60 L 103.923 0 M 51.9615 0 L 51.9615 60 M 0 0 L 0 60 M 103.923 0 L 103.923 60' /%3E%3C/g%3E%3C/svg%3E");
          background-size: 103.923px 60px;
          mask-image: linear-gradient(to bottom left, black 5%, transparent 60%), linear-gradient(to top right, black 5%, transparent 60%);
          -webkit-mask-image: linear-gradient(to bottom left, black 5%, transparent 60%), linear-gradient(to top right, black 5%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
      {/* Isometric Grid Background */}
      <div className="isometric-bg"></div>


      <div className="max-w-[1440px] w-full mx-auto relative z-10 flex flex-col items-center">

        {/* Retro Header layout */}
        <div className="text-center mb-6 sm:mb-10 z-20 relative">
          {/* Background Mask to hide grid lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] max-w-[500px] h-[200%] bg-[radial-gradient(ellipse_at_center,#00040D_40%,transparent_75%)] z-[-1] pointer-events-none"></div>

          <div className="h-[3px] w-24 bg-white mx-auto mb-4 origin-center opacity-80" />

          <h2
            className="font-display text-white uppercase drop-shadow-lg"
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
                className={`${orderClass} flex-1 flex flex-col items-center justify-end text-center transition-transform duration-500 h-full pt-4 min-w-0 relative`}
              >
                {/* Background Mask to hide grid lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[120%] bg-[radial-gradient(ellipse_at_center,#00040D_30%,transparent_70%)] z-[-1] pointer-events-none"></div>

                {/* Image Container */}
                <div className="flex items-end justify-center mb-1 min-h-[120px] xl:min-h-[180px] w-full relative z-10">
                  


                  <div className="trophy-wrapper z-10">
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
                    color: "#eaeaeaff",
                    textShadow: "3px 4px 0px #ea580c, 0px 0px 20px rgba(251, 191, 36, 0.6)"
                  }}
                >
                  <span className="font-sans font-black text-[0.75em] mr-1 align-baseline relative -top-[0.05em] text-white">{'\u20B9'}</span>{prize.amount}
                </h3>

                {/* Label */}
                <p className="font-sans text-gray-300 font-bold text-xs md:text-sm uppercase tracking-widest mt-0">
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
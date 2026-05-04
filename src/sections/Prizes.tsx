import React from 'react';
import PrizeCard from '../components/PrizeCard';

const Prizes: React.FC = () => {
  const prizesData = [
    { title: "1st PRIZE", amount: "100,000", isMain: true, mainColor: "#F2C94C", accentColor: "#F9E7A1", metalGradient: "linear-gradient(180deg, #F9E7A1 0%, #F2C94C 45%, #D4A82A 100%)" },
    { title: "2nd PRIZE", amount: "50,000", isMain: false, mainColor: "#C9CCD1", accentColor: "#F1F3F5", metalGradient: "linear-gradient(180deg, #F1F3F5 0%, #C9CCD1 50%, #8C9198 100%)" },
    { title: "3rd PRIZE", amount: "25,000", isMain: false, mainColor: "#B87333", accentColor: "#E0B084", metalGradient: "linear-gradient(180deg, #E0B084 0%, #B87333 50%, #7A4E2D 100%)" },
    { title: "CONSOLATION", amount: "25,000", isMain: false, mainColor: "#7A3B2F", accentColor: "#5A2620", metalGradient: "linear-gradient(180deg, #A95747 0%, #E6A18F 50%, #7A4E2D 100%)" },
  ];

  return (
    <section id="prizes" className="py-16 px-4 sm:px-10 bg-[#f3ecd2] relative overflow-hidden flex flex-col justify-center min-h-[90vh] z-0">

      {/* Background Enhancement: Large Soft Black Circle centered */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-[100%] bg-black/10 blur-[80px]" />
      </div>
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

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">

        {/* Retro Header layout */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="h-[3px] w-24 bg-[#1a1a1a] mx-auto mb-4 origin-center opacity-80" />

          <h2
            className="font-display text-[#1a1a1a] uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1, letterSpacing: '0.05em' }}
          >
            PRIZES
          </h2>
        </div>

        <div className="flex flex-col xl:flex-row items-center xl:items-end justify-center w-full px-2">
          {prizesData.map((prize, index) => {
            let orderClass = "";
            let zIndex = 10;
            let heightClass = "";
            let widthClass = "";
            let margins = "";
            let transform = "";

            if (index === 0) { // 1st Prize [Center]
              orderClass = "order-1 xl:order-2";
              zIndex = 50;
              heightClass = "h-[250px] sm:h-[380px] xl:h-[420px]";
              widthClass = "w-full max-w-[340px] xl:max-w-[460px]";
              margins = "my-4 xl:my-0";
              transform = "xl:translate-y-[-20px] scale-100 xl:scale-105";
            }
            else if (index === 1) { // 2nd Prize [Left]
              orderClass = "order-2 xl:order-1";
              zIndex = 40;
              heightClass = "h-[250px] sm:h-[300px] xl:h-[340px]";
              widthClass = "w-full max-w-[300px] xl:max-w-[400px]";
              margins = "xl:-mr-6 my-2 xl:my-0";
              transform = "rotate-0 xl:-rotate-3";
            }
            else if (index === 2) { // 3rd Prize [Right]
              orderClass = "order-3 xl:order-3";
              zIndex = 40;
              heightClass = "h-[250px] sm:h-[275px] xl:h-[300px]";
              widthClass = "w-full max-w-[280px] xl:max-w-[380px]";
              margins = "xl:-ml-6 my-2 xl:my-0";
              transform = "rotate-0 xl:rotate-3";
            }
            else { // Consolation [Right of 3rd]
              orderClass = "order-4 xl:order-4";
              zIndex = 30;
              heightClass = "h-[250px] sm:h-[235px] xl:h-[250px]";
              widthClass = "w-full max-w-[250px] xl:max-w-[340px]";
              margins = "xl:-ml-4 mt-2 xl:mt-0";
              transform = "rotate-0 xl:rotate-6 xl:translate-y-[20px]";
            }

            return (
              <div
                key={index}
                className={`${orderClass} ${margins} ${widthClass} ${heightClass} relative transition-all duration-300 hover:!z-[60]`}
                style={{ zIndex }}
              >
                <div className={`w-full h-full ${transform} transition-all duration-300 origin-bottom`}>
                  <PrizeCard
                    title={prize.title}
                    amount={prize.amount}
                    isMain={prize.isMain}
                    mainColor={prize.mainColor}
                    accentColor={prize.accentColor}
                    metalGradient={prize.metalGradient}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Prizes;

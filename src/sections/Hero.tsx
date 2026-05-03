export default function DevHackHeroCompact() {
  return (
    <section id="hero" className="relative w-full bg-cream text-white">
      {/* Sticky Background */}
      <div className="sticky top-0 w-full h-screen z-0 overflow-hidden">
        <img
          src="/assets/final.jpeg"
          alt="DevHack Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10 -mt-[100vh]">
        {/* Initial Hero Screen Content */}
        <div className="h-screen flex flex-col items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center -mt-24">
            <h1 className="text-center font-bold flex flex-col items-center z-10 -translate-y-8 md:-translate-y-12">
              <div className="text-[clamp(5rem,12vw,9rem)] leading-none mb-1 hero-main-title pointer-events-auto">DSU</div>
              <div className="text-[clamp(5rem,15vw,11rem)] leading-none -mt-12 mb-1 hero-main-title pointer-events-auto">Devhack</div>
              <div className="text-[clamp(4rem,12vw,8rem)] leading-none -mt-8 hero-main-title pointer-events-auto">3.0</div>
            </h1>
            
            {/* Date Badge and Hanging About Section */}
            <div className="relative -mt-10 flex flex-col items-center z-20 pointer-events-auto">
              <div className="hero-date-badge text-center whitespace-nowrap shadow-2xl relative z-20">
                SEPTEMBER 18TH & 19TH, 2026
              </div>
              
              {/* Hanging Image (Positioned directly below the badge) */}
              {/* TO CHANGE THE SIZE OF THE ABOUT IMAGE: Modify the 'w-[...]' and 'md:w-[...]' values in the div below */}
              <div className="absolute top-full -mt-2 w-[85vw] md:w-[400px] flex justify-center z-10 pb-20 -rotate-1 origin-top">
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
        <div className="h-[40vh] md:h-[60vh] pointer-events-none" />
      </div>
    </section>
  );
}

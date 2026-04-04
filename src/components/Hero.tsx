
export default function Hero() {
  return (
    <section className="w-full min-h-screen p-4 md:p-6 bg-[#1a1a1a] pt-28" id="hero" style={{ perspective: '2000px' }}>
      {/* Container card matching the reference image */}
      <div className="relative w-full h-[calc(100vh-8rem)] rounded-[2.5rem] border-[6px] border-[#1a1a1a] overflow-hidden sunburst-bg flex flex-col justify-between">

        {/* Top bar (lowered to avoid Navbar overlap) */}
        <div className="relative z-30 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 w-full p-4 md:p-8 pointer-events-none mt-2 md:mt-0">
          <div className="flex items-center gap-2 font-bold font-sans text-xs md:text-lg bg-[#f3ecd2] text-[#1a1a1a] px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl border-[3px] md:border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] pointer-events-auto hover:bg-white transition-colors cursor-pointer text-center">
            <span className="text-[#f97028] text-sm md:text-xl">❤️</span> Brought to you <span className="hidden md:inline">by FlowMCR</span><span className="md:hidden"><br />by FlowMCR</span>
          </div>
          
          <button className="groovy-btn font-display tracking-widest text-xs sm:text-sm md:text-lg bg-[#f489a3] text-[#1a1a1a] px-4 py-2 md:px-6 md:py-3 rounded-full border-[3px] md:border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] pointer-events-auto hover:bg-[#f3a20f] transition-all">
            Reserve ✴ your wristband
          </button>
        </div>

        {/* Center Title */}
        <div className="absolute top-[50%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full text-center pointer-events-none flex flex-col items-center">
          <h1 className="text-[5rem] sm:text-[7rem] md:text-[11rem] lg:text-[13rem] leading-[0.85] font-display hero-title tracking-tighter z-20 whitespace-nowrap">
            DEVHACK3.0
          </h1>
          <p className="mt-4 md:mt-6 text-xl md:text-4xl font-display uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#1a1a1a] drop-shadow-[2px_2px_0px_#f3ecd2] rotate-[-1deg]">
            A 24hr National Hackathon
          </p>
        </div>

        {/* Decorative Badge Stickers */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* Left Robot Badge - Lower Left */}
          <div className="absolute bottom-[10%] left-[5%] md:left-[8%] w-32 h-32 md:w-64 md:h-64 rounded-[40%] border-[4px] md:border-[8px] border-[#f3ecd2] overflow-hidden shadow-[4px_4px_0_#1a1a1a] md:shadow-[8px_8px_0_#1a1a1a] animate-float-left pointer-events-auto hover:scale-105 transition-transform rotate-[-12deg]">
            <img src="/assets/robot.png" alt="Robot" className="w-[120%] h-[120%] object-cover -ml-[10%] -mt-[10%]" />
          </div>
          
          {/* Right Laptop Badge - Middle Right */}
          <div className="absolute top-[45%] right-[2%] md:right-[5%] w-36 h-36 md:w-72 md:h-72 rounded-full border-[4px] md:border-[8px] border-[#f3ecd2] overflow-hidden shadow-[4px_4px_0_#1a1a1a] md:shadow-[8px_8px_0_#1a1a1a] animate-float-right pointer-events-auto hover:scale-105 transition-transform z-30 rotate-[15deg]">
            <img src="/assets/laptop.png" alt="Laptop" className="w-[120%] h-[120%] object-cover -ml-[10%] -mt-[10%]" />
          </div>

          {/* Top Lightbulb Badge - Upper Left */}
          <div className="absolute top-[15%] left-[10%] md:left-[15%] w-24 h-24 md:w-52 md:h-52 rounded-[30%] border-[4px] md:border-[6px] border-[#f3ecd2] overflow-hidden shadow-[4px_4px_0_#1a1a1a] md:shadow-[8px_8px_0_#1a1a1a] animate-float-center pointer-events-auto hover:scale-105 transition-transform z-30 rotate-[10deg]">
            <img src="/assets/lightbulb.png" alt="Lightbulb" className="w-[120%] h-[120%] object-cover -ml-[10%] -mt-[10%]" />
          </div>
        </div>

        {/* Bottom Sun graphic & Info */}
        <div className="relative z-30 flex justify-center w-full pointer-events-none mt-auto">
          {/* Half sun graphic at the bottom center */}
          <div className="w-[85%] max-w-[240px] md:max-w-none md:w-[400px] h-[80px] md:h-[180px] bg-[#f3ecd2] rounded-t-[100px] md:rounded-t-full border-t-[6px] md:border-t-[8px] border-l-[6px] md:border-l-[8px] border-r-[6px] md:border-r-[8px] border-[#1a1a1a] flex flex-col items-center justify-start pt-4 md:pt-12 shadow-[0_-4px_0px_#1a1a1a] md:shadow-[0_-8px_0px_#1a1a1a] translate-y-2 relative">

          </div>
        </div>
      </div>
    </section>
  )
}

export default function Speakers() {
  return (
    <section id="speakers" className="w-full bg-[#f3ecd2] text-[#1a1a1a] py-32 px-8 relative overflow-hidden border-t-8 border-b-8 border-[#f97028]">
      {/* Decorative pipes/line art */}
      <div className="absolute top-0 left-10 w-4 h-full border-r-[8px] border-dashed border-[#1a1a1a] opacity-30 flex flex-col justify-between">
        <div className="w-[200px] h-[8px] bg-[#1a1a1a] mt-32 ml-4"></div>
      </div>
      <div className="absolute top-0 right-10 w-4 h-[60%] border-l-[12px] border-solid border-[#1a1a1a] opacity-20"></div>
      <div className="absolute top-20 right-20 w-40 h-40 border-[8px] border-[#f489a3] rounded-full flex items-center justify-center opacity-80">
        <div className="w-20 h-20 bg-[#f3a20f] rotate-45 transform"></div>
      </div>
      <div className="absolute bottom-20 left-20 w-32 h-32 border-[8px] border-[#f97028] rounded-full flex items-center justify-center opacity-80">
        <div className="w-16 h-16 bg-[#f489a3] rounded-full"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
        <h2 className="font-display mb-10 text-[#1a1a1a] drop-shadow-[2px_2px_0px_#f97028] md:drop-shadow-[4px_4px_0px_#f97028]"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
          Speakers & Workshops
        </h2>
        
        <p className="font-sans text-xl md:text-2xl font-bold mb-20 max-w-3xl px-6 py-4 bg-[#f489a3] rounded-2xl border-4 border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a]">
          Join industry leaders, indie makers, and retro enthusiasts for a weekend of mind-bending talks and creative coding workshops.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-20">
          {[
            { tag: "Keynote", name: "Dr. Groovy", color: "bg-[#f489a3]" },
            { tag: "Design", name: "Pixel Artist", color: "bg-[#f3a20f]" },
            { tag: "Code", name: "Hackerman", color: "bg-[#f97028]" }
          ].map((speaker, i) => (
            <div key={i} className={`relative flex flex-col items-center justify-center p-8 border-[6px] border-[#1a1a1a] rounded-3xl ${speaker.color} shadow-[12px_12px_0px_#1a1a1a] hover:translate-y-2 hover:shadow-[4px_4px_0px_#1a1a1a] transition-all cursor-pointer`}>
              <div className="absolute -top-6 -right-6 text-5xl">✨</div>
              <div className="w-32 h-32 bg-[#f3ecd2] border-[6px] border-[#1a1a1a] rounded-full mb-6 flex items-center justify-center overflow-hidden">
                <span className="font-display text-5xl text-[#1a1a1a]">🤖</span>
              </div>
              <h3 className="font-display text-4xl mb-4">{speaker.name}</h3>
              <span className="groovy-pill border-[#1a1a1a] text-[#1a1a1a] border-[4px] bg-white text-xl">
                {speaker.tag}
              </span>
            </div>
          ))}
        </div>
        
        <button className="groovy-pill border-[#1a1a1a] text-[#1a1a1a] text-2xl font-bold px-12 py-5 hover:bg-[#1a1a1a] hover:text-[#f3ecd2] bg-transparent border-4 shadow-[6px_6px_0px_#1a1a1a]">
          Become a Speaker
        </button>
      </div>
    </section>
  )
}

export default function Marquee() {
  return (
    <div className="w-full bg-[#f97028] text-[#1a1a1a] border-b-[3px] border-[#1a1a1a] overflow-hidden whitespace-nowrap py-1">
      <div className="inline-block animate-marquee font-bold text-lg md:text-xl uppercase tracking-widest">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="mx-8">
            🌟 EARLY BIRD TICKETS ON SALE NOW! 🚀 DEVHACK <span className="font-number-bold">3.0</span> 🌟
          </span>
        ))}
      </div>
    </div>
  )
}

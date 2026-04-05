export default function Marquee() {
  return (
    <div className="w-full bg-[#f97028] text-[#1a1a1a] border-b-[3px] border-[#1a1a1a] overflow-hidden whitespace-nowrap py-2">
      <div className="inline-block animate-marquee font-bold text-2xl uppercase tracking-widest">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="mx-12">
            🌟 EARLY BIRD TICKETS ON SALE NOW! 🚀 DEVHACK 3.0 🌟
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-[#1a1a1a]"
      style={{
        height: '100dvh',
        boxSizing: 'border-box',
        /* Minimize black border: only top padding for navbar */
        paddingTop: 'clamp(7.5rem, 12vw, 9rem)',
        paddingLeft: 'clamp(4px, 1vw, 8px)',
        paddingRight: 'clamp(4px, 1vw, 8px)',
        paddingBottom: 'clamp(4px, 1vw, 8px)',
      }}
    >
      {/* Card = fills viewport with minimal black edge */}
      <div
        className="relative w-full rounded-[1.5rem] md:rounded-[2.5rem] border-[4px] md:border-[6px] border-[#1a1a1a] overflow-hidden sunburst-bg"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >

        {/* ── Center content ─────────────────────────────── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 20,
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          {/* Main title: High contrast off-white with thick outline */}
          <h1
            className="font-display hero-title tracking-tighter leading-none"
            style={{
              fontSize: 'clamp(3rem, 11vw, 13rem)',
              color: '#f3ecd2',
              WebkitTextStroke: 'clamp(4px, 0.8vw, 10px) #1a1a1a',
              paintOrder: 'stroke fill',
              letterSpacing: '0.001em',
            }}
          >
            DEVHACK 3.0
          </h1>

          {/* Subtitle */}
          <p
            className="font-display uppercase text-[#1a1a1a]"
            style={{
              fontSize: 'clamp(0.85rem, 2.5vw, 2.8rem)',
              letterSpacing: '0.15em',
              textShadow: '2px 2px 0 #f3ecd2',
              marginTop: '0.5rem',
              lineHeight: 1,
              transform: 'rotate(-1deg)',
            }}
          >
            A 36hr National Hackathon
          </p>

          {/* Location pill */}
          <div
            className="inline-flex items-center gap-2 bg-[#1a1a1a]/70 text-[#f3ecd2] font-sans font-semibold uppercase tracking-widest rounded-full border-2 border-[#f3ecd2]/40 backdrop-blur-sm"
            style={{
              fontSize: 'clamp(0.5rem, 0.9vw, 0.8rem)',
              padding: 'clamp(0.25rem, 0.5vw, 0.45rem) clamp(0.7rem, 1.5vw, 1.25rem)',
              marginTop: 'clamp(0.75rem, 2vw, 1.5rem)',
            }}
          >
            ✦ DSU Harohalli, Bangalore ✦
          </div>
         <div
  className="relative inline-flex items-center justify-center font-sans uppercase tracking-widest rounded-full backdrop-blur-sm"
  style={{
 fontSize: 'clamp(0.8rem, 1.6vw, 1.3rem)',
    padding: 'clamp(0.35rem, 0.7vw, 0.6rem) clamp(0.9rem, 2vw, 1.6rem)',
    marginTop: 'clamp(0.75rem, 2vw, 1.5rem)',

    // ✅ TRUE bold styling
    fontWeight: 900,
    letterSpacing: '0.18em',

    color: '#1a1a1a',
    background: 'linear-gradient(135deg, #f3ecd2, #ffe4b5)',
    border: '2px solid #1a1a1a',

    // ✨ stronger visual weight
    textShadow: '1px 1px 0 #f3ecd2, 2px 2px 0 rgba(0,0,0,0.2)',

    boxShadow: `
      0 0 0 2px rgba(243,236,210,0.4),
      0 6px 0 #1a1a1a,
      0 0 20px rgba(249,112,40,0.25)
    `,

    transform: 'rotate(-1deg)',
    animation: 'datePulse 2.5s ease-in-out infinite',
  }}
>
   September 18–19, 2026 
</div>
        </div>

        {/* ── Floating badge stickers ─────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Robot — bottom left */}
          <div
            className="absolute animate-float-left pointer-events-auto hover:scale-105 transition-transform opacity-40 sm:opacity-100"
            style={{
              bottom: '10%',
              left: 'clamp(2%, 5vw, 7%)',
              width: 'clamp(4rem, 12vw, 14rem)',
              height: 'clamp(4rem, 12vw, 14rem)',
              borderRadius: '40%',
              border: 'clamp(3px, 0.4vw, 7px) solid #f3ecd2',
              boxShadow: '4px 4px 0 #1a1a1a',
              overflow: 'hidden',
              transform: 'rotate(-12deg)',
            }}
          >
            <img src="/assets/robot.png" alt="Robot"
              className="w-[120%] h-[120%] object-cover -ml-[10%] -mt-[10%]" />
          </div>

          {/* Laptop — mid right */}
          <div
            className="absolute animate-float-right pointer-events-auto hover:scale-105 transition-transform"
            style={{
              top: '38%',
              right: 'clamp(1.5%, 3.5vw, 6%)',
              width: 'clamp(6rem, 13vw, 15rem)',
              height: 'clamp(6rem, 13vw, 15rem)',
              borderRadius: '50%',
              border: 'clamp(3px, 0.4vw, 7px) solid #f3ecd2',
              boxShadow: '4px 4px 0 #1a1a1a',
              overflow: 'hidden',
              transform: 'rotate(15deg)',
              zIndex: 30,
            }}
          >
            <img src="/assets/laptop.png" alt="Laptop"
              className="w-[120%] h-[120%] object-cover -ml-[10%] -mt-[10%]" />
          </div>

          {/* Lightbulb — moved further LEFT and DOWN to clear the title completely */}
          <div
            className="absolute animate-float-center pointer-events-auto hover:scale-105 transition-transform hidden sm:block"
            style={{
              bottom: '15%',
              left: 'clamp(10%, 15vw, 20%)',
              width: 'clamp(3.5rem, 8vw, 10rem)',
              height: 'clamp(3.5rem, 8vw, 10rem)',
              borderRadius: '30%',
              border: 'clamp(2px, 0.35vw, 5px) solid #f3ecd2',
              boxShadow: '3px 3px 0 #1a1a1a',
              overflow: 'hidden',
              transform: 'rotate(10deg)',
              zIndex: 30,
            }}
          >
            <img src="/assets/lightbulb.png" alt="Lightbulb"
              className="w-[120%] h-[120%] object-cover -ml-[10%] -mt-[10%]" />
          </div>
        </div>

        {/* ── Bottom half-sun ─────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            zIndex: 30,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            flexShrink: 0,
            pointerEvents: 'none',
          }}
        >
          <div
            className="bg-[#f3ecd2]"
            style={{
              width: 'clamp(130px, 22vw, 360px)',
              height: 'clamp(44px, 8vw, 148px)',
              borderRadius: '9999px 9999px 0 0',
              borderTop: 'clamp(4px, 0.5vw, 7px) solid #1a1a1a',
              borderLeft: 'clamp(4px, 0.5vw, 7px) solid #1a1a1a',
              borderRight: 'clamp(4px, 0.5vw, 7px) solid #1a1a1a',
              boxShadow: '0 -4px 0 #1a1a1a',
              transform: 'translateY(2px)',
            }}
          />
        </div>

      </div>
    </section>
  )
}
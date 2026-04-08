import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaDiscord, FaMapMarkerAlt } from 'react-icons/fa';

function getWaveY(x: number, W: number, H: number, t: number) {
  const p = x / W;
  return (
    H * 0.58 +
    Math.sin(p * Math.PI * 3 - t * 1.1) * 20 +
    Math.sin(p * Math.PI * 6 + t * 0.75) * 10 +
    Math.sin(p * Math.PI * 11 - t * 1.8) * 5
  );
}

function AnimatedWaveEdge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const H = 100;

    const draw = () => {
      const W = wrap.offsetWidth;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      const t = tRef.current;
      ctx.clearRect(0, 0, W, H);

      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 2) {
        ctx.lineTo(x, getWaveY(x, W, H, t));
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = '#f97028';
      ctx.fill();

      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = getWaveY(x, W, H, t);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(212,160,40,0.95)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(212,140,20,0.7)';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      tRef.current += 0.016;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        top: -98,
        left: 0,
        right: 0,
        height: 100,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}

function MarqueeBand() {
  const chunk =
    'DEVHACK 3.0 ◈ DEVHACK 3.0 ◈ DEVHACK 3.0 ◈ DEVHACK 3.0 ◈ DEVHACK 3.0 ◈ ';

  return (
    <div
      className="relative z-30 overflow-hidden border-t border-b py-6 sm:py-8"
      style={{ borderColor: '#d4a02040' }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="pr-10 font-black uppercase text-black"
            style={{
              fontSize: 'clamp(1.4rem,3vw,2.4rem)', // 🔥 bigger text
              letterSpacing: '0.25em',
            }}
          >
            {chunk}
            {chunk}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Footer() {
  const links = [
    {
      href: 'https://discord.gg/uBcyhfmhx4',
      label: 'Discord',
      icon: <FaDiscord size={16} />,
    },
    {
      href: 'https://maps.app.goo.gl/qsv464XpD8xRFzFA7',
      label: 'Location',
      icon: <FaMapMarkerAlt size={16} />,
    },
  ];

  return (
    <footer
      className="relative overflow-visible px-4 pt-10 pb-2 sm:pt-20 sm:px-6 sm:pb-0"
      style={{ background: '#f97028', color: '#fff' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 3px)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 60%,rgba(200,80,10,0.08) 0%,transparent 55%),radial-gradient(ellipse at 80% 30%,rgba(220,100,20,0.06) 0%,transparent 50%)',
        }}
      />

      <AnimatedWaveEdge />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-6 pb-6 sm:gap-12 sm:pb-14 md:grid-cols-3 text-center md:text-left">
            <div className="flex flex-col gap-4 items-center md:items-start">
              <div>
                <div className="text-2xl font-black uppercase tracking-widest text-[#1a1a1a]">
                  DevHack 3.0
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-1 text-[#333]">
                  Contact
                </h3>
                <a
                  href="mailto:dsudevhack@dsu.edu.in"
                  className="text-sm hover:underline underline-offset-2 text-[#1a1a1a]"
                >
                  dsudevhack@dsu.edu.in
                </a>
                <div className="mt-3 text-xs text-[#1a1a1a]">
  <h4 className="font-bold uppercase tracking-[0.2em] mb-1 text-[#333]">
    Student Coordinators
  </h4>

  <p className="font-semibold">
    Trisha <span className="font-normal">- 9142332379</span>
  </p>

  <p className="font-semibold">
    Shreenidhi S<span className="font-normal">- 8317463317</span>
  </p>
</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex gap-3 justify-center flex-wrap">
                {links.map(({ href, label, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-black/20 text-[#1a1a1a]"
                  >
                    {icon}
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 items-center md:items-end md:text-right">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-3 text-[#333]">
                  Hackathon Venue
                </h3>
                {[
                  'Dayananda Sagar University',
                  'Harohalli, Bangalore',
                  'Karnataka — 562112',
                ].map((line) => (
                  <a
                    key={line}
                    href="https://maps.app.goo.gl/qsv464XpD8xRFzFA7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm mb-1 hover:underline underline-offset-2 text-[#1a1a1a]"
                  >
                    {line}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <MarqueeBand />
    </footer>
  );
}
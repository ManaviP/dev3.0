import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaDiscord, FaMapMarkerAlt } from 'react-icons/fa';

function getWaveY(x: number, W: number, H: number, t: number, isMobile: boolean) {
  const p = x / W;
  const damp = isMobile ? 0.3 : 1.0;
  return (
    H * 0.58 +
    Math.sin(p * Math.PI * 3 - t * 1.1) * (20 * damp) +
    Math.sin(p * Math.PI * 6 + t * 0.75) * (10 * damp) +
    Math.sin(p * Math.PI * 11 - t * 1.8) * (5 * damp)
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
      const isMobile = window.innerWidth < 768;
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
        ctx.lineTo(x, getWaveY(x, W, H, t, isMobile));
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = '#f97028';
      ctx.fill();

      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = getWaveY(x, W, H, t, isMobile);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(212,160,40,0.95)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(212,140,20,0.7)';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      tRef.current += isMobile ? 0.010 : 0.016;
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
      className="relative overflow-visible px-4 pt-0 pb-2 sm:pt-0 sm:px-6 sm:pb-0 bg-ui-primary"
      style={{ color: '#fff' }}
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
          <div className="grid gap-6 pb-3 sm:gap-12 sm:pb-4 md:grid-cols-3 text-center md:text-left">
            <div className="flex flex-col gap-4 items-center md:items-start">
              <div>
                <div className="text-2xl font-black uppercase tracking-widest text-[#1a1a1a] hidden lg:block">
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
                <div className="mt-3 text-xs text-[#1a1a1a]">
                  <h4 className="font-bold uppercase tracking-[0.2em] mb-1 text-[#333]">
                    Faculty Coordinators
                  </h4>
                  <p className="font-semibold">
                    Dr. Bipin Kumar Rai <span className="font-normal">- Associate Chair,CSE</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <h4 className="md:hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#333]/60">
                Venue Location
              </h4>
              {/* Desktop Map Only */}
              <div className="hidden md:block w-full h-[180px] rounded-2xl overflow-hidden border-2 border-black/10 shadow-lg bg-white/10 backdrop-blur-sm p-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.447477618471!2d77.44826500000001!3d12.660669199999998!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5b32ad06ec57%3A0x95e7a57b8a6b94d2!2sDayananda+Sagar+University+(DSU)+-+Main+Campus!5e0!3m2!1sen!2sin!4v1713881234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Mobile Location Button Only */}
              <div className="md:hidden flex gap-3 justify-center flex-wrap">
                {links.filter(l => l.label === 'Location').map(({ href, label, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-2 rounded-full border border-black/20 text-[#1a1a1a]"
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

              {/* Discord Button Always Visible */}
              <div className="mt-2 text-center md:text-right">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#333]/60 mb-2">
                  Join Us
                </h4>
                {links.filter(l => l.label === 'Discord').map(({ href, label, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-2 rounded-full bg-[#1a1a1a] text-white shadow-md hover:bg-black transition-colors"
                  >
                    {icon}
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="pt-2 flex items-center justify-center text-center text-sm text-[#1a1a1a]">
          <p className="font-semibold">
            Organised by Computer Science and Engineering Department
          </p>
        </div>
      </div>

    </footer>
  );
}
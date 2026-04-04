import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f97028] px-4 pb-0 pt-16 text-white sm:px-6 font-sans">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(243,162,15,0.28),transparent_40%),radial-gradient(circle_at_80%_35%,rgba(244,137,163,0.22),transparent_42%)]" />

      {/* Main Footer Content */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-6xl z-10"
      >
        {/* Grid Layout */}
        <div className="grid gap-10 pb-12 md:grid-cols-3">

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-black uppercase tracking-wider">Contact Us</h3>
            <p className="mt-3 text-sm text-white/90">
              📧 Email: dsudevhack@dsu.edu.in
            </p>
            <div className="mt-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/80">
                Student Coordinators
              </h4>
              <div className="mt-2 text-sm text-white/80">
                {/* Coordinators go here */}
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-xl font-black uppercase tracking-wider">Follow Us</h3>
            <div className="mt-3 flex gap-3">
              <a
                href="https://discord.gg/uBcyhfmhx4"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-3 py-1 text-xs font-bold tracking-wider transition hover:bg-white/20"
              >
                Discord
              </a>
              <a
                href="https://www.instagram.com/dsudevhack?igsh=MWEzeWNib2gxc2VudQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-3 py-1 text-xs font-bold tracking-wider transition hover:bg-white/20"
              >
                IG
              </a>
              <a
                href="https://maps.app.goo.gl/sK8xbJDBUnqXm8nd9"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-3 py-1 text-xs font-bold tracking-wider transition hover:bg-white/20"
              >
                Location
              </a>
            </div>
          </div>

          {/* Venue Section */}
          <div>
            <h3 className="text-xl font-black uppercase tracking-wider">Hackathon Venue</h3>
            <div className="mt-3 space-y-2">
              <a
                href="https://maps.app.goo.gl/sK8xbJDBUnqXm8nd9"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/90 transition hover:text-white hover:underline"
              >
                Dayananda Sagar University Harohalli
              </a>
              <a
                href="https://maps.app.goo.gl/sK8xbJDBUnqXm8nd9"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/90 transition hover:text-white hover:underline"
              >
                Bangalore, Karnataka 562112
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative border-t border-white/25 py-6">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="flex w-[200%] animate-marquee">
            <p className="w-1/2 shrink-0 text-left uppercase tracking-[0.22em] text-[#fbeacf]/80 font-light text-3xl md:text-5xl py-4 leading-tight">
              DEVHACK 3.0 • DEVHACK 3.0 • DEVHACK 3.0 • DEVHACK 3.0 • DEVHACK 3.0 • DEVHACK 3.0 • DEVHACK 3.0 •
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}

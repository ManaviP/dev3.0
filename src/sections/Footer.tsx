import { motion } from 'framer-motion';
import { FaDiscord, FaMapMarkerAlt } from 'react-icons/fa';

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
      className="relative overflow-visible px-4 pt-12 pb-6 sm:pt-16 sm:px-6 sm:pb-8 rounded-t-[3rem] sm:rounded-t-[4rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(166,140,123,0.3)] border-t border-[#A68C7B]/20 w-full"
      style={{
        background: 'linear-gradient(to bottom, #1A0F0A, #3A2316)',
        color: '#F4EFEA',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] rounded-t-[3rem] sm:rounded-t-[4rem] overflow-hidden"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 3px)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-t-[3rem] sm:rounded-t-[4rem] overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 20% 60%, rgba(91,59,42,0.4) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(91,59,42,0.3) 0%, transparent 50%)',
        }}
      />

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
                <div className="text-2xl font-black uppercase tracking-widest text-[#F4EFEA] hidden lg:block">
                  DevHack 3.0
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-1 text-[#A68C7B]">
                  Contact
                </h3>
                <a
                  href="mailto:dsudevhack@dsu.edu.in"
                  className="text-sm hover:underline underline-offset-2 text-[#F4EFEA]"
                >
                  dsudevhack@dsu.edu.in
                </a>
                <div className="mt-3 text-xs text-[#F4EFEA]">
                  <h4 className="font-bold uppercase tracking-[0.2em] mb-1 text-[#A68C7B]">
                    Student Coordinators
                  </h4>
                  <p className="font-semibold">
                    Trisha <span className="font-normal">- 9142332379</span>
                  </p>
                  <p className="font-semibold">
                    Shreenidhi S<span className="font-normal">- 8317463317</span>
                  </p>
                </div>
                <div className="mt-3 text-xs text-[#F4EFEA]">
                  <h4 className="font-bold uppercase tracking-[0.2em] mb-1 text-[#A68C7B]">
                    Faculty Coordinators
                  </h4>
                  <p className="font-semibold">
                    Dr. Bipin Kumar Rai <span className="font-normal">- Associate Chair,CSE</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <h4 className="md:hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68C7B]">
                Venue Location
              </h4>
              {/* Desktop Map Only */}
              <div className="hidden md:block w-full h-[180px] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(91,59,42,0.6)] bg-[#3A2316]/50 backdrop-blur-sm p-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.447477618471!2d77.44826500000001!3d12.660669199999998!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5b32ad06ec57%3A0x95e7a57b8a6b94d2!2sDayananda+Sagar+University+(DSU)+-+Main+Campus!5e0!3m2!1sen!2sin!4v1713881234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-700 rounded-xl"
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
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-2 rounded-full border border-[#A68C7B]/40 text-[#F4EFEA] hover:bg-[#5B3B2A]/30 shadow-[0_0_15px_rgba(91,59,42,0.4)] transition-colors"
                  >
                    {icon}
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 items-center md:items-end md:text-right">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-3 text-[#A68C7B]">
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
                    className="block text-sm mb-1 hover:underline underline-offset-2 text-[#F4EFEA]"
                  >
                    {line}
                  </a>
                ))}
              </div>

              {/* Discord Button Always Visible */}
              <div className="mt-2 text-center md:text-right">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68C7B] mb-2">
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
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-2 rounded-full bg-[#5B3B2A] text-[#F4EFEA] shadow-[0_0_20px_rgba(91,59,42,0.8)] border border-[#A68C7B]/20 hover:bg-[#A68C7B] hover:text-[#1A0F0A] transition-all"
                  >
                    {icon}
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="pt-8 sm:pt-12 flex items-center justify-center text-center text-sm text-[#F4EFEA]/80">
          <p className="font-semibold">
            Organised by Computer Science and Engineering Department
          </p>
        </div>
      </div>
    </footer>
  );
}
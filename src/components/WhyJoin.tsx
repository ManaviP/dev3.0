import { motion } from 'framer-motion';
import ParallaxWrapper from './ParallaxWrapper';

const reasons = [
  {
    title: 'Build With Intent',
    copy: 'Transform your concept into a working prototype with track-specific technical support.'
  },
  {
    title: 'Meet Builders',
    copy: 'Collaborate with developers, designers, and founders in an immersive festival setting.'
  },
  {
    title: 'Launch Your Future',
    copy: 'Gain exposure to recruiters, incubators, and ecosystem partners after demo day.'
  }
];

export default function WhyJoin() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <ParallaxWrapper speed={22} className="mb-10 text-center">
          <h2 className="text-3xl font-black uppercase tracking-wider sm:text-5xl text-[#f3ecd2]">Why Join DevHack 3.0</h2>
        </ParallaxWrapper>

        <div className="grid gap-6 md:grid-cols-3">
          {reasons.map((reason, idx) => (
            <ParallaxWrapper key={reason.title} speed={22 + idx * 8} rotate={1.8}>
              <motion.div
                initial={{ opacity: 0, y: 34, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group rounded-3xl border border-[#ffffff8a] bg-gradient-to-br from-white/90 to-[#f6e9d1]/90 p-6 shadow-card backdrop-blur-sm"
              >
                <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-wide text-[#1a1a1a]" style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>{reason.title}</h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-[#5d275d]/90">{reason.copy}</p>
                <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#ff8a3d] to-[#ff5ea8] transition-all group-hover:w-32" />
              </motion.div>
            </ParallaxWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

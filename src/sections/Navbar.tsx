import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';

const links = [
  { label: 'Journey', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Themes', href: '#themes' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 220], [78, 58]);
  const navBlur = useTransform(scrollY, [0, 220], [10, 18]);
  const progressX = useTransform(scrollY, [0, 3000], [0, 1]);
  const navBackdrop = useMotionTemplate`blur(${navBlur}px)`;

  return (
    <motion.header
      style={{ height: navHeight, backdropFilter: navBackdrop, WebkitBackdropFilter: navBackdrop, top: 43 }}
      className="fixed inset-x-0 z-50 border-b border-black/15 bg-[#F3ecd2]/70 shadow-glass"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#hero" className="flex items-center">
          <img src="/logos/logoo%205.png" alt="DEVHACK 3.0 Logo" className="h-10 w-auto object-contain" />
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-semibold text-[#1a1a1a]/90 transition hover:text-[#1a1a1a]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2.8 + i, repeat: Infinity, ease: 'easeInOut' }}
              className="h-8 w-8 rounded-full border border-black/20 bg-gradient-to-br from-[#f3a20f] to-[#f489a3] shadow-card"
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-[#f97028] via-[#f3a20f] to-[#f489a3]" style={{ scaleX: progressX, transformOrigin: 'left' }} />
      </div>
    </motion.header>
  );
}

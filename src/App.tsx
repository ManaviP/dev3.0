import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import Themes from './components/Themes'
import About from './sections/About'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'

import { motion, AnimatePresence } from 'framer-motion'

function Navbar({ onNavClick }: { onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setIsExpanded(false);
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMini) {
      e.preventDefault();
      setIsExpanded(true);
      return;
    }
    setIsOpen(false);
    setIsExpanded(false);
    onNavClick(e);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (isMini) {
      setIsExpanded(true);
      return;
    }

    if (!isScrolled || !isExpanded) return;

    // Never collapse when clicking interactive controls
    if (target.closest('a, button')) return;

    // Collapse only when the shell itself is clicked
    if (target === e.currentTarget) {
      setIsExpanded(false);
      setIsOpen(false);
    }
  };

  const isMini = isScrolled && !isHovered && !isOpen && !isExpanded;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none pt-2 md:pt-4">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!isScrolled) setIsExpanded(false);
        }}
        onClick={handleContainerClick}
        initial={false}
        animate={{
          width: isMini ? '175px' : '99%',
          maxWidth: isMini ? '175px' : '1540px',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`flex flex-col shadow-[0_4px_0px_#1a1a1a] border-[2px] md:border-[4px] border-[#1a1a1a] rounded-2xl md:rounded-[2.5rem] overflow-hidden pointer-events-auto bg-[#f3ecd2] ${isMini ? 'cursor-pointer' : ''}`}
      >
        <AnimatePresence>
          {!isMini && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Marquee />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`w-full flex ${isMini ? 'justify-center' : 'justify-between'} items-center relative transition-all duration-300 ${isMini ? 'py-3' : 'px-4 md:px-8 py-2 md:py-3.5'}`}>
          <a href="#hero" onClick={handleLinkClick} className="flex items-center">
            <img src="/logos/logoo 5.png" alt="DEVHACK" className="h-8 md:h-10 w-auto object-contain" />
          </a>

          {/* Desktop Menu */}
          {!isMini && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:flex gap-8 lg:gap-10 font-bold text-lg lg:text-xl uppercase tracking-widest text-[#1a1a1a]"
            >
              <a href="#hero" onClick={handleLinkClick} className="hover:text-[#f489a3] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Main</a>
              <a href="#timeline" onClick={handleLinkClick} className="hover:text-[#f97028] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Timeline</a>
              <a href="#themes" onClick={handleLinkClick} className="hover:text-[#f3a20f] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Themes</a>
              <a href="#faq" onClick={handleLinkClick} className="hover:text-[#ff5ea8] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">FAQ</a>
            </motion.div>
          )}

          {/* Mobile Menu Toggle */}
          {!isMini && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#1a1a1a]"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && !isMini && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden fixed top-[110px] left-0 w-full bg-[#f3ecd2] border-b-[6px] border-[#1a1a1a] z-40 p-6 flex flex-col gap-6 text-center font-bold text-2xl uppercase tracking-widest text-[#1a1a1a]"
            >
              <a href="#hero" onClick={handleLinkClick} className="hover:text-[#f489a3]">Main</a>
              <a href="#timeline" onClick={handleLinkClick} className="hover:text-[#f97028]">Timeline</a>
              <a href="#themes" onClick={handleLinkClick} className="hover:text-[#f3a20f]">Themes</a>
              <a href="#faq" onClick={handleLinkClick} className="hover:text-[#ff5ea8]">FAQ</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [mountLoader, setMountLoader] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Loading screen
    const timer = setTimeout(() => {
      setLoading(false)
      setTimeout(() => setMountLoader(false), 1000)
    }, 2500)

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      clearTimeout(timer)
      lenis.destroy()
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = e.currentTarget.getAttribute('href')
    if (!targetId) return

    setIsTransitioning(true)

    setTimeout(() => {
      const element = document.querySelector<HTMLElement>(targetId)
      if (element) {
        const navbarOffset = 120
        const top = element.getBoundingClientRect().top + window.scrollY - navbarOffset
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
      }
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    }, 400)
  }

  return (
    <>
      {/* Initial loading screen */}
      {mountLoader && (
        <div
          className={`fixed inset-0 z-[200] overflow-hidden bg-[#f3ecd2] flex flex-col items-center justify-center transition-all duration-700 ${loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          <img
            src="/assets/logo1.png"
            alt="DEVHACK Cube"
            className={`h-40 md:h-56 mb-16 ${loading ? 'animate-logo-intro' : 'opacity-0 scale-150'}`}
          />
          <div className="loader text-5xl"></div>
        </div>
      )}

      {/* Nav transition warp overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[180] flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-orange)' }}
          >
            <div className="flex flex-col items-center">
              <img src="/assets/logo1.png" alt="Loading" className="h-32 w-auto animate-bounce mb-4" />
              <h2 className="text-cream text-3xl font-display tracking-widest animate-pulse">DEVHACK 3.0</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#f3ecd2] relative font-sans text-cream">
        <Navbar onNavClick={handleNavClick} />
        <main>
          <Hero />
          <Themes />
          <About />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  )
}

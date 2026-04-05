import { useState, useEffect } from 'react'
import Marquee from './components/Marquee'
import Hero from './components/Hero'
import Themes from './components/Themes'
import About from './components/About'
import WhyJoin from './components/WhyJoin'
import Speakers from './components/Speakers'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

import { motion, AnimatePresence } from 'framer-motion'

function Navbar({ onNavClick }: { onNavClick: (e: any) => void }) {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex flex-col shadow-[0_6px_0px_#1a1a1a]">
      <Marquee />
      <div className="w-full border-b-[6px] border-[#1a1a1a] bg-[#f3ecd2] px-8 py-5 flex justify-between items-center group">
        <a href="#hero" onClick={onNavClick} className="flex items-center">
          <img src="/logos/logoo 5.png" alt="DEVHACK" className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform" />
        </a>
        <div className="hidden md:flex gap-10 font-bold text-xl uppercase tracking-widest text-[#1a1a1a]">
          <a href="#hero" onClick={onNavClick} className="hover:text-[#f489a3] hover:underline decoration-[4px] underline-offset-8 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Schedule</a>
          <a href="#about" onClick={onNavClick} className="hover:text-[#ff8a3d] hover:underline decoration-[4px] underline-offset-8 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">About</a>
          <a href="#speakers" onClick={onNavClick} className="hover:text-[#f3a20f] hover:underline decoration-[4px] underline-offset-8 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Speakers</a>
          <a href="#faq" onClick={onNavClick} className="hover:text-[#ff5ea8] hover:underline decoration-[4px] underline-offset-8 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">FAQ</a>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [mountLoader, setMountLoader] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setTimeout(() => setMountLoader(false), 1000)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId) return;

    // Trigger Transition Loader
    setIsTransitioning(true);
    
    // Briefly show loader, then scroll and hide
    setTimeout(() => {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Hide transition after scroll starts
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }, 400);
  }

  return (
    <>
      {mountLoader && (
        <div className={`fixed inset-0 z-[200] overflow-hidden bg-[#f3ecd2] flex flex-col items-center justify-center transition-all duration-700 top-0 left-0 w-full h-full ${loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <img
            src="/assets/logo1.png"
            alt="DEVHACK Cube"
            className={`h-40 md:h-56 mb-16 ${loading ? 'animate-logo-intro' : 'opacity-0 scale-150'}`}
          />
          <div className="loader text-5xl"></div>
        </div>
      )}

      {/* Nav Transition Loader */}
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

      <div className="min-h-screen bg-[#1a1a1a] relative font-sans text-cream">
        <Navbar onNavClick={handleNavClick} />
        <main>
          <Hero />
          <Themes />
          <About />
          <WhyJoin />
          <Speakers />
          <FAQ />
        </main>

        <Footer />
      </div>
    </>
  )
}

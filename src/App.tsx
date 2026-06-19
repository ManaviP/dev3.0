import React, { useState, useEffect } from 'react'
import Lenis from 'lenis'

import Hero from './sections/Hero'
import Themes from './components/Themes'
import Timeline from './sections/Timeline'
import FAQ from './sections/FAQ'
import Team from './sections/Team'
import Demo from './sections/Demo'
import IdeaSubmissionNotice from './components/IdeaSubmissionNotice'
import Prizes from './sections/Prizes'
import Sponsors from './sections/Sponsors'
import Footer from './sections/Footer'
import ClickSpark from './components/ClickSpark'
import Memory from './sections/Memory'

import { motion, AnimatePresence } from 'framer-motion'

import StaggeredMenu from './components/StaggeredMenu/StaggeredMenu'



function Navbar({ onNavClick, logoUrl }: { onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void, logoUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const tickerItems = [
    'Registrations open on June 1st, 2026 - Sign up now!',
    'Stay tuned for updates!',
    'Registrations open on June 1st, 2026 - Sign up now!',
    'Stay tuned for updates!',
  ];

  const marqueeItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none pt-4 md:pt-6 px-4 md:px-8 transition-none">
      {/* Ticker in the top gap area; absolute so it does not affect layout */}
     <div className="absolute inset-x-0 top-0 h-[16px] md:h-5 overflow-hidden pointer-events-none z-60 bg-[#f97028]">
  <motion.div
   className="flex w-max items-center whitespace-nowrap text-base md:text-lg leading-none font-semibold text-black"
    animate={{ x: ['0%', '-33.333%'] }}
    transition={{
      duration: 16,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    {marqueeItems.map((item, i) => (
      <div key={i} className="flex items-center shrink-0">
        <span className="px-4">{item}</span>
        <span className="px-4">•</span>
      </div>
    ))}
  </motion.div>
</div>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="flex flex-col w-full max-w-[1640px] shadow-[0_4px_0px_#f97028] border-[2px] md:border-[3px] border-[#f97028] rounded-[2rem] md:rounded-[3rem] overflow-hidden pointer-events-auto bg-[#1a1a1a]"
      >
        <div className="w-full flex justify-between items-center relative px-4 md:px-10 py-2 md:py-3.5">
          {/* Left segment - Logo */}
          <div className="flex-1 flex justify-start">
            <a href="#hero" onClick={onNavClick} className="cursor-target flex items-center">
              <img src={logoUrl} alt="DEVHACK" className="h-7 md:h-10 w-auto object-contain" />
            </a>
          </div>

          {/* Right-aligned Links */}
          <nav className="hidden md:flex flex-1 justify-end items-center gap-8 lg:gap-12 font-bold text-lg lg:text-xl uppercase tracking-widest text-white pr-2">
            <a href="#hero" onClick={onNavClick} className="cursor-target hover:text-[#f489a3] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Main</a>
            <a href="#themes" onClick={onNavClick} className="cursor-target hover:text-[#f3a20f] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Themes</a>
            <a href="#prizes" onClick={onNavClick} className="cursor-target hover:text-[#f489a3] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Prizes</a>
            <a href="#sponsors" onClick={onNavClick} className="cursor-target hover:text-[#f489a3] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Sponsors</a>
            <a href="#timeline" onClick={onNavClick} className="cursor-target hover:text-[#f97028] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Timeline</a>
            <a href="#team" onClick={onNavClick} className="cursor-target hover:text-[#f3a20f] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Team</a>
            <a href="#demo" onClick={onNavClick} className="cursor-target hover:text-[#f97028] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">Runbook</a>
            <a href="#faq" onClick={onNavClick} className="cursor-target hover:text-[#ff5ea8] hover:underline decoration-[3px] underline-offset-6 transition-colors drop-shadow-[1px_1px_0px_#1a1a1a]">FAQ</a>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="cursor-target p-2 text-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
              )}
            </button>
          </div>
        </div>

        {/* Unified Mobile Menu Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden w-full px-6 pb-8 flex flex-col gap-6 text-center font-bold text-2xl uppercase tracking-widest text-white"
            >
              <div className="h-[2px] w-full bg-[#1a1a1a]/10 mb-2" />
              <a href="#hero" onClick={onNavClick} className="cursor-target hover:text-[#f489a3]">Main</a>
              <a href="#themes" onClick={onNavClick} className="cursor-target hover:text-[#f3a20f]">Themes</a>
              <a href="#prizes" onClick={onNavClick} className="cursor-target hover:text-[#f489a3]">Prizes</a>
              <a href="#sponsors" onClick={onNavClick} className="cursor-target hover:text-[#f489a3]">Sponsors</a>
              <a href="#timeline" onClick={onNavClick} className="cursor-target hover:text-[#f97028]">Timeline</a>
              <a href="#team" onClick={onNavClick} className="cursor-target hover:text-[#f3a20f]">Team</a>
              <a href="#demo" onClick={onNavClick} className="cursor-target hover:text-[#f97028]">Runbook</a>
              <a href="#faq" onClick={onNavClick} className="cursor-target hover:text-[#ff5ea8]">FAQ</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [mountLoader, setMountLoader] = useState(true)
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavbarDark, setIsNavbarDark] = useState(false)

  useEffect(() => {
    const darkSections = ['memory', 'sponsors', 'footer'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -90% 0px', // Target the top part of the viewport
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const isDark = darkSections.includes(entry.target.id);
          setIsNavbarDark(isDark);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    const sections = ['hero', 'memory', 'themes', 'prizes', 'timeline', 'sponsors', 'team', 'demo', 'faq', 'footer'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    const element = document.querySelector<HTMLElement>(targetId)
    if (element) {
      const navbarOffset = 120
      const top = element.getBoundingClientRect().top + window.scrollY - navbarOffset
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }
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

      {/* Nav transition overlay removed to allow immediate navigation */}

      <ClickSpark sparkColor='#f97028' sparkSize={12} sparkRadius={20} sparkCount={8} duration={400}>
        <div className="min-h-screen bg-[#f3ecd2] relative font-sans text-cream overflow-x-clip">
          <AnimatePresence mode="wait">
            {!isScrolled ? (
              <Navbar key="full-nav" onNavClick={handleNavClick} logoUrl="/logos/logoo 4.png" />
            ) : (
              <motion.div
                key="staggered-nav"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed top-0 left-0 w-full h-screen z-50 pointer-events-none"
              >
                <StaggeredMenu logoUrl={isNavbarDark ? "/logos/logoo 4.png" : "/logos/logoo 5.png"} displayLogo={false} />
              </motion.div>
            )}
          </AnimatePresence>

          <main>
            <Hero />
            <Memory />
            <Themes />
            <Prizes />

            <Timeline />
            <Sponsors />
            <Team />
            <Demo />
            <IdeaSubmissionNotice />
            <FAQ />
          </main>
          <Footer />
        </div>
      </ClickSpark>
    </>
  )
}


import { useRef, useState } from 'react';
import { motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';

const demoSteps = [
  { num: '01', title: 'Apply on Devfolio', desc: null, descJsx: <>Visit <a href="https://dsudevhack3.tech" target="_blank" rel="noopener noreferrer" className="text-[#f97028] underline underline-offset-2 font-bold hover:text-[#e05a10] transition-colors">dsudevhack3.tech</a> and click on Apply on Devfolio.</> },
  { num: '02', title: 'Account Login/Creation', desc: 'Log in to your existing Devfolio account or create a new account if you are a first-time user.' },
  { num: '03', title: 'Complete Details', desc: 'Complete all the required profile, personal, and contact details on Devfolio.' },
  { num: '04', title: 'Participation Mode', desc: 'Select Apply as a Team when choosing your participation mode.' },
  { num: '05', title: 'Create Team', desc: 'If you are the team leader, create a new team and share the generated team code with your teammates.' },
  { num: '06', title: 'Join Team', desc: 'If you are joining an existing team, select Join Existing Team, enter the team code, and click Let\'s Go.' },
  { num: '07', title: 'Verify Members', desc: 'Ensure all team members have successfully joined the team before proceeding with the application.' },
  { num: '08', title: 'Submit Application', desc: 'Review all the entered details carefully and submit the application to complete your registration.' },
  { num: '09', title: 'Walkthrough', desc: 'For a detailed step-by-step walkthrough, please refer to the embedded YouTube video below.' },
];

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const isDemoInView = useInView(sectionRef, { amount: 0.35, once: false });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const idx = Math.min(demoSteps.length - 1, Math.max(0, Math.floor(latest * demoSteps.length)));
    setActiveStep(idx);
  });

  const translateY = useTransform(smoothProgress, [0, 1], ['0%', '-62%']);
  const demoVideoSrc = isDemoInView
    ? 'https://www.youtube.com/embed/Mt2_x3hqdeU?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1'
    : 'https://www.youtube.com/embed/Mt2_x3hqdeU?controls=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1';

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative bg-cream w-full"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="flex-shrink-0 text-center pt-3 pb-1 sm:pt-5 sm:pb-2 lg:pt-6 lg:pb-3 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-block mb-1 sm:mb-2"
          >
            <div className="h-[2px] w-14 sm:w-20 bg-[#f97028] mx-auto" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, letterSpacing: '0.4em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0em' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="font-display text-[#1a1a1a] drop-shadow-sm uppercase"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 4.5rem)', lineHeight: 1 }}
          >
            Runbook
          </motion.h2>
        </div>

        <div className="flex-1 min-h-0 flex items-center px-3 sm:px-6 lg:px-10 pb-3 sm:pb-5">
          <div className="mx-auto w-full max-w-7xl flex flex-col md:flex-row gap-3 sm:gap-5 lg:gap-8 h-full max-h-full items-stretch">
            <div className="w-full md:w-1/2 flex items-center justify-center min-h-0 md:flex-none md:self-center md:max-lg:h-[65vh] lg:h-[65vh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                className="w-full aspect-video md:aspect-auto md:h-full rounded-xl sm:rounded-[2rem] overflow-hidden border-2 sm:border-[3px] border-[#f97028] bg-[#1a1a1a] p-1 shadow-[0_4px_0px_#f97028] sm:shadow-[0_6px_0px_#f97028]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-[1.5rem] bg-black">
                  <iframe
                    key={isDemoInView ? 'demo-video-playing' : 'demo-video-idle'}
                    src={demoVideoSrc}
                    title="YouTube video player"
                    frameBorder="0"
                    loading="eager"
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </motion.div>
            </div>

            <div className="flex w-full md:w-1/2 flex-col rounded-xl sm:rounded-[2rem] border-[3px] sm:border-[4px] border-[#1a1a1a] bg-white/40 backdrop-blur-xl shadow-[4px_4px_0px_#1a1a1a] sm:shadow-[6px_6px_0px_#1a1a1a] relative overflow-hidden min-h-0 flex-1 md:flex-none md:self-center md:max-lg:h-[65vh] lg:h-[65vh]">
              <div className="relative z-20 px-3 sm:px-5 md:px-4 md:pt-2 md:pb-2 lg:px-5 lg:pt-2 lg:pb-2 pt-3 sm:pt-4 pb-2 sm:pb-3 bg-white/80 backdrop-blur-md border-b-2 border-[#1a1a1a]/10 flex-shrink-0">
                <h3 className="text-sm sm:text-lg lg:text-2xl font-extrabold text-[#f97028] uppercase tracking-wider">Registration Process</h3>
              </div>

              <div className="relative flex-1 overflow-hidden">
                <motion.div
                  className="w-full absolute top-0 left-0 px-3 sm:px-5 pt-3 pb-16"
                  style={{ y: translateY }}
                >
                  <div className="absolute left-[28px] sm:left-[38px] top-3 bottom-8 w-[2px] bg-[#1a1a1a]/20 z-0" />

                  <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 relative z-10 py-1">
                    {demoSteps.map((step, index) => {
                      const isActive = activeStep === index;

                      return (
                        <div key={step.num} className="group flex gap-3 sm:gap-4 relative">
                          <div
                            className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs lg:text-sm transition-all duration-300 border-2 ${
                              isActive
                                ? 'bg-[#f97028] text-white border-[#f97028] shadow-[0_0_15px_rgba(249,112,40,0.5)]'
                                : 'bg-white text-[#1a1a1a] border-[#f97028]/30'
                            }`}
                          >
                            {step.num}
                          </div>

                          <div
                            className={`flex-1 rounded-lg sm:rounded-xl lg:rounded-2xl p-2.5 sm:p-3 lg:p-4 transition-all duration-300 ${
                              isActive
                                ? 'bg-white shadow-[3px_3px_0px_#1a1a1a] sm:shadow-[5px_5px_0px_#1a1a1a] border-[3px] sm:border-[4px] border-[#1a1a1a] translate-x-1'
                                : 'bg-white/50 border-[3px] sm:border-[4px] border-[#1a1a1a] opacity-60'
                            }`}
                          >
                            <p className="text-[10px] sm:text-xs lg:text-sm leading-relaxed text-[#1a1a1a] font-bold">
                              {step.descJsx || step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

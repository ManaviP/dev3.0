import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    q: 'What is DSU DEVHACK 3.0?',
    a: 'DSU DevHack 3.0 is the second edition of Dayananda Sagar University\'s national-level innovation hackathon, aimed at bringing together the brightest minds from across the country to solve real-world problems through technology. With tracks spanning AI/ML, Web3, IoT, Sustainability, Healthcare, and Open Innovation, the hackathon serves as a launchpad for impactful student-led solutions. No prior work is allowed, and premade projects are not permitted; all submissions must be original and developed during the hackathon.',
  },
  { q: 'At which level is this hackathon conducted?', a: 'The DSU DEVHACK Hackathon is conducted at the national level.' },
  { q: 'How many members can participate in a team?', a: 'A team can have only 3 members. All members should be registered students at the time of the event.' },
  { q: 'What is the qualification to participate?', a: 'Participants must be currently enrolled in an undergraduate Engineering program.' },
  { q: 'What is the participation fee?', a: 'The participation in DSU DEVHACK 2026 is completely free!' },
  { q: 'Is the hackathon offline and how long does it last?', a: 'Yes, DevHack 2026 is a fully offline, on-campus hackathon hosted at Dayananda Sagar University, Bangalore. The event spans 36 hours, starting on September 18 and concluding on September 19, 2026.' },
  { q: 'What are the restrictions on team formation for the event?', a: 'Teams can include members from different colleges. Each student can be part of only one team, and multiple registrations by the same individual are not allowed. Team can have exactly 3 members.' },
  { q: 'What are the perks and benefits of participating in the hackathon?', a: 'Participants will receive mentorship from industry experts and have valuable networking opportunities with leading companies and fellow developers. They will also enjoy exclusive swag kits, certificates, and participation goodies. The hackathon features a <strong>prize pool of ₹2 Lakhs</strong>, along with exciting sponsor-backed bounties worth <strong>₹10 Lakhs</strong>. Most importantly, it offers a platform to showcase innovations directly to top tech companies and industry leaders.' },
  { q: 'I have a question related to the hackathon which is not listed above. What should I do?', a: 'Feel free to reach out to us. Just drop a mail to dsudevhack@dsu.edu.in. You can also contact the student coordinators Trisha - 9142332379 or Shreenidhi S - 8317463317 ' },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  const renderFAQText = (text: string) => {
    return text.split('3.0').map((part, i, arr) => (
      <span key={i}>
        {part}
        {i < arr.length - 1 && <span className="font-number">3.0</span>}
      </span>
    ));
  };

  return (
    <section id="faq" className="relative px-4 py-8 sm:px-6 lg:py-16 bg-cream">
      <div className="mx-auto max-w-4xl p-6 sm:p-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-block mb-4"
          >
            <div className="h-[2px] w-20 bg-[#ff5ea8] mx-auto" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0em" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="font-display text-[#1a1a1a] drop-shadow-sm uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1 }}
          >
            FAQ
          </motion.h2>
        </div>

        <div className="border-t border-black/10">
          {faqs.map((faq, idx) => {
            const isOpen = idx === open;
            const number = (idx + 1).toString().padStart(2, '0');
            return (
              <div key={faq.q} className="border-b border-black/10">
                <button 
                  onClick={() => setOpen(isOpen ? -1 : idx)} 
                  className="group flex w-full items-center justify-between py-6 text-left"
                >
                  <div className="flex items-center gap-6 sm:gap-12">
                    <span className="hidden sm:block text-lg font-number text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] transition-colors">
                      {number}
                    </span>
                    <span className="text-base font-bold uppercase tracking-widest sm:text-lg text-[#1a1a1a]">
                      {renderFAQText(faq.q)}
                    </span>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-sm transition-all duration-300 ${isOpen ? 'bg-[#1a1a1a] text-white rotate-180' : 'bg-transparent text-[#1a1a1a]'}`}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }} 
                      className="overflow-hidden"
                    >
                      <div className="px-0 pb-6 sm:px-6">
                        <div className="bg-[#f9f1df] p-6 rounded-2xl">
                          <p className="text-sm sm:text-base leading-relaxed text-[#333]">
                            {renderFAQText(faq.a)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

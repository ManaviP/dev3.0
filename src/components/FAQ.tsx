import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const faqs = [
  {
    "q": "What is DSU DEVHACK 2025?",
    "a": "DSU DEVHACK is a national-level hackathon initiative of a private university in India to help various departments and private organizations find solutions to their pressing problems through students. Participants will have the chance to build innovative projects while competing for prizes, mentorship, and exclusive developer opportunities."
  },
  {
    "q": "At which level is this hackathon conducted?",
    "a": "The DSU DEVHACK Hackathon is conducted at the national level."
  },
  {
    "q": "How many members can participate in a team?",
    "a": "A team can have only 3 members."
  },
  {
    "q": "What is the qualification to participate?",
    "a": "Participants must be currently enrolled in an undergraduate Engineering program."
  },
  {
    "q": "What is the participation fee?",
    "a": "The participation in DSU DEVHACK 2025 is completely free!"
  },
  {
    "q": "What are the restrictions on team formation for the event?",
    "a": "All team members must belong to the same university or college, and a team can have exactly 3 members."
  },
  {
    "q": "What are the perks and benefits of participating in the hackathon?",
    "a": "Participants gain exposure to real-world problems, networking opportunities, and potential internships or job offers. Winners also receive cash prizes and certificates."
  },
  {
    "q": "I have a question related to the hackathon which is not listed above. What should I do?",
    "a": "Feel free to reach out to us. Just drop a mail to dsudevhack@dsu.edu.in. You can also contact the student coordinator."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-4xl rounded-3xl border border-black/15 bg-white/10 p-6 shadow-glass backdrop-blur-sm sm:p-8">
        <h2 className="mb-7 text-center text-3xl font-black uppercase tracking-wider sm:text-5xl text-cream">FAQ</h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = idx === open;
            return (
              <div key={faq.q} className="overflow-hidden rounded-2xl border border-black/15 bg-cream">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-5 cursor-pointer text-base"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold uppercase tracking-wide sm:text-base">{faq.q}</span>
                  <span className="text-xl leading-none">{isOpen ? '−' : '+'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pb-4 text-sm text-base sm:px-5"
                    >
                      {faq.a}
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

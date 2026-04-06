import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

  return (
    <section id="faq" className="relative px-4 py-16 sm:px-6 lg:py-24 bg-[#f3ecd2]">
      <div className="mx-auto max-w-4xl rounded-3xl border border-black/15 bg-white/60 p-6 shadow-card backdrop-blur-sm sm:p-8">
        <h2 className="mb-7 text-center text-3xl font-black uppercase tracking-wider sm:text-5xl text-[#1a1a1a]">FAQ</h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = idx === open;
            return (
              <div key={faq.q} className="overflow-hidden rounded-2xl border border-black/15 bg-[#F3ecd2]">
                <button onClick={() => setOpen(isOpen ? -1 : idx)} className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-5">
                  <span className="text-sm font-bold uppercase tracking-wide sm:text-base text-[#1a1a1a]">{faq.q}</span>
                  <span className="text-xl leading-none text-[#1a1a1a]">{isOpen ? '−' : '+'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="px-4 pb-4 text-sm text-black sm:px-5">
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

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import {
  type TeamMember,
  coreTeam,
  subHeads,
  theOperators,
  facultyCoordinator,
  facultyOrganizers,
  chiefPatrons,
  patrons,
  judges,
} from './teamData';


// --- Sub-components ---

function CoinDivider() {
  return (
    <div className="w-full py-8 sm:py-12 md:py-16 flex items-center justify-center opacity-80 overflow-hidden relative">
      <div className="absolute w-full h-[2px] bg-[#1a1a1a]" />
      <div className="flex z-10 bg-[#f3ecd2] px-4 sm:px-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="coin animate-spin-y mx-1.5 sm:mx-2" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

/** Reusable section sub-heading */
function SectionSubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black uppercase tracking-widest mb-6 sm:mb-8 md:mb-12 text-center w-full">
      {children}
    </h3>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-[#fff9f4] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] sm:shadow-[6px_6px_0px_#1a1a1a] hover:shadow-[8px_8px_0px_#f97028] transition-all flex flex-col h-full overflow-hidden w-full shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner Rivets */}
      {[
        { top: 4, left: 4 } as React.CSSProperties,
        { top: 4, right: 4 } as React.CSSProperties,
        { bottom: 4, left: 4 } as React.CSSProperties,
        { bottom: 4, right: 4 } as React.CSSProperties,
      ].map((pos, ri) => (
        <div
          key={ri}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            backgroundColor: '#1a1a1a',
            borderRadius: '50%',
            ...pos,
          }}
        />
      ))}

      {/* Image Box */}
      <div className="relative w-full aspect-square border-b-2 border-[#1a1a1a] overflow-hidden bg-[#1a1a1a] p-1.5 sm:p-2">
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-10"
          style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.25) 50%)', backgroundSize: '100% 4px' }}
        />
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
        />
      </div>

      {/* Details Box */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 z-10 bg-[#fff9f4]">
        <h3
          className="text-base sm:text-lg md:text-xl font-black tracking-tight uppercase leading-tight transition-colors duration-300 font-sans"
          style={{ color: isHovered ? '#f97028' : '#1a1a1a' }}
        >
          {member.name}
        </h3>
        <p className="font-mono text-[11px] sm:text-xs md:text-sm uppercase mt-1.5 sm:mt-2 opacity-70 font-bold leading-snug">{member.role}</p>

        <div className="mt-auto pt-3 sm:pt-4 border-t-2 border-[#1a1a1a] border-dashed flex justify-end items-center w-full">
          <div className="flex gap-2.5 text-[#1a1a1a]">
            <a
              href={member.linkedin || '#'}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#f97028] transition-colors opacity-80 hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={member.instagram || '#'}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#f97028] transition-colors opacity-80 hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Responsive grid wrapper for team cards */
function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
      {members.map((member) => (
        <TeamCard key={member.id} member={member} />
      ))}
    </div>
  );
}

/** Small grid for 1-3 items — centers them */
function TeamGridSmall({ members }: { members: TeamMember[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
      {members.map((member) => (
        <div key={member.id} className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[240px] lg:w-[280px]">
          <TeamCard member={member} />
        </div>
      ))}
    </div>
  );
}

export default function Team() {
  const [activeTab, setActiveTab] = useState('Organising Team');
  const [activeSubTeam, setActiveSubTeam] = useState('Web Team');

  const TABS = ['Organising Team', 'Patrons' /*, 'Faculty', 'Jury & Experts' */];

  const allMembers = useMemo(() => [...coreTeam, ...subHeads, ...theOperators], []);

  const membersToRender = useMemo(() => {
    const keyword = activeSubTeam.split(' ')[0];
    return allMembers.filter(m => m.role.includes(keyword));
  }, [allMembers, activeSubTeam]);

  return (
    <section id="team" className="relative w-full bg-[#f3ecd2] py-12 sm:py-16 md:py-24 px-5 sm:px-6 md:px-10 text-[#1a1a1a] font-sans selection:bg-[#f97028] selection:text-[#f3ecd2]">
      <div className="w-full sm:w-[92%] max-w-[1400px] mx-auto border-[3px] sm:border-4 border-[#1a1a1a] bg-[#f3ecd2] p-4 sm:p-6 md:p-10 lg:p-16 shadow-[6px_6px_0px_#1a1a1a] sm:shadow-[10px_10px_0px_#1a1a1a] md:shadow-[16px_16px_0px_#1a1a1a] relative">

        {/* Header block conditionally rendered */}
        <AnimatePresence>
          {activeTab === 'Organising Team' && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0, paddingBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 40, paddingBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, paddingBottom: 0 }}
              className="flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 border-b-4 border-[#1a1a1a] relative text-center"
            >
              <div className="w-full">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 120, delay: 0.15 }}
                  className="font-display uppercase tracking-wider sm:tracking-widest text-[#1a1a1a] leading-none mb-3 sm:mb-6 flex flex-col sm:flex-row justify-center items-center w-full"
                  style={{ fontSize: 'clamp(2rem, 7vw, 6rem)' }}
                >
                  <span className="sm:mr-4 lg:mr-6">Meet The</span>
                  <span className="text-[#f97028]">Team</span>
                </motion.h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation — scrollable on mobile */}
        <div className="mb-6 sm:mb-8 md:mb-12 border-b-[3px] sm:border-b-4 border-[#1a1a1a] pb-4 sm:pb-6 md:pb-8">
          <div className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 justify-start sm:justify-center no-scrollbar -mx-1 px-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-bold font-mono uppercase tracking-wider sm:tracking-widest border-[2px] sm:border-[3px] border-[#1a1a1a] transition-all text-xs sm:text-sm md:text-base whitespace-nowrap shrink-0 ${activeTab === tab
                  ? 'bg-[#1a1a1a] shadow-[4px_4px_0px_#f97028] sm:shadow-[8px_8px_0px_#f97028] translate-x-[-2px] translate-y-[-2px]'
                  : 'bg-[#fff9f4] text-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] sm:shadow-[4px_4px_0px_#1a1a1a] hover:bg-[#f97028] hover:text-[#1a1a1a]'
                  }`}
                style={activeTab === tab ? { color: '#f3ecd2' } : undefined}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[30vh] sm:min-h-[40vh]"
          >
            {activeTab === 'Organising Team' && (
              <div className="flex flex-col">
                <div className="mb-4">
                  <SectionSubHeading>Core Team</SectionSubHeading>
                  <TeamGrid members={[...coreTeam, ...subHeads]} />
                </div>

                <div className="mb-4 mt-16 sm:mt-24">
                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black uppercase tracking-widest mb-6 sm:mb-8 md:mb-12 text-center w-full text-[#1a1a1a]">
                    Meet the Entire Team
                  </h3>

                  <div className="mb-8 sm:mb-12 border-b-[2px] sm:border-b-4 border-[#1a1a1a] pb-4 sm:pb-6">
                    <div className="flex overflow-x-auto gap-2 sm:gap-3 justify-start sm:justify-center no-scrollbar -mx-1 px-1 pb-2">
                      {['Web Team', 'Design Team', 'Marketing Team', 'Sponsorship Team', 'Drafting Team'].map(team => (
                        <button
                          key={team}
                          onClick={() => setActiveSubTeam(team)}
                          className={`px-4 sm:px-5 py-2 sm:py-2.5 font-bold font-mono uppercase tracking-widest border-[2px] sm:border-[3px] border-[#1a1a1a] transition-all text-[10px] sm:text-xs md:text-sm whitespace-nowrap shrink-0 ${activeSubTeam === team
                            ? 'bg-[#1a1a1a] shadow-[3px_3px_0px_#f97028] sm:shadow-[4px_4px_0px_#f97028] translate-x-[-2px] translate-y-[-2px] text-[#f3ecd2]'
                            : 'bg-[#fff9f4] text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] sm:shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#f97028] hover:text-[#1a1a1a]'
                            }`}
                        >
                          {team}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSubTeam}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[200px]"
                    >
                      {membersToRender.length > 0 ? (
                        <TeamGrid members={membersToRender} />
                      ) : (
                        <div className="w-full text-center py-20 text-gray-400 font-mono uppercase tracking-widest text-sm">
                          Team members incoming...
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}

            {activeTab === 'Patrons' && (
              <div className="flex flex-col">
                <div className="mb-4">
                  <SectionSubHeading>Chief Patrons</SectionSubHeading>
                  <TeamGridSmall members={chiefPatrons} />
                </div>

                <CoinDivider />

                <div className="mb-4">
                  <SectionSubHeading>Patrons</SectionSubHeading>
                  <TeamGrid members={patrons} />
                </div>
              </div>
            )}

            {/* 
            {activeTab === 'Faculty' && (
              <div className="flex flex-col">
                <div className="mb-4">
                  <SectionSubHeading>Faculty Coordinator</SectionSubHeading>
                  <TeamGridSmall members={facultyCoordinator} />
                </div>

                <CoinDivider />

                <div className="mb-4">
                  <SectionSubHeading>Organising Team Members</SectionSubHeading>
                  <TeamGrid members={facultyOrganizers} />
                </div>
              </div>
            )}

            {activeTab === 'Jury & Experts' && (
              <div className="mb-4">
                <SectionSubHeading>Jury & Experts</SectionSubHeading>
                <TeamGridSmall members={judges} />
              </div>
            )}
            */}
          </motion.div>
        </AnimatePresence>

        {/* Decorative Divider */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <CoinDivider />
        </div>

      </div>
    </section>
  );
}


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  twitter?: string;
  linkedin?: string;
}

// --- Data ---

const chiefPatrons: TeamMember[] = [
  { id: 'cp1', name: 'Dr. D. Hemachandra Sagar', role: 'Chancellor, DSU', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80' },
  { id: 'cp2', name: 'Dr. D. Premachandra Sagar', role: 'Pro Chancellor, DSU', image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=400&q=80' },
];

const patrons: TeamMember[] = [
  { id: 'p1', name: 'Dr. B. S. Satyanarayana', role: 'Vice Chancellor, DSU', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { id: 'p2', name: 'Prof. R Janardhan', role: 'Pro Vice Chancellor, DSU', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { id: 'p3', name: 'Dr. Prakash S', role: 'Pro Vice Chancellor, DSU', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
  { id: 'p4', name: 'Dr. C.Puttamadapappa', role: 'Registrar, DSU', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80' },
  { id: 'fac1', name: 'Dr.Udaya Kumar Reddy K.R', role: 'Professor & Dean-SoE', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { id: 'fac2', name: 'Dr. Girisha G S', role: 'Chairperson, CSE', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
];

const judges: TeamMember[] = [
  { id: 'j1', name: 'Arjun Mehta', role: 'CTO, TechCorp', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80' },
  { id: 'j2', name: 'Sneha Iyer', role: 'VP Engineering, InnoSoft', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
];

const coreTeam: TeamMember[] = [
  { id: '0', name: 'Dr. Bipin Kumar Rai', role: 'Faculty Coordinator', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { id: '1', name: 'Trisha', role: 'Student Co ordinator', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Trisha' },
  { id: '2', name: 'S Shreenidhi', role: 'Student Co ordinator', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Shreenidhi' },
];

const subHeads: TeamMember[] = [
  { id: '3', name: 'Manavi P', role: 'Web Team Lead', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Manavi' },
  { id: '4', name: 'Raksha', role: 'Design Team Lead', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Raksha' },
  { id: '5', name: 'Aastha', role: 'Sponsorship Team Co Lead', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Aastha' },
  { id: '6', name: 'Nishchal Gowda R', role: 'Marketing and Media Lead', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Nishchal' },
  { id: '7', name: 'G Nithesh', role: 'Web Co Lead & Ops Lead', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Nithesh' },
];

const theOperators: TeamMember[] = [
  { id: 'w1', name: 'Omkar G K', role: 'Web Team', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Omkar' },
  { id: 'w2', name: 'Supraj U Sivajji', role: 'Web Team', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Supraj' },
  { id: 'd1', name: 'Moulika', role: 'Design Team', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Moulika' },
  { id: 'd2', name: 'Moulya', role: 'Design Team', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Moulya' },
  { id: 'd3', name: 'Hridya', role: 'Design Team', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Hridya' },
  { id: 's1', name: 'Naman Sharaff', role: 'Sponsorship Team', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Naman' },
  { id: 's2', name: 'Thathagath', role: 'Sponsorship Team', image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Thathagath' },
];

const facultyCoordinator: TeamMember[] = [
  { id: 'fc1', name: 'Dr. Bipin Kumar Rai', role: 'Faculty Coordinator - Professor, CSE', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
];

const facultyOrganizers: TeamMember[] = [
  { id: 'fo1', name: 'Dr. Meenakshi Malhotra', role: 'Associate Professor', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo2', name: 'Dr. Sivananda Reddy', role: 'Associate Professor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo3', name: 'Prof. Bharath M B', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo4', name: 'Prof. Dharmendra D P', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo5', name: 'Dr. Kumar Dilip', role: 'Associate Professor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo6', name: 'Prof. Yashaswini H C', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo7', name: 'Dr. Shreekant Salotagi', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo8', name: 'Prof. Smriti Bharti', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo9', name: 'Prof. Shivani', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo10', name: 'Dr Naitik ST', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { id: 'fo11', name: 'Dr. Pannangi Naresh', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
];

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

function TeamCard({ member, onClickBio }: { member: TeamMember, onClickBio: (m: TeamMember) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-[#fff9f4] border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] sm:shadow-[6px_6px_0px_#1a1a1a] hover:shadow-[8px_8px_0px_#f97028] transition-all cursor-pointer flex flex-col h-full overflow-hidden w-full shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClickBio(member)}
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

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-[#1a1a1a] border-dashed">
          <button
            onClick={() => onClickBio(member)}
            className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-widest hover:text-[#f97028] transition-colors flex items-center gap-1.5 sm:gap-2"
          >
            <span className="text-[#f97028]">+</span> SHOW BIO
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/** Responsive grid wrapper for team cards */
function TeamGrid({ members, onClickBio }: { members: TeamMember[]; onClickBio: (m: TeamMember) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
      {members.map((member) => (
        <TeamCard key={member.id} member={member} onClickBio={onClickBio} />
      ))}
    </div>
  );
}

/** Small grid for 1-3 items — centers them */
function TeamGridSmall({ members, onClickBio }: { members: TeamMember[]; onClickBio: (m: TeamMember) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
      {members.map((member) => (
        <div key={member.id} className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[240px] lg:w-[280px]">
          <TeamCard member={member} onClickBio={onClickBio} />
        </div>
      ))}
    </div>
  );
}

export default function Team() {
  const [selectedBio, setSelectedBio] = useState<TeamMember | null>(null);
  const [activeTab, setActiveTab] = useState('Organising Team');
  const [showOperators, setShowOperators] = useState(false);

  const TABS = ['Organising Team', 'The Board', 'Faculty', 'Jury & Experts'];

  if (selectedBio) {
    if (typeof window !== 'undefined') document.body.style.overflow = 'hidden';
  } else {
    if (typeof window !== 'undefined') document.body.style.overflow = 'auto';
  }

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
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-base sm:text-lg md:text-2xl lg:text-3xl font-medium tracking-tight mt-2 sm:mt-4 md:mt-6 leading-relaxed max-w-3xl mx-auto px-2"
                >
                  We back the dreamers, the builders, and the rebels. The architectural minds behind DevHack 3.0.
                </motion.p>
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
                  <TeamGridSmall members={coreTeam} onClickBio={setSelectedBio} />
                </div>

                <CoinDivider />

                <div className="mb-4">
                  <SectionSubHeading>Sub Heads</SectionSubHeading>
                  <TeamGrid members={subHeads} onClickBio={setSelectedBio} />

                  {/* Dropdown toggle for Operating Partners */}
                  <div className="mt-8 sm:mt-10">
                    <button
                      onClick={() => setShowOperators((v) => !v)}
                      className="mx-auto flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-[2px] sm:border-[3px] border-[#1a1a1a] bg-[#fff9f4] font-bold font-mono uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm md:text-base shadow-[4px_4px_0px_#1a1a1a] hover:bg-[#f97028] hover:text-[#1a1a1a] transition-all active:translate-y-[2px] active:shadow-[2px_2px_0px_#1a1a1a]"
                    >
                      <span>Team Members</span>
                      <motion.svg
                        animate={{ rotate: showOperators ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </button>

                    <AnimatePresence initial={false}>
                      {showOperators && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { type: 'spring', stiffness: 250, damping: 30 },
                            opacity: { duration: 0.25, delay: 0.05 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-8 sm:pt-10">
                            <h4 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-widest mb-6 sm:mb-8 text-center w-full opacity-70">
                              Operating Partners
                            </h4>
                            <TeamGrid members={theOperators} onClickBio={setSelectedBio} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'The Board' && (
              <div className="flex flex-col">
                <div className="mb-4">
                  <SectionSubHeading>Chief Patrons</SectionSubHeading>
                  <TeamGridSmall members={chiefPatrons} onClickBio={setSelectedBio} />
                </div>

                <CoinDivider />

                <div className="mb-4">
                  <SectionSubHeading>Patrons</SectionSubHeading>
                  <TeamGrid members={patrons} onClickBio={setSelectedBio} />
                </div>
              </div>
            )}

            {activeTab === 'Faculty' && (
              <div className="flex flex-col">
                <div className="mb-4">
                  <SectionSubHeading>Faculty Coordinator</SectionSubHeading>
                  <TeamGridSmall members={facultyCoordinator} onClickBio={setSelectedBio} />
                </div>

                <CoinDivider />

                <div className="mb-4">
                  <SectionSubHeading>Organising Team Members</SectionSubHeading>
                  <TeamGrid members={facultyOrganizers} onClickBio={setSelectedBio} />
                </div>
              </div>
            )}

            {activeTab === 'Jury & Experts' && (
              <div className="mb-4">
                <SectionSubHeading>Jury & Experts</SectionSubHeading>
                <TeamGridSmall members={judges} onClickBio={setSelectedBio} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Decorative Divider */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <CoinDivider />
        </div>

      </div>

      {/* Bio Modal Pop-in */}
      <AnimatePresence>
        {selectedBio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(26,26,26,0.8)] backdrop-blur-sm p-3 sm:p-4"
            onClick={() => setSelectedBio(null)}
          >
            <motion.div
              layoutId={`modal-${selectedBio.id}`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#f3ecd2] border-[3px] border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] sm:shadow-[16px_16px_0px_#1a1a1a] w-full max-w-lg p-5 sm:p-6 md:p-8 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 border-2 border-[#1a1a1a] flex items-center justify-center font-bold font-mono hover:bg-[#1a1a1a] hover:text-[#f3ecd2] transition-colors text-sm sm:text-base"
                onClick={() => setSelectedBio(null)}
              >
                X
              </button>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-wider sm:tracking-widest text-[#f97028] mt-2 sm:mt-4 mb-1.5 sm:mb-2 pr-10 sm:pr-12 leading-tight">
                {selectedBio.name}
              </h2>
              <p className="font-mono text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 opacity-70 uppercase">
                {selectedBio.role}
              </p>

              <div className="w-full h-[2px] bg-[#1a1a1a] mb-4 sm:mb-6 opacity-20" />

              <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10 font-medium">
                {selectedBio.bio || "No bio available right now. Currently busy building the future."}
              </p>

              <div className="flex gap-3 sm:gap-4">
                <a
                  href={selectedBio.twitter || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 sm:py-3 border-2 border-[#1a1a1a] text-center font-bold uppercase tracking-wider sm:tracking-widest hover:bg-[#1a1a1a] hover:text-[#f3ecd2] transition-colors text-xs sm:text-sm md:text-base"
                >
                  Twitter/X
                </a>
                <a
                  href={selectedBio.linkedin || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 sm:py-3 border-2 border-[#1a1a1a] text-center font-bold uppercase tracking-wider sm:tracking-widest hover:bg-[#1a1a1a] hover:text-[#f3ecd2] transition-colors text-xs sm:text-sm md:text-base"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

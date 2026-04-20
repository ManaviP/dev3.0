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
    <div className="w-full py-16 flex items-center justify-center opacity-80 overflow-hidden relative">
      <div className="absolute w-full h-[2px] bg-[#1a1a1a]" />
      <div className="flex z-10 bg-[#f3ecd2] px-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="coin animate-spin-y mx-2" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
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
      className="group relative bg-[#fff9f4] border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] hover:shadow-[8px_8px_0px_#f97028] transition-all cursor-pointer flex flex-col h-full overflow-hidden w-full max-w-[280px] sm:max-w-[300px] shrink-0"
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
      <div className="relative w-full aspect-square border-b-2 border-[#1a1a1a] overflow-hidden bg-[#1a1a1a] p-2">
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
      <div className="p-5 flex flex-col flex-1 z-10 bg-[#fff9f4]">
        <h3
          className="text-xl md:text-2xl font-black tracking-tight uppercase leading-none transition-colors duration-300 font-sans"
          style={{ color: isHovered ? '#f97028' : '#1a1a1a' }}
        >
          {member.name}
        </h3>
        <p className="font-mono text-sm uppercase mt-2 opacity-70 font-bold">{member.role}</p>

        <div className="mt-4 pt-4 border-t-2 border-[#1a1a1a] border-dashed">
          <button
            onClick={() => onClickBio(member)}
            className="text-sm font-bold uppercase tracking-widest hover:text-[#f97028] transition-colors flex items-center gap-2"
          >
            <span className="text-[#f97028]">+</span> SHOW BIO
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const [selectedBio, setSelectedBio] = useState<TeamMember | null>(null);
  const [activeTab, setActiveTab] = useState('Organising Team');

  const TABS = ['Organising Team', 'The Board', 'Faculty', 'Jury & Experts'];

  if (selectedBio) {
    if (typeof window !== 'undefined') document.body.style.overflow = 'hidden';
  } else {
    if (typeof window !== 'undefined') document.body.style.overflow = 'auto';
  }

  return (
    <section id="team" className="relative w-full bg-[#f3ecd2] py-24 px-4 md:px-8 text-[#1a1a1a] font-sans selection:bg-[#f97028] selection:text-[#f3ecd2]">
      <div className="w-[95%] max-w-[1400px] mx-auto border-4 border-[#1a1a1a] bg-[#f3ecd2] p-8 md:p-16 shadow-[16px_16px_0px_#1a1a1a] relative">

        {/* Header block condtionally rendered */}
        <AnimatePresence>
          {activeTab === 'Organising Team' && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0, paddingBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 64, paddingBottom: 40 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, paddingBottom: 0 }}
              className="flex flex-col justify-center items-center gap-8 border-b-4 border-[#1a1a1a] relative overflow-hidden text-center"
            >
              <div className="w-full">
                <h2 className="text-6xl md:text-8xl font-display uppercase tracking-widest text-[#1a1a1a] leading-none mb-6 flex justify-center items-center w-full overflow-hidden">
                  <motion.span
                    initial={{ x: -300, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                    className="mr-4 lg:mr-6"
                  >
                    Meet The
                  </motion.span>
                  <motion.span
                    initial={{ x: 300, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                    className="text-[#f97028]"
                  >
                    Team
                  </motion.span>
                </h2>
                <p className="text-2xl md:text-3xl font-medium tracking-tight mt-6 leading-relaxed max-w-3xl mx-auto">
                  We back the dreamers, the builders, and the rebels. The architectural minds behind DevHack 3.0.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 border-b-4 border-[#1a1a1a] pb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-bold font-mono uppercase tracking-widest border-[3px] border-[#1a1a1a] transition-all text-base md:text-lg ${activeTab === tab
                ? 'bg-[#1a1a1a] text-white shadow-[8px_8px_0px_#f97028] translate-x-[-2px] translate-y-[-2px]'
                : 'bg-[#fff9f4] text-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:bg-[#f97028] hover:text-[#1a1a1a]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[40vh]"
          >
            {activeTab === 'Organising Team' && (
              <div className="flex flex-col">
                <div className="mb-4">
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-widest mb-12 text-center w-full">Core Team</h3>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {coreTeam.map((member) => (
                      <TeamCard key={member.id} member={member} onClickBio={setSelectedBio} />
                    ))}
                  </div>
                </div>

                <div className="my-16">
                  <CoinDivider />
                </div>

                <div className="mb-4">
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-widest mb-12 text-center w-full">Sub Heads</h3>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {subHeads.map((member) => (
                      <TeamCard key={member.id} member={member} onClickBio={setSelectedBio} />
                    ))}
                  </div>
                </div>

                <div className="my-16">
                  <CoinDivider />
                </div>

                <div className="mb-4">
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-widest mb-12 text-center w-full">Operating Partners</h3>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {theOperators.map((member) => (
                      <TeamCard key={member.id} member={member} onClickBio={setSelectedBio} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'The Board' && (
              <div className="flex flex-col">
                <div className="mb-4">
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-widest mb-12 text-center w-full">Chief Patrons</h3>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {chiefPatrons.map((member) => (
                      <TeamCard key={member.id} member={member} onClickBio={setSelectedBio} />
                    ))}
                  </div>
                </div>

                <div className="my-16">
                  <CoinDivider />
                </div>

                <div className="mb-4">
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-widest mb-12 text-center w-full">Patrons</h3>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {patrons.map((member) => (
                      <TeamCard key={member.id} member={member} onClickBio={setSelectedBio} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Faculty' && (
              <div className="flex flex-col">
                <div className="mb-4">
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-widest mb-10 text-center w-full">Faculty Coordinator</h3>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {facultyCoordinator.map((member) => (
                      <TeamCard key={member.id} member={member} onClickBio={setSelectedBio} />
                    ))}
                  </div>
                </div>

                <div className="my-16">
                  <CoinDivider />
                </div>

                <div className="mb-4">
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-widest mb-12 text-center w-full">Organising Team Members</h3>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {facultyOrganizers.map((member) => (
                      <TeamCard key={member.id} member={member} onClickBio={setSelectedBio} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Jury & Experts' && (
              <div className="mb-4">
                <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-widest mb-12 text-center w-full">Jury & Experts</h3>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {judges.map((member) => (
                    <TeamCard key={member.id} member={member} onClickBio={setSelectedBio} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Decorative Divider */}
        <div className="mt-16">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(26,26,26,0.8)] backdrop-blur-sm p-4"
            onClick={() => setSelectedBio(null)}
          >
            <motion.div
              layoutId={`modal-${selectedBio.id}`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#f3ecd2] border-[3px] border-[#1a1a1a] shadow-[16px_16px_0px_#1a1a1a] w-full max-w-lg p-8 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 w-10 h-10 border-2 border-[#1a1a1a] flex items-center justify-center font-bold font-mono hover:bg-[#1a1a1a] hover:text-[#f3ecd2] transition-colors"
                onClick={() => setSelectedBio(null)}
              >
                X
              </button>

              <h2 className="text-4xl font-display uppercase tracking-widest text-[#f97028] mt-4 mb-2 pr-12 leading-tight">
                {selectedBio.name}
              </h2>
              <p className="font-mono text-lg font-bold mb-6 opacity-70 uppercase">
                {selectedBio.role}
              </p>

              <div className="w-full h-[2px] bg-[#1a1a1a] mb-6 opacity-20" />

              <p className="text-lg leading-relaxed mb-10 font-medium">
                {selectedBio.bio || "No bio available right now. Currently busy building the future."}
              </p>

              <div className="flex gap-4">
                <a
                  href={selectedBio.twitter || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 border-2 border-[#1a1a1a] text-center font-bold uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-[#f3ecd2] transition-colors"
                >
                  Twitter/X
                </a>
                <a
                  href={selectedBio.linkedin || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 border-2 border-[#1a1a1a] text-center font-bold uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-[#f3ecd2] transition-colors"
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

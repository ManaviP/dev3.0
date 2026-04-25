import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamCarousel from '../components/TeamCarousel';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  linkedin?: string;
}

// ── Main tabs ──
const mainTabs = ['Organizing Team', 'Patrons', 'Faculty', 'Judges'] as const;
type MainTab = (typeof mainTabs)[number];

// ── Sub-tabs (under "Meet the Entire Team") ──
const subTabs = ['Web Team', 'Design Team', 'Marketing Team', 'Sponsorship Team'] as const;
type SubTab = (typeof subTabs)[number];

// ── Data ──
const organizingTeam: TeamMember[] = [
  {
    id: 'org-1',
    name: 'Dr. Bipin Kumar Rai',
    role: 'Faculty Coordinator',
    bio: 'Professor, CSE',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'org-2',
    name: 'Utkarsh Priye Jha',
    role: 'Student Coordinator',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'org-3',
    name: 'Ritvik Vasundh',
    role: 'Student Coordinator',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
];

const patrons: TeamMember[] = [
  {
    id: 'pat-1',
    name: 'Prof. Ramesh Gupta',
    role: 'Patron',
    bio: 'Director',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'pat-2',
    name: 'Dr. Meena Sharma',
    role: 'Co-Patron',
    bio: 'Dean, Engineering',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
  },
];

const faculty: TeamMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. Anjali Verma',
    role: 'Faculty Advisor',
    bio: 'HoD, CSE',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-2',
    name: 'Dr. Vikram Patel',
    role: 'Faculty Advisor',
    bio: 'Associate Professor',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
];

const judges: TeamMember[] = [
  {
    id: 'jud-1',
    name: 'Arjun Mehta',
    role: 'Industry Expert',
    bio: 'CTO, TechCorp',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'jud-2',
    name: 'Sneha Iyer',
    role: 'Industry Expert',
    bio: 'VP Engineering, InnoSoft',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
];

const subTeams: Record<SubTab, TeamMember[]> = {
  'Web Team': [
    {
      id: 'web-1',
      name: 'Sachin Baluragi',
      role: 'Web Team Co-Head',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'web-2',
      name: 'S Shreenidhi',
      role: 'Web Dev',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'web-3',
      name: 'G Nithesh',
      role: 'Web Dev',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'web-4',
      name: 'Manavi P',
      role: 'Web Dev',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    },
  ],
  'Design Team': [
    {
      id: 'des-1',
      name: 'Priya Nair',
      role: 'Design Lead',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'des-2',
      name: 'Raj Kulkarni',
      role: 'UI Designer',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    },
  ],
  'Marketing Team': [
    {
      id: 'mkt-1',
      name: 'Ananya Das',
      role: 'Marketing Lead',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'mkt-2',
      name: 'Karthik Rao',
      role: 'Content Writer',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
  ],
  'Sponsorship Team': [
    {
      id: 'spo-1',
      name: 'Divya Hegde',
      role: 'Sponsorship Lead',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'spo-2',
      name: 'Nihal Khan',
      role: 'Sponsorship Associate',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80',
    },
  ],
};

// ── Helpers ──
function getMembersForMainTab(tab: MainTab): TeamMember[] {
  switch (tab) {
    case 'Organizing Team':
      return organizingTeam;
    case 'Patrons':
      return patrons;
    case 'Faculty':
      return faculty;
    case 'Judges':
      return judges;
  }
}

function getMainTabTitle(tab: MainTab): string {
  switch (tab) {
    case 'Organizing Team':
      return 'Organising Team';
    case 'Patrons':
      return 'Patrons';
    case 'Faculty':
      return 'Faculty';
    case 'Judges':
      return 'Judges';
  }
}

// ── Pill Tab Bar ──
function TabBar<T extends string>({
  tabs,
  active,
  onChange,
  accentColor,
}: {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  accentColor?: string;
}) {
  const accent = accentColor ?? '#f97028';
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className="relative px-5 py-2 rounded-full text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 border-2 cursor-pointer"
            style={{
              borderColor: isActive ? accent : '#1a1a1a',
              backgroundColor: isActive ? accent : 'transparent',
              color: isActive ? '#fff' : '#1a1a1a',
              boxShadow: isActive ? `0 4px 16px ${accent}40` : 'none',
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

// ── Main Section ──
export default function Team() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('Organizing Team');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('Web Team');

  const mainMembers = getMembersForMainTab(activeMainTab);
  const sectionTitle = getMainTabTitle(activeMainTab);

  return (
    <section id="team" className="relative w-full overflow-hidden bg-cream py-20 md:py-28">
      {/* ── Main Tab Bar ── */}
      <div className="relative z-10 mb-10">
        <TabBar
          tabs={mainTabs}
          active={activeMainTab}
          onChange={(t) => {
            setActiveMainTab(t);
            // Reset sub-tab when switching
            setActiveSubTab('Web Team');
          }}
          accentColor="#f97028"
        />
      </div>

      {/* ── Section Title ── */}
      <h2
        className="text-center font-display text-4xl sm:text-5xl md:text-6xl mb-12"
        style={{ color: '#1a1a1a' }}
      >
        {sectionTitle}
      </h2>

      {/* ── Main Tab Carousel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMainTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center -mt-20 -mb-10"
        >
          <TeamCarousel 
            members={mainMembers} 
            infoTextColor="#1a1a1a"
            background="transparent"
            className="w-full max-w-6xl mx-auto"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── "Meet the Entire Team" — only under Organizing Team ── */}
      {activeMainTab === 'Organizing Team' && (
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2
            className="text-center font-display text-3xl sm:text-4xl md:text-5xl mb-10"
            style={{ color: '#1a1a1a' }}
          >
            Meet the Entire Team
          </h2>

          {/* Sub-tab bar */}
          <div className="relative z-10 mb-10">
            <TabBar
              tabs={subTabs}
              active={activeSubTab}
              onChange={setActiveSubTab}
              accentColor="#5b2d8e"
            />
          </div>

          {/* Sub-tab Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center -mt-20"
            >
              <TeamCarousel 
                members={subTeams[activeSubTab]} 
                infoTextColor="#1a1a1a"
                background="transparent"
                className="w-full max-w-6xl mx-auto"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

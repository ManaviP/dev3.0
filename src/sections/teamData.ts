// ============================================================
//  TEAM DATA  —  edit social links here, nothing else to touch
// ============================================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;   // full URL e.g. "https://linkedin.com/in/username"
  instagram?: string;  // full URL e.g. "https://instagram.com/username"
}

// ── Core Team ────────────────────────────────────────────────
export const coreTeam: TeamMember[] = [
  {
    id: 'c0',
    name: 'Dr. Bipin Kumar Rai',
    role: 'Faculty Co ordinator',
    image: '/logos/bhipinsir.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'c1',
    name: 'Trisha',
    role: 'Student Co ordinator',
    image: '/logos/trisha.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'c2',
    name: 'S Shreenidhi',
    role: 'Student Co ordinator',
    image: '/logos/SShreenidhi.webp',
    linkedin: '',
    instagram: '',
  },
];

// ── Sub Heads / Leads ─────────────────────────────────────────
export const subHeads: TeamMember[] = [
  {
    id: 's0',
    name: 'Manavi P',
    role: 'Web Team Lead',
    image: '/logos/manavi.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 's1',
    name: 'G Nithesh',
    role: 'Drafting Team Lead',
    image: '/logos/nithesh.png',
    linkedin: '',
    instagram: '',
  },
  {
    id: 's2',
    name: 'Raksha',
    role: 'Design Team Lead',
    image: '/logos/raksha.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 's3',
    name: 'Aastha',
    role: 'Sponsorship Team Lead',
    image: '/logos/astha.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 's4',
    name: 'Nishchal Gowda R',
    role: 'Marketing and Media Lead',
    image: '/logos/Nishchal.webp',
    linkedin: '',
    instagram: '',
  },

];

// ── The Operators ─────────────────────────────────────────────
export const theOperators: TeamMember[] = [
  {
    id: 'o0',
    name: 'Omkar G K',
    role: 'Web Team',
    image: '/logos/omkar.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o1',
    name: 'Supraj U Sivajji',
    role: 'Web Team',
    image: '/logos/supraj.png',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o2',
    name: 'Moulika',
    role: 'Design Team',
    image: '/logos/moulika.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o3',
    name: 'Moulya',
    role: 'Design Team',
    image: '/logos/moulya.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o4',
    name: 'Tathagat',
    role: 'Sponsorship Team',
    image: '/logos/thatagat.webp',
    linkedin: '',
    instagram: '',

  },
  {
    id: 'o5',
    name: 'Naman Saraff',
    role: 'Sponsorship Team',
    image: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Naman',
    linkedin: '',
    instagram: '',
  },

  {
    id: 'o6',
    name: 'Preetham H S',
    role: 'Marketing and Media Co Lead',
    image: '/logos/preetham.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o7',
    name: 'Hasini Choudary',
    role: 'Marketing & Media Team',
    image: '/logos/hasini.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o8',
    name: 'Mouna S',
    role: 'Design Team',
    image: '/logos/Mouna.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o9',
    name: 'Monisha N S',
    role: 'Drafting Team',
    image: '/logos/monisha.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o10',
    name: 'Madiha Khan',
    role: 'Sponsorship Team',
    image: '/logos/madiha.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o11',
    name: 'Meghana K V',
    role: 'Drafting Team ',
    image: '/logos/meghana.webp',
    linkedin: '',
    instagram: '',
  },
  {
    id: 'o12',
    name: 'Shubangi Jha',
    role: 'Marketing & Media Team ',
    image: '',
    linkedin: '',
    instagram: '',
  },
];

// ── Faculty Coordinator ───────────────────────────────────────
export const facultyCoordinator: TeamMember[] = [
  {
    id: 'fc0',
    name: 'Dr. Bipin Kumar Rai',
    role: 'Faculty Coordinator - Professor, CSE',
    image: '/logos/bhipinsir.webp',
    linkedin: '',
    instagram: '',
  },
];

// ── Faculty Organizers ────────────────────────────────────────
export const facultyOrganizers: TeamMember[] = [
  { id: 'fo1', name: 'Dr. Meenakshi Malhotra', role: 'Associate Professor', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo2', name: 'Dr. Sivananda Reddy', role: 'Associate Professor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo3', name: 'Prof. Bharath M B', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo4', name: 'Prof. Dharmendra D P', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo5', name: 'Dr. Kumar Dilip', role: 'Associate Professor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo6', name: 'Prof. Yashaswini H C', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo7', name: 'Dr. Shreekant Salotagi', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo8', name: 'Prof. Smriti Bharti', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo9', name: 'Prof. Shivani', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo10', name: 'Dr Naitik ST', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'fo11', name: 'Dr. Pannangi Naresh', role: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
];

// ── Chief Patrons ─────────────────────────────────────────────
export const chiefPatrons: TeamMember[] = [
  { id: 'cp1', name: 'Dr. D. Hemachandra Sagar', role: 'Chancellor, DSU', image: '/logos/chancellor.webp', linkedin: '', instagram: '' },
  { id: 'cp2', name: 'Dr. D. Premachandra Sagar', role: 'Pro Chancellor, DSU', image: '/logos/prochancellor.webp', linkedin: '', instagram: '' },
];

// ── Patrons ───────────────────────────────────────────────────
export const patrons: TeamMember[] = [
  { id: 'p1', name: 'Dr. B. S. Satyanarayana', role: 'Vice Chancellor, DSU', image: '/logos/ssatyanarayana.webp', linkedin: '', instagram: '' },
  { id: 'p2', name: 'Prof. R Janardhan', role: 'Pro Vice Chancellor, DSU', image: '/logos/Prof_R_Janardhan.webp', linkedin: '', instagram: '' },
  { id: 'p3', name: 'Dr. Prakash S', role: 'Pro Vice Chancellor, DSU', image: '/logos/Dr_Prakash_S.webp', linkedin: '', instagram: '' },
  { id: 'p4', name: 'Dr. C.Puttamadapappa', role: 'Registrar, DSU', image: '/logos/dr_puttamadappa_c.webp', linkedin: '', instagram: '' },
  { id: 'p5', name: 'Dr.Udaya Kumar Reddy K.R', role: 'Professor & Dean-SoE', image: '/logos/dean.webp', linkedin: '', instagram: '' },
  { id: 'p6', name: 'Dr. Girisha G S', role: 'Chairperson, CSE', image: '/logos/drgirishgs.webp', linkedin: '', instagram: '' },
];

// ── Judges ────────────────────────────────────────────────────
export const judges: TeamMember[] = [
  { id: 'j1', name: 'Arjun Mehta', role: 'CTO, TechCorp', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
  { id: 'j2', name: 'Sneha Iyer', role: 'VP Engineering, InnoSoft', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', linkedin: '', instagram: '' },
];

// ============================================================
//  TEAM DATA  —  edit social links here, nothing else to touch
// ============================================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;   // full URL e.g. "https://linkedin.com/in/username"
}

// ── Core Team ────────────────────────────────────────────────
export const coreTeam: TeamMember[] = [
  {
    id: 'c0',
    name: 'Dr. Bipin Kumar Rai',
    role: 'Faculty Coordinator',
    image: '/logos/bhipinsir.webp',
    linkedin: 'https://www.linkedin.com/in/dr-bipin-kumar-rai-b3a41690/',
  },
  {
    id: 'c1',
    name: 'Trisha',
    role: 'Student Coordinator',
    image: '/logos/trisha.webp',
    linkedin: '',
  },
  {
    id: 'c2',
    name: 'S Shreenidhi',
    role: 'Student Coordinator',
    image: '/logos/SShreenidhi.webp',
    linkedin: 'https://www.linkedin.com/in/shreenidhi-s29/',
  },
];

// ── Sub Heads / Leads ─────────────────────────────────────────
export const subHeads: TeamMember[] = [
  {
    id: 's0',
    name: 'Manavi P',
    role: 'Web Team Lead',
    image: '/logos/manavi.webp',
    linkedin: 'https://www.linkedin.com/in/manavi-p-576a8b279/',
  },
  {
    id: 's1',
    name: 'G Nithesh',
    role: 'Operation Team Lead',
    image: '/logos/nitesh.webp',
    linkedin: 'https://www.linkedin.com/in/g-nithesh/',
  },
  {
    id: 's2',
    name: 'Raksha',
    role: 'Design Team Lead',
    image: '/logos/raksha.webp',
    linkedin: 'https://www.linkedin.com/in/rakshaumashankar/',
  },
  {
    id: 's3',
    name: 'Aastha',
    role: 'Sponsorship Team Lead',
    image: '/logos/astha.webp',
    linkedin: 'https://www.linkedin.com/in/aastha-923603346/',
  },
  {
    id: 's4',
    name: 'Nishchal Gowda R',
    role: 'Media Team Lead',
    image: '/logos/Nishchal.webp',
    linkedin: 'https://www.linkedin.com/in/nishchal-gowda-r-b54208311/',
  },
];

// ── The Operators ─────────────────────────────────────────────
export const theOperators: TeamMember[] = [
  {
    id: 'o13',
    name: 'G Nithesh',
    role: 'Web Team Co Lead',
    image: '/logos/nitesh.webp',
    linkedin: 'https://www.linkedin.com/in/g-nithesh/',
  },
  {
    id: 'o0',
    name: 'Omkar G K',
    role: 'Web Team',
    image: '/logos/omkar.webp',
    linkedin: 'https://www.linkedin.com/in/omkargk/',
  },
  {
    id: 'o1',
    name: 'Supraj U Shivajji',
    role: 'Web Team',
    image: '/logos/supraj.webp',
    linkedin: 'https://www.linkedin.com/in/supraj-u-shivajji-4b7aa62ba/',
  },
  {
    id: 'o2',
    name: 'Moulika',
    role: 'Design Team Co Lead',
    image: '/logos/moulika.webp',
    linkedin: 'https://www.linkedin.com/in/moulika-k-ba8694335/',
  },
  {
    id: 'o3',
    name: 'Moulya',
    role: 'Design Team',
    image: '/logos/moulya.webp',
    linkedin: 'https://www.linkedin.com/in/moulyab/',
  },
  {
    id: 'o4',
    name: 'Tathagat',
    role: 'Sponsorship Team',
    image: '/logos/thatagat.webp',
    linkedin: 'https://www.linkedin.com/in/tathagat-rakesh-29a696385/',
  },
  {
    id: 'o5',
    name: 'Naman Saraff',
    role: 'Sponsorship Team',
    image: '/logos/naman.webp',
    linkedin: 'https://www.linkedin.com/in/naman-saraff-6b34013b0/',
  },
  {
    id: 'o6',
    name: 'Preetham H S',
    role: 'Media Team Co Lead',
    image: '/logos/preetam.webp',
    linkedin: 'https://www.linkedin.com/in/hs-preetham7/',
  },
  {
    id: 'o7',
    name: 'Hasini Choudary',
    role: 'Media Team',
    image: '/logos/hasini.webp',
    linkedin: '',
  },
  {
    id: 'o8',
    name: 'Mouna S',
    role: 'Design Team',
    image: '/logos/Mouna.webp',
    linkedin: 'https://www.linkedin.com/in/mouna-s/',
  },
  {
    id: 'o14',
    name: 'Manavi P',
    role: 'Operation Team Co Lead',
    image: '/logos/manavi.webp',
    linkedin: 'https://www.linkedin.com/in/manavi-p-576a8b279/',
  },
  {
    id: 'o9',
    name: 'Monisha N S',
    role: 'Operation Team',
    image: '/logos/monisha.webp',
    linkedin: 'https://www.linkedin.com/in/monisha-n-s-352431360/',
  },
  {
    id: 'o10',
    name: 'Madiha Khan',
    role: 'Sponsorship Team',
    image: '/logos/madiha.webp',
    linkedin: 'linkedin.com/in/madiha-khan-907461360',
  },
  {
    id: 'o11',
    name: 'Meghana K V',
    role: 'Operation Team',
    image: '/logos/meghana.webp',
    linkedin: 'https://www.linkedin.com/in/meghana-kv-907953338/',
  },
  {
    id: 'o12',
    name: 'Shubangi Jha',
    role: 'Media Team ',
    image: '/logos/shubhangi.webp',
    linkedin: 'https://www.linkedin.com/in/shubhangi-jha-778506305/',
  },
];

// ── Faculty Coordinator ───────────────────────────────────────
export const facultyCoordinator: TeamMember[] = [
  {
    id: 'fc0',
    name: 'Dr. Bipin Kumar Rai',
    role: 'Faculty Coordinator - Professor, CSE',
    image: '/logos/bhipinsir.webp',
    linkedin: 'https://www.linkedin.com/in/dr-bipin-kumar-rai-b3a41690/',
  },
];

// ── Faculty Organizers ────────────────────────────────────────
export const facultyOrganizers: TeamMember[] = [
  
  { id: 'fo2', name: 'Dr. Pannangi Naresh', role: 'Associate Professor', image: '/logos/faculty/pnaresh.webp', linkedin: '' },
  { id: 'fo3', name: 'Dr. Shreekant Salotagi', role: 'Assistant Professor', image: '/logos/faculty/shreekanth.webp', linkedin: '' },
  { id: 'fo4', name: 'Dr. Savitha Hiremath', role: 'Associate Professor', image: 'https://www.dsu.edu.in/images/Engineering/CSE-dept/faculty/DrSavitha.jpg', linkedin: '' },
  { id: 'fo5', name: 'Prof.Shilpa Sudheendran', role: 'Assistant Professor', image: 'https://www.dsu.edu.in/images/Engineering/CSE-dept/faculty/Shilpa.jpg', linkedin: '' },
  { id: 'fo6', name: 'Prof. Bharath M B', role: 'Assistant Professor', image: '/logos/faculty/bharathmb.webp', linkedin: '' },
  { id: 'fo7', name: 'Prof. Dharmendra D P', role: 'Assistant Professor', image: '/logos/faculty/dharmedra.webp', linkedin: '' },
  { id: 'fo8', name: 'Prof. Priya Pudke', role: 'Assistant Professor', image: 'https://www.dsu.edu.in/images/Engineering/CSE-dept/faculty/Priya_Pudke.jpg', linkedin: '' },
  { id: 'fo9', name: 'Prof. Muthu Bala', role: 'Assistant Professor', image: 'https://www.dsu.edu.in/images/Engineering/CSE-dept/faculty/Muthu.jpg', linkedin: '' },
];

// ── Chief Patrons ─────────────────────────────────────────────
export const chiefPatrons: TeamMember[] = [
  { id: 'cp1', name: 'Dr. D. Hemachandra Sagar', role: 'Chancellor, DSU', image: '/logos/chancellor.webp', linkedin: "https://www.dsu.edu.in/about-us/leadership/chancellor" },
  { id: 'cp2', name: 'Dr. D. Premachandra Sagar', role: 'Pro Chancellor, DSU', image: '/logos/prochancellor.webp', linkedin: "https://www.linkedin.com/in/dr-premachandra-sagar-71776319/" },
];

// ── Patrons ───────────────────────────────────────────────────
export const patrons: TeamMember[] = [
  { id: 'p1', name: 'Dr. B. S. Satyanarayana', role: 'Vice Chancellor, DSU', image: '/logos/ssatyanarayana.webp', linkedin: "https://www.linkedin.com/in/bukinakere-s-satyanarayana-04887424/" },
  { id: 'p2', name: 'Prof. R Janardhan', role: 'Pro Vice Chancellor, DSU', image: '/logos/Prof_R_Janardhan.webp', linkedin: "https://www.linkedin.com/in/r-janardhan-8833006/" },
  { id: 'p3', name: 'Dr. Prakash S', role: 'Pro Vice Chancellor, DSU', image: '/logos/Dr_Prakash_S.webp', linkedin: "https://www.linkedin.com/in/educationistprakash/" },
  { id: 'p4', name: 'Dr. C.Puttamadapappa', role: 'Registrar, DSU', image: '/logos/dr_puttamadappa_c.webp', linkedin: "https://www.linkedin.com/in/puttamadappa-c-96204517/" },
  { id: 'p5', name: 'Dr.Udaya Kumar Reddy K.R', role: 'Professor & Dean-SoE', image: '/logos/dean.webp', linkedin: "https://www.linkedin.com/in/dr-udaya-kumar-reddy-k-r-92842112b/" },
  { id: 'p6', name: 'Dr. Girisha G S', role: 'Chairperson, CSE', image: '/logos/drgirishgs.webp', linkedin: "https://www.linkedin.com/in/dr-girish-gs-133a4731/" },
];

// ── Judges ────────────────────────────────────────────────────
export const judges: TeamMember[] = [
  
    { id: 'j1', name: 'Anshu Tiwari', role: 'Engineering Director\n Blueyonder', image: '/logos/judges/anshu.webp', linkedin: 'https://www.linkedin.com/in/anshu-tiwari-8072782b/' },
  { id: 'j2', name: 'Ashish Shukla', role: 'Senior SE II\n dbt Labs', image: '/logos/judges/ashish.webp', linkedin: 'https://www.linkedin.com/in/ash2shukla/' },
    { id: 'j3', name: 'Mrityunjay Rai', role: 'SDET\n Gojek', image: '/logos/judges/mrityunjay.webp', linkedin: 'https://www.linkedin.com/in/mritunjai/' },
    { id: 'j4', name: 'Nandini Vats', role: 'General Manager (QA) \nSamsung Research India', image: '/logos/judges/nandini.webp', linkedin: 'https://www.linkedin.com/in/nandini-vats-a8025a36/' },
    { id: 'j5', name: 'Tarun Agarwal', role: 'SDE 2\nJioHotstar ', image: '/logos/judges/tarun.webp', linkedin: 'https://www.linkedin.com/in/ertarunagarwal/' },
  { id: 'j6', name: 'Kumar Satyarth', role: 'Smart Contract Developer\nPuffer Finance', image: '/logos/judges/kumar1.webp', linkedin: 'https://www.linkedin.com/in/ksatyarth2/' },
{ id: 'j7', name: 'Prashant Srivastava', role: 'Blockchain Developer\nSimplyFi Softech', image: '/logos/judges/prashant.webp', linkedin: 'https://www.linkedin.com/in/prashantsrivastava1001/' },
{ id: 'j8', name: 'Devraj Kumar', role: 'Buider \nEqasOnline', image: '/logos/judges/devraj.webp', linkedin: 'https://www.linkedin.com/in/iamdevraj/' },
  { id: 'j9', name: 'Abhay Chauhan', role: 'Senior SDE \nBizDaddy', image: '/logos/judges/abhaychauhan.webp', linkedin: 'https://www.linkedin.com/in/theabhaychauhan/' },
{ id: 'j10', name: 'Abhay Singh', role: 'SDE 2\nAmazon', image: '/logos/judges/abhaysingh.webp', linkedin: 'https://www.linkedin.com/in/abhay-singh-a64b89192/' },


];

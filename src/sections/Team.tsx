import { TeamCarousel, type TeamMember } from '../components/TeamCarousel';

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Passionate about creating modern, responsive web applications using the latest technologies.',
    linkedin: 'https://linkedin.com/'
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80',
    bio: 'Specializes in user-centric design paradigms and creating seamless digital experiences.',
    linkedin: 'https://linkedin.com/'
  },
  {
    id: '3',
    name: 'Charlie Davis',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Dedicated to agile methodologies and keeping the team aligned with our core goals.',
    linkedin: 'https://linkedin.com/'
  },
  {
    id: '4',
    name: 'Diana Reyes',
    role: 'Marketing Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    bio: 'Expert at building brand awareness and engaging community interactions.'
  },
  {
    id: '5',
    name: 'Evan Wright',
    role: 'Backend Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Architecting scalable server-side systems and robust APIs.'
  }
];

export default function Team() {
  return (
    <section id="team" className="relative w-full overflow-hidden bg-[#f3ecd2]">
      <TeamCarousel 
        members={teamMembers} 
        title="OUR TEAM"
        titleColor="#1a1a1a"
        infoTextColor="#1a1a1a"
        background="transparent"
      />
    </section>
  );
}

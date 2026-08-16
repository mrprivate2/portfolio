import photoUrl from '../assets/profile.jpeg';

export const profile = {
  name: 'Sawan Yadav',
  firstName: 'Sawan',
  lastName: 'Yadav',
  monogram: 'S',
  role: 'Software Engineer',
  roleTagline: 'Full Stack Developer',
  location: 'Punjab, India',
  email: 'sawanyadav3010@gmail.com',
  availability: 'Available for opportunities',
  photo: photoUrl,
  photoAlt: 'Portrait of Sawan Yadav',
  headline: 'Developer who builds things that actually work.',
  intro:
    'I build full-stack applications, real-time systems, and developer tools. Strong in Java and the modern JS ecosystem, I care about clean architecture, responsive UIs, and software that ships.',
  bio: `I am a Software Engineer and Full Stack Developer currently studying at Chandigarh University. I specialize in building responsive web applications, real-time systems, and efficient backends. With strong proficiency in Java and hands-on experience across the JavaScript ecosystem, I focus on creating scalable, user-centric solutions — always curious about new technologies and clean code.`,
  // Only include numbers that are real — edit these to match reality.
  stats: [
    { value: '12+', label: 'Projects shipped' },
    { value: '200+', label: 'Problems solved' },
    { value: '1st', label: 'Hackathon winner' },
  ],
  interests: [
    'Building software',
    'Solving algorithmic problems',
    'Experimenting with AI',
    'Open source',
    'Cybersecurity',
  ],
} as const;

export type Profile = typeof profile;

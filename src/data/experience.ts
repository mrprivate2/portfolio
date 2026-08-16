export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  detail: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  points: string[];
}

export const education: EducationEntry[] = [
  {
    school: 'Chandigarh University',
    degree: "Bachelor's degree (pursuing)",
    period: '2022 – 2026',
    detail: 'Studying Computer Science while building and shipping full-stack projects.',
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: 'Independent Developer',
    org: 'Personal projects & open source',
    period: '2023 – Present',
    points: [
      'Designed and shipped full-stack applications end to end — from schema to deployed UI.',
      'Built real-time systems (WebSocket chat, collaborative editing) and developer tools.',
      'Practiced DSA regularly, solving 200+ problems across platforms.',
    ],
  },
];

export interface AchievementEntry {
  title: string;
  detail: string;
}

export const achievements: AchievementEntry[] = [
  { title: 'Hackathon Winner', detail: '1st place in a university hackathon.' },
  { title: 'Problem Solving', detail: '200+ DSA problems solved on competitive platforms.' },
  { title: 'Projects Shipped', detail: '4+ full-stack projects built end to end.' },
];

/** Add real certifications here; empty sections are hidden automatically. */
export const certifications: string[] = [];

import type { ComponentType } from 'react';
import { BrainCircuit, Database, Layers, Radio, Server, Webhook } from 'lucide-react';
import {
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';

export type SkillIcon = ComponentType<{ className?: string }>;

export interface SkillGroup {
  id: string;
  label: string;
  icon: SkillIcon;
  note?: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: SiOpenjdk,
    skills: ['Java', 'C++', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: SiReact,
    skills: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets'],
  },
  {
    id: 'database',
    label: 'Database & Cloud',
    icon: Database,
    skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'],
  },
  {
    id: 'tools',
    label: 'Tools & Workflow',
    icon: Layers,
    skills: ['Git', 'GitHub Actions', 'Docker', 'Vite', 'Figma', 'Linux'],
  },
  {
    id: 'ai',
    label: 'AI / ML',
    icon: BrainCircuit,
    note: 'currently exploring',
    skills: ['Python', 'LLM APIs', 'RAG', 'Prompt Engineering'],
  },
];

// Icons used only as chip decorations on the Home window
export const skillChipIcons: Record<string, SkillIcon> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Java: SiOpenjdk,
  Python: SiPython,
  'C++': SiCplusplus,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  GraphQL: SiGraphql,
  WebSockets: Radio,
  'REST APIs': Webhook,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  Firebase: SiFirebase,
  Git: SiGit,
  'GitHub Actions': SiGithubactions,
  Docker: SiDocker,
  Vite: SiVite,
  Figma: SiFigma,
  Linux: SiLinux,
};

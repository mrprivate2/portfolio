import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Code2,
  FileText,
  FolderKanban,
  Mail,
  Music,
  Settings,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { profile } from '../data/profile';
import { socials } from '../data/socials';
import { skillChipIcons } from '../data/skills';
import { brandIcons } from '../lib/brandIcons';
import { useWindowManager } from '../context/WindowManager';

const featuredChips = ['React', 'Next.js', 'TypeScript', 'Java', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker'];

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.05 * i, ease: 'easeOut' as const },
  }),
};

export default function Home() {
  const { openApp } = useWindowManager();

  const quickLinks = [
    { label: 'About Me', icon: User, appId: 'about' as const },
    { label: 'My Work', icon: FolderKanban, appId: 'work' as const },
    { label: 'Skills', icon: Sparkles, appId: 'skills' as const },
    { label: 'Resume', icon: FileText, appId: 'resume' as const },
    { label: 'README', icon: Code2, appId: 'readme' as const },
    { label: 'Profiles', icon: Users, appId: 'profiles' as const },
    { label: 'Music', icon: Music, appId: 'music' as const },
    { label: 'Contact', icon: Mail, appId: 'contact' as const },
    { label: 'Settings', icon: Settings, appId: 'settings' as const },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full grid lg:grid-cols-[1.45fr_1fr] gap-8 lg:gap-10 p-6 md:p-10">
        {/* Left column */}
        <div className="flex flex-col justify-center gap-6">
          <motion.div variants={fade} custom={0} initial="hidden" animate="show" className="flex items-center gap-2.5">
            <span className="relative flex items-center gap-2 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/[0.06] px-3 py-1">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-70 animate-soft-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </span>
              <span className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-[#22c55e] font-medium">
                {profile.availability}
              </span>
            </span>
          </motion.div>

          <motion.div variants={fade} custom={1} initial="hidden" animate="show">
            <h1 className="font-display font-bold text-[clamp(2.8rem,6.5vw,5rem)] leading-[0.95] tracking-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              {profile.firstName}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39ff88] via-[#22c55e] to-[#168044] drop-shadow-[0_0_28px_rgba(57,255,136,0.22)]">
                {profile.lastName}
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fade} custom={2} initial="hidden" animate="show">
            <p className="font-display text-lg md:text-xl text-white/90">
              {profile.headline}
            </p>
            <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-white/55 max-w-xl">
              {profile.intro}
            </p>
            <p className="mt-4 font-mono text-[11px] md:text-xs text-accent-soft/80 select-none">
              <span className="text-white/35">~/portfolio</span> $ npm run dev -- --live
              <span className="inline-block w-2 h-[13px] translate-y-[2px] ml-1 bg-accent-soft animate-caret" aria-hidden="true" />
            </p>
          </motion.div>

          <motion.div variants={fade} custom={3} initial="hidden" animate="show" className="flex flex-wrap gap-3">
            <button
              onClick={() => openApp('work')}
              className="group flex items-center gap-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 transition-colors"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white/90 text-sm font-medium px-5 py-2.5 transition-colors"
              >
                <brandIcons.github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </motion.div>

          <motion.div variants={fade} custom={4} initial="hidden" animate="show" className="flex flex-wrap gap-2">
            {featuredChips.map((chip) => {
              const Icon = skillChipIcons[chip];
              return (
                <span
                  key={chip}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {chip}
                </span>
              );
            })}
          </motion.div>

          <motion.div variants={fade} custom={5} initial="hidden" animate="show" className="flex flex-wrap gap-8 pt-2">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl md:text-3xl text-white">{stat.value}</div>
                <div className="text-[11px] tracking-wider uppercase text-white/45 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex flex-col items-center lg:items-end justify-center gap-6">
          <motion.div
            variants={fade}
            custom={2}
            initial="hidden"
            animate="show"
            className="relative w-56 md:w-64"
          >
            {/* gradient ring frame */}
            <div className="rounded-[18px] p-[1.5px] bg-gradient-to-br from-accent/70 via-white/10 to-violet/70 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)]">
              <div className="rounded-[17px] bg-[#0a0f0b] p-2">
                <img
                  src={profile.photo}
                  alt={profile.photoAlt}
                  draggable={false}
                  className="w-full aspect-[4/5] object-cover rounded-[12px]"
                />
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full glass-strong px-3.5 py-1 text-[10px] tracking-[0.2em] uppercase text-white/85 border border-white/10">
              {profile.monogram} · {profile.role}
            </div>
            <div className="absolute -top-3 -right-3 w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-violet flex items-center justify-center font-display font-bold text-white shadow-[0_8px_24px_rgba(var(--accent-channels),0.5)]">
              {profile.monogram}
            </div>
          </motion.div>

          <motion.div
            variants={fade}
            custom={3}
            initial="hidden"
            animate="show"
            className="w-full max-w-[280px] grid grid-cols-2 gap-2.5"
          >
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => openApp(link.appId)}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-white/25 px-3 py-2.5 text-left transition-colors"
                >
                  <Icon className="w-4 h-4 text-accent-soft" />
                  <span className="text-xs text-white/80 flex-1">{link.label}</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white/70 transition-colors" />
                </button>
              );
            })}
          </motion.div>

          <motion.div variants={fade} custom={4} initial="hidden" animate="show" className="flex items-center gap-3">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <brandIcons.github className="w-4 h-4" />
              </a>
            )}
            {socials.leetcode && (
              <a
                href={socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <brandIcons.leetcode className="w-4 h-4" />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <brandIcons.linkedin className="w-4 h-4" />
              </a>
            )}
            {socials.x && (
              <a
                href={socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <brandIcons.x className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { lazy, Suspense, useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  FileText,
  FolderKanban,
  Home,
  Mail,
  Music,
  Palette,
  Sparkles,
  Terminal,
  User,
  Users,
  X,
} from 'lucide-react';
import { profile } from '../data/profile';
import { socials } from '../data/socials';
import { projects, type Project } from '../data/projects';
import { brandIcons } from '../lib/brandIcons';
import { ProjectCover } from '../lib/projectCover';
import { cn } from '../lib/cn';

const AboutApp = lazy(() => import('../applications/About'));
const SkillsApp = lazy(() => import('../applications/Skills'));
const ProfilesApp = lazy(() => import('../applications/Profiles'));
const ContactApp = lazy(() => import('../applications/Contact'));
const ResumeApp = lazy(() => import('../applications/Resume'));
const ReadmeApp = lazy(() => import('../applications/Readme'));
const TerminalApp = lazy(() => import('../applications/Terminal'));
const WallpaperApp = lazy(() => import('../applications/WallpaperApp'));
const MusicApp = lazy(() => import('../applications/Music'));
const ProjectDetail = lazy(() =>
  import('../applications/Work').then((m) => ({ default: m.ProjectDetail }))
);

type Tab = 'home' | 'about' | 'work' | 'skills' | 'contact';
type SheetId = 'about' | 'resume' | 'readme' | 'profiles' | 'terminal' | 'wallpaper' | 'music';

const tabs: Array<{ id: Tab; label: string; icon: ComponentType<{ className?: string }> }> = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'work', label: 'Work', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const sheetMeta: Record<SheetId, { title: string; icon: ComponentType<{ className?: string }>; component: ComponentType }> = {
  about: { title: 'About Me', icon: User, component: AboutApp },
  resume: { title: 'Resume', icon: FileText, component: ResumeApp },
  profiles: { title: 'Profiles', icon: Users, component: ProfilesApp },
  readme: { title: 'README.txt', icon: Code2, component: ReadmeApp },
  terminal: { title: 'Terminal', icon: Terminal, component: TerminalApp },
  wallpaper: { title: 'Wallpaper', icon: Palette, component: WallpaperApp },
  music: { title: 'Music', icon: Music, component: MusicApp },
};

function LazyContent({ component: Component }: { component: ComponentType }) {
  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}

export function MobileApp() {
  const [tab, setTab] = useState<Tab>('home');
  const [sheet, setSheet] = useState<SheetId | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Full Stack', 'AI', 'Cybersecurity', 'Java', 'Python', 'React'];
  const visible =
    filter === 'All' ? projects : projects.filter((p) => p.categories.some((c) => c.toLowerCase().includes(filter.toLowerCase())));

  return (
    <div className="fixed inset-0 bg-[#030504] text-[#e7f0e9] overflow-hidden select-none">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/10 px-4 pt-3 pb-2.5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-violet flex items-center justify-center font-display font-bold text-white text-sm shrink-0">
          {profile.monogram}
        </div>
        <div className="min-w-0">
          <h1 className="font-display font-semibold text-[15px] text-white truncate">{profile.name}</h1>
          <p className="text-[11px] text-white/50 truncate">{profile.role} · {profile.roleTagline}</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          Open
        </span>
      </header>

      {/* Content */}
      <main className="absolute inset-x-0 bottom-[64px] top-[60px] overflow-y-auto">
        {tab === 'home' && (
          <div className="px-4 py-5 space-y-6">
            {/* Hero */}
            <div className="flex items-center gap-4">
              <img
                src={profile.photo}
                alt={profile.photoAlt}
                className="w-20 h-24 object-cover rounded-2xl border border-white/15"
                draggable={false}
              />
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.2em] uppercase text-accent-soft font-medium">{profile.availability}</p>
                <h2 className="font-display font-bold text-xl text-white mt-0.5">{profile.headline}</h2>
                <p className="text-[13px] text-white/55 mt-1 leading-relaxed">{profile.intro}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-xl text-white">{s.value}</div>
                  <div className="text-[10px] tracking-wider uppercase text-white/40">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2.5">Applications</p>
              <div className="grid grid-cols-3 gap-2.5">
                {(
                  [
                    { id: 'resume', label: 'Resume', icon: FileText },
                    { id: 'readme', label: 'README', icon: Code2 },
                    { id: 'profiles', label: 'Profiles', icon: Users },
                    { id: 'terminal', label: 'Terminal', icon: Terminal },
                    { id: 'wallpaper', label: 'Wallpaper', icon: Palette },
                    { id: 'music', label: 'Music', icon: Music },
                  ] as Array<{ id: SheetId; label: string; icon: ComponentType<{ className?: string }> }>
                ).map((app) => {
                  const Icon = app.icon;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setSheet(app.id)}
                      className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3.5 active:scale-95 transition-transform"
                    >
                      <Icon className="w-5 h-5 text-accent-soft" />
                      <span className="text-[11px] text-white/75">{app.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2.5">Find me online</p>
              <div className="flex gap-2.5">
                {socials.github && (
                  <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-[13px] text-white/80 active:scale-95 transition-transform">
                    <brandIcons.github className="w-4 h-4" /> GitHub
                  </a>
                )}
                {socials.leetcode && (
                  <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-[13px] text-white/80 active:scale-95 transition-transform">
                    <brandIcons.leetcode className="w-4 h-4" /> LeetCode
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-[13px] text-white/80 active:scale-95 transition-transform">
                    <brandIcons.linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'work' && (
          <div className="px-4 py-5">
            <h2 className="font-display font-bold text-xl text-white">My Work</h2>
            <p className="text-[13px] text-white/50 mt-0.5">Projects shipped end to end.</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs border transition-colors',
                    filter === f
                      ? 'bg-accent border-accent text-white'
                      : 'border-white/10 bg-white/[0.04] text-white/65'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-4">
              {visible.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProject(p)}
                  className="w-full text-left rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden active:scale-[0.99] transition-transform"
                >
                  <ProjectCover project={p} className="w-full h-28" />
                  <div className="p-3.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-white">{p.name}</h3>
                      <span className="text-[10px] text-white/40">{p.year}</span>
                    </div>
                    <p className="text-[12px] text-white/55 mt-1 line-clamp-2">{p.description}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-accent-soft">
                      Read case study <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'about' && <LazyContent component={AboutApp} />}
        {tab === 'skills' && <LazyContent component={SkillsApp} />}
        {tab === 'contact' && <LazyContent component={ContactApp} />}
      </main>

      {/* Bottom nav */}
      <nav className="absolute bottom-0 inset-x-0 z-40 glass border-t border-white/10 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 flex justify-around" aria-label="Primary">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors',
                active ? 'text-accent-soft' : 'text-white/45'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{t.label}</span>
              <span className={cn('w-1 h-1 rounded-full', active ? 'bg-accent-soft' : 'bg-transparent')} />
            </button>
          );
        })}
      </nav>

      {/* Project detail sheet */}
      <AnimatePresence>
        {project && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed inset-0 z-[9500] bg-[#030504] flex flex-col"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 glass shrink-0">
              <button onClick={() => setProject(null)} aria-label="Close project" className="text-white/70">
                <X className="w-5 h-5" />
              </button>
              <span className="font-display font-semibold text-white">{project.name}</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Suspense
                fallback={
                  <div className="h-full flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  </div>
                }
              >
                <ProjectDetail project={project} onBack={() => setProject(null)} />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* App sheets */}
      <AnimatePresence>
        {sheet && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed inset-0 z-[9600] bg-[#030504] flex flex-col"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 glass shrink-0">
              <button onClick={() => setSheet(null)} aria-label={`Close ${sheetMeta[sheet].title}`} className="text-white/70">
                <X className="w-5 h-5" />
              </button>
              <span className="flex items-center gap-2 font-display font-semibold text-white">
                {(() => {
                  const Icon = sheetMeta[sheet].icon;
                  return <Icon className="w-4 h-4 text-accent-soft" />;
                })()}
                {sheetMeta[sheet].title}
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <LazyContent component={sheetMeta[sheet].component} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

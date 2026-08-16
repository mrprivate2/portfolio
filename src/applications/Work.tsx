import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, FolderKanban } from 'lucide-react';
import { projectCategories, projectsInCategory, type Project } from '../data/projects';
import { ProjectCover } from '../lib/projectCover';
import { brandIcons } from '../lib/brandIcons';
import { socials } from '../data/socials';
import { cn } from '../lib/cn';

const filters = ['All', 'Full Stack', 'AI', 'Cybersecurity', 'Java', 'Python', 'React'];

export default function Work() {
  const [category, setCategory] = useState('Featured');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const visible =
    filter === 'All'
      ? projectsInCategory(category)
      : projectsInCategory(category).filter((p) =>
          p.categories.some((c) => c.toLowerCase().includes(filter.toLowerCase()))
        );

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <aside className="w-44 shrink-0 border-r border-white/10 bg-black/20 p-4 hidden md:flex flex-col">
        <div className="flex items-center gap-2 text-white/90">
          <FolderKanban className="w-4 h-4 text-accent-soft" />
          <span className="font-display font-semibold text-sm tracking-wide">MY WORK</span>
        </div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/35 mt-1 mb-4">Projects</p>
        <nav className="flex flex-col gap-0.5" aria-label="Project categories">
          {projectCategories.map((cat) => {
            const count = projectsInCategory(cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'flex items-center justify-between rounded-lg px-3 py-1.5 text-[13px] transition-colors',
                  category === cat
                    ? 'bg-accent/20 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white/85'
                )}
              >
                <span>{cat}</span>
                <span className={cn('text-[11px]', category === cat ? 'text-accent-soft' : 'text-white/35')}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
        {socials.github && (
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70 hover:bg-white/10 transition-colors"
          >
            <brandIcons.github className="w-4 h-4" />
            All on GitHub
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 md:p-7">
          <div className="flex items-center gap-2 md:hidden">
            <FolderKanban className="w-4 h-4 text-accent-soft" />
            <span className="font-display font-semibold text-sm tracking-wide text-white">MY WORK</span>
          </div>
          <h2 className="font-display font-bold text-xl md:text-2xl text-white mt-3 md:mt-0">
            Projects
          </h2>
          <p className="text-sm text-white/50 mt-1">
            {category === 'Featured' ? 'Selected work I’ve shipped end to end.' : `Projects in ${category}.`}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-5" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border',
                  filter === f
                    ? 'bg-accent border-accent text-white'
                    : 'border-white/10 bg-white/[0.04] text-white/65 hover:border-white/25 hover:text-white'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Cards */}
          {visible.length === 0 ? (
            <div className="mt-10 text-center text-sm text-white/40 py-10">
              No projects in this category yet.
            </div>
          ) : (
            <motion.div
              layout
              className="grid sm:grid-cols-2 gap-5 mt-6"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((project) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelected(project)}
                    className="group cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-accent/50 hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="overflow-hidden">
                      <ProjectCover project={project} className="w-full h-36 object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    </div>
                    <div className="p-4 md:p-5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display font-semibold text-base text-white">{project.name}</h3>
                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50 shrink-0">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-[13px] text-white/55 leading-relaxed mt-1.5 line-clamp-2">
                        {project.description}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {project.features.slice(0, 2).map((f) => (
                          <li key={f} className="flex gap-1.5 text-[11px] text-white/50">
                            <Check className="w-3 h-3 text-[#22c55e] mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-white/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-xs text-accent-soft hover:bg-accent/20 transition-colors"
                          >
                            <brandIcons.github className="w-3.5 h-3.5" /> GitHub
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-white/75 hover:border-white/30 hover:bg-white/[0.06] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                          </a>
                        )}
                        <span className="ml-auto text-xs text-white/35 group-hover:text-accent-soft flex items-center gap-1 transition-colors">
                          Case study <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

interface DetailPart {
  title: string;
  body?: string;
  list?: string[];
  chips?: boolean;
  amber?: boolean;
}

export function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  // Only render sections that actually have content — small repos skip the
  // case-study prose instead of showing fabricated filler.
  const parts: DetailPart[] = [
    { title: 'Overview', body: project.overview },
    { title: 'Problem', body: project.problem },
    { title: 'Solution', body: project.solution },
    { title: 'Architecture', body: project.architecture },
    { title: 'Features', list: project.features },
    { title: 'Tech Stack', list: project.tech, chips: true },
    { title: 'Challenges', list: project.challenges, amber: true },
    { title: 'What I Learned', list: project.learned },
  ].filter((p) => Boolean(p.body?.trim()) || Boolean(p.list && p.list.length > 0));

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto p-5 md:p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All projects
        </button>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
            <ProjectCover project={project} className="w-full h-44 md:h-56" />
          </div>

          <div className="mt-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white">{project.name}</h2>
                <span className="rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#22c55e]">
                  {project.status}
                </span>
              </div>
              <p className="text-sm md:text-base text-white/60 mt-1">{project.tagline}</p>
            </div>
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-medium px-4 py-2 transition-colors"
                >
                  <brandIcons.github className="w-4 h-4" /> Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/15 hover:border-white/35 text-white/85 text-xs font-medium px-4 py-2 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {parts.map((part, i) => (
          <motion.section
            key={part.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-8"
          >
            <h3
              className={cn(
                'font-display font-semibold text-sm tracking-[0.15em] uppercase flex items-center gap-2',
                part.amber ? 'text-[#fbbf24]' : 'text-accent-soft'
              )}
            >
              <span className="text-white/25">0{i + 1}</span> {part.title}
            </h3>
            {part.body ? (
              <p className="text-sm md:text-[15px] text-white/65 leading-relaxed mt-2.5">{part.body}</p>
            ) : part.chips ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {part.list!.map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs text-white/75">
                    {t}
                  </span>
                ))}
              </div>
            ) : (
              <ul className="mt-2.5 space-y-1.5">
                {part.list!.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/65 leading-relaxed">
                    <span className={part.amber ? 'text-[#fbbf24] mt-0.5' : 'text-[#22c55e] mt-0.5'}>▸</span>{' '}
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        ))}
      </div>
    </div>
  );
}

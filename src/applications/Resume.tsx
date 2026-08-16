import { Download, ExternalLink } from 'lucide-react';
import { profile } from '../data/profile';
import { socials } from '../data/socials';
import { education, experience, achievements, certifications } from '../data/experience';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { downloadResumePdf, openResumeInNewTab } from '../lib/resumePdf';
import { brandIcons, platformNames, type PlatformId } from '../lib/brandIcons';

const codingPlatforms: Array<{ id: PlatformId; url: string }> = (
  [
    ['github', socials.github],
    ['leetcode', socials.leetcode],
    ['linkedin', socials.linkedin],
    ['x', socials.x],
    ['codechef', socials.codechef],
    ['geeksforgeeks', socials.geeksforgeeks],
  ] as Array<[PlatformId, string]>
)
  .filter(([, url]) => url.length > 0)
  .map(([id, url]) => ({ id, url }));

export default function Resume() {
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/30 shrink-0">
        <span className="text-xs text-white/50">resume.pdf — Sawan</span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={downloadResumePdf}
            className="flex items-center gap-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-medium px-3.5 py-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download PDF
          </button>
          <button
            onClick={openResumeInNewTab}
            className="flex items-center gap-2 rounded-lg border border-white/15 hover:border-white/35 text-white/85 text-xs font-medium px-3.5 py-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open in New Tab
          </button>
        </div>
      </div>

      {/* Document */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-[#0a0f0b] shadow-2xl shadow-black/40">
          <div className="grid md:grid-cols-[240px_1fr]">
            {/* Sidebar */}
            <aside className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/10 bg-black/30">
              <img
                src={profile.photo}
                alt={profile.photoAlt}
                className="w-24 h-28 object-cover rounded-lg border border-white/15"
                draggable={false}
              />
              <h3 className="font-display font-bold text-lg text-white mt-4">{profile.name}</h3>
              <p className="text-xs text-accent-soft mt-0.5">{profile.role}</p>

              <div className="mt-4 space-y-1.5 text-xs text-white/60">
                <p>{profile.location}</p>
                <p className="break-all">{profile.email}</p>
              </div>

              <div className="mt-5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/35 mb-2">Skills</p>
                <div className="space-y-2.5">
                  {skillGroups.map((g) => (
                    <div key={g.id}>
                      <p className="text-[11px] text-white/70 font-medium">{g.label}</p>
                      <p className="text-[11px] text-white/45 leading-relaxed mt-0.5">{g.skills.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="p-5 md:p-7">
              <section>
                <h2 className="font-display font-semibold text-sm tracking-[0.2em] uppercase text-accent-soft">Summary</h2>
                <p className="text-[13px] text-white/65 leading-relaxed mt-2">{profile.bio}</p>
              </section>

              {experience.length > 0 && (
                <section className="mt-7">
                  <h2 className="font-display font-semibold text-sm tracking-[0.2em] uppercase text-accent-soft">Experience</h2>
                  {experience.map((job) => (
                    <div key={job.role} className="mt-3">
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <h3 className="font-medium text-sm text-white">{job.role}</h3>
                        <span className="text-[11px] text-white/40">{job.period}</span>
                      </div>
                      <p className="text-xs text-accent-soft">{job.org}</p>
                      <ul className="mt-1.5 space-y-1">
                        {job.points.map((p) => (
                          <li key={p} className="flex gap-2 text-[13px] text-white/60 leading-relaxed">
                            <span className="text-[#22c55e]">▸</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}

              <section className="mt-7">
                <h2 className="font-display font-semibold text-sm tracking-[0.2em] uppercase text-accent-soft">Projects</h2>
                <div className="space-y-4 mt-3">
                  {projects.map((p) => (
                    <div key={p.id}>
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <h3 className="font-medium text-sm text-white">{p.name}</h3>
                        <span className="text-[11px] text-white/40">{p.year}</span>
                      </div>
                      <p className="text-[13px] text-white/60 leading-relaxed mt-0.5">{p.description}</p>
                      <p className="text-[11px] text-accent-soft/80 mt-1">{p.tech.join(' · ')}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-7">
                <h2 className="font-display font-semibold text-sm tracking-[0.2em] uppercase text-accent-soft">Education</h2>
                {education.map((edu) => (
                  <div key={edu.school} className="mt-3">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <h3 className="font-medium text-sm text-white">{edu.school}</h3>
                      <span className="text-[11px] text-white/40">{edu.period}</span>
                    </div>
                    <p className="text-xs text-accent-soft">{edu.degree}</p>
                    <p className="text-[13px] text-white/60 mt-0.5">{edu.detail}</p>
                  </div>
                ))}
              </section>

              {achievements.length > 0 && (
                <section className="mt-7">
                  <h2 className="font-display font-semibold text-sm tracking-[0.2em] uppercase text-accent-soft">Achievements</h2>
                  <ul className="mt-2 space-y-1.5">
                    {achievements.map((a) => (
                      <li key={a.title} className="flex gap-2 text-[13px] text-white/60 leading-relaxed">
                        <span className="text-[#fbbf24]">★</span>
                        <span><span className="text-white/85 font-medium">{a.title}</span> — {a.detail}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {certifications.length > 0 && (
                <section className="mt-7">
                  <h2 className="font-display font-semibold text-sm tracking-[0.2em] uppercase text-accent-soft">Certifications</h2>
                  <ul className="mt-2 space-y-1.5">
                    {certifications.map((c) => (
                      <li key={c} className="flex gap-2 text-[13px] text-white/60">
                        <span className="text-[#22c55e]">▸</span> {c}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {codingPlatforms.length > 0 && (
                <section className="mt-7">
                  <h2 className="font-display font-semibold text-sm tracking-[0.2em] uppercase text-accent-soft">Coding Profiles</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {codingPlatforms.map((p) => {
                      const Icon = brandIcons[p.id];
                      return (
                        <a
                          key={p.id}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 hover:bg-white/10 hover:border-white/25 transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {platformNames[p.id]}
                        </a>
                      );
                    })}
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

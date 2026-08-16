import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { profile } from '../data/profile';

const roles = ['Full Stack Developer', 'AI / ML Enthusiast', 'Cybersecurity Enthusiast', 'Problem Solver'];

const facts = [
  { label: 'Name', value: profile.name },
  { label: 'Role', value: profile.role },
  { label: 'Study', value: 'Chandigarh University' },
  { label: 'Base', value: profile.location },
  { label: 'Status', value: 'Open to opportunities' },
  { label: 'Focus', value: 'Full Stack Dev' },
];

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.04 * i, ease: 'easeOut' as const },
  }),
};

export default function About() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        {/* Passport header */}
        <motion.div variants={fade} custom={0} initial="hidden" animate="show">
          <p className="text-[10px] tracking-[0.3em] uppercase text-accent-soft font-medium">Passport // Developer</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-1">ABOUT ME</h2>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={fade}
          custom={1}
          initial="hidden"
          animate="show"
          className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="grid sm:grid-cols-[auto_1fr]">
            {/* Photo */}
            <div className="relative p-5 flex flex-col items-center sm:border-r border-white/10 bg-black/20">
              <div className="relative">
                <img
                  src={profile.photo}
                  alt={profile.photoAlt}
                  draggable={false}
                  className="w-32 h-40 object-cover rounded-xl border border-white/15"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-[#168044] px-2.5 py-0.5 text-[9px] tracking-[0.2em] uppercase font-bold text-white whitespace-nowrap">
                  {profile.monogram}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-1.5 max-w-[160px]">
                {roles.map((r) => (
                  <span key={r} className="rounded border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/70">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-5 md:p-6 flex flex-col gap-5">
              <div>
                <h3 className="font-display font-bold text-2xl text-white">{profile.name}</h3>
                <p className="text-sm text-white/55 mt-0.5">{profile.role} · {profile.roleTagline}</p>
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <span className="flex items-center gap-2 text-white/70">
                  <MapPin className="w-4 h-4 text-accent-soft" /> Based in {profile.location}
                </span>
                <span className="flex items-center gap-2 text-white/70">
                  <GraduationCap className="w-4 h-4 text-[#22c55e]" /> Chandigarh University
                </span>
                <span className="flex items-center gap-2 text-white/70">
                  <Briefcase className="w-4 h-4 text-[#22c55e]" /> Software Engineer
                </span>
                <span className="flex items-center gap-2 text-white/70">
                  <Sparkles className="w-4 h-4 text-[#fbbf24]" /> Exploring AI / ML
                </span>
              </div>

              <p className="text-[13px] leading-relaxed text-white/55">
                {profile.bio}
              </p>

              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-2">Interests</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.interests.map((i) => (
                    <span key={i} className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 text-[11px] text-white/75">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System status — compact, real info only */}
        <motion.div
          variants={fade}
          custom={2}
          initial="hidden"
          animate="show"
          className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">System Status</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="relative flex w-2 h-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60 animate-soft-ping" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-[#22c55e]" />
            </span>
            <span className="text-sm text-white/85">Available for opportunities</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mt-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {['Java', 'React', 'Python', 'TypeScript', 'Node.js', 'AI / ML'].map((s) => (
                  <span key={s} className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 text-[11px] text-white/75">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Focus</p>
              <div className="flex flex-wrap gap-1.5">
                {['Full Stack Development', 'Cybersecurity', 'Artificial Intelligence'].map((s) => (
                  <span key={s} className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 text-[11px] text-white/75">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick facts */}
        <motion.div variants={fade} custom={3} initial="hidden" animate="show" className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
              <div className="text-[9px] tracking-[0.25em] uppercase text-white/40">{fact.label}</div>
              <div className="text-sm font-medium text-white/90 mt-1">{fact.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={fade} custom={4} initial="hidden" animate="show" className="mt-6 flex flex-wrap gap-10">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-accent-soft to-violet">
                {stat.value}
              </div>
              <div className="text-[11px] tracking-wider uppercase text-white/45 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

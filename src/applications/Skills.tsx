import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';

export default function Skills() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-accent-soft font-medium">Skills Explorer</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-1">My toolkit</h2>
        <p className="text-sm text-white/55 mt-2">
          Technologies I actually use — no made-up percentages.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-7">
          {skillGroups.map((group, gi) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.05 * gi }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-accent/40 hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-accent-soft" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">{group.label}</h3>
                    {group.note && (
                      <span className="text-[10px] uppercase tracking-wider text-white/40">{group.note}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -2 }}
                      className="rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-xs text-white/75 hover:border-accent/50 hover:text-white cursor-default transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

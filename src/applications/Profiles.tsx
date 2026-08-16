import { ArrowUpRight } from 'lucide-react';
import {
  brandIcons,
  platformColors,
  platformNames,
  platformTaglines,
  type PlatformId,
} from '../lib/brandIcons';
import { socials } from '../data/socials';

const order: PlatformId[] = ['github', 'leetcode', 'linkedin', 'x', 'codechef', 'geeksforgeeks', 'hackerrank', 'codeforces', 'kaggle'];

const cards = order
  .map((id) => ({ id, url: socials[id] as string }))
  .filter((c) => c.url.length > 0);

export default function Profiles() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-accent-soft font-medium">Developer Profiles</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-1">Where I code</h2>
        <p className="text-sm text-white/55 mt-2">
          Open source, competitive programming and problem solving — everything is linked below.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-7">
          {cards.map((card, i) => {
            const Icon = brandIcons[card.id];
            const color = platformColors[card.id];
            return (
              <a
                key={card.id}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-200 hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}1a`, color, border: `1px solid ${color}40` }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">{platformNames[card.id]}</h3>
                    <p className="text-xs text-white/50">{platformTaglines[card.id]}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className="text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color }}
                  >
                    View Profile <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-white/30 truncate ml-auto max-w-[55%] text-right">
                    {card.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {cards.length === 0 && (
          <p className="text-sm text-white/40 mt-8 text-center">
            Add profile URLs in <code className="text-accent-soft">src/data/socials.ts</code> to show them here.
          </p>
        )}
      </div>
    </div>
  );
}

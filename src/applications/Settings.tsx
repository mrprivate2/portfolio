import type { ReactNode } from 'react';
import { ArrowDownWideNarrow, Monitor, Moon, MousePointerClick, SlidersHorizontal } from 'lucide-react';
import { useSettings, type AccentId, type IconSizeId, type SortBy } from '../context/Settings';
import { cn } from '../lib/cn';

const accents: Array<{ id: AccentId; label: string; swatch: string }> = [
  { id: 'green', label: 'Signal', swatch: '#39ff88' },
  { id: 'emerald', label: 'Emerald', swatch: '#22c55e' },
  { id: 'forest', label: 'Forest', swatch: '#168044' },
];

const iconSizes: Array<{ id: IconSizeId; label: string }> = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];

const sortOptions: Array<{ id: SortBy; label: string }> = [
  { id: 'name', label: 'Name' },
  { id: 'type', label: 'Type' },
  { id: 'date', label: 'Date' },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-[11px] tracking-[0.2em] uppercase text-white/45 font-medium">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={cn(
        'relative w-10 h-[22px] rounded-full transition-colors duration-200',
        on ? 'bg-accent' : 'bg-white/10'
      )}
    >
      <span
        className={cn(
          'absolute top-[3px] w-4 h-4 rounded-full bg-white shadow transition-transform duration-200',
          on ? 'left-[22px]' : 'left-[3px]'
        )}
      />
    </button>
  );
}

export default function Settings() {
  const { settings, setSetting } = useSettings();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-8 max-w-xl mx-auto space-y-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-accent-soft font-medium">System</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-1">Settings</h2>
        </div>

        {/* Appearance */}
        <Section title="Appearance">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-white/60" />
              <div>
                <p className="text-sm text-white/85">Dark Mode</p>
                <p className="text-xs text-white/40">System default</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-white/60 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1">
              <Monitor className="w-3.5 h-3.5" /> On
            </span>
          </div>
        </Section>

        {/* Accent */}
        <Section title="Accent">
          <div className="grid grid-cols-3 gap-2.5">
            {accents.map((a) => (
              <button
                key={a.id}
                onClick={() => setSetting('accent', a.id)}
                aria-pressed={settings.accent === a.id}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors',
                  settings.accent === a.id
                    ? 'border-accent/60 bg-accent/10 text-white'
                    : 'border-white/10 text-white/70 hover:bg-white/[0.06]'
                )}
              >
                <span
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: a.swatch }}
                />
                {a.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Desktop */}
        <Section title="Desktop">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MousePointerClick className="w-4 h-4 text-white/60" />
                <div>
                  <p className="text-sm text-white/85">Auto Arrange Icons</p>
                  <p className="text-xs text-white/40">Keep desktop icons in a clean grid</p>
                </div>
              </div>
              <Toggle
                on={settings.autoArrange}
                onToggle={() => setSetting('autoArrange', !settings.autoArrange)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-white/60" />
                <div>
                  <p className="text-sm text-white/85">Icon Size</p>
                  <p className="text-xs text-white/40">Desktop application icons</p>
                </div>
              </div>
              <div className="flex rounded-lg border border-white/10 overflow-hidden">
                {iconSizes.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setSetting('iconSize', s.id)}
                    aria-pressed={settings.iconSize === s.id}
                    className={cn(
                      'px-3 py-1.5 text-xs transition-colors',
                      i > 0 && 'border-l border-white/10',
                      settings.iconSize === s.id
                        ? 'bg-accent/20 text-accent-soft'
                        : 'text-white/60 hover:bg-white/[0.06]'
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ArrowDownWideNarrow className="w-4 h-4 text-white/60" />
                <div>
                  <p className="text-sm text-white/85">Sort Icons</p>
                  <p className="text-xs text-white/40">Order of desktop icons</p>
                </div>
              </div>
              <div className="flex rounded-lg border border-white/10 overflow-hidden">
                {sortOptions.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setSetting('sortBy', s.id)}
                    aria-pressed={settings.sortBy === s.id}
                    className={cn(
                      'px-3 py-1.5 text-xs transition-colors',
                      i > 0 && 'border-l border-white/10',
                      settings.sortBy === s.id
                        ? 'bg-accent/20 text-accent-soft'
                        : 'text-white/60 hover:bg-white/[0.06]'
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Accessibility */}
        <Section title="Accessibility">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/85">Reduce Motion</p>
              <p className="text-xs text-white/40">Minimize animations across the system</p>
            </div>
            <Toggle
              on={settings.reduceMotion}
              onToggle={() => setSetting('reduceMotion', !settings.reduceMotion)}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}

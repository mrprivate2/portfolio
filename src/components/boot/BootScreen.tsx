import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BRAND = 'Sawan';
const SUBTITLE = 'Personal Developer Environment';
const VERSION = 'Version 1.0.0';

const LOAD_LINES = [
  'Initializing workspace...',
  'Loading applications...',
  'Loading developer profile...',
  'Loading projects...',
  'Mounting portfolio...',
];

const BOOT_CMD = 'boot portfolio';
const PROMPT = 'sawan@dev:~$';

const LINE_DELAY = 105; // stagger between load lines
const CHAR_DELAY = 14; // typing speed
const AUTO_DONE = 2100; // total boot time (ms)
const BAR_BLOCKS = 20; // progress bar width in block chars

function progressBlocks(pct: number) {
  const filled = Math.round((pct / 100) * BAR_BLOCKS);
  return '█'.repeat(filled) + '░'.repeat(BAR_BLOCKS - filled);
}

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0);
  const [typed, setTyped] = useState<Record<number, number>>({});
  const [cmdTyped, setCmdTyped] = useState(0);
  const [progress, setProgress] = useState(0);
  const [launching, setLaunching] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    if (document.documentElement.classList.contains('reduced-motion')) {
      finish();
      return;
    }

    const timers: number[] = [];
    const start = 520;

    // Reveal load lines with a typing effect
    LOAD_LINES.forEach((line, i) => {
      timers.push(
        window.setTimeout(() => {
          setVisible(i + 1);
          let c = 0;
          const t = window.setInterval(() => {
            c += 1;
            setTyped((prev) => ({ ...prev, [i]: c }));
            if (c >= line.length) window.clearInterval(t);
          }, CHAR_DELAY);
          timers.push(t);
        }, start + i * LINE_DELAY)
      );
    });

    // Type the boot command, then announce launch
    timers.push(
      window.setTimeout(() => {
        let c = 0;
        const t = window.setInterval(() => {
          c += 1;
          setCmdTyped(c);
          if (c >= BOOT_CMD.length) {
            window.clearInterval(t);
            timers.push(window.setTimeout(() => setLaunching(true), 220));
          }
        }, CHAR_DELAY);
        timers.push(t);
      }, start + LOAD_LINES.length * LINE_DELAY + 120)
    );

    // Progress counter 0 → 100 across the boot
    const pStart = Date.now();
    const pTimer = window.setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - pStart) / 1800) * 100));
      setProgress(pct);
      if (pct >= 100) window.clearInterval(pTimer);
    }, 40);
    timers.push(pTimer);

    timers.push(window.setTimeout(finish, AUTO_DONE));

    const skip = () => finish();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#030504] font-mono text-[13px] leading-relaxed scanlines"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="status"
      aria-label="Booting Sawan portfolio"
    >
      <div className="p-8 md:p-14 flex flex-col min-h-full">
        {/* Brand */}
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-[#39ff88] tracking-[0.35em] animate-terminal-flicker">
            {BRAND}
          </h1>
          <p className="text-[#8c9b90] mt-2">{SUBTITLE}</p>
          <p className="text-[#65746a] text-xs mt-0.5">{VERSION}</p>
        </div>

        {/* Load sequence */}
        <div className="space-y-1">
          {LOAD_LINES.slice(0, visible).map((line, i) => (
            <div key={i} className="text-[#8c9b90]">
              <span className="text-[#39ff88]">▸</span>{' '}
              {line.slice(0, typed[i] ?? line.length)}
            </div>
          ))}
        </div>

        {/* Boot command */}
        <div className="mt-4">
          <span className="text-[#39ff88]">{PROMPT}</span>{' '}
          <span className="text-[#e7f0e9]">{BOOT_CMD.slice(0, cmdTyped)}</span>
          <span
            className="inline-block w-2 h-[14px] translate-y-[2px] ml-0.5 bg-[#39ff88] animate-caret"
            aria-hidden="true"
          />
        </div>

        {launching && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="mt-3 text-[#39ff88]"
          >
            Launching Sawan...
          </motion.p>
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-8 right-8 md:left-14 md:right-14">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[#65746a] whitespace-nowrap" aria-hidden="true">
            [{progressBlocks(progress)}]
          </span>
          <span className="text-[#39ff88] tabular-nums">{progress}%</span>
        </div>
        <div className="mt-2 h-[3px] bg-white/5 overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#39ff88] to-[#22c55e] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="absolute bottom-8 right-8 md:right-14 text-[11px] text-white/25 tracking-wider">
        Press any key to skip
      </div>
    </motion.div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Palette, SlidersHorizontal } from 'lucide-react';
import { wallpapers, getWallpaper } from '../../lib/wallpapers';
import { useSettings } from '../../context/Settings';
import { useWindowManager } from '../../context/WindowManager';
import { cn } from '../../lib/cn';

/** Quick wallpaper picker shown in the top bar. */
export function WallpaperSwitcher() {
  const { wallpaper, setWallpaper } = useSettings();
  const { openApp } = useWindowManager();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = getWallpaper(wallpaper);

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change wallpaper"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Palette className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            role="dialog"
            aria-label="Wallpaper picker"
            className="absolute left-0 top-10 w-64 rounded-xl glass-strong shadow-2xl shadow-black/60 p-3"
          >
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-medium">
                Wallpaper
              </span>
              <span className="text-[10px] text-white/35 truncate max-w-[110px]">{current.name}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
              {wallpapers.map((wp) => {
                const active = wp.id === wallpaper;
                return (
                  <button
                    key={wp.id}
                    onClick={() => setWallpaper(wp.id)}
                    aria-pressed={active}
                    aria-label={`Set ${wp.name} wallpaper`}
                    title={wp.name}
                    className={cn(
                      'relative aspect-video rounded-md overflow-hidden border-2 transition-all duration-150',
                      active
                        ? 'border-accent shadow-[0_0_14px_rgba(var(--accent-channels),0.3)]'
                        : 'border-white/10 hover:border-white/35 hover:scale-[1.04]'
                    )}
                  >
                    <wp.Component className="w-full h-full" />
                    {active && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setOpen(false);
                openApp('wallpaper');
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/[0.06] py-1.5 text-[11px] text-white/70 hover:text-white transition-colors"
            >
              <SlidersHorizontal className="w-3 h-3" /> Personalize more
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

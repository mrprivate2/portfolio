import { useRef, useState, type ComponentType, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../../context/WindowManager';
import { appRegistry, type AppId } from '../../applications/registry';
import { brandIcons, platformColors } from '../../lib/brandIcons';
import { socials } from '../../data/socials';
import { cn } from '../../lib/cn';

interface DockItem {
  key: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  accent?: string;
  appId?: AppId;
  url?: string;
}

export function Dock() {
  const { openApp, isOpen, getWindow, focusWindow } = useWindowManager();
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [scales, setScales] = useState<number[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  const items: DockItem[] = [
    { key: 'home', label: 'Home', icon: appRegistry.home.icon, appId: 'home' },
    { key: 'about', label: 'About Me', icon: appRegistry.about.icon, appId: 'about' },
    { key: 'work', label: 'My Work', icon: appRegistry.work.icon, appId: 'work' },
    { key: 'resume', label: 'Resume', icon: appRegistry.resume.icon, appId: 'resume' },
    { key: 'terminal', label: 'Terminal', icon: appRegistry.terminal.icon, appId: 'terminal' },
    ...(socials.github
      ? [{ key: 'github', label: 'GitHub', icon: brandIcons.github, accent: platformColors.github, url: socials.github }]
      : []),
    ...(socials.leetcode
      ? [{ key: 'leetcode', label: 'LeetCode', icon: brandIcons.leetcode, accent: platformColors.leetcode, url: socials.leetcode }]
      : []),
    ...(socials.linkedin
      ? [{ key: 'linkedin', label: 'LinkedIn', icon: brandIcons.linkedin, accent: platformColors.linkedin, url: socials.linkedin }]
      : []),
    { key: 'contact', label: 'Contact', icon: appRegistry.contact.icon, appId: 'contact' },
    { key: 'trash', label: 'Trash', icon: appRegistry.trash.icon, appId: 'trash' },
  ];

  const trashIndex = items.findIndex((i) => i.key === 'trash');

  const onMouseMove = (e: MouseEvent) => {
    const rect = dockRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    const next = items.map((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return 1;
      const r = el.getBoundingClientRect();
      const center = r.left - rect.left + r.width / 2;
      const dist = Math.abs(mouseX - center);
      return Math.max(1, Math.min(1.45, 1 + (1 - dist / 160) * 0.45));
    });
    setScales(next);
  };

  const onMouseLeave = () => {
    setScales([]);
    setHovered(null);
  };

  const activate = (item: DockItem) => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (!item.appId) return;
    const existing = getWindow(item.appId);
    if (existing) {
      if (existing.minimized) openApp(item.appId);
      else focusWindow(existing.id);
    } else {
      openApp(item.appId);
    }
  };

  return (
    <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-[9000]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.32, ease: 'easeOut' }}
      >
      <div
        ref={dockRef}
        className="flex items-end gap-1.5 px-2.5 py-2 rounded-2xl glass-strong shadow-2xl shadow-black/50 border-white/[0.1]"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          const showSeparator = i === trashIndex && i > 0;
          const scale = scales[i] ?? (hovered === i ? 1.25 : 1);
          const running = item.appId ? isOpen(item.appId) : false;
          const minimized = item.appId ? getWindow(item.appId)?.minimized ?? false : false;
          const tooltipVisible = hovered === i;
          return (
            <div
              key={item.key}
              className="flex items-end"
              style={{ zIndex: tooltipVisible ? 10 : 1 }}
            >
              {showSeparator && (
                <div className="w-px self-stretch my-2 mr-2 bg-white/10" aria-hidden="true" />
              )}
              <div
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="relative"
              >
              {/* Tooltip */}
              <div
                className={`pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md glass-strong text-[11px] whitespace-nowrap text-white/90 transition-opacity duration-150 ${
                  tooltipVisible ? 'opacity-100' : 'opacity-0'
                }`}
                role="tooltip"
              >
                {item.label}
              </div>

                <motion.button
                  animate={{ scale, y: (scale - 1) * -16 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => activate(item)}
                  aria-label={item.label}
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center border transition-colors',
                    hovered === i
                      ? 'bg-white/[0.12] border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)]'
                      : 'bg-white/[0.05] border-white/10 hover:bg-white/[0.09]'
                  )}
                  style={{ transformOrigin: 'bottom center', color: item.accent ?? '#dde7df' }}
                >
                  <Icon className="w-6 h-6" />
                </motion.button>

                {/* Running indicator */}
                {running && (
                  <div
                    className={cn(
                      'absolute -bottom-[3px] left-1/2 -translate-x-1/2 rounded-full',
                      minimized
                        ? 'w-1 h-1 bg-white/30'
                        : 'w-1.5 h-1.5 bg-[#39ff88] shadow-[0_0_6px_rgba(57,255,136,0.6)]'
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      </motion.div>
    </div>
  );
}

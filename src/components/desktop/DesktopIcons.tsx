import { useMemo, useRef, useState, type ComponentType, type KeyboardEvent, type MouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { Folder, Trash2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useWindowManager, TOPBAR_HEIGHT, DOCK_HEIGHT } from '../../context/WindowManager';
import { useSettings, type IconSizeId } from '../../context/Settings';
import { appRegistry, type AppId } from '../../applications/registry';
import { brandIcons, platformColors } from '../../lib/brandIcons';
import { socials } from '../../data/socials';
import { cn } from '../../lib/cn';
import { useViewport } from '../../lib/useViewport';
import { ContextMenu } from './ContextMenu';

export interface FolderItem {
  id: string;
  label: string;
}

interface IconItem {
  key: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  accent?: string;
  kind: 'app' | 'url' | 'folder';
  appId?: AppId;
  url?: string;
  folder?: FolderItem;
  /** primary application — gets a slightly stronger treatment */
  featured?: boolean;
  /** sort key for date-added ordering */
  addedAt: number;
}

const ICON_SIZES: Record<IconSizeId, { tile: number; cellW: number; cellH: number }> = {
  small: { tile: 48, cellW: 92, cellH: 96 },
  medium: { tile: 56, cellW: 104, cellH: 108 },
  large: { tile: 64, cellW: 116, cellH: 124 },
};

const START_X = 14;
const START_Y = TOPBAR_HEIGHT + 18;
const MARGIN = 14;

const POSITION_KEY = 'sawanos.iconPositions';

function loadPositions(): Record<string, { x: number; y: number }> {
  try {
    return JSON.parse(localStorage.getItem(POSITION_KEY) ?? '{}');
  } catch {
    return {};
  }
}

interface DesktopIconsProps {
  folders: FolderItem[];
  onOpenFolder: (folder: FolderItem) => void;
  onDeleteFolder: (folder: FolderItem) => void;
  onOpenMenu: (x: number, y: number) => void;
}

export function DesktopIcons({ folders, onOpenFolder, onDeleteFolder, onOpenMenu }: DesktopIconsProps) {
  const { openApp } = useWindowManager();
  const { settings } = useSettings();
  const { iconSize, autoArrange, sortBy } = settings;
  const viewport = useViewport();
  const [selected, setSelected] = useState<string | null>(null);
  const [manual, setManual] = useState<Record<string, { x: number; y: number }>>(loadPositions);
  const [iconMenu, setIconMenu] = useState<{ x: number; y: number; folder: FolderItem } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const size = ICON_SIZES[iconSize];

  const baseItems: IconItem[] = useMemo(
    () => [
      { key: 'about', label: 'About Me', icon: appRegistry.about.icon, kind: 'app', appId: 'about', addedAt: 1 },
      { key: 'work', label: 'My Work', icon: appRegistry.work.icon, kind: 'app', appId: 'work', featured: true, addedAt: 2 },
      { key: 'resume', label: 'Resume', icon: appRegistry.resume.icon, kind: 'app', appId: 'resume', addedAt: 3 },
      { key: 'terminal', label: 'Terminal', icon: appRegistry.terminal.icon, kind: 'app', appId: 'terminal', addedAt: 4 },
      ...(socials.github
        ? [{ key: 'github', label: 'GitHub', icon: brandIcons.github, accent: platformColors.github, kind: 'url' as const, url: socials.github, addedAt: 5 }]
        : []),
      ...(socials.linkedin
        ? [{ key: 'linkedin', label: 'LinkedIn', icon: brandIcons.linkedin, accent: platformColors.linkedin, kind: 'url' as const, url: socials.linkedin, addedAt: 6 }]
        : []),
      ...folders.map((f) => ({
        key: f.id,
        label: f.label,
        icon: Folder,
        kind: 'folder' as const,
        folder: f,
        addedAt: Number(f.id.replace('folder-', '')) || 0,
      })),
    ],
    [folders]
  );

  const items: IconItem[] = useMemo(() => {
    const sorted = [...baseItems];
    const byName = (a: IconItem, b: IconItem) => a.label.localeCompare(b.label);
    switch (sortBy) {
      case 'name':
        sorted.sort(byName);
        break;
      case 'type':
        sorted.sort((a, b) => {
          const order = { app: 0, url: 1, folder: 2 };
          return order[a.kind] - order[b.kind] || byName(a, b);
        });
        break;
      case 'date':
        sorted.sort((a, b) => a.addedAt - b.addedAt);
        break;
    }
    return sorted;
  }, [baseItems, sortBy]);

  const cols = Math.max(1, Math.min(4, Math.floor((viewport.w - MARGIN * 2) / size.cellW)));

  const autoPosition = (index: number) => ({
    x: START_X + (index % cols) * size.cellW,
    y: START_Y + Math.floor(index / cols) * size.cellH,
  });

  const positionOf = (item: IconItem, index: number) => {
    if (autoArrange) return autoPosition(index);
    const saved = manual[item.key];
    if (saved) {
      return {
        x: Math.min(Math.max(saved.x, MARGIN), viewport.w - size.tile - MARGIN),
        y: Math.min(Math.max(saved.y, TOPBAR_HEIGHT + MARGIN), viewport.h - DOCK_HEIGHT - size.tile - MARGIN),
      };
    }
    return autoPosition(index);
  };

  const snapToGrid = (x: number, y: number) => ({
    x: Math.min(Math.max(Math.round((x - START_X) / size.cellW) * size.cellW + START_X, MARGIN), viewport.w - size.tile - MARGIN),
    y: Math.min(Math.max(Math.round((y - START_Y) / size.cellH) * size.cellH + START_Y, TOPBAR_HEIGHT + MARGIN), viewport.h - DOCK_HEIGHT - size.tile - MARGIN),
  });

  const saveManual = (key: string, pos: { x: number; y: number }) => {
    setManual((prev) => {
      const next = { ...prev, [key]: pos };
      try {
        localStorage.setItem(POSITION_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const openItem = (item: IconItem) => {
    if (item.kind === 'app' && item.appId) {
      openApp(item.appId);
    } else if (item.kind === 'url' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.kind === 'folder' && item.folder) {
      onOpenFolder(item.folder);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = items.findIndex((i) => i.key === selected);
    if (idx === -1) return;
    const arrows: Record<string, (i: number) => number> = {
      ArrowRight: (i) => (i + 1) % items.length,
      ArrowDown: (i) => Math.min(i + cols, items.length - 1),
      ArrowLeft: (i) => (i - 1 + items.length) % items.length,
      ArrowUp: (i) => Math.max(i - cols, 0),
    };
    const arrow = arrows[e.key];
    if (arrow) {
      e.preventDefault();
      setSelected(items[arrow(idx)].key);
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openItem(items[idx]);
    } else if (e.key === 'Escape') {
      setSelected(null);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="grid"
      aria-label="Desktop icons"
      className="absolute inset-0 outline-none animate-desktop-in"
      style={{ top: TOPBAR_HEIGHT, bottom: DOCK_HEIGHT + 12 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelected(null);
      }}
      onKeyDown={handleKeyDown}
      onContextMenu={(e) => {
        e.preventDefault();
        onOpenMenu(e.clientX, e.clientY);
      }}
    >
      {items.map((item, index) => {
        const pos = positionOf(item, index);
        const Icon = item.icon;
        return (
          <DesktopIcon
            key={item.key}
            item={item}
            icon={<Icon className="w-6 h-6" />}
            color={item.accent}
            x={pos.x}
            y={pos.y}
            tile={size.tile}
            selected={selected === item.key}
            featured={item.featured}
            draggable={!autoArrange}
            onSelect={() => setSelected(item.key)}
            onOpen={() => openItem(item)}
            onMove={(x, y) => {
              if (!autoArrange) setManual((prev) => ({ ...prev, [item.key]: { x, y } }));
            }}
            onMoveEnd={(x, y) => saveManual(item.key, snapToGrid(x, y))}
            onContextMenu={(e) => {
              if (item.kind === 'folder' && item.folder) {
                e.preventDefault();
                e.stopPropagation();
                setSelected(item.key);
                setIconMenu({ x: e.clientX, y: e.clientY, folder: item.folder });
              }
            }}
          />
        );
      })}

      {/* Right-click menu for folders */}
      <AnimatePresence>
        {iconMenu && (
          <ContextMenu
            x={iconMenu.x}
            y={iconMenu.y}
            onClose={() => setIconMenu(null)}
            items={[
              {
                label: `Delete “${iconMenu.folder.label}”`,
                icon: Trash2,
                danger: true,
                onSelect: () => onDeleteFolder(iconMenu.folder),
              },
            ]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface DesktopIconProps {
  item: IconItem;
  icon: ReactNode;
  color?: string;
  x: number;
  y: number;
  tile: number;
  selected: boolean;
  featured?: boolean;
  draggable: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onMove: (x: number, y: number) => void;
  onMoveEnd: (x: number, y: number) => void;
  onContextMenu?: (e: MouseEvent) => void;
}

function DesktopIcon({
  item,
  icon,
  color,
  x,
  y,
  tile,
  selected,
  featured,
  draggable,
  onSelect,
  onOpen,
  onMove,
  onMoveEnd,
  onContextMenu,
}: DesktopIconProps) {
  const [dragging, setDragging] = useState(false);
  const dragged = useRef(false);
  const dragState = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  const startDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !draggable) return;
    e.preventDefault();
    onSelect();
    const st = { sx: e.clientX, sy: e.clientY, ox: x, oy: y };
    dragState.current = st;
    dragged.current = false;
    setDragging(true);

    const move = (ev: PointerEvent) => {
      if (!dragState.current) return;
      const dx = ev.clientX - st.sx;
      const dy = ev.clientY - st.sy;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragged.current = true;
      onMove(Math.max(0, st.ox + dx), Math.max(TOPBAR_HEIGHT, st.oy + dy));
    };
    const up = (ev: PointerEvent) => {
      if (dragState.current) {
        const dx = ev.clientX - st.sx;
        const dy = ev.clientY - st.sy;
        onMoveEnd(Math.max(0, st.ox + dx), Math.max(TOPBAR_HEIGHT, st.oy + dy));
      }
      dragState.current = null;
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div
      role="gridcell"
      aria-label={item.label}
      aria-selected={selected}
      tabIndex={-1}
      className="absolute flex flex-col items-center justify-start pt-2 gap-1.5 rounded-lg cursor-default select-none outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{ left: x, top: y, width: tile + 28, height: tile + 36, zIndex: dragging ? 5 : 1 }}
      onPointerDown={startDrag}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (dragged.current) return;
        onOpen();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onContextMenu?.(e);
      }}
    >
      <div
        className={cn(
          'rounded-xl p-[1.5px] transition-all duration-150',
          featured
            ? 'bg-gradient-to-br from-accent/70 via-white/10 to-violet/70 shadow-[0_8px_24px_rgba(var(--accent-channels),0.12)]'
            : 'bg-transparent'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center border backdrop-blur-sm transition-all duration-150',
            featured ? 'rounded-[11px] bg-[#0a0f0b]/90' : 'rounded-xl bg-white/[0.05]',
            dragging ? 'scale-110' : 'hover:scale-105',
            selected
              ? 'border-accent/70 ring-2 ring-accent/50 animate-glow-pulse'
              : cn(
                  featured
                    ? 'border-white/15 hover:border-accent/60'
                    : 'border-white/10 hover:bg-white/[0.1] hover:border-accent/40 hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)]'
                )
          )}
          style={{ width: tile, height: tile, borderColor: color && !featured ? `${color}55` : undefined }}
        >
          <span
            className={cn('transition-transform duration-150', selected ? 'scale-110' : '')}
            style={color ? { color } : undefined}
          >
            {icon}
          </span>
        </div>
      </div>
      <span
        className={cn(
          'max-w-full px-1.5 py-0.5 rounded text-[12px] leading-tight text-center text-white/90',
          selected ? 'bg-accent/90 text-[#041008]' : 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
        )}
      >
        {item.label}
      </span>
    </div>
  );
}

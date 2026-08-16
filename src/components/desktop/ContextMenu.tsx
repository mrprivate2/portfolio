import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface MenuItem {
  label: string;
  icon?: ComponentType<{ className?: string }>;
  onSelect?: () => void;
  /** renders the item in a destructive style */
  danger?: boolean;
  /** radio-style checkmark */
  checked?: boolean;
  children?: MenuItem[];
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
  /** small header label shown above the items */
  header?: string;
}

export function ContextMenu({ x, y, items, onClose, header = 'Sawan — Desktop' }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });
  const [openSub, setOpenSub] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPos({
      x: Math.min(x, vw - rect.width - 8),
      y: Math.min(y, vh - rect.height - 8),
    });
  }, [x, y]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.12 }}
      className="fixed z-[9500] w-56 py-1.5 rounded-[10px] glass-strong shadow-2xl shadow-black/60 border-white/[0.1]"
      style={{ left: pos.x, top: pos.y }}
      role="menu"
      aria-label={header}
    >
      {header && (
        <div className="px-3 py-1.5 pb-2 text-[10px] tracking-[0.25em] uppercase text-white/35 border-b border-white/[0.06] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
          {header}
        </div>
      )}
      <div className="py-1">
        {items.map((item, i) => (
          <MenuRow
            key={item.label}
            item={item}
            open={openSub === i}
            onOpenSub={() => setOpenSub(i)}
            onClose={onClose}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MenuRow({
  item,
  open,
  onOpenSub,
  onClose,
}: {
  item: MenuItem;
  open: boolean;
  onOpenSub: () => void;
  onClose: () => void;
}) {
  const hasChildren = !!item.children && item.children.length > 0;
  const Icon = item.icon;

  const trigger = (
    <button
      role="menuitem"
      aria-haspopup={hasChildren ? 'menu' : undefined}
      aria-expanded={hasChildren ? open : undefined}
      onClick={() => {
        if (hasChildren) {
          onOpenSub();
          return;
        }
        item.onSelect?.();
        onClose();
      }}
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-1.5 text-left text-[13px] transition-colors',
        item.danger
          ? 'text-[#f87171] hover:bg-[#f87171]/10'
          : 'text-white/85 hover:bg-accent/15 hover:text-white'
      )}
    >
      {Icon ? (
        <Icon className={cn('w-4 h-4', item.danger ? 'text-[#f87171]/80' : 'text-white/55')} />
      ) : (
        <span className="w-4 shrink-0" aria-hidden="true" />
      )}
      <span className="flex-1">{item.label}</span>
      {item.checked && <Check className="w-3.5 h-3.5 text-accent-soft" />}
      {hasChildren && <ChevronRight className="w-3.5 h-3.5 text-white/35" />}
    </button>
  );

  return (
    <div className="relative" onMouseEnter={onOpenSub} onFocus={onOpenSub}>
      {trigger}
      {/* Submenus close when hovering any other row (leaf or parent) or when
          the menu itself closes — no mouseleave-based closing, which is
          unreliable when the submenu sits outside the menu's bounds. */}
      {hasChildren && open && <SubMenu items={item.children!} onClose={onClose} />}
    </div>
  );
}

function SubMenu({ items, onClose }: { items: MenuItem[]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [flip, setFlip] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.right > window.innerWidth - 8) setFlip(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: flip ? 4 : -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1 }}
      className={cn(
        'absolute top-0 w-48 py-1 rounded-[10px] glass-strong shadow-2xl shadow-black/60 border-white/[0.1]',
        // Overlap the parent menu's edge (like real OS submenus) so the pointer
        // never leaves the menu's hover region while entering the submenu.
        flip ? 'right-[calc(100%-10px)]' : 'left-[calc(100%-10px)]'
      )}
      role="menu"
      onMouseEnter={(e) => e.stopPropagation()}
    >
      {items.map((child) => {
        const Icon = child.icon;
        return (
          <button
            key={child.label}
            role="menuitemradio"
            aria-checked={child.checked ?? false}
            onClick={() => {
              child.onSelect?.();
              onClose();
            }}
            className={cn(
              'w-full flex items-center gap-2.5 px-3 py-1.5 text-left text-[13px] transition-colors',
              child.danger
                ? 'text-[#f87171] hover:bg-[#f87171]/10'
                : 'text-white/85 hover:bg-accent/15 hover:text-white'
            )}
          >
            {Icon ? (
              <Icon className={cn('w-4 h-4', child.danger ? 'text-[#f87171]/80' : 'text-white/55')} />
            ) : (
              <span className="w-4 shrink-0" aria-hidden="true" />
            )}
            <span className="flex-1">{child.label}</span>
            {child.checked && <Check className="w-3.5 h-3.5 text-accent-soft" />}
          </button>
        );
      })}
    </motion.div>
  );
}

import { memo, Suspense, useMemo, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import { getApp } from '../../applications/registry';
import { DOCK_HEIGHT, TOPBAR_HEIGHT, type WindowState } from '../../context/WindowManager';
import { cn } from '../../lib/cn';
import { useViewport } from '../../lib/useViewport';

interface WindowProps {
  win: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
}

type Edge = 'e' | 's' | 'se';

export const Window = memo(function Window({
  win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onResize,
}: WindowProps) {
  const viewport = useViewport();
  const [interacting, setInteracting] = useState(false);
  const def = getApp(win.appId);
  const Icon = def.icon;
  const title = win.title ?? def.title;

  // Keep the app content mounted and memoized so dragging never re-renders it.
  const content = useMemo(() => {
    const Component = def.Component;
    return <Component />;
  }, [def]);

  const dragStart = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || win.maximized || win.minimized) return;
    e.preventDefault();
    onFocus();
    setInteracting(true);
    const sx = e.clientX;
    const sy = e.clientY;
    const ox = win.x;
    const oy = win.y;
    const vw = viewport.w;
    const vh = viewport.h;

    const clampX = (v: number) => Math.min(Math.max(v, -(win.w - 90)), vw - 90);
    const clampY = (v: number) => Math.min(Math.max(v, TOPBAR_HEIGHT - 6), vh - DOCK_HEIGHT - 20);

    const move = (ev: PointerEvent) => {
      onMove(clampX(ox + ev.clientX - sx), clampY(oy + ev.clientY - sy));
    };
    const up = (ev: PointerEvent) => {
      setInteracting(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);

      // Window snapping: drag near the left/right edge → half-screen, near the top → maximize
      const fx = clampX(ox + ev.clientX - sx);
      const fy = clampY(oy + ev.clientY - sy);
      const snapMargin = 14;
      const halfW = Math.floor(vw / 2);
      const areaH = vh - TOPBAR_HEIGHT - DOCK_HEIGHT;
      if (fy <= TOPBAR_HEIGHT + snapMargin && !win.maximized) {
        onToggleMaximize();
      } else if (fx <= snapMargin && !win.maximized) {
        onMove(0, TOPBAR_HEIGHT);
        onResize(halfW, areaH);
      } else if (fx + win.w >= vw - snapMargin && !win.maximized) {
        onMove(vw - halfW, TOPBAR_HEIGHT);
        onResize(halfW, areaH);
      } else {
        onMove(fx, fy);
      }
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const startResize = (edge: Edge) => (e: ReactPointerEvent<HTMLDivElement>) => {
    if (win.maximized || win.minimized || !def.resizable) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus();
    setInteracting(true);
    const sx = e.clientX;
    const sy = e.clientY;
    const ow = win.w;
    const oh = win.h;

    const move = (ev: PointerEvent) => {
      let nw = ow;
      let nh = oh;
      if (edge !== 's') nw = Math.max(def.minWidth, ow + ev.clientX - sx);
      if (edge !== 'e') nh = Math.max(def.minHeight, oh + ev.clientY - sy);
      onResize(nw, nh);
    };
    const up = () => {
      setInteracting(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const geometry = win.maximized
    ? { left: 0, top: TOPBAR_HEIGHT, width: viewport.w, height: viewport.h - TOPBAR_HEIGHT - DOCK_HEIGHT }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <motion.div
      className="absolute"
      style={{ zIndex: win.z, pointerEvents: win.minimized ? 'none' : 'auto' }}
      initial={{ opacity: 0, scale: 0.92, y: 14 }}
      animate={win.minimized ? { opacity: 0, scale: 0.88 } : { opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.14 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      onPointerDown={onFocus}
    >
      <div
        role="dialog"
        aria-label={title}
        aria-hidden={win.minimized}
        inert={win.minimized}
        className={cn(
          'absolute rounded-xl overflow-hidden border',
          isActive
            ? 'border-white/[0.16] shadow-[0_0_0_1px_rgba(57,255,136,0.1),0_30px_80px_-20px_rgba(0,0,0,0.85)]'
            : 'border-white/[0.07] shadow-2xl shadow-black/50'
        )}
        style={{
          ...geometry,
          transition: interacting
            ? 'none'
            : 'left 0.22s cubic-bezier(0.3,0.8,0.3,1), top 0.22s cubic-bezier(0.3,0.8,0.3,1), width 0.22s cubic-bezier(0.3,0.8,0.3,1), height 0.22s cubic-bezier(0.3,0.8,0.3,1)',
        }}
      >
        {/* Title bar */}
        <div
          className={cn(
            'relative h-[38px] flex items-center justify-center border-b select-none',
            isActive
              ? 'border-white/10 bg-gradient-to-b from-[#0d1510] to-[#0a0f0b]'
              : 'border-white/5 bg-[#0a0f0b]/90'
          )}
          onPointerDown={dragStart}
          onDoubleClick={onToggleMaximize}
        >
          <div className="absolute left-3 flex items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
            <span className="sr-only">Window controls</span>
            <button
              onClick={onClose}
              aria-label={`Close ${title}`}
              className="group/close w-3.5 h-3.5 rounded-full bg-[#ff5f57] flex items-center justify-center text-[#4d0000] hover:brightness-110"
            >
              <X className="w-2 h-2 opacity-0 group-hover/close:opacity-100" strokeWidth={3.5} />
            </button>
            <button
              onClick={onMinimize}
              aria-label={`Minimize ${title}`}
              className="group/min w-3.5 h-3.5 rounded-full bg-[#febc2e] flex items-center justify-center text-[#4d3a00] hover:brightness-110"
            >
              <Minus className="w-2 h-2 opacity-0 group-hover/min:opacity-100" strokeWidth={3.5} />
            </button>
            <button
              onClick={onToggleMaximize}
              aria-label={win.maximized ? `Restore ${title}` : `Maximize ${title}`}
              className="group/max w-3.5 h-3.5 rounded-full bg-[#28c840] flex items-center justify-center text-[#003d0d] hover:brightness-110"
            >
              <Square className="w-1.5 h-1.5 opacity-0 group-hover/max:opacity-100" strokeWidth={3} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-white/80 pointer-events-none">
            <Icon className="w-3.5 h-3.5 text-white/60" />
            <span className="font-medium">{title}</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-[#0a0f0b] rounded-b-xl" style={{ top: 38 }}>
          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center">
                <div className="flex items-center gap-2 text-white/40">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-[#168044] animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            }
          >
            {content}
          </Suspense>
        </div>

        {/* Resize handles */}
        {def.resizable && !win.maximized && !win.minimized && (
          <>
            <div
              className="absolute right-0 top-0 bottom-0 w-1.5 cursor-ew-resize"
              onPointerDown={startResize('e')}
              aria-hidden="true"
            />
            <div
              className="absolute left-0 right-0 bottom-0 h-1.5 cursor-ns-resize"
              onPointerDown={startResize('s')}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 bottom-0 w-5 h-5 cursor-nwse-resize"
              onPointerDown={startResize('se')}
              aria-hidden="true"
            />
          </>
        )}
      </div>
    </motion.div>
  );
});

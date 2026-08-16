import { BatteryFull, Wifi } from 'lucide-react';
import { useClock } from '../../lib/useClock';
import { useWindowManager, TOPBAR_HEIGHT } from '../../context/WindowManager';
import { getApp } from '../../applications/registry';
import { profile } from '../../data/profile';
import { WallpaperSwitcher } from './WallpaperSwitcher';

export function TopBar() {
  const { windows, activeId } = useWindowManager();
  const { time, date } = useClock();

  const active = windows.find((w) => w.id === activeId);
  const activeTitle = active ? active.title ?? getApp(active.appId).title : 'Desktop';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[8000] flex items-center justify-between px-3 md:px-4 glass border-b border-white/[0.06]"
      style={{ height: TOPBAR_HEIGHT }}
      role="banner"
    >
      {/* Left: brand */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-6 h-6 rounded-md bg-gradient-to-br from-[#39ff88] to-[#168044] flex items-center justify-center text-[10px] font-display font-bold text-[#041008] shrink-0 shadow-[0_0_12px_rgba(57,255,136,0.25)]"
          aria-hidden="true"
        >
          {profile.monogram}
        </div>
        <span className="hidden sm:block text-[13px] font-semibold text-white/90 truncate">
          {profile.name}
        </span>
        <span className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
        <span className="font-display text-[13px] font-semibold tracking-wide text-accent-soft/90 shrink-0">
          Sawan
        </span>
        <span className="hidden md:flex items-center gap-1.5 text-white/45 text-[12px]">
          <span className="w-px h-3.5 bg-white/10" aria-hidden="true" />
          {activeTitle}
        </span>
        <span className="hidden md:block w-px h-4 bg-white/10" aria-hidden="true" />
        <WallpaperSwitcher />
      </div>

      {/* Right: status + indicators */}
      <div className="flex items-center gap-1.5 md:gap-3 text-[13px] text-white/80">
        <span
          className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#22c55e] bg-[#22c55e]/[0.08] border border-[#22c55e]/25 rounded-full px-2.5 py-1"
          title={profile.availability}
        >
          <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60 animate-soft-ping" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[#22c55e]" />
          </span>
          Available for opportunities
        </span>
        <div className="hidden md:flex items-center gap-2.5 pl-1 border-l border-white/10 text-white/45">
          <Wifi className="w-4 h-4" aria-hidden="true" />
          <BatteryFull className="w-4 h-4" aria-hidden="true" />
        </div>
        <span className="hidden sm:inline text-white/60">{date}</span>
        <span className="tabular-nums text-white/90 font-medium">{time}</span>
      </div>
    </header>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FolderPlus, Home, Info, Palette, RefreshCw, Settings, Terminal } from 'lucide-react';
import { useWindowManager } from '../../context/WindowManager';
import { useSettings } from '../../context/Settings';
import { getWallpaper } from '../../lib/wallpapers';
import { TopBar } from './TopBar';
import { DesktopIcons, type FolderItem } from './DesktopIcons';
import { Dock } from '../dock/Dock';
import { ContextMenu } from './ContextMenu';
import { Window } from '../windows/Window';
import { CommandPalette } from '../palette/CommandPalette';
import { useGlobalShortcuts } from '../../hooks/useGlobalShortcuts';

const FOLDERS_KEY = 'devos.folders';

function loadFolders(): FolderItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(FOLDERS_KEY) ?? '[]');
    return Array.isArray(raw) ? (raw as FolderItem[]) : [];
  } catch {
    return [];
  }
}

export function Desktop() {
  const wm = useWindowManager();
  const { wallpaper, refreshSignal, bumpRefresh } = useSettings();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [folders, setFolders] = useState<FolderItem[]>(loadFolders);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useGlobalShortcuts({ paletteOpen, setPaletteOpen });

  const wallpaperDef = getWallpaper(wallpaper);

  const createFolder = useCallback(() => {
    const folder: FolderItem = {
      id: `folder-${Date.now()}`,
      label: 'New Folder',
    };
    setFolders((prev) => {
      const next = [...prev, folder];
      try {
        localStorage.setItem(FOLDERS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const openFolder = useCallback(
    (folder: FolderItem) => {
      wm.openApp('folder', { title: folder.label });
    },
    [wm]
  );

  const deleteFolder = useCallback((folder: FolderItem) => {
    setFolders((prev) => {
      const next = prev.filter((f) => f.id !== folder.id);
      try {
        localStorage.setItem(FOLDERS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const openMenu = useCallback((x: number, y: number) => setMenu({ x, y }), []);

  // Open the Home app by default so visitors land on the portfolio content.
  useEffect(() => {
    wm.openApp('home', { silent: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0"
        onContextMenu={(e) => {
          e.preventDefault();
          openMenu(e.clientX, e.clientY);
        }}
        aria-hidden="true"
      >
        <motion.div
          key={`${wallpaper}-${refreshSignal}`}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: refreshSignal > 0 ? 0.35 : 0.45 }}
          className="absolute inset-0"
        >
          <wallpaperDef.Component className="w-full h-full" />
        </motion.div>
      </div>

      {/* Film grain — adds depth without distracting */}
      <div className="pointer-events-none absolute inset-0 z-[9300] opacity-[0.035] noise-overlay" aria-hidden="true" />

      <DesktopIcons
        folders={folders}
        onOpenFolder={openFolder}
        onDeleteFolder={deleteFolder}
        onOpenMenu={openMenu}
      />

      {/* Windows */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {wm.windows.map((win) => (
            <Window
              key={win.id}
              win={win}
              isActive={win.id === wm.activeId}
              onFocus={() => wm.focusWindow(win.id)}
              onClose={() => wm.closeWindow(win.id)}
              onMinimize={() => wm.minimizeWindow(win.id)}
              onToggleMaximize={() => wm.toggleMaximize(win.id)}
              onMove={(x, y) => wm.moveWindow(win.id, x, y)}
              onResize={(w, h) => wm.resizeWindow(win.id, w, h)}
            />
          ))}
        </AnimatePresence>
      </div>

      <TopBar />
      <Dock />

      {/* Context menu */}
      <AnimatePresence>
        {menu && (
          <ContextMenu
            x={menu.x}
            y={menu.y}
            onClose={() => setMenu(null)}
            items={[
              { label: 'New Folder', icon: FolderPlus, onSelect: createFolder },
              { label: 'Refresh', icon: RefreshCw, onSelect: bumpRefresh },
              { label: 'Open Terminal', icon: Terminal, onSelect: () => wm.openApp('terminal') },
              { label: 'Change Wallpaper', icon: Palette, onSelect: () => wm.openApp('wallpaper') },
              { label: 'Settings', icon: Settings, onSelect: () => wm.openApp('settings') },
              { label: 'About This Portfolio', icon: Info, onSelect: () => wm.openApp('about') },
              { label: 'Home', icon: Home, onSelect: () => wm.openApp('home') },
            ]}
          />
        )}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </motion.div>
  );
}

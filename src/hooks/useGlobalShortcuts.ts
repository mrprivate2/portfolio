import { useEffect } from 'react';
import { useWindowManager } from '../context/WindowManager';

interface ShortcutOptions {
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
}

export function useGlobalShortcuts({ paletteOpen, setPaletteOpen }: ShortcutOptions) {
  const { closeWindow, activeId } = useWindowManager();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target != null &&
        (target.matches('input, textarea, select') || target.isContentEditable);

      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
        return;
      }

      if (mod && e.key.toLowerCase() === 'w') {
        if (typing) return;
        e.preventDefault();
        if (activeId != null) closeWindow(activeId);
        return;
      }

      if (e.key === 'Escape') {
        if (paletteOpen) {
          setPaletteOpen(false);
          return;
        }
        if (typing) return;
        if (activeId != null) closeWindow(activeId);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, setPaletteOpen, closeWindow, activeId]);
}

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { appRegistry, type AppId } from '../applications/registry';
import { useToast } from './Toast';

export interface WindowState {
  id: number;
  appId: AppId;
  /** overrides the registry title (used by folders) */
  title?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

export interface OpenAppOptions {
  title?: string;
  /** skip the "X opened" toast (used for windows opened by default) */
  silent?: boolean;
}

interface WindowManagerValue {
  windows: WindowState[];
  activeId: number | null;
  openApp: (appId: AppId, opts?: OpenAppOptions) => void;
  closeWindow: (id: number) => void;
  focusWindow: (id: number) => void;
  minimizeWindow: (id: number) => void;
  toggleMaximize: (id: number) => void;
  moveWindow: (id: number, x: number, y: number) => void;
  resizeWindow: (id: number, w: number, h: number) => void;
  isOpen: (appId: AppId) => boolean;
  getWindow: (appId: AppId) => WindowState | undefined;
  /** True when every window is minimized or none is open — used for the menu-bar "Desktop" state */
  desktopVisible: boolean;
}

const WindowManagerContext = createContext<WindowManagerValue | null>(null);

export const TOPBAR_HEIGHT = 44;
export const DOCK_HEIGHT = 88;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const { notify } = useToast();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const zCounter = useRef(10);
  const nextId = useRef(1);
  const cascade = useRef(0);

  const focusWindow = useCallback((id: number) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z } : w)));
    setActiveId(id);
  }, []);

  const openApp = useCallback((appId: AppId, opts?: OpenAppOptions) => {
    const def = appRegistry[appId];
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId);
      if (existing && !def.allowMulti) {
        zCounter.current += 1;
        const z = zCounter.current;
        setActiveId(existing.id);
        return prev.map((w) => (w.id === existing.id ? { ...w, z, minimized: false } : w));
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(def.width, vw - 24);
      const h = Math.min(def.height, vh - TOPBAR_HEIGHT - DOCK_HEIGHT - 24);
      const offset = (cascade.current % 8) * 28;
      cascade.current += 1;
      // The Home window opens centered in the desktop area; other windows
      // cascade from the center so multiple windows don't stack exactly.
      const centered = appId === 'home';
      const x = centered
        ? Math.max(12, Math.round((vw - w) / 2))
        : Math.max(12, Math.min((vw - w) / 2 + offset - 140, vw - w - 12));
      const y = centered
        ? Math.max(TOPBAR_HEIGHT + 8, Math.round(TOPBAR_HEIGHT + (vh - TOPBAR_HEIGHT - DOCK_HEIGHT - h) / 2))
        : Math.max(TOPBAR_HEIGHT + 8, Math.min(TOPBAR_HEIGHT + 28 + offset, vh - h - DOCK_HEIGHT - 12));

      zCounter.current += 1;
      const id = nextId.current;
      nextId.current += 1;
      setActiveId(id);
      if (!opts?.silent) notify(`${opts?.title ?? def.title} opened`);
      return [
        ...prev,
        {
          id,
          appId,
          title: opts?.title,
          x,
          y,
          w,
          h,
          z: zCounter.current,
          minimized: false,
          maximized: false,
        },
      ];
    });
  }, [notify]);

  const closeWindow = useCallback((id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const minimizeWindow = useCallback((id: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const toggleMaximize = useCallback((id: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z } : w)));
    setActiveId(id);
  }, []);

  const moveWindow = useCallback((id: number, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resizeWindow = useCallback((id: number, w: number, h: number) => {
    setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, w, h } : win)));
  }, []);

  const isOpen = useCallback(
    (appId: AppId) => windows.some((w) => w.appId === appId),
    [windows]
  );

  const getWindow = useCallback(
    (appId: AppId) => windows.find((w) => w.appId === appId),
    [windows]
  );

  const desktopVisible = useMemo(
    () => windows.length === 0 || windows.every((w) => w.minimized),
    [windows]
  );

  const value = useMemo(
    () => ({
      windows,
      activeId,
      openApp,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      moveWindow,
      resizeWindow,
      isOpen,
      getWindow,
      desktopVisible,
    }),
    [
      windows,
      activeId,
      openApp,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      moveWindow,
      resizeWindow,
      isOpen,
      getWindow,
      desktopVisible,
    ]
  );

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

export function useWindowManager(): WindowManagerValue {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used inside WindowManagerProvider');
  return ctx;
}

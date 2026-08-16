import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { defaultWallpaperId } from '../lib/wallpapers';

export type AccentId = 'green' | 'emerald' | 'forest';
export type IconSizeId = 'small' | 'medium' | 'large';
export type SortBy = 'name' | 'type' | 'date';

export interface DesktopSettings {
  /** whether desktop icons are auto-arranged (true) or manually positioned (false) */
  autoArrange: boolean;
  iconSize: IconSizeId;
  sortBy: SortBy;
  accent: AccentId;
  reduceMotion: boolean;
}

interface SettingsValue {
  wallpaper: string;
  setWallpaper: (id: string) => void;
  /** increments on every desktop "Refresh" — Desktop animates on change */
  refreshSignal: number;
  bumpRefresh: () => void;
  settings: DesktopSettings;
  setSetting: <K extends keyof DesktopSettings>(key: K, value: DesktopSettings[K]) => void;
}

const SettingsContext = createContext<SettingsValue | null>(null);

const WALLPAPER_KEY = 'sawanos.wallpaper';
const SETTINGS_KEY = 'sawanos.settings';

const defaultSettings: DesktopSettings = {
  autoArrange: true,
  iconSize: 'medium',
  sortBy: 'name',
  accent: 'green',
  reduceMotion: false,
};

function loadSettings(): DesktopSettings {
  try {
    const raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '{}');
    return { ...defaultSettings, ...raw };
  } catch {
    return defaultSettings;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<string>(() => {
    try {
      return localStorage.getItem(WALLPAPER_KEY) ?? defaultWallpaperId;
    } catch {
      return defaultWallpaperId;
    }
  });
  const [settings, setSettings] = useState<DesktopSettings>(loadSettings);
  const [refreshSignal, setRefreshSignal] = useState(0);

  const setWallpaper = useCallback((id: string) => {
    setWallpaperState(id);
    try {
      localStorage.setItem(WALLPAPER_KEY, id);
    } catch {
      // storage unavailable — fine, wallpaper just won't persist
    }
  }, []);

  const bumpRefresh = useCallback(() => setRefreshSignal((s) => s + 1), []);

  const setSetting = useCallback(
    <K extends keyof DesktopSettings>(key: K, value: DesktopSettings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value };
        try {
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  // Apply accent + reduce-motion to <html> as side effects
  useEffect(() => {
    document.documentElement.dataset.accent = settings.accent;
  }, [settings.accent]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion);
  }, [settings.reduceMotion]);

  const value = useMemo(
    () => ({ wallpaper, setWallpaper, refreshSignal, bumpRefresh, settings, setSetting }),
    [wallpaper, setWallpaper, refreshSignal, bumpRefresh, settings, setSetting]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}

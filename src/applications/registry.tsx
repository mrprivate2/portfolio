import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import {
  Code2,
  FileText,
  Folder,
  FolderKanban,
  Home,
  Mail,
  Music,
  Palette,
  Settings,
  Sparkles,
  Terminal,
  Trash2,
  User,
  Users,
} from 'lucide-react';

export type AppIcon = ComponentType<{ className?: string }>;

export type AppId =
  | 'home'
  | 'about'
  | 'work'
  | 'resume'
  | 'terminal'
  | 'readme'
  | 'profiles'
  | 'contact'
  | 'skills'
  | 'wallpaper'
  | 'trash'
  | 'music'
  | 'settings'
  | 'folder';

export interface AppDef {
  id: AppId;
  title: string;
  icon: AppIcon;
  Component: LazyExoticComponent<ComponentType>;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  resizable: boolean;
  /** allow multiple open instances (folders) */
  allowMulti?: boolean;
}

export const appRegistry: Record<AppId, AppDef> = {
  home: {
    id: 'home',
    title: 'Home',
    icon: Home,
    Component: lazy(() => import('./Home')),
    width: 1024,
    height: 680,
    minWidth: 620,
    minHeight: 440,
    resizable: true,
  },
  about: {
    id: 'about',
    title: 'About Me',
    icon: User,
    Component: lazy(() => import('./About')),
    width: 780,
    height: 600,
    minWidth: 560,
    minHeight: 400,
    resizable: true,
  },
  work: {
    id: 'work',
    title: 'My Work',
    icon: FolderKanban,
    Component: lazy(() => import('./Work')),
    width: 1060,
    height: 680,
    minWidth: 640,
    minHeight: 440,
    resizable: true,
  },
  resume: {
    id: 'resume',
    title: 'Resume',
    icon: FileText,
    Component: lazy(() => import('./Resume')),
    width: 920,
    height: 660,
    minWidth: 600,
    minHeight: 420,
    resizable: true,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: Terminal,
    Component: lazy(() => import('./Terminal')),
    width: 760,
    height: 480,
    minWidth: 480,
    minHeight: 300,
    resizable: true,
  },
  readme: {
    id: 'readme',
    title: 'README.txt',
    icon: Code2,
    Component: lazy(() => import('./Readme')),
    width: 880,
    height: 580,
    minWidth: 560,
    minHeight: 360,
    resizable: true,
  },
  profiles: {
    id: 'profiles',
    title: 'Developer Profiles',
    icon: Users,
    Component: lazy(() => import('./Profiles')),
    width: 900,
    height: 620,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    icon: Mail,
    Component: lazy(() => import('./Contact')),
    width: 800,
    height: 640,
    minWidth: 560,
    minHeight: 420,
    resizable: true,
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    icon: Sparkles,
    Component: lazy(() => import('./Skills')),
    width: 900,
    height: 620,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
  },
  wallpaper: {
    id: 'wallpaper',
    title: 'Wallpaper',
    icon: Palette,
    Component: lazy(() => import('./WallpaperApp')),
    width: 760,
    height: 560,
    minWidth: 520,
    minHeight: 360,
    resizable: true,
  },
  trash: {
    id: 'trash',
    title: 'Trash',
    icon: Trash2,
    Component: lazy(() => import('./Trash')),
    width: 480,
    height: 380,
    minWidth: 400,
    minHeight: 300,
    resizable: false,
  },
  music: {
    id: 'music',
    title: 'Music',
    icon: Music,
    Component: lazy(() => import('./Music')),
    width: 440,
    height: 640,
    minWidth: 400,
    minHeight: 520,
    resizable: false,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    Component: lazy(() => import('./Settings')),
    width: 760,
    height: 580,
    minWidth: 560,
    minHeight: 420,
    resizable: true,
  },
  folder: {
    id: 'folder',
    title: 'New Folder',
    icon: Folder,
    Component: lazy(() => import('./Folder')),
    width: 480,
    height: 380,
    minWidth: 400,
    minHeight: 300,
    resizable: true,
    allowMulti: true,
  },
};

export function getApp(appId: AppId): AppDef {
  return appRegistry[appId];
}

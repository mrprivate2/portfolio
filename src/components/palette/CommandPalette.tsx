import { useEffect, useMemo, useRef, useState, type ComponentType, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  FileText,
  FolderKanban,
  Home,
  Mail,
  Music,
  Palette,
  Search,
  Settings,
  Sparkles,
  Terminal,
  User,
  Users,
  Trash2,
  Command,
} from 'lucide-react';
import { useWindowManager } from '../../context/WindowManager';
import { brandIcons } from '../../lib/brandIcons';
import { socials } from '../../data/socials';
import { projects } from '../../data/projects';
import { skillGroups } from '../../data/skills';
import { cn } from '../../lib/cn';

interface PaletteCommand {
  id: string;
  label: string;
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  keywords: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { openApp } = useWindowManager();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const commands: PaletteCommand[] = useMemo(
    () => [
      { id: 'home', label: 'Open Home', icon: Home, keywords: 'home start desktop', run: () => openApp('home') },
      { id: 'about', label: 'Open About Me', icon: User, keywords: 'about profile who', run: () => openApp('about') },
      { id: 'work', label: 'Search Projects', icon: FolderKanban, keywords: 'work projects portfolio case study', run: () => openApp('work') },
      { id: 'resume', label: 'Open Resume', icon: FileText, keywords: 'resume cv pdf', run: () => openApp('resume') },
      { id: 'terminal', label: 'Open Terminal', icon: Terminal, keywords: 'terminal shell cli command', run: () => openApp('terminal') },
      { id: 'readme', label: 'Open README.txt', icon: Code2, keywords: 'readme editor text file', run: () => openApp('readme') },
      { id: 'skills', label: 'Open Skills', icon: Sparkles, keywords: 'skills stack technologies', run: () => openApp('skills') },
      { id: 'profiles', label: 'Open Developer Profiles', icon: Users, keywords: 'profiles github leetcode linkedin coding', run: () => openApp('profiles') },
      { id: 'wallpaper', label: 'Change Wallpaper', icon: Palette, keywords: 'wallpaper background theme', run: () => openApp('wallpaper') },
      { id: 'music', label: 'Open Music', icon: Music, keywords: 'music player audio focus', run: () => openApp('music') },
      { id: 'contact', label: 'Contact Me', icon: Mail, keywords: 'contact email message hire', run: () => openApp('contact') },
      { id: 'trash', label: 'Open Trash', icon: Trash2, keywords: 'trash delete bin', run: () => openApp('trash') },
      { id: 'settings', label: 'Open Settings', icon: Settings, keywords: 'settings preferences appearance accent', run: () => openApp('settings') },
      ...projects.map((p) => ({
        id: `project-${p.id}`,
        label: `Project — ${p.name}`,
        icon: FolderKanban,
        keywords: `${p.name} ${p.tags.join(' ')} project case study`,
        run: () => openApp('work'),
      })),
      ...skillGroups.map((g) => ({
        id: `skill-${g.id}`,
        label: `${g.label} skills`,
        icon: Sparkles,
        keywords: `${g.label} ${g.skills.join(' ')}`,
        run: () => openApp('skills'),
      })),
      ...(socials.github
        ? [{ id: 'github', label: 'Open GitHub', hint: 'github.com', icon: brandIcons.github, keywords: 'github code repo source', run: () => openUrl(socials.github) }]
        : []),
      ...(socials.leetcode
        ? [{ id: 'leetcode', label: 'Open LeetCode', hint: 'leetcode.com', icon: brandIcons.leetcode, keywords: 'leetcode dsa problems', run: () => openUrl(socials.leetcode) }]
        : []),
      ...(socials.linkedin
        ? [{ id: 'linkedin', label: 'Open LinkedIn', hint: 'linkedin.com', icon: brandIcons.linkedin, keywords: 'linkedin network professional', run: () => openUrl(socials.linkedin) }]
        : []),
    ],
    [openApp]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.keywords}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => {
        setQuery('');
        setIndex(0);
        inputRef.current?.focus();
      }, 0);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const runCommand = (cmd: PaletteCommand) => {
    onClose();
    window.setTimeout(cmd.run, 80);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[index];
      if (cmd) runCommand(cmd);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[9600] bg-black/50 backdrop-blur-sm flex justify-center pt-[12vh] px-4"
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.14 }}
            className="w-full max-w-lg rounded-xl overflow-hidden glass-strong shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="w-4 h-4 text-white/50" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
                aria-label="Search commands"
              />
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white/60">
                <Command className="w-2.5 h-2.5" /> K
              </span>
            </div>

            <div ref={listRef} className="max-h-[46vh] overflow-y-auto py-1.5" role="listbox">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-sm text-white/40 text-center">
                  No matching commands
                </div>
              )}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    data-index={i}
                    role="option"
                    aria-selected={i === index}
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => runCommand(cmd)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors',
                      i === index
                        ? 'bg-gradient-to-r from-accent/25 to-transparent text-white border-l-2 border-accent'
                        : 'text-white/75 hover:bg-white/5 border-l-2 border-transparent'
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1 truncate">{cmd.label}</span>
                    {cmd.hint && <span className="text-[11px] text-white/40">{cmd.hint}</span>}
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-2 border-t border-white/10 text-[11px] text-white/40 flex items-center gap-4">
              <span><kbd className="text-white/70">↑↓</kbd> navigate</span>
              <span><kbd className="text-white/70">↵</kbd> open</span>
              <span><kbd className="text-white/70">esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

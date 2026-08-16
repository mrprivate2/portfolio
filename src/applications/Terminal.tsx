import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useWindowManager } from '../context/WindowManager';
import { useSettings } from '../context/Settings';
import { profile } from '../data/profile';
import { socials } from '../data/socials';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { wallpapers } from '../lib/wallpapers';
import type { AppId } from './registry';

interface Line {
  id: number;
  kind: 'cmd' | 'out' | 'err' | 'accent' | 'dim';
  text: string;
}

let lineId = 0;

export default function Terminal() {
  const wm = useWindowManager();
  const { setWallpaper } = useSettings();
  const [lines, setLines] = useState<Line[]>([
    { id: lineId++, kind: 'dim', text: 'Sawan terminal v1.0.0 — sawan@dev' },
    { id: lineId++, kind: 'dim', text: "Type 'help' to see available commands." },
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const print = (text: string, kind: Line['kind'] = 'out') => {
    setLines((prev) => [...prev, { id: lineId++, kind, text }]);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const run = (raw: string) => {
    const input = raw.trim();
    setLines((prev) => [...prev, { id: lineId++, kind: 'cmd', text: input }]);
    if (!input) return;

    const [cmd, ...args] = input.split(/\s+/);
    const arg = args.join(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        print('Available commands:');
        print('  about        About me');
        print('  projects     View projects');
        print('  skills       Technical skills');
        print('  github       Open GitHub', 'accent');
        print('  leetcode     Open LeetCode', 'accent');
        print('  linkedin     Open LinkedIn', 'accent');
        print('  resume       Open resume');
        print('  contact      Contact me');
        print('  open <app>   Open an application');
        print('  wallpaper    List wallpapers');
        print('  clear        Clear terminal');
        print('  neofetch     System information');
        print('  date         Current date & time');
        print('  whoami       Who are you?');
        break;

      case 'about':
        print(`${profile.name} — ${profile.role} / ${profile.roleTagline}`);
        print(`Based in ${profile.location}. ${profile.intro}`, 'dim');
        break;

      case 'projects':
        projects.forEach((p) => print(`  ${p.name} — ${p.tagline}`));
        print(`\n${projects.length} projects. Run 'open work' to browse them.`, 'dim');
        break;

      case 'skills':
        skillGroups.forEach((g) => print(`  ${g.label}: ${g.skills.join(', ')}`));
        break;

      case 'github':
        if (socials.github) {
          print('Opening GitHub…');
          openUrl(socials.github);
        } else {
          print('No GitHub URL configured.', 'err');
        }
        break;

      case 'leetcode':
        if (socials.leetcode) {
          print('Opening LeetCode…');
          openUrl(socials.leetcode);
        } else {
          print('No LeetCode URL configured.', 'err');
        }
        break;

      case 'linkedin':
        if (socials.linkedin) {
          print('Opening LinkedIn…');
          openUrl(socials.linkedin);
        } else {
          print('No LinkedIn URL configured.', 'err');
        }
        break;

      case 'resume':
        print('Opening resume…');
        wm.openApp('resume');
        break;

      case 'contact':
        print(`Email: ${profile.email}`);
        print(`GitHub: ${socials.github ?? '—'}`, 'dim');
        print(`LinkedIn: ${socials.linkedin ?? '—'}`, 'dim');
        print("Run 'open contact' for the full contact app.");
        break;

      case 'open': {
        const target = arg.toLowerCase();
        const apps: Record<string, AppId> = {
          home: 'home',
          about: 'about',
          work: 'work',
          projects: 'work',
          resume: 'resume',
          terminal: 'terminal',
          readme: 'readme',
          profiles: 'profiles',
          contact: 'contact',
          skills: 'skills',
          wallpaper: 'wallpaper',
          music: 'music',
          trash: 'trash',
        };
        const appId = apps[target];
        if (appId) {
          print(`Opening ${target}…`);
          wm.openApp(appId);
        } else if (target === 'github' && socials.github) {
          openUrl(socials.github);
        } else if (target === 'leetcode' && socials.leetcode) {
          openUrl(socials.leetcode);
        } else if (target === 'linkedin' && socials.linkedin) {
          openUrl(socials.linkedin);
        } else {
          print(`open: no such application '${arg}'`, 'err');
        }
        break;
      }

      case 'wallpaper':
        if (!arg) {
          print('Available wallpapers:');
          wallpapers.forEach((w) => print(`  ${w.id} — ${w.name}`, 'accent'));
          print("Usage: wallpaper <id>");
        } else {
          const found = wallpapers.find((w) => w.id === arg || w.name.toLowerCase() === arg.toLowerCase());
          if (found) {
            setWallpaper(found.id);
            print(`Wallpaper set to ${found.name}.`);
          } else {
            print(`wallpaper: unknown wallpaper '${arg}'`, 'err');
          }
        }
        break;

      case 'clear':
        setLines([]);
        break;

      case 'neofetch':
        print('       ██╗   ██╗    OS:      Sawan 1.0', 'accent');
        print('       ██║   ██║    Shell:   portfolio-shell');
        print('       ██║   ██║    Theme:   Dark');
        print('       ██║   ██║    Editor:  VS Code');
        print('       ╚██████╔╝    Coffee:  required', 'accent');
        print('        ╚═════╝     Uptime:  way too long');
        break;

      case 'date':
        print(new Date().toString());
        break;

      case 'whoami':
        print(profile.name);
        break;

      case 'pwd':
        print('/home/sawan');
        break;

      case 'ls':
        print('About  Work  Resume  Skills  Profiles  README.txt  Terminal  Wallpaper  Music  Contact');
        break;

      case 'echo':
        print(arg);
        break;

      case 'cat':
        if (arg.toLowerCase() === 'readme' || arg.toLowerCase() === 'readme.txt') {
          print("Hey — welcome to my corner of the internet.");
          print("Run 'open readme' to open README.txt in the editor.", 'dim');
        } else {
          print(`cat: ${arg}: No such file or directory`, 'err');
        }
        break;

      case 'sudo':
        if (arg.toLowerCase() === 'hire-me') {
          print('Nice try.');
          print('But you can just email me: ' + profile.email, 'accent');
        } else {
          print(`sudo: ${arg}: command not found`, 'err');
        }
        break;

      case 'exit':
        wm.closeWindow(wm.getWindow('terminal')?.id ?? -1);
        break;

      default:
        print(`command not found: ${cmd}`, 'err');
        print("Type 'help' to see available commands.", 'dim');
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setHistory((prev) => [...prev, value]);
    setHistoryIndex(-1);
    run(value);
    setValue('');
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setValue(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const idx = historyIndex + 1;
      if (idx >= history.length) {
        setHistoryIndex(-1);
        setValue('');
      } else {
        setHistoryIndex(idx);
        setValue(history[idx]);
      }
    }
  };

  const lineColor = (kind: Line['kind']) => {
    switch (kind) {
      case 'cmd':
        return 'text-white';
      case 'err':
        return 'text-[#f87171]';
      case 'accent':
        return 'text-[#39ff88]';
      case 'dim':
        return 'text-white/45';
      default:
        return 'text-white/80';
    }
  };

  return (
    <div
      className="h-full flex flex-col bg-[#030504] font-mono text-[13px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 leading-relaxed">
        {lines.map((line) => (
          <div key={line.id} className={lineColor(line.kind)}>
            {line.text === '' ? '\u00A0' : line.text}
          </div>
        ))}
        <div className="text-white/45 select-none">_</div>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 px-4 py-2.5 border-t border-white/10 bg-black/40"
      >
        <span className="text-[#39ff88] whitespace-nowrap">sawan@dev:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
          className="flex-1 bg-transparent outline-none text-white placeholder-white/25"
          placeholder="type 'help'"
        />
      </form>
    </div>
  );
}

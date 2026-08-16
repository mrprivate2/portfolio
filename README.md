# Sawan — Developer Portfolio OS

A personal portfolio built as a desktop operating system. Boot sequence, draggable windows, dock, terminal, command palette — a developer's personal computer that happens to be a portfolio.

## Theme

Black + restrained green developer/security workstation. Near-black surfaces (`#030504` / `#0A0F0B`), forest-green surfaces (`#0D1510`), green accent `#39FF88` used sparingly for interactive elements, and muted gray-green text (`#8C9B90`). All accent/surface colors live in `src/index.css` as CSS variables — swap the accent in Settings (Signal / Emerald / Forest) to recolor the whole shell.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- Lucide + react-icons (Simple Icons / Font Awesome brand marks)
- jsPDF (resume download)

## Run

```bash
npm install
npm run dev
```

## Commands

| Script        | What it does                          |
| ------------- | ------------------------------------- |
| `npm run dev` | Vite dev server                       |
| `npm run build` | Typecheck + production build        |
| `npm run typecheck` | TypeScript only                |
| `npm run lint` | ESLint                              |
| `npm run preview` | Preview the production build     |

## Make it yours

Everything personal lives in `src/data/` — no component edits needed:

- `profile.ts` — name, role, bio, photo, stats
- `socials.ts` — all profile URLs (empty string hides a platform everywhere)
- `projects.ts` — projects + full case studies
- `skills.ts` — skill groups and icons
- `experience.ts` — education, experience, achievements, certifications
- `music.ts` — playlist (tracks are synthesized, so royalty-free)

Other places worth knowing:

- `src/lib/wallpapers.tsx` — add/remove desktop wallpapers
- `src/applications/registry.tsx` — app metadata (titles, sizes, icons)
- `src/applications/Terminal.tsx` — terminal commands & easter eggs
- `src/components/dock/Dock.tsx` / `DesktopIcons.tsx` — dock & icon config

## Shortcuts

- `Cmd/Ctrl + K` — command palette
- `Cmd/Ctrl + W` — close active window
- `Esc` — close active window / dismiss overlays
- `Enter` — open the selected desktop icon
- Arrow keys — move selection between desktop icons
- Right-click the desktop for the context menu
- Try `help`, `neofetch`, and `sudo hire-me` in the terminal
# portfolio

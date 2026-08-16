import type { ComponentType } from 'react';

export interface WallpaperDef {
  id: string;
  name: string;
  Component: ComponentType<{ className?: string }>;
}

/** Deterministic pseudo-random stars so renders stay stable. */
function seededStars(count: number, seed = 7) {
  let s = seed;
  const next = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    x: next() * 100,
    y: next() * 100,
    r: 0.4 + next() * 1.1,
    o: 0.12 + next() * 0.16,
  }));
}

const stars = seededStars(46);

const GridOverlay = ({ step = 90 }: { step?: number }) => {
  const lines: number[] = [];
  for (let i = step; i < 100; i += step) lines.push(i);
  return (
    <g stroke="rgba(255,255,255,0.028)" strokeWidth="1">
      {lines.map((p) => (
        <line key={`v${p}`} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" />
      ))}
      {lines.map((p) => (
        <line key={`h${p}`} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} />
      ))}
    </g>
  );
};

const Stars = ({ list = stars }: { list?: typeof stars }) => (
  <g>
    {list.map((s, i) => (
      <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#d6f5e2" opacity={s.o} />
    ))}
  </g>
);

const Blob = ({
  cx,
  cy,
  r,
  color,
  opacity = 0.5,
}: {
  cx: string;
  cy: string;
  r: string;
  color: string;
  opacity?: number;
}) => (
  <ellipse cx={cx} cy={cy} rx={r} ry={r} fill={color} opacity={opacity}>
    <animate attributeName="opacity" values={`${opacity};${Math.max(0.1, opacity - 0.25)};${opacity}`} dur="18s" repeatCount="indefinite" />
  </ellipse>
);

const DefaultWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <defs>
      <filter id="w-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="90" />
      </filter>
    </defs>
    <g filter="url(#w-blur)">
      <Blob cx="28%" cy="22%" r="26%" color="#0d3b1f" opacity={0.4} />
      <Blob cx="74%" cy="68%" r="30%" color="#168044" opacity={0.3} />
      <Blob cx="88%" cy="12%" r="16%" color="#1f9d57" opacity={0.24} />
      <Blob cx="8%" cy="85%" r="20%" color="#39ff88" opacity={0.1} />
    </g>
    <GridOverlay />
    <Stars />
  </svg>
);

const AuroraWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <defs>
      <filter id="a-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="110" />
      </filter>
    </defs>
    <g filter="url(#a-blur)">
      <Blob cx="20%" cy="30%" r="34%" color="#0d3b1f" opacity={0.45} />
      <Blob cx="55%" cy="75%" r="38%" color="#168044" opacity={0.38} />
      <Blob cx="85%" cy="25%" r="26%" color="#1f9d57" opacity={0.3} />
      <Blob cx="45%" cy="8%" r="22%" color="#39ff88" opacity={0.12} />
    </g>
    <Stars />
  </svg>
);

const DarkWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <radialGradient id="d-vignette" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stopColor="#0a0f0b" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#050706" stopOpacity="1" />
    </radialGradient>
    <rect width="1600" height="900" fill="url(#d-vignette)" />
    <Stars list={stars.slice(0, 18)} />
  </svg>
);

const GridWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <GridOverlay step={55} />
    <radialGradient id="g-glow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stopColor="#39ff88" stopOpacity="0.1" />
      <stop offset="100%" stopColor="#39ff88" stopOpacity="0" />
    </radialGradient>
    <rect width="1600" height="900" fill="url(#g-glow)" />
    <Stars />
  </svg>
);

const GradientWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="gr-main" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0a0f0b" />
        <stop offset="45%" stopColor="#0d1510" />
        <stop offset="100%" stopColor="#050706" />
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#gr-main)" />
    <GridOverlay />
  </svg>
);

const CyberWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <g stroke="#22c55e" strokeWidth="1.2" fill="none" opacity="0.12">
      <path d="M-50 720 L340 720 L460 600 L820 600" />
      <path d="M820 600 L940 480 L1300 480 L1650 480" />
      <path d="M460 600 L460 300 L620 300 L620 140" />
      <path d="M-50 200 L300 200 L420 320 L420 600" />
      <path d="M940 480 L940 220 L1150 220" />
      <path d="M1300 480 L1300 680 L1500 680" />
    </g>
    <g fill="#39ff88" opacity="0.35">
      <circle cx="340" cy="720" r="3" />
      <circle cx="460" cy="600" r="3" />
      <circle cx="820" cy="600" r="3" />
      <circle cx="940" cy="480" r="3" />
      <circle cx="620" cy="140" r="3" />
      <circle cx="420" cy="320" r="3" />
      <circle cx="1150" cy="220" r="3" />
      <circle cx="1500" cy="680" r="3" />
    </g>
    <Stars list={stars.slice(0, 14)} />
  </svg>
);

const MinimalWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <radialGradient id="m-glow" cx="50%" cy="24%" r="42%">
      <stop offset="0%" stopColor="#39ff88" stopOpacity="0.1" />
      <stop offset="100%" stopColor="#39ff88" stopOpacity="0" />
    </radialGradient>
    <rect width="1600" height="900" fill="url(#m-glow)" />
    <circle cx="50%" cy="24%" r="4" fill="#39ff88" opacity="0.6" />
  </svg>
);

/* Topographic contour lines */
const CONTOURS = [
  { cx: 330, cy: 250, rx: 90, ry: 60 },
  { cx: 330, cy: 250, rx: 170, ry: 120 },
  { cx: 330, cy: 250, rx: 250, ry: 180 },
  { cx: 330, cy: 250, rx: 330, ry: 250 },
  { cx: 1180, cy: 620, rx: 100, ry: 70 },
  { cx: 1180, cy: 620, rx: 190, ry: 140 },
  { cx: 1180, cy: 620, rx: 280, ry: 210 },
  { cx: 1180, cy: 620, rx: 370, ry: 280 },
  { cx: 760, cy: 480, rx: 130, ry: 90 },
  { cx: 760, cy: 480, rx: 240, ry: 170 },
];

const TopoWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <g fill="none" stroke="#168044" strokeWidth="1.2" opacity="0.16">
      {CONTOURS.map((c, i) => (
        <ellipse key={i} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} />
      ))}
    </g>
    <Stars list={stars.slice(0, 12)} />
  </svg>
);

/* PCB circuit traces */
const CircuitWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <g stroke="#1f9d57" strokeWidth="1.5" fill="none" opacity="0.16">
      <path d="M-50 160 H320 V330 H640" />
      <path d="M640 330 H900 V180 H1180" />
      <path d="M-50 560 H240 V420 H520 V260" />
      <path d="M1180 180 H1360 V520 H1650" />
      <path d="M900 330 V720 H1180" />
      <path d="M520 260 H720 V120 H920" />
      <path d="M320 160 V760 H520" />
    </g>
    <g fill="#39ff88" opacity="0.45">
      <circle cx="320" cy="330" r="3" />
      <circle cx="640" cy="330" r="3" />
      <circle cx="900" cy="180" r="3" />
      <circle cx="900" cy="720" r="3" />
      <circle cx="1180" cy="520" r="3" />
      <circle cx="720" cy="120" r="3" />
      <circle cx="520" cy="260" r="3" />
      <circle cx="240" cy="420" r="3" />
    </g>
    <Stars list={stars.slice(0, 10)} />
  </svg>
);

/* Layered sine waves */
const WAVE_PATHS = [
  'M-50 520 Q 240 400 530 520 T 1110 520 T 1650 520',
  'M-50 580 Q 240 460 530 580 T 1110 580 T 1650 580',
  'M-50 640 Q 240 520 530 640 T 1110 640 T 1650 640',
  'M-50 700 Q 240 580 530 700 T 1110 700 T 1650 700',
  'M-50 760 Q 240 640 530 760 T 1110 760 T 1650 760',
];

const WavesWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <g fill="none" stroke="#22c55e" strokeWidth="1.2" opacity="0.12">
      {WAVE_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
    <Stars list={stars.slice(0, 10)} />
  </svg>
);

/* Connected network nodes */
const NODES = [
  { x: 240, y: 300, links: [1, 2, 3] },
  { x: 520, y: 180, links: [0, 2, 4] },
  { x: 660, y: 430, links: [0, 1, 3, 5] },
  { x: 420, y: 600, links: [0, 2, 5] },
  { x: 860, y: 260, links: [1, 5, 6] },
  { x: 990, y: 520, links: [2, 3, 4, 6] },
  { x: 1240, y: 380, links: [4, 5, 7] },
  { x: 1380, y: 640, links: [6] },
];

const NodesWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <g stroke="#1f9d57" strokeWidth="1" opacity="0.18">
      {NODES.map((n, i) =>
        n.links.map((j) =>
          j > i ? (
            <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={NODES[j].x} y2={NODES[j].y} />
          ) : null
        )
      )}
    </g>
    <g fill="#39ff88" opacity="0.5">
      {NODES.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 4 : 2.5} />
      ))}
    </g>
    <Stars list={stars.slice(0, 12)} />
  </svg>
);

/* Faint terminal prompt */
const TerminalWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1600" height="900" fill="#030504" />
    <radialGradient id="t-glow" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#168044" stopOpacity="0.16" />
      <stop offset="100%" stopColor="#168044" stopOpacity="0" />
    </radialGradient>
    <rect width="1600" height="900" fill="url(#t-glow)" />
    <text x="140" y="430" fontFamily="'JetBrains Mono', monospace" fontSize="34" fill="#39ff88" opacity="0.1">
      sawan@dev:~$ whoami
    </text>
    <text x="140" y="490" fontFamily="'JetBrains Mono', monospace" fontSize="34" fill="#e7f0e9" opacity="0.07">
      Sawan Yadav — full-stack · AI · security
    </text>
    <text x="140" y="550" fontFamily="'JetBrains Mono', monospace" fontSize="34" fill="#8c9b90" opacity="0.07">
      sawan@dev:~$ open my-work
    </text>
    <Stars list={stars.slice(0, 8)} />
  </svg>
);

/* Deep forest gradient */
const ForestWallpaper = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="f-main" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#030504" />
        <stop offset="48%" stopColor="#07150c" />
        <stop offset="100%" stopColor="#030504" />
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#f-main)" />
    <radialGradient id="f-light" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.07" />
      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
    </radialGradient>
    <rect width="1600" height="900" fill="url(#f-light)" />
    <Stars list={stars.slice(0, 14)} />
  </svg>
);

export const wallpapers: WallpaperDef[] = [
  { id: 'default', name: 'Default', Component: DefaultWallpaper },
  { id: 'aurora', name: 'Aurora', Component: AuroraWallpaper },
  { id: 'dark', name: 'Dark', Component: DarkWallpaper },
  { id: 'grid', name: 'Grid', Component: GridWallpaper },
  { id: 'gradient', name: 'Gradient', Component: GradientWallpaper },
  { id: 'cyber', name: 'Cyber', Component: CyberWallpaper },
  { id: 'minimal', name: 'Minimal', Component: MinimalWallpaper },
  { id: 'topo', name: 'Topo', Component: TopoWallpaper },
  { id: 'circuit', name: 'Circuit', Component: CircuitWallpaper },
  { id: 'waves', name: 'Waves', Component: WavesWallpaper },
  { id: 'nodes', name: 'Nodes', Component: NodesWallpaper },
  { id: 'terminal', name: 'Terminal', Component: TerminalWallpaper },
  { id: 'forest', name: 'Forest', Component: ForestWallpaper },
];

export const defaultWallpaperId = 'terminal';

export function getWallpaper(id: string): WallpaperDef {
  return wallpapers.find((w) => w.id === id) ?? wallpapers[0];
}

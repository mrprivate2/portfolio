import type { Project } from '../data/projects';

export function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const gid = `cover-${project.id}`;
  const gid2 = `cover-text-${project.id}`;
  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      role="img"
      aria-label={`${project.name} — project cover`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={project.accent} stopOpacity="0.4" />
          <stop offset="55%" stopColor="#0a0f0b" stopOpacity="0.9" />
          <stop offset="100%" stopColor={project.accent2} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={gid2} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="100%" stopColor={project.accent} stopOpacity="0.85" />
        </linearGradient>
        <pattern id={`${gid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="240" fill="url(#gid)" />
      <rect width="400" height="240" fill={`url(#${gid}-grid)`} />
      <text
        x="30"
        y="150"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="104"
        fill="url(#gid2)"
      >
        {project.monogram}
      </text>
      <text
        x="30"
        y="200"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="12"
        fill={project.accent}
        opacity="0.9"
      >
        {'> '}
        {project.name.toLowerCase()}.app
      </text>
      <text
        x="370"
        y="220"
        textAnchor="end"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="10"
        fill="rgba(255,255,255,0.4)"
      >
        {project.status} · {project.year}
      </text>
    </svg>
  );
}

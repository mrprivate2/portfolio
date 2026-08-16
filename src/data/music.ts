export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  /** seconds */
  duration: number;
  hue: string;
  hue2: string;
  /** Chord progression as frequency sets (Hz). Synthesized, so fully royalty-free. */
  chords: number[][];
  wave: OscillatorType;
}

export const musicTracks: MusicTrack[] = [
  {
    id: 'midnight-loop',
    title: 'Midnight Loop',
    artist: 'sawan.dev',
    duration: 180,
    hue: '#39ff88',
    hue2: '#168044',
    chords: [
      [110, 164.81, 220, 329.63],
      [98, 146.83, 196, 293.66],
      [130.81, 196, 261.63, 392],
      [87.31, 130.81, 174.61, 261.63],
    ],
    wave: 'sine',
  },
  {
    id: 'neon-drift',
    title: 'Neon Drift',
    artist: 'sawan.dev',
    duration: 210,
    hue: '#22c55e',
    hue2: '#168044',
    chords: [
      [130.81, 196, 246.94, 329.63],
      [110, 164.81, 220, 277.18],
      [146.83, 220, 293.66, 369.99],
      [98, 146.83, 196, 246.94],
    ],
    wave: 'triangle',
  },
  {
    id: 'deep-focus',
    title: 'Deep Focus',
    artist: 'sawan.dev',
    duration: 240,
    hue: '#39ff88',
    hue2: '#22c55e',
    chords: [
      [87.31, 130.81, 174.61, 261.63],
      [82.41, 123.47, 164.81, 246.94],
      [98, 146.83, 196, 293.66],
      [73.42, 110, 146.83, 220],
    ],
    wave: 'sine',
  },
  {
    id: 'late-night-commits',
    title: 'Late Night Commits',
    artist: 'sawan.dev',
    duration: 195,
    hue: '#22c55e',
    hue2: '#0d3b1f',
    chords: [
      [110, 164.81, 220, 261.63],
      [116.54, 174.61, 233.08, 349.23],
      [103.83, 155.56, 207.65, 311.13],
      [98, 146.83, 196, 246.94],
    ],
    wave: 'triangle',
  },
  {
    id: 'system-idle',
    title: 'System Idle',
    artist: 'sawan.dev',
    duration: 150,
    hue: '#8c9b90',
    hue2: '#39ff88',
    chords: [
      [130.81, 196, 261.63, 392],
      [130.81, 196, 261.63, 329.63],
      [116.54, 174.61, 233.08, 311.13],
      [110, 164.81, 220, 329.63],
    ],
    wave: 'sine',
  },
];

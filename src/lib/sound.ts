import { musicTracks } from '../data/music';

export interface PlayerState {
  playing: boolean;
  trackIndex: number;
  /** 0..1 */
  progress: number;
  /** 0..1 */
  volume: number;
  /** false when WebAudio is unavailable (mock mode) */
  supported: boolean;
}

const CHORD_INTERVAL_MS = 4200;
const PROGRESS_TICK_MS = 500;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let filterNode: BiquadFilterNode | null = null;
let chordIndex = 0;
let chordTimer: number | null = null;
let progressTimer: number | null = null;
let startedAtMs = 0;

let state: PlayerState = {
  playing: false,
  trackIndex: 0,
  progress: 0,
  volume: 0.7,
  supported: true,
};

const listeners = new Set<() => void>();

function emit() {
  state = { ...state };
  listeners.forEach((fn) => fn());
}

export function subscribePlayer(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getPlayerState(): PlayerState {
  return state;
}

function ensureAudio() {
  if (ctx) return;
  try {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) throw new Error('no audio context');
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = state.volume * state.volume;
    master.connect(ctx.destination);
    filterNode = ctx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 1100;
    filterNode.Q.value = 0.4;
    filterNode.connect(master);
  } catch {
    state.supported = false;
  }
}

function playChord() {
  if (!ctx || !master || !filterNode) return;
  const track = musicTracks[state.trackIndex];
  const chord = track.chords[chordIndex % track.chords.length];
  chordIndex += 1;

  const now = ctx.currentTime;
  for (const freq of chord) {
    const osc = ctx.createOscillator();
    osc.type = track.wave;
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);
    osc.connect(gain);
    gain.connect(filterNode);
    osc.start(now);
    osc.stop(now + 4.4);
  }
}

function startSchedulers() {
  stopSchedulers();
  chordTimer = window.setInterval(playChord, CHORD_INTERVAL_MS);
  progressTimer = window.setInterval(tickProgress, PROGRESS_TICK_MS);
}

function stopSchedulers() {
  if (chordTimer !== null) window.clearInterval(chordTimer);
  if (progressTimer !== null) window.clearInterval(progressTimer);
  chordTimer = null;
  progressTimer = null;
}

function tickProgress() {
  const track = musicTracks[state.trackIndex];
  const elapsed = (performance.now() - startedAtMs) / 1000;
  const progress = Math.min(1, elapsed / track.duration);
  state.progress = progress;
  if (progress >= 1) {
    setTrack((state.trackIndex + 1) % musicTracks.length, true);
    return;
  }
  emit();
}

function setTrack(index: number, autoAdvance = false) {
  state.trackIndex = index;
  chordIndex = 0;
  state.progress = 0;
  startedAtMs = performance.now();
  if (state.playing && ctx) {
    // brief silence between auto-advanced tracks
    if (autoAdvance) playChord();
  }
  emit();
}

export const player = {
  subscribe: subscribePlayer,
  getState: getPlayerState,

  toggle() {
    if (state.playing) player.pause();
    else player.play();
  },

  play() {
    if (state.playing) return;
    ensureAudio();
    state.playing = true;
    startedAtMs = performance.now();
    if (ctx) {
      void ctx.resume().catch(() => {});
      playChord();
      startSchedulers();
    } else {
      // mock mode — progress still ticks
      startSchedulers();
    }
    emit();
  },

  pause() {
    if (!state.playing) return;
    state.playing = false;
    stopSchedulers();
    emit();
  },

  next() {
    setTrack((state.trackIndex + 1) % musicTracks.length);
  },

  prev() {
    setTrack((state.trackIndex - 1 + musicTracks.length) % musicTracks.length);
  },

  playTrack(index: number) {
    setTrack(index);
    if (state.playing) player.play();
  },

  setVolume(v: number) {
    state.volume = Math.min(1, Math.max(0, v));
    if (master && ctx) master.gain.value = state.volume * state.volume;
    emit();
  },

  seek(p: number) {
    const track = musicTracks[state.trackIndex];
    state.progress = Math.min(1, Math.max(0, p));
    startedAtMs = performance.now() - state.progress * track.duration * 1000;
    emit();
  },
};

import { useEffect, useState } from 'react';
import { Music as MusicIcon, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { musicTracks } from '../data/music';
import { getPlayerState, player, subscribePlayer } from '../lib/sound';
import { cn } from '../lib/cn';

function formatTime(progress: number, duration: number) {
  const secs = Math.floor(progress * duration);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Music() {
  const [state, setState] = useState(getPlayerState);

  useEffect(() => subscribePlayer(() => setState(getPlayerState())), []);

  const track = musicTracks[state.trackIndex];

  return (
    <div className="h-full flex flex-col">
      {/* Cover */}
      <div
        className="relative m-5 mb-3 rounded-2xl overflow-hidden aspect-square border border-white/10 shadow-xl shadow-black/40"
        style={{
          background: `linear-gradient(135deg, ${track.hue}33, #0a0f0b 55%, ${track.hue2}40)`,
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: track.hue }}
        >
          <MusicIcon className="w-24 h-24 opacity-80 drop-shadow-[0_0_24px_rgba(57,255,136,0.3)]" />
        </div>
        {state.playing && (
          <div className="absolute bottom-3 left-3 flex items-end gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-white/80 animate-pulse"
                style={{ height: 10 + i * 5, animationDelay: `${i * 160}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="px-5">
        <h3 className="font-display font-semibold text-white truncate">{track.title}</h3>
        <p className="text-xs text-white/50 mt-0.5">{track.artist}</p>
        <p className="text-[10px] text-white/30 mt-1">generative · royalty-free</p>
      </div>

      {/* Progress */}
      <div className="px-5 mt-4">
        <input
          type="range"
          min={0}
          max={1000}
          value={Math.round(state.progress * 1000)}
          onChange={(e) => player.seek(Number(e.target.value) / 1000)}
          aria-label="Seek"
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-[11px] text-white/40 mt-1 tabular-nums">
          <span>{formatTime(state.progress, track.duration)}</span>
          <span>{formatTime(1, track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={player.prev}
          aria-label="Previous track"
          className="text-white/60 hover:text-white transition-colors"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={player.toggle}
          aria-label={state.playing ? 'Pause' : 'Play'}
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent-hover flex items-center justify-center text-white shadow-lg shadow-accent/30 transition-colors"
        >
          {state.playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </button>
        <button
          onClick={player.next}
          aria-label="Next track"
          className="text-white/60 hover:text-white transition-colors"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2.5 px-5 mt-5">
        <Volume2 className="w-4 h-4 text-white/40 shrink-0" />
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(state.volume * 100)}
          onChange={(e) => player.setVolume(Number(e.target.value) / 100)}
          aria-label="Volume"
          className="w-full accent-accent"
        />
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-y-auto mt-4 border-t border-white/10 px-2 py-2">
        {musicTracks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => {
              if (i === state.trackIndex) {
                player.toggle();
              } else {
                player.playTrack(i);
              }
            }}
            className={cn(
              'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
              i === state.trackIndex ? 'bg-accent/15 text-white' : 'text-white/60 hover:bg-white/5'
            )}
          >
            <span
              className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 border border-white/10"
              style={{ background: `linear-gradient(135deg, ${t.hue}30, ${t.hue2}30)` }}
            >
              <MusicIcon className="w-3.5 h-3.5" style={{ color: t.hue }} />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] truncate">{t.title}</span>
              <span className="block text-[11px] text-white/40">{t.artist}</span>
            </span>
            {i === state.trackIndex && (
              <span className="ml-auto flex items-end gap-0.5" aria-hidden="true">
                {[0, 1, 2].map((b) => (
                  <span
                    key={b}
                    className="w-0.5 bg-accent animate-pulse"
                    style={{ height: 8 + b * 3, animationDelay: `${b * 120}ms` }}
                  />
                ))}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

import { wallpapers } from '../lib/wallpapers';
import { useSettings } from '../context/Settings';
import { cn } from '../lib/cn';

export default function WallpaperApp() {
  const { wallpaper, setWallpaper } = useSettings();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-accent-soft font-medium">Personalize</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-1">Wallpaper</h2>
        <p className="text-sm text-white/55 mt-2">
          Pick a look for the desktop. Your choice is saved automatically.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-7">
          {wallpapers.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp.id)}
              className="group text-left"
              aria-pressed={wallpaper === wp.id}
              aria-label={`Set ${wp.name} wallpaper`}
            >
              <div
                className={cn(
                  'relative rounded-xl overflow-hidden border-2 transition-all duration-200 aspect-video',
                  wallpaper === wp.id
                    ? 'border-accent shadow-lg shadow-accent/20'
                    : 'border-white/10 group-hover:border-white/30'
                )}
              >
                <wp.Component className="w-full h-full" />
                {wallpaper === wp.id && (
                  <span className="absolute top-2 right-2 rounded-full bg-accent text-white text-[10px] font-medium px-2 py-0.5">
                    Active
                  </span>
                )}
              </div>
              <p className={cn('text-xs mt-2 transition-colors', wallpaper === wp.id ? 'text-white' : 'text-white/50')}>
                {wp.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

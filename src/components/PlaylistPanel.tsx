import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  author: string;
  duration: number;
  thumbnail: string;
  src: string;
}

interface Props {
  playlist: Track[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function PlaylistPanel({ playlist, currentIndex, onSelect }: Props) {
  return (
    <div className="flex flex-col h-full bg-card">
      {/* Заголовок */}
      <div className="px-4 py-4 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2">
          <Icon name="ListVideo" size={18} className="text-[hsl(var(--neon))]" />
          <h3 className="font-oswald font-semibold tracking-wider text-sm uppercase text-foreground">
            Плейлист
          </h3>
          <span
            className="ml-auto text-xs px-2 py-0.5 rounded-full font-oswald"
            style={{ background: 'hsl(var(--neon) / 0.15)', color: 'hsl(var(--neon))' }}
          >
            {playlist.length}
          </span>
        </div>
      </div>

      {/* Список */}
      <div className="flex-1 overflow-y-auto py-2">
        {playlist.map((track, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={track.id}
              className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-left group"
              style={{
                background: isActive ? 'hsl(var(--neon) / 0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid hsl(var(--neon))' : '2px solid transparent',
              }}
              onClick={() => onSelect(index)}
            >
              {/* Превью */}
              <div className="relative w-14 h-10 rounded overflow-hidden flex-shrink-0">
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'hsl(var(--neon) / 0.3)' }}
                  >
                    <Icon name="Play" size={12} className="text-white ml-0.5" />
                  </div>
                )}
                <div
                  className="absolute bottom-0.5 right-0.5 text-[9px] font-oswald px-1 rounded"
                  style={{ background: 'hsl(220 15% 5% / 0.85)', color: 'hsl(210 20% 80%)' }}
                >
                  {formatTime(track.duration)}
                </div>
              </div>

              {/* Инфо */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-semibold truncate leading-tight"
                  style={{ color: isActive ? 'hsl(var(--neon))' : 'hsl(210 20% 88%)' }}
                >
                  {track.title}
                </p>
                <p className="text-[11px] mt-0.5 truncate" style={{ color: 'hsl(215 15% 50%)' }}>
                  {track.author}
                </p>
              </div>

              {/* Номер */}
              <span
                className="text-xs font-oswald flex-shrink-0"
                style={{ color: isActive ? 'hsl(var(--neon))' : 'hsl(215 15% 40%)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

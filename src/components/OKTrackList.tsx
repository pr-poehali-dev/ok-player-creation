import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Track, formatTime } from '@/data/tracks';

interface Props {
  tracks: Track[];
  currentId: number | null;
  isPlaying: boolean;
  onPlay: (track: Track) => void;
  title?: string;
}

export default function OKTrackList({ tracks, currentId, isPlaying, onPlay, title }: Props) {
  const [liked, setLiked] = useState<Set<number>>(
    new Set(tracks.filter(t => t.liked).map(t => t.id))
  );
  const [hovered, setHovered] = useState<number | null>(null);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  return (
    <div className="flex flex-col">
      {title && (
        <h2 className="text-base font-bold mb-3 px-1" style={{ color: 'hsl(var(--ok-text))' }}>{title}</h2>
      )}
      <div className="flex flex-col gap-0.5">
        {tracks.map((track, idx) => {
          const isActive = track.id === currentId;
          const isHov = hovered === track.id;
          return (
            <div
              key={track.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 group ${
                isActive ? 'bg-[hsl(var(--ok-active))]' : 'hover:bg-[hsl(var(--ok-hover))]'
              }`}
              onClick={() => onPlay(track)}
              onMouseEnter={() => setHovered(track.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Номер / иконка воспроизведения */}
              <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                {isActive && isPlaying ? (
                  <div className="flex items-end gap-0.5 h-4">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="w-0.5 rounded-full"
                        style={{
                          background: 'hsl(var(--ok-orange))',
                          height: `${8 + i * 3}px`,
                          animation: `okBars 0.8s ease-in-out infinite`,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                ) : isHov ? (
                  <Icon
                    name={isActive ? 'Pause' : 'Play'}
                    size={16}
                    style={{ color: 'hsl(var(--ok-orange))' } as React.CSSProperties}
                  />
                ) : (
                  <span className="text-xs font-medium" style={{ color: 'hsl(var(--ok-text-secondary))' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                )}
              </div>

              {/* Обложка */}
              <div className="w-9 h-9 rounded overflow-hidden flex-shrink-0">
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
              </div>

              {/* Название и исполнитель */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate leading-tight"
                  style={{ color: isActive ? 'hsl(var(--ok-orange))' : 'hsl(var(--ok-text))' }}
                >
                  {track.title}
                </p>
                <p className="text-xs truncate mt-0.5" style={{ color: 'hsl(var(--ok-text-secondary))' }}>
                  {track.artist}
                </p>
              </div>

              {/* Альбом — только на широких */}
              <p className="text-xs hidden lg:block flex-shrink-0 w-36 truncate" style={{ color: 'hsl(var(--ok-text-secondary))' }}>
                {track.album}
              </p>

              {/* Лайк */}
              <button
                className={`flex-shrink-0 p-1 rounded transition-all duration-150 ${liked.has(track.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                onClick={e => toggleLike(e, track.id)}
              >
                <Icon
                  name="Heart"
                  size={16}
                  style={{ color: liked.has(track.id) ? 'hsl(var(--ok-orange))' : 'hsl(var(--ok-text-secondary))' } as React.CSSProperties}
                  className={liked.has(track.id) ? 'fill-current' : ''}
                />
              </button>

              {/* Длительность */}
              <span className="text-xs w-9 text-right flex-shrink-0" style={{ color: 'hsl(var(--ok-text-secondary))' }}>
                {formatTime(track.duration)}
              </span>

              {/* Ещё */}
              <button
                className="flex-shrink-0 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={e => e.stopPropagation()}
              >
                <Icon name="MoreHorizontal" size={16} style={{ color: 'hsl(var(--ok-text-secondary))' } as React.CSSProperties} />
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes okBars {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
import { useRef, useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Track, formatTime } from '@/data/tracks';

interface Props {
  track: Track | null;
  isPlaying: boolean;
  tracks: Track[];
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
}

type RepeatMode = 'none' | 'all' | 'one';

export default function OKPlayer({ track, isPlaying, onPlayPause, onPrev, onNext }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>('none');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    audio.src = track.src;
    audio.load();
    if (isPlaying) audio.play().catch(() => {});
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.play().catch(() => {}); }
    else { audio.pause(); }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime ?? 0);
  const handleLoadedMetadata = () => setDuration(audioRef.current?.duration ?? 0);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect || !audioRef.current) return;
    const ratio = (e.clientX - rect.left) / rect.width;
    const t = ratio * duration;
    audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const cycleRepeat = () => {
    setRepeat(r => r === 'none' ? 'all' : r === 'all' ? 'one' : 'none');
  };

  if (!track) {
    return (
      <footer
        className="flex-shrink-0 h-16 border-t bg-white flex items-center justify-center"
        style={{ borderColor: 'hsl(var(--border))' }}
      >
        <p className="text-sm" style={{ color: 'hsl(var(--ok-text-secondary))' }}>Выберите трек для воспроизведения</p>
      </footer>
    );
  }

  return (
    <footer
      className="flex-shrink-0 border-t bg-white"
      style={{ borderColor: 'hsl(var(--border))' }}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNext}
      />

      {/* Прогресс-бар */}
      <div
        ref={progressRef}
        className="w-full h-1 cursor-pointer group relative"
        style={{ background: 'hsl(var(--border))' }}
        onClick={handleProgressClick}
      >
        <div
          className="h-full transition-none"
          style={{
            width: `${progressPercent}%`,
            background: 'hsl(var(--ok-orange))',
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            left: `${progressPercent}%`,
            transform: 'translateX(-50%) translateY(-50%)',
            background: 'hsl(var(--ok-orange))',
            boxShadow: '0 0 4px hsl(var(--ok-orange) / 0.5)',
          }}
        />
      </div>

      <div className="flex items-center gap-3 px-4 h-16">
        {/* Трек-инфо */}
        <div className="flex items-center gap-3 w-56 flex-shrink-0 min-w-0">
          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
            <img
              src={track.cover}
              alt={track.title}
              className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: 'hsl(var(--ok-text))' }}>
              {track.title}
            </p>
            <p className="text-xs truncate" style={{ color: 'hsl(var(--ok-text-secondary))' }}>
              {track.artist}
            </p>
          </div>
          <button className="flex-shrink-0 ml-1">
            <Icon name="Heart" size={16} style={{ color: 'hsl(var(--ok-orange))' } as React.CSSProperties} />
          </button>
        </div>

        {/* Центральные контролы */}
        <div className="flex-1 flex items-center justify-center gap-5">
          {/* Перемешать */}
          <button
            onClick={() => setShuffle(s => !s)}
            className="transition-opacity"
            style={{ opacity: shuffle ? 1 : 0.4 }}
          >
            <Icon
              name="Shuffle"
              size={18}
              style={{ color: shuffle ? 'hsl(var(--ok-orange))' : 'hsl(var(--ok-text-secondary))' } as React.CSSProperties}
            />
          </button>

          {/* Назад */}
          <button
            onClick={onPrev}
            className="transition-all hover:scale-110"
            style={{ color: 'hsl(var(--ok-text))' }}
          >
            <Icon name="SkipBack" size={22} />
          </button>

          {/* Пауза / Play */}
          <button
            onClick={onPlayPause}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
            style={{
              background: 'hsl(var(--ok-orange))',
              boxShadow: '0 2px 8px hsl(var(--ok-orange) / 0.4)',
            }}
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={18} className={isPlaying ? '' : 'ml-0.5'} />
          </button>

          {/* Вперёд */}
          <button
            onClick={onNext}
            className="transition-all hover:scale-110"
            style={{ color: 'hsl(var(--ok-text))' }}
          >
            <Icon name="SkipForward" size={22} />
          </button>

          {/* Повтор */}
          <button onClick={cycleRepeat} style={{ opacity: repeat !== 'none' ? 1 : 0.4 }}>
            <Icon
              name={repeat === 'one' ? 'Repeat1' : 'Repeat'}
              size={18}
              style={{ color: repeat !== 'none' ? 'hsl(var(--ok-orange))' : 'hsl(var(--ok-text-secondary))' } as React.CSSProperties}
            />
          </button>
        </div>

        {/* Правая часть: время + громкость */}
        <div className="w-56 flex-shrink-0 flex items-center justify-end gap-3">
          <span className="text-xs tabular-nums" style={{ color: 'hsl(var(--ok-text-secondary))' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <button onClick={() => setIsMuted(m => !m)}>
            <Icon
              name={isMuted || volume === 0 ? 'VolumeX' : volume < 0.5 ? 'Volume1' : 'Volume2'}
              size={18}
              style={{ color: 'hsl(var(--ok-text-secondary))' } as React.CSSProperties}
            />
          </button>
          <input
            type="range" min="0" max="1" step="0.02"
            value={isMuted ? 0 : volume}
            onChange={e => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
            className="w-20 cursor-pointer"
            style={{ accentColor: 'hsl(24 95% 50%)' }}
          />
        </div>
      </div>
    </footer>
  );
}

import { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import PlaylistPanel from './PlaylistPanel';
import SettingsPanel from './SettingsPanel';
import DonatePanel from './DonatePanel';

const PLAYLIST = [
  {
    id: 1,
    title: 'Горные вершины — Эпизод 1',
    author: 'NatureFilms',
    duration: 342,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 2,
    title: 'Океанские глубины',
    author: 'OceanExplorer',
    duration: 215,
    thumbnail: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 3,
    title: 'Ночной город',
    author: 'UrbanDocs',
    duration: 480,
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 4,
    title: 'Пустыня Сахара',
    author: 'WildNature',
    duration: 390,
    thumbnail: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 5,
    title: 'Северное сияние',
    author: 'ArcticVibes',
    duration: 265,
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activePanel, setActivePanel] = useState<'playlist' | 'settings' | 'donate' | null>('playlist');
  const [quality, setQuality] = useState('1080p');
  const [speed, setSpeed] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const currentVideo = PLAYLIST[currentIndex];

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    if (isPlaying) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    if (isPlaying) video.play();
  }, [currentIndex]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      video.play();
      setIsPlaying(true);
      resetControlsTimer();
    }
  };

  const handleTimeUpdate = () => {
    if (!isDragging) setCurrentTime(videoRef.current?.currentTime ?? 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration ?? 0);
  };

  const handleEnded = () => {
    if (currentIndex < PLAYLIST.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect || !videoRef.current) return;
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const handleNext = () => {
    if (currentIndex < PLAYLIST.length - 1) setCurrentIndex(i => i + 1);
  };

  const togglePanel = (panel: 'playlist' | 'settings' | 'donate') => {
    setActivePanel(p => p === panel ? null : panel);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-background flex overflow-hidden font-golos"
      onMouseMove={resetControlsTimer}
    >
      {/* Фоновый эффект */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, hsl(174 80% 30% / 0.3), transparent)`,
          }}
        />
      </div>

      {/* Видео-область */}
      <div className="relative flex-1 flex flex-col min-w-0 z-10">
        {/* Видео */}
        <div className="relative flex-1 bg-black overflow-hidden scanline" onClick={handlePlayPause}>
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={currentVideo.src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          />

          {/* Оверлей при паузе */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center neon-border neon-glow glass cursor-pointer hover-scale"
                onClick={handlePlayPause}
              >
                <Icon name="Play" size={36} className="text-[hsl(var(--neon))] ml-1" />
              </div>
            </div>
          )}

          {/* Заголовок видео — верхний бар */}
          <div
            className={`absolute top-0 left-0 right-0 px-5 py-4 glass-dark transition-all duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(to bottom, hsl(220 15% 5% / 0.9), transparent)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full" style={{ background: 'hsl(var(--neon))', boxShadow: '0 0 8px hsl(var(--neon))' }} />
              <div>
                <h2 className="text-sm font-semibold text-white leading-tight">{currentVideo.title}</h2>
                <p className="text-xs" style={{ color: 'hsl(var(--neon))' }}>{currentVideo.author}</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="text-xs px-2 py-0.5 rounded font-oswald tracking-wider" style={{ background: 'hsl(var(--neon) / 0.15)', color: 'hsl(var(--neon))', border: '1px solid hsl(var(--neon) / 0.3)' }}>
                  {quality}
                </span>
                <span className="text-xs px-2 py-0.5 rounded font-oswald tracking-wider ml-1" style={{ background: 'hsl(220 15% 14%)', color: 'hsl(210 20% 65%)' }}>
                  {speed}×
                </span>
              </div>
            </div>
          </div>

          {/* Нижние контролы */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ background: 'linear-gradient(to top, hsl(220 15% 3% / 0.95), transparent)' }}
          >
            {/* Прогресс */}
            <div className="px-5 pt-4 pb-2">
              <div
                ref={progressRef}
                className="progress-track h-1.5 w-full relative group"
                onClick={handleProgressClick}
              >
                <div
                  className="progress-fill h-full"
                  style={{ width: `${progressPercent}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    left: `${progressPercent}%`,
                    transform: 'translateX(-50%) translateY(-50%)',
                    background: 'hsl(var(--neon))',
                    boxShadow: '0 0 8px hsl(var(--neon))',
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs" style={{ color: 'hsl(215 15% 55%)' }}>{formatTime(currentTime)}</span>
                <span className="text-xs" style={{ color: 'hsl(215 15% 55%)' }}>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Кнопки управления */}
            <div className="px-5 pb-4 flex items-center gap-4">
              {/* Навигация */}
              <button className="ctrl-btn" onClick={handlePrev} disabled={currentIndex === 0}>
                <Icon name="SkipBack" size={20} />
              </button>

              <button
                className="ctrl-btn w-11 h-11 rounded-full neon-border"
                style={{ background: 'hsl(var(--neon) / 0.1)' }}
                onClick={handlePlayPause}
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={22} className={isPlaying ? '' : 'ml-0.5'} />
              </button>

              <button className="ctrl-btn" onClick={handleNext} disabled={currentIndex === PLAYLIST.length - 1}>
                <Icon name="SkipForward" size={20} />
              </button>

              {/* Громкость */}
              <div className="flex items-center gap-2 ml-1">
                <button className="ctrl-btn" onClick={() => setIsMuted(m => !m)}>
                  <Icon name={isMuted || volume === 0 ? 'VolumeX' : volume < 0.5 ? 'Volume1' : 'Volume2'} size={18} />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-[hsl(var(--neon))] cursor-pointer"
                  style={{ accentColor: 'hsl(174 80% 50%)' }}
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                {/* Панели */}
                <button
                  className="ctrl-btn"
                  onClick={() => togglePanel('donate')}
                  style={activePanel === 'donate' ? { color: 'hsl(320 80% 60%)' } : {}}
                >
                  <Icon name="Heart" size={18} />
                </button>
                <button
                  className="ctrl-btn"
                  onClick={() => togglePanel('settings')}
                  style={activePanel === 'settings' ? { color: 'hsl(var(--neon))' } : {}}
                >
                  <Icon name="Settings" size={18} />
                </button>
                <button
                  className="ctrl-btn"
                  onClick={() => togglePanel('playlist')}
                  style={activePanel === 'playlist' ? { color: 'hsl(var(--neon))' } : {}}
                >
                  <Icon name="ListVideo" size={18} />
                </button>
                <button className="ctrl-btn" onClick={handleFullscreen}>
                  <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Боковая панель */}
      {activePanel && (
        <div
          className="w-80 flex-shrink-0 flex flex-col border-l animate-slide-up z-20"
          style={{ borderColor: 'hsl(var(--border))' }}
        >
          {activePanel === 'playlist' && (
            <PlaylistPanel
              playlist={PLAYLIST}
              currentIndex={currentIndex}
              onSelect={(i) => { setCurrentIndex(i); setIsPlaying(true); setTimeout(() => videoRef.current?.play(), 100); }}
            />
          )}
          {activePanel === 'settings' && (
            <SettingsPanel
              quality={quality}
              speed={speed}
              onQualityChange={setQuality}
              onSpeedChange={setSpeed}
            />
          )}
          {activePanel === 'donate' && (
            <DonatePanel />
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import OKHeader from './OKHeader';
import OKSidebar from './OKSidebar';
import OKPlayer from './OKPlayer';
import OKTrackList from './OKTrackList';
import OKCharts from './OKCharts';
import { TRACKS, Track } from '@/data/tracks';

type Section = 'feed' | 'my' | 'playlists' | 'charts' | 'new' | 'liked';

export default function OKMusicApp() {
  const [section, setSection] = useState<Section>('my');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(p => !p);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => setIsPlaying(p => !p);

  const handlePrev = () => {
    if (!currentTrack) return;
    const idx = TRACKS.findIndex(t => t.id === currentTrack.id);
    if (idx > 0) { setCurrentTrack(TRACKS[idx - 1]); setIsPlaying(true); }
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const idx = TRACKS.findIndex(t => t.id === currentTrack.id);
    if (idx < TRACKS.length - 1) { setCurrentTrack(TRACKS[idx + 1]); setIsPlaying(true); }
  };

  const likedTracks = TRACKS.filter(t => t.liked);

  return (
    <div className="h-screen flex flex-col bg-[hsl(var(--ok-bg))]">
      <OKHeader />

      <div className="flex flex-1 min-h-0">
        <OKSidebar active={section} onChange={setSection} />

        {/* Основной контент */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-5">

            {section === 'my' && (
              <div className="animate-fade-in">
                <OKTrackList
                  tracks={TRACKS}
                  currentId={currentTrack?.id ?? null}
                  isPlaying={isPlaying}
                  onPlay={handlePlay}
                  title="Моя музыка"
                />
              </div>
            )}

            {section === 'liked' && (
              <div className="animate-fade-in">
                <OKTrackList
                  tracks={likedTracks}
                  currentId={currentTrack?.id ?? null}
                  isPlaying={isPlaying}
                  onPlay={handlePlay}
                  title="Мне нравится"
                />
              </div>
            )}

            {section === 'feed' && (
              <div className="animate-fade-in">
                <OKCharts onPlayChart={(title, artist) => {
                  const found = TRACKS.find(t => t.title === title && t.artist === artist);
                  if (found) handlePlay(found); else handlePlay(TRACKS[0]);
                }} />
              </div>
            )}

            {section === 'charts' && (
              <div className="animate-fade-in">
                <OKCharts onPlayChart={(title, artist) => {
                  const found = TRACKS.find(t => t.title === title && t.artist === artist);
                  if (found) handlePlay(found); else handlePlay(TRACKS[0]);
                }} />
              </div>
            )}

            {section === 'playlists' && (
              <div className="animate-fade-in">
                <h2 className="text-base font-bold mb-4" style={{ color: 'hsl(var(--ok-text))' }}>Плейлисты</h2>
                <div className="grid grid-cols-2 gap-3">
                  {['Моя волна', 'Русский рок 90-х', 'Хиты для настроения', 'Вечерняя прогулка'].map((name, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-[hsl(var(--ok-hover))] transition-colors text-left"
                      onClick={() => handlePlay(TRACKS[i % TRACKS.length])}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={TRACKS[i].cover} alt={name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'hsl(var(--ok-text))' }}>{name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--ok-text-secondary))' }}>{15 + i * 7} треков</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {section === 'new' && (
              <div className="animate-fade-in">
                <OKTrackList
                  tracks={[...TRACKS].reverse()}
                  currentId={currentTrack?.id ?? null}
                  isPlaying={isPlaying}
                  onPlay={handlePlay}
                  title="Новинки"
                />
              </div>
            )}

          </div>
        </main>
      </div>

      <OKPlayer
        track={currentTrack}
        isPlaying={isPlaying}
        tracks={TRACKS}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}

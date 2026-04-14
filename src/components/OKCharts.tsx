import Icon from '@/components/ui/icon';
import { CHARTS, PLAYLISTS } from '@/data/tracks';

interface Props {
  onPlayChart: (title: string, artist: string) => void;
}

export default function OKCharts({ onPlayChart }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Чарты */}
      <section>
        <h2 className="text-base font-bold mb-4" style={{ color: 'hsl(var(--ok-text))' }}>Чарты ОК Музыки</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CHARTS.map((item, i) => (
            <button
              key={i}
              className="group relative rounded-xl overflow-hidden text-left transition-transform hover:scale-[1.02]"
              onClick={() => onPlayChart(item.title, item.artist)}
            >
              <div className="aspect-square relative">
                <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end">
                  <div className="p-2.5 w-full">
                    <p className="text-white text-xs font-bold truncate">{item.title}</p>
                    <p className="text-white/70 text-xs truncate">{item.artist}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'hsl(var(--ok-orange))' }}
                  >
                    <Icon name="Play" size={14} className="text-white ml-0.5" />
                  </div>
                </div>
                <div
                  className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'hsl(var(--ok-orange))' }}
                >
                  {i + 1}
                </div>
                <div className="absolute bottom-8 right-2 text-white/70 text-[10px]">{item.plays}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Плейлисты */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold" style={{ color: 'hsl(var(--ok-text))' }}>Плейлисты для вас</h2>
          <button className="text-sm font-medium" style={{ color: 'hsl(var(--ok-orange))' }}>Все плейлисты</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PLAYLISTS.map(pl => (
            <button key={pl.id} className="group text-left rounded-xl overflow-hidden hover:bg-[hsl(var(--ok-hover))] p-2 transition-colors">
              <div className="aspect-square rounded-lg overflow-hidden mb-2 relative">
                <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'hsl(var(--ok-orange))' }}
                  >
                    <Icon name="Play" size={18} className="text-white ml-0.5" />
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold truncate" style={{ color: 'hsl(var(--ok-text))' }}>{pl.name}</p>
              <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--ok-text-secondary))' }}>{pl.count} треков</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

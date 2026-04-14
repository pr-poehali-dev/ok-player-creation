import Icon from '@/components/ui/icon';

interface Props {
  quality: string;
  speed: number;
  onQualityChange: (q: string) => void;
  onSpeedChange: (s: number) => void;
}

const QUALITIES = ['4K', '1080p', '720p', '480p', '360p'];
const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function SettingsPanel({ quality, speed, onQualityChange, onSpeedChange }: Props) {
  return (
    <div className="flex flex-col h-full bg-card">
      {/* Заголовок */}
      <div className="px-4 py-4 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2">
          <Icon name="Settings" size={18} className="text-[hsl(var(--neon))]" />
          <h3 className="font-oswald font-semibold tracking-wider text-sm uppercase text-foreground">
            Настройки
          </h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Качество */}
        <div>
          <p className="text-xs font-oswald tracking-wider uppercase mb-3" style={{ color: 'hsl(215 15% 50%)' }}>
            Качество видео
          </p>
          <div className="space-y-1">
            {QUALITIES.map(q => (
              <button
                key={q}
                onClick={() => onQualityChange(q)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150"
                style={{
                  background: quality === q ? 'hsl(var(--neon) / 0.1)' : 'hsl(var(--secondary))',
                  border: quality === q ? '1px solid hsl(var(--neon) / 0.4)' : '1px solid transparent',
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: quality === q ? 'hsl(var(--neon))' : 'hsl(210 20% 75%)' }}
                >
                  {q}
                </span>
                {quality === q && (
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: 'hsl(var(--neon))' }}
                  >
                    <Icon name="Check" size={10} className="text-black" />
                  </div>
                )}
                {q === '4K' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-oswald" style={{ background: 'hsl(320 70% 50% / 0.2)', color: 'hsl(320 80% 65%)' }}>
                    Ultra HD
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Скорость */}
        <div>
          <p className="text-xs font-oswald tracking-wider uppercase mb-3" style={{ color: 'hsl(215 15% 50%)' }}>
            Скорость воспроизведения
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {SPEEDS.map(s => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className="py-2 rounded-lg text-xs font-oswald font-semibold transition-all duration-150"
                style={{
                  background: speed === s ? 'hsl(var(--neon) / 0.15)' : 'hsl(var(--secondary))',
                  border: speed === s ? '1px solid hsl(var(--neon) / 0.5)' : '1px solid transparent',
                  color: speed === s ? 'hsl(var(--neon))' : 'hsl(210 20% 65%)',
                  boxShadow: speed === s ? '0 0 8px hsl(var(--neon) / 0.2)' : 'none',
                }}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>

        {/* Горячие клавиши */}
        <div>
          <p className="text-xs font-oswald tracking-wider uppercase mb-3" style={{ color: 'hsl(215 15% 50%)' }}>
            Горячие клавиши
          </p>
          <div className="space-y-2">
            {[
              { key: 'Пробел', action: 'Пауза / Воспроизведение' },
              { key: 'F', action: 'Полный экран' },
              { key: '← →', action: 'Перемотка ±10 сек' },
              { key: '↑ ↓', action: 'Громкость ±10%' },
            ].map(({ key, action }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'hsl(210 20% 60%)' }}>{action}</span>
                <span
                  className="text-[11px] font-oswald px-2 py-0.5 rounded"
                  style={{ background: 'hsl(220 12% 16%)', color: 'hsl(var(--neon))', border: '1px solid hsl(var(--neon) / 0.2)' }}
                >
                  {key}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

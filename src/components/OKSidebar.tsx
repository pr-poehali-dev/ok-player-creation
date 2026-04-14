import Icon from '@/components/ui/icon';

type Section = 'feed' | 'my' | 'playlists' | 'charts' | 'new' | 'liked';

interface Props {
  active: Section;
  onChange: (s: Section) => void;
}

const ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: 'feed', label: 'Главная', icon: 'Home' },
  { id: 'my', label: 'Моя музыка', icon: 'Music' },
  { id: 'liked', label: 'Мне нравится', icon: 'Heart' },
  { id: 'playlists', label: 'Плейлисты', icon: 'ListMusic' },
  { id: 'charts', label: 'Чарты', icon: 'TrendingUp' },
  { id: 'new', label: 'Новинки', icon: 'Sparkles' },
];

export default function OKSidebar({ active, onChange }: Props) {
  return (
    <aside
      className="w-56 flex-shrink-0 bg-white border-r overflow-y-auto flex flex-col py-3"
      style={{ borderColor: 'hsl(var(--border))' }}
    >
      <nav className="flex flex-col gap-0.5 px-2">
        {ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-150 ${
              active === item.id ? 'text-[hsl(var(--ok-orange))] bg-[hsl(var(--ok-active))]' : 'text-[hsl(var(--ok-text))] hover:bg-[hsl(var(--ok-hover))]'
            }`}
          >
            <Icon
              name={item.icon}
              size={18}
              style={{ color: active === item.id ? 'hsl(var(--ok-orange))' : 'hsl(var(--ok-text-secondary))' } as React.CSSProperties}
            />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Разделитель */}
      <div className="my-3 mx-4 border-t" style={{ borderColor: 'hsl(var(--border))' }} />

      {/* Недавние плейлисты */}
      <div className="px-4 mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--ok-text-secondary))' }}>
          Недавние
        </p>
        {['Русский рок 90-х', 'Хиты для настроения', 'Моя волна'].map(name => (
          <button
            key={name}
            className="w-full text-left text-sm py-1.5 px-2 rounded-md hover:bg-[hsl(var(--ok-hover))] truncate transition-colors"
            style={{ color: 'hsl(var(--ok-text))' }}
          >
            {name}
          </button>
        ))}
      </div>
    </aside>
  );
}

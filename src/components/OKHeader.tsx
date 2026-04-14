import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function OKHeader() {
  const [search, setSearch] = useState('');

  return (
    <header
      className="flex-shrink-0 flex items-center gap-4 px-4 h-14 border-b bg-white"
      style={{ borderColor: 'hsl(var(--border))' }}
    >
      {/* Логотип ОК */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'hsl(var(--ok-orange))' }}
        >
          ОК
        </div>
        <span className="font-bold text-base" style={{ color: 'hsl(var(--ok-orange))' }}>Музыка</span>
      </div>

      {/* Поиск */}
      <div
        className="flex items-center gap-2 flex-1 max-w-lg px-3 py-2 rounded-full"
        style={{ background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}
      >
        <Icon name="Search" size={15} className="flex-shrink-0" style={{ color: 'hsl(var(--ok-text-secondary))' } as React.CSSProperties} />
        <input
          type="text"
          placeholder="Исполнитель, трек или альбом"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: 'hsl(var(--ok-text))' }}
        />
        {search && (
          <button onClick={() => setSearch('')}>
            <Icon name="X" size={14} style={{ color: 'hsl(var(--ok-text-secondary))' } as React.CSSProperties} />
          </button>
        )}
      </div>

      <div className="flex-1" />

      {/* Юзер */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ background: 'hsl(0 0% 75%)' }}
        >
          АП
        </div>
        <span className="text-sm font-medium hidden sm:block" style={{ color: 'hsl(var(--ok-text))' }}>
          Алексей П.
        </span>
      </div>
    </header>
  );
}

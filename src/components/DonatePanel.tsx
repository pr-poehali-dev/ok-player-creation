import { useState } from 'react';
import Icon from '@/components/ui/icon';

const AMOUNTS = [50, 100, 250, 500, 1000];

export default function DonatePanel() {
  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const finalAmount = custom ? parseInt(custom) || 0 : selected;

  const handleSend = () => {
    if (!finalAmount || finalAmount <= 0) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setName('');
    setMessage('');
    setCustom('');
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Заголовок */}
      <div className="px-4 py-4 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2">
          <Icon name="Heart" size={18} style={{ color: 'hsl(320 80% 60%)' }} />
          <h3 className="font-oswald font-semibold tracking-wider text-sm uppercase text-foreground">
            Поддержать автора
          </h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {sent ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 animate-fade-in">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'hsl(320 80% 60% / 0.15)', border: '2px solid hsl(320 80% 60% / 0.5)' }}
            >
              <Icon name="Heart" size={32} style={{ color: 'hsl(320 80% 65%)' }} />
            </div>
            <div className="text-center">
              <p className="font-oswald font-bold text-lg" style={{ color: 'hsl(320 80% 65%)' }}>
                Спасибо!
              </p>
              <p className="text-sm mt-1" style={{ color: 'hsl(210 20% 60%)' }}>
                Донат отправлен автору
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Описание */}
            <div
              className="rounded-xl p-3 text-center"
              style={{
                background: 'linear-gradient(135deg, hsl(320 80% 50% / 0.08), hsl(var(--neon) / 0.05))',
                border: '1px solid hsl(320 80% 50% / 0.2)',
              }}
            >
              <p className="text-xs leading-relaxed" style={{ color: 'hsl(210 20% 65%)' }}>
                Поддержите создателей контента. Ваш донат мотивирует делать больше крутых видео!
              </p>
            </div>

            {/* Сумма */}
            <div>
              <p className="text-xs font-oswald tracking-wider uppercase mb-2" style={{ color: 'hsl(215 15% 50%)' }}>
                Сумма (₽)
              </p>
              <div className="grid grid-cols-5 gap-1.5 mb-2">
                {AMOUNTS.map(a => (
                  <button
                    key={a}
                    onClick={() => { setSelected(a); setCustom(''); }}
                    className="py-2 rounded-lg text-xs font-oswald font-bold transition-all duration-150"
                    style={{
                      background: selected === a && !custom ? 'hsl(320 80% 50% / 0.15)' : 'hsl(var(--secondary))',
                      border: selected === a && !custom ? '1px solid hsl(320 80% 60% / 0.5)' : '1px solid transparent',
                      color: selected === a && !custom ? 'hsl(320 80% 65%)' : 'hsl(210 20% 65%)',
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Другая сумма..."
                value={custom}
                onChange={e => { setCustom(e.target.value); setSelected(null); }}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: 'hsl(var(--secondary))',
                  border: custom ? '1px solid hsl(320 80% 60% / 0.4)' : '1px solid hsl(var(--border))',
                  color: 'hsl(210 20% 88%)',
                }}
              />
            </div>

            {/* Имя */}
            <div>
              <p className="text-xs font-oswald tracking-wider uppercase mb-2" style={{ color: 'hsl(215 15% 50%)' }}>
                Ваше имя
              </p>
              <input
                type="text"
                placeholder="Аноним"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: 'hsl(var(--secondary))',
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(210 20% 88%)',
                }}
              />
            </div>

            {/* Сообщение */}
            <div>
              <p className="text-xs font-oswald tracking-wider uppercase mb-2" style={{ color: 'hsl(215 15% 50%)' }}>
                Сообщение
              </p>
              <textarea
                placeholder="Ваше сообщение автору..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none transition-all"
                style={{
                  background: 'hsl(var(--secondary))',
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(210 20% 88%)',
                }}
              />
            </div>

            {/* Кнопка */}
            <button
              onClick={handleSend}
              disabled={!finalAmount || finalAmount <= 0}
              className="w-full py-3 rounded-xl font-oswald font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: finalAmount && finalAmount > 0
                  ? 'linear-gradient(135deg, hsl(320 80% 50%), hsl(320 70% 40%))'
                  : 'hsl(220 12% 20%)',
                color: finalAmount && finalAmount > 0 ? 'white' : 'hsl(215 15% 40%)',
                boxShadow: finalAmount && finalAmount > 0 ? '0 0 20px hsl(320 80% 50% / 0.3)' : 'none',
              }}
            >
              <Icon name="Heart" size={16} />
              Отправить {finalAmount ? `${finalAmount} ₽` : ''}
            </button>

            {/* Методы оплаты */}
            <div className="flex items-center justify-center gap-3 pt-1">
              {['💳', '🏦', '📱'].map((icon, i) => (
                <span key={i} className="text-lg opacity-50">{icon}</span>
              ))}
              <span className="text-xs" style={{ color: 'hsl(215 15% 40%)' }}>Visa, СБП, ЮMoney</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

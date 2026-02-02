import { useState, useEffect } from 'react';
import { formatLarge } from '../utils/numbers';

export function Header({ money, gold, megaBucks, buyMultiplier, setBuyMultiplier, warps, dealEndTime }) {
  const [dealTimeLeft, setDealTimeLeft] = useState(Math.max(0, dealEndTime - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setDealTimeLeft((prev) => Math.max(0, dealEndTime - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [dealEndTime]);

  const formatTime = (ms) => {
    if (ms <= 0) return '00:00:00';
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / 60000) % 60;
    const h = Math.floor(ms / 3600000);
    return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="game-title">Coin Bloom</h1>
        <span className="primary-currency">${formatLarge(money)}</span>
      </div>
      <div className="header-right">
        <div className="currency gold">
          <span className="icon">🥇</span>
          <span>{gold}</span>
        </div>
        <div className="currency megabucks">
          <span className="icon">💰</span>
          <span>{megaBucks}</span>
          <button type="button" className="multiplier-btn" title="Mega Bucks">x777.77</button>
        </div>
        <div className="buy-multipliers">
          <button
            type="button"
            className={buyMultiplier === 1 ? 'active' : ''}
            onClick={() => setBuyMultiplier(1)}
          >
            Buy x1
          </button>
          <button
            type="button"
            className={buyMultiplier === 2 ? 'active' : ''}
            onClick={() => setBuyMultiplier(2)}
          >
            Buy x2
          </button>
        </div>
        <div className="warps">
          <span className="icon">⏱️</span>
          <span>{warps} Warps</span>
        </div>
        <div className="deal">
          <span className="icon">🎁</span>
          <span>Deal!</span>
          <span className="deal-timer">{formatTime(dealTimeLeft)}</span>
        </div>
      </div>
    </header>
  );
}

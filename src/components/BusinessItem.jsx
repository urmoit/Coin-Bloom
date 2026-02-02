import { useState, useEffect } from 'react';
import { formatLarge } from '../utils/numbers';

export function BusinessItem({
  business,
  owned,
  production,
  cost,
  canBuy,
  buyMultiplier,
  onBuy,
  hasManager,
  onCollect,
  pendingBuilds,
  cycleProgress,
  secondsUntilClick,
  canClickNow,
  cycleTimeSec,
  lastPop,
  milestoneMultiplierValue,
}) {
  const [now, setNow] = useState(Date.now());
  const [iconBounce, setIconBounce] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, []);

  const nextComplete =
    pendingBuilds.length > 0
      ? Math.min(...pendingBuilds.map((p) => p.completesAt))
      : null;
  const buildSecondsLeft =
    nextComplete != null ? Math.max(0, (nextComplete - now) / 1000) : null;

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const manual = !hasManager && owned > 0;
  const ready = manual && canClickNow;
  const progress = cycleProgress;
  const waitingSec = secondsUntilClick;

  const handleCollect = () => {
    if (!ready) return;
    setIconBounce(true);
    setTimeout(() => setIconBounce(false), 200);
    onCollect(business.id);
  };

  return (
    <div className="business-item">
      <div
        className={`business-icon ${manual ? 'clickable' : ''} ${iconBounce ? 'bounce' : ''} ${ready ? 'ready' : ''}`}
        onClick={manual ? handleCollect : undefined}
        role={manual ? 'button' : undefined}
        tabIndex={manual ? 0 : undefined}
        onKeyDown={(e) => manual && e.key === 'Enter' && handleCollect()}
      >
        {business.icon}
      </div>
      <div className="business-info">
        <div className="business-name">{business.name}</div>
        <div className="business-base-cost">
          Base cost: {business.baseCost.toLocaleString()} · Cycle: {cycleTimeSec}s
        </div>
        <div className="business-production">
          {formatLarge(production)} /sec
          {hasManager && <span className="auto-badge"> auto</span>}
          {milestoneMultiplierValue > 1 && (
            <span className="milestone-badge">×{milestoneMultiplierValue.toFixed(2)}</span>
          )}
        </div>
        {manual && (
          <>
            <div className="progress-bar-wrap">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="cycle-timer">
              {ready ? (
                <span className="ready-text">Ready! Click to collect</span>
              ) : (
                <span className="wait-text">
                  Next in {formatTimer(waitingSec)}
                </span>
              )}
            </div>
          </>
        )}
        <button
          type="button"
          className="business-buy-btn"
          disabled={!canBuy}
          onClick={() => onBuy(business.id, buyMultiplier)}
        >
          Buy x{buyMultiplier}
        </button>
        <div className="business-next-cost">{formatLarge(cost)}</div>
        <div className="business-timer">
          {buildSecondsLeft != null
            ? `Building... ${formatTimer(buildSecondsLeft)}`
            : '—'}
        </div>
        {pendingBuilds.length > 1 && (
          <div className="pending-count">+{pendingBuilds.length} in queue</div>
        )}
      </div>
      {lastPop && lastPop.id === business.id && (
        <div className="collect-pop" key={lastPop.key}>
          +{formatLarge(lastPop.amount)}
        </div>
      )}
    </div>
  );
}

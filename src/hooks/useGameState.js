import { useState, useEffect, useCallback } from 'react';
import { BUSINESSES } from '../data/businesses';
import {
  costForCount,
  totalProductionPerSecond,
  milestoneMultiplier,
  add,
  gte,
} from '../utils/numbers';

const TICK_MS = 100;
const BUILD_BASE_SEC = 8;

function initialBusinessState() {
  const firstId = BUSINESSES[0]?.id;
  return BUSINESSES.reduce((acc, b) => {
    acc[b.id] = { owned: b.id === firstId ? 1 : 0 };
    return acc;
  }, {});
}

function initialManagers() {
  return BUSINESSES.reduce((acc, b) => {
    acc[b.id] = false;
    return acc;
  }, {});
}

function initialLastCollectAt() {
  return {};
}

export function useGameState() {
  const [money, setMoney] = useState(0);
  const [gold, setGold] = useState(0);
  const [megaBucks, setMegaBucks] = useState(0);
  const [buyMultiplier, setBuyMultiplier] = useState(1);
  const [warps, setWarps] = useState(0);
  const [businesses, setBusinesses] = useState(initialBusinessState);
  const [managers, setManagers] = useState(initialManagers);
  const [lastCollectAt, setLastCollectAt] = useState(initialLastCollectAt);
  const [pendingBuilds, setPendingBuilds] = useState([]);
  const [activeTab, setActiveTab] = useState('garden');
  const [dealEndTime] = useState(() => Date.now() + 2 * 60 * 60 * 1000);
  const [collectPops, setCollectPops] = useState([]); // [{ id, amount, key }] for animation

  const totalPerSecond = BUSINESSES.reduce((sum, b) => {
    if (!managers[b.id]) return sum;
    const owned = businesses[b.id]?.owned ?? 0;
    const base = totalProductionPerSecond(b.baseProduction, owned);
    const milestone = milestoneMultiplier(owned);
    return sum + base * milestone;
  }, 0);

  const tick = useCallback(() => {
    setMoney((m) => add(m, (totalPerSecond * TICK_MS) / 1000));
  }, [totalPerSecond]);

  useEffect(() => {
    const id = setInterval(tick, TICK_MS);
    return () => clearInterval(id);
  }, [tick]);

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      setPendingBuilds((prev) => {
        const stillPending = [];
        const toAdd = {};
        for (const { businessId, completesAt } of prev) {
          if (completesAt <= now) {
            toAdd[businessId] = (toAdd[businessId] ?? 0) + 1;
          } else {
            stillPending.push({ businessId, completesAt });
          }
        }
        if (Object.keys(toAdd).length === 0) return prev;
        setBusinesses((bPrev) => {
          const next = { ...bPrev };
          for (const [id, count] of Object.entries(toAdd)) {
            next[id] = { ...next[id], owned: (next[id]?.owned ?? 0) + count };
          }
          return next;
        });
        return stillPending;
      });
    }, 200);
    return () => clearInterval(id);
  }, []);

  const getCost = useCallback((businessId, count = 1) => {
    const b = BUSINESSES.find((x) => x.id === businessId);
    if (!b) return Infinity;
    const owned = businesses[businessId]?.owned ?? 0;
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += costForCount(b.baseCost, owned + i);
    }
    return total;
  }, [businesses]);

  const canBuy = useCallback((businessId, count = 1) => {
    return gte(money, getCost(businessId, count));
  }, [money, getCost]);

  const buyBusiness = useCallback((businessId, count = 1) => {
    const cost = getCost(businessId, count);
    if (!gte(money, cost)) return;
    setMoney((m) => m - cost);
    const b = BUSINESSES.find((x) => x.id === businessId);
    const owned = businesses[businessId]?.owned ?? 0;
    const newBuilds = [];
    let t = Date.now();
    const buildSecBase = BUILD_BASE_SEC + (b ? Math.min(b.cycleTimeSec, 15) : 8);
    for (let i = 0; i < count; i++) {
      const sec = buildSecBase + owned + i;
      t += sec * 1000;
      newBuilds.push({ businessId, completesAt: t });
    }
    setPendingBuilds((prev) => [...prev, ...newBuilds]);
  }, [money, getCost, businesses]);

  const getCycleProgress = useCallback(
    (businessId) => {
      const b = BUSINESSES.find((x) => x.id === businessId);
      if (!b) return 1;
      const cycleMs = b.cycleTimeSec * 1000;
      const last = lastCollectAt[businessId] ?? 0;
      const elapsed = Date.now() - last;
      if (elapsed >= cycleMs) return 1;
      return Math.min(1, elapsed / cycleMs);
    },
    [lastCollectAt]
  );

  const getSecondsUntilClick = useCallback(
    (businessId) => {
      const b = BUSINESSES.find((x) => x.id === businessId);
      if (!b) return 0;
      const cycleMs = b.cycleTimeSec * 1000;
      const last = lastCollectAt[businessId] ?? 0;
      const elapsed = Date.now() - last;
      if (elapsed >= cycleMs) return 0;
      return Math.max(0, (cycleMs - elapsed) / 1000);
    },
    [lastCollectAt]
  );

  const canClickNow = useCallback(
    (businessId) => {
      const owned = businesses[businessId]?.owned ?? 0;
      if (owned <= 0) return false;
      const b = BUSINESSES.find((x) => x.id === businessId);
      if (!b) return false;
      const cycleMs = b.cycleTimeSec * 1000;
      const last = lastCollectAt[businessId] ?? 0;
      return Date.now() - last >= cycleMs;
    },
    [lastCollectAt, businesses]
  );

  const clickBusiness = useCallback(
    (businessId) => {
      if (managers[businessId]) return;
      const b = BUSINESSES.find((x) => x.id === businessId);
      if (!b) return;
      const owned = businesses[businessId]?.owned ?? 0;
      if (owned <= 0) return;
      if (!canClickNow(businessId)) return;
      const base = totalProductionPerSecond(b.baseProduction, owned);
      const milestone = milestoneMultiplier(owned);
      const amount = base * milestone;
      setMoney((m) => add(m, amount));
      setLastCollectAt((prev) => ({ ...prev, [businessId]: Date.now() }));
      const popKey = Date.now();
      setCollectPops((prev) => [
        ...prev.slice(-4),
        { id: businessId, amount, key: popKey },
      ]);
      setTimeout(() => {
        setCollectPops((p) => p.filter((x) => x.key !== popKey));
      }, 1800);
    },
    [managers, businesses, canClickNow]
  );

  const productionFor = useCallback(
    (businessId) => {
      const b = BUSINESSES.find((x) => x.id === businessId);
      if (!b) return 0;
      const owned = businesses[businessId]?.owned ?? 0;
      const base = totalProductionPerSecond(b.baseProduction, owned);
      return base * milestoneMultiplier(owned);
    },
    [businesses]
  );

  const hasManager = useCallback((businessId) => managers[businessId] ?? false, [managers]);

  const getManagerCost = useCallback((businessId) => {
    const b = BUSINESSES.find((x) => x.id === businessId);
    return b?.managerCost ?? Infinity;
  }, []);

  const canBuyManager = useCallback(
    (businessId) => {
      if (managers[businessId]) return false;
      return gte(money, getManagerCost(businessId));
    },
    [money, managers, getManagerCost]
  );

  const buyManager = useCallback(
    (businessId) => {
      if (managers[businessId]) return;
      const cost = getManagerCost(businessId);
      if (!gte(money, cost)) return;
      setMoney((m) => m - cost);
      setManagers((prev) => ({ ...prev, [businessId]: true }));
    },
    [money, managers, getManagerCost]
  );

  const getPendingFor = useCallback(
    (businessId) => pendingBuilds.filter((p) => p.businessId === businessId),
    [pendingBuilds]
  );

  const getCycleTimeSec = useCallback((businessId) => {
    const b = BUSINESSES.find((x) => x.id === businessId);
    return b?.cycleTimeSec ?? 1;
  }, []);

  const getLastPopFor = useCallback(
    (businessId) => {
      const forId = collectPops.filter((p) => p.id === businessId);
      return forId.length > 0 ? forId[forId.length - 1] : null;
    },
    [collectPops]
  );

  const getMilestoneMultiplier = useCallback(
    (businessId) => {
      const owned = businesses[businessId]?.owned ?? 0;
      return milestoneMultiplier(owned);
    },
    [businesses]
  );

  return {
    money,
    gold,
    megaBucks,
    buyMultiplier,
    setBuyMultiplier,
    warps,
    businesses,
    managers,
    lastCollectAt,
    pendingBuilds,
    activeTab,
    setActiveTab,
    totalPerSecond,
    getCost,
    canBuy,
    buyBusiness,
    clickBusiness,
    productionFor,
    hasManager,
    getManagerCost,
    canBuyManager,
    buyManager,
    getPendingFor,
    getCycleProgress,
    getSecondsUntilClick,
    canClickNow,
    getCycleTimeSec,
    collectPops,
    getLastPopFor,
    getMilestoneMultiplier,
    dealEndTime,
  };
}

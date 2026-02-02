/**
 * Coin Bloom – ventures (original theme: garden / growth).
 * baseCost: price goes up each buy (cost = baseCost * 1.07^owned).
 * cycleTimeSec: time to wait before you can click again; better ventures = longer cycle.
 * Manager cost = one-time to automate (no clicking).
 */
export const BUSINESSES = [
  { id: 'seed', name: 'Seed Cart', baseCost: 4, baseProduction: 0.8, icon: '🌱', managerCost: 12000, cycleTimeSec: 1 },
  { id: 'flower', name: 'Flower Stall', baseCost: 60, baseProduction: 4, icon: '🌸', managerCost: 48000, cycleTimeSec: 2 },
  { id: 'herb', name: 'Herb Garden', baseCost: 720, baseProduction: 20, icon: '🌿', managerCost: 140000, cycleTimeSec: 4 },
  { id: 'bee', name: 'Beehive', baseCost: 8640, baseProduction: 80, icon: '🐝', managerCost: 420000, cycleTimeSec: 6 },
  { id: 'orchard', name: 'Orchard', baseCost: 103680, baseProduction: 320, icon: '🍎', managerCost: 1200000, cycleTimeSec: 10 },
  { id: 'vineyard', name: 'Vineyard', baseCost: 1244160, baseProduction: 1100, icon: '🍇', managerCost: 3800000, cycleTimeSec: 16 },
  { id: 'greenhouse', name: 'Greenhouse', baseCost: 14929920, baseProduction: 3500, icon: '🪴', managerCost: 11000000, cycleTimeSec: 24 },
  { id: 'nursery', name: 'Tree Nursery', baseCost: 179159040, baseProduction: 12000, icon: '🌳', managerCost: 32000000, cycleTimeSec: 36 },
  { id: 'lab', name: 'Botanical Lab', baseCost: 2149908480, baseProduction: 45000, icon: '🔬', managerCost: 95000000, cycleTimeSec: 52 },
  { id: 'solar', name: 'Solar Bloom', baseCost: 25798901760, baseProduction: 150000, icon: '☀️', managerCost: 280000000, cycleTimeSec: 72 },
];

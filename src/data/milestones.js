/**
 * Milestone thresholds (owned count) – not every 10, staggered like AdCap.
 * Each threshold reached adds a production multiplier (e.g. 1.2x per milestone).
 */
export const MILESTONE_THRESHOLDS = [
  25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
  1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000, 5250, 5500,
];

/** How many milestones are reached at this owned count */
export function milestonesReached(owned, thresholds = MILESTONE_THRESHOLDS) {
  if (owned <= 0) return 0;
  let count = 0;
  for (const t of thresholds) {
    if (owned >= t) count++;
    else break;
  }
  return count;
}

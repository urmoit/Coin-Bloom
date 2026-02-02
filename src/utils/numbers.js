/**
 * Large number handling for idle game (mantissa + exponent).
 * Uses -illion names: million, billion, ... quadragintillion, unquadragintillion, etc.
 */

import { MILESTONE_THRESHOLDS } from '../data/milestones';

const ILLION_NAMES = [
  '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion',
  'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion',
  'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion',
  'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'unvigintillion',
  'duovigintillion', 'trevigintillion', 'quattuorvigintillion', 'quinvigintillion',
  'sexvigintillion', 'septenvigintillion', 'octovigintillion', 'novemvigintillion',
  'trigintillion', 'untrigintillion', 'duotrigintillion', 'tretrigintillion',
  'quattuortrigintillion', 'quintrigintillion', 'sextrigintillion', 'septentrigintillion',
  'octotrigintillion', 'novemtrigintillion', 'quadragintillion', 'unquadragintillion',
  'duoquadragintillion', 'trequadragintillion', 'quattuorquadragintillion',
  'quinquadragintillion', 'sexquadragintillion', 'septenquadragintillion',
  'octoquadragintillion', 'novemquadragintillion', 'quinquagintillion'
];

function getIllionName(exp3) {
  if (exp3 <= 0) return '';
  const idx = Math.min(Math.floor(exp3), ILLION_NAMES.length - 1);
  return ILLION_NAMES[idx] || `10^${exp3 * 3}`;
}

/**
 * Format a large value as "mantissa name" (e.g. "31.002 quattuorquadragintillion")
 */
export function formatLarge(value) {
  if (value === 0) return '0';
  if (value < 0) return '-' + formatLarge(-value);
  if (value < 1000) return value.toFixed(3).replace(/\.?0+$/, '');

  const exp3 = Math.floor(Math.log10(value) / 3);
  const scale = Math.pow(1000, exp3);
  const mantissa = value / scale;
  const name = getIllionName(exp3);
  const str = mantissa >= 100 ? mantissa.toFixed(0) : mantissa.toFixed(3).replace(/\.?0+$/, '');
  return name ? `${str} ${name}` : str;
}

/**
 * Create a large number from mantissa and exponent (value = mantissa * 10^exponent)
 */
export function fromMantissaExponent(mantissa, exponent = 0) {
  if (exponent === 0) return mantissa;
  return mantissa * Math.pow(10, exponent);
}

/**
 * Get exponent (power of 10) of a number
 */
export function getExponent(value) {
  if (value <= 0) return 0;
  return Math.floor(Math.log10(value));
}

/**
 * Add two numbers (handles large values via splitting into mantissa + exponent for display)
 */
export function add(a, b) {
  return a + b;
}

/**
 * Compare a >= b
 */
export function gte(a, b) {
  return a >= b;
}

/**
 * Parse cost from base and count (exponential growth like AdCap)
 * cost = base * multiplier^count
 */
export function costForCount(baseCost, count, multiplier = 1.07) {
  return baseCost * Math.pow(multiplier, count);
}

/**
 * Total production per second from a business with `owned` units.
 * Each unit k produces baseProduction * multiplier^k, so total = baseProduction * (multiplier^owned - 1) / (multiplier - 1).
 */
export function totalProductionPerSecond(baseProduction, owned, multiplier = 1.07) {
  if (owned <= 0) return 0;
  return baseProduction * (Math.pow(multiplier, owned) - 1) / (multiplier - 1);
}

function milestonesReachedCount(owned) {
  if (owned <= 0) return 0;
  let count = 0;
  for (const t of MILESTONE_THRESHOLDS) {
    if (owned >= t) count++;
    else break;
  }
  return count;
}

/**
 * Milestone multiplier from custom thresholds (25, 50, 100, 200, ...).
 * Each threshold reached = 1.2x; stacks (e.g. 2 milestones = 1.44x).
 */
export function milestoneMultiplier(owned) {
  if (owned <= 0) return 1;
  const count = milestonesReachedCount(owned);
  return Math.pow(1.2, count);
}

/** How many milestones are reached at this owned count (for UI). */
export function getMilestonesReached(owned) {
  return milestonesReachedCount(owned);
}

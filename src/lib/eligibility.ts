import { REFILL_INTERVAL_DAYS } from '../data/connection'
import { addDays } from './format'

export function refillEligibility(daysSinceLastRefill: number, today = new Date()) {
  const lastRefill = addDays(today, -daysSinceLastRefill)
  const nextEligible = addDays(lastRefill, REFILL_INTERVAL_DAYS)
  return {
    eligible: daysSinceLastRefill >= REFILL_INTERVAL_DAYS,
    lastRefill,
    nextEligible,
  }
}

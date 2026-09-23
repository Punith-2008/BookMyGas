import type { Segment } from '../data/cylinders'

const digits = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')

/** Household: BMG-2026-XXXXX. Business bulk orders: BMG-B-2026-XXXXX. */
export const generateBookingRef = (segment: Segment = 'household') =>
  segment === 'business' ? `BMG-B-2026-${digits(5)}` : `BMG-2026-${digits(5)}`

export const generateDac = () => String(1000 + Math.floor(Math.random() * 9000))

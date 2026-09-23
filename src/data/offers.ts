export const DEMO_OFFER = { code: 'FIRSTREFILL', discount: 25, label: 'First booking on BookMyGas' }

/** Illustrative volume discounts on bulk commercial orders (subject to distributor / IOCL policy). */
export const VOLUME_TIERS = [
  { minQty: 10, pct: 0.02 },
  { minQty: 25, pct: 0.04 },
  { minQty: 50, pct: 0.06 },
] as const

export function volumeTier(totalQty: number) {
  const current = [...VOLUME_TIERS].reverse().find((t) => totalQty >= t.minQty) ?? null
  const next = VOLUME_TIERS.find((t) => totalQty < t.minQty) ?? null
  return { current, next }
}

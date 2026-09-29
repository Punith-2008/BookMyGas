import { Minus, Plus, TrendingDown } from 'lucide-react'
import { CylinderIllustration } from '../brand/CylinderIllustration'
import { BUSINESS_CYLINDERS } from '../../data/cylinders'
import { VOLUME_TIERS } from '../../data/offers'
import { priceBreakdown, type BookingDispatch, type BookingState } from '../../hooks/useBooking'
import { formatINR } from '../../lib/format'
import { AnimatedINR } from '../ui/AnimatedNumber'

const QUICK_PICKS = [5, 10, 25, 50]

export function StepBulkOrder({ state, dispatch }: { state: BookingState; dispatch: BookingDispatch }) {
  const price = priceBreakdown(state)
  const { current, next } = price.tier

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold">Bulk order</h2>
        <p className="text-sm text-slate-500">Mix cylinder types in one order. IOCL MRP, Hyderabad, incl. 18% GST.</p>
      </div>

      {BUSINESS_CYLINDERS.map((c) => {
        const qty = state.bulk[c.id] ?? 0
        const set = (value: number) => dispatch({ type: 'setBulkQty', cylinder: c.id, qty: value })
        return (
          <div key={c.id} className={`rounded-2xl bg-white p-4 shadow-card ${qty > 0 ? 'ring-2 ring-flame-500' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-10 shrink-0 items-end justify-center">
                <CylinderIllustration variant={c.look} className="h-auto max-h-16 w-9" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.name}</p>
                <p className="text-xs text-slate-500">{formatINR(c.price)}* each</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label={`Fewer ${c.name}`}
                  disabled={qty <= 0}
                  onClick={() => set(qty - 1)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={c.maxQty.bulk}
                  value={qty}
                  onChange={(e) => set(Number(e.target.value))}
                  aria-label={`${c.name} quantity`}
                  className="h-8 w-12 rounded-lg border border-navy-900/10 text-center font-heading text-sm font-bold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  aria-label={`More ${c.name}`}
                  disabled={qty >= c.maxQty.bulk}
                  onClick={() => set(qty + 1)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-flame-500 text-white disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {QUICK_PICKS.filter((n) => n <= c.maxQty.bulk).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => set(n)}
                  aria-pressed={qty === n}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    qty === n ? 'bg-navy-900 text-white' : 'bg-slate-100 text-navy-900 hover:bg-flame-100'
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="ml-auto self-center text-[0.65rem] text-slate-400">Max {c.maxQty.bulk}</span>
            </div>
          </div>
        )
      })}

      {/* volume discount tiers */}
      <div className="rounded-2xl bg-mint-100/60 p-4">
        <p className="flex items-center gap-1.5 text-sm font-bold text-mint-600">
          <TrendingDown className="h-4 w-4" />
          {current ? `${Math.round(current.pct * 100)}% volume discount unlocked` : 'Volume discounts'}
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {VOLUME_TIERS.map((t) => {
            const reached = price.totalQty >= t.minQty
            return (
              <div
                key={t.minQty}
                className={`rounded-xl px-2 py-1.5 text-center text-xs ${reached ? 'bg-mint-500 font-bold text-white' : 'bg-white text-slate-500'}`}
              >
                {t.minQty}+ cyl · {Math.round(t.pct * 100)}% off
              </div>
            )
          })}
        </div>
        {next && (
          <p className="mt-2 text-xs text-slate-600">
            Add {next.minQty - price.totalQty} more to unlock {Math.round(next.pct * 100)}% off.
          </p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-navy-900 px-4 py-3 text-white">
        <span className="text-sm text-white/70">
          {price.totalQty} cylinder{price.totalQty === 1 ? '' : 's'}
        </span>
        <AnimatedINR value={price.total} className="font-heading text-xl font-extrabold" />
      </div>
      <p className="text-[0.65rem] text-slate-400">
        *IOCL MRP for Hyderabad, September 2026. Volume discounts are illustrative and vary by distributor.
      </p>
    </div>
  )
}

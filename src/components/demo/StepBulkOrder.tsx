import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, TrendingDown } from 'lucide-react'
import { CylinderIllustration } from '../brand/CylinderIllustration'
import { BUSINESS_CYLINDERS, CYLINDER_GROUPS, type Cylinder } from '../../data/cylinders'
import { VOLUME_TIERS } from '../../data/offers'
import { priceBreakdown, type BookingDispatch, type BookingState } from '../../hooks/useBooking'
import { formatINR } from '../../lib/format'
import { AnimatedINR } from '../ui/AnimatedNumber'

const QUICK_PICKS = [5, 10, 25, 50]

/** Instamart-style cart control: a bordered ADD button that turns into a − qty + stepper. */
function AddStepper({ cylinder, qty, set }: { cylinder: Cylinder; qty: number; set: (value: number) => void }) {
  return (
    <div className="relative h-9 w-[92px] shrink-0">
      <AnimatePresence initial={false} mode="popLayout">
        {qty === 0 ? (
          <motion.button
            key="add"
            type="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => set(1)}
            aria-label={`Add ${cylinder.name}`}
            className="absolute inset-0 rounded-xl border-2 border-flame-500 bg-white font-heading text-sm font-extrabold tracking-wide text-flame-600 shadow-card transition hover:bg-flame-50"
          >
            ADD
          </motion.button>
        ) : (
          <motion.div
            key="stepper"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-between rounded-xl bg-flame-500 text-white shadow-card"
          >
            <button type="button" aria-label={`Fewer ${cylinder.name}`} onClick={() => set(qty - 1)} className="grid h-full w-7 place-items-center">
              <Minus className="h-4 w-4" strokeWidth={3} />
            </button>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={qty}
              onChange={(e) => set(Number(e.target.value))}
              aria-label={`${cylinder.name} quantity`}
              className="w-9 bg-transparent text-center font-heading text-sm font-extrabold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button type="button" aria-label={`More ${cylinder.name}`} onClick={() => set(qty + 1)} className="grid h-full w-7 place-items-center">
              <Plus className="h-4 w-4" strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function StepBulkOrder({ state, dispatch }: { state: BookingState; dispatch: BookingDispatch }) {
  const price = priceBreakdown(state)
  const { current, next } = price.tier

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold">Bulk order</h2>
        <p className="text-sm text-slate-500">Mix any Indane cylinder in one order. IOCL MRP, Hyderabad, incl. GST.</p>
      </div>

      {CYLINDER_GROUPS.map((group) => (
        <section key={group} className="space-y-2">
          <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">{group}</h3>
          {BUSINESS_CYLINDERS.filter((c) => c.group === group).map((c) => {
            const qty = state.bulk[c.id] ?? 0
            const set = (value: number) => dispatch({ type: 'setBulkQty', cylinder: c.id, qty: value })
            return (
              <div key={c.id} className={`rounded-2xl bg-white p-3 shadow-card transition ${qty > 0 ? 'ring-2 ring-flame-500' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-14 shrink-0 items-end justify-center rounded-xl bg-slate-50 pb-1">
                    <CylinderIllustration variant={c.look} className="h-auto max-h-14 w-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[0.6rem] font-bold text-slate-500">
                      {c.weight}
                      {c.nc ? ' · NC' : ''}
                    </span>
                    <p className="mt-0.5 text-sm font-bold leading-tight">{c.name}</p>
                    <p className="mt-0.5 font-heading text-sm font-extrabold">{formatINR(c.price)}</p>
                  </div>
                  <AddStepper cylinder={c} qty={qty} set={set} />
                </div>
                <div className="mt-2.5 border-t border-dashed border-navy-900/10 pt-2">
                  <p className="text-[0.65rem] font-semibold text-slate-500">No. of cylinders</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {QUICK_PICKS.map((n) => (
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
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      ))}

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
      <p className="text-[0.65rem] text-slate-400">IOCL MRP for Hyderabad, September 2026. Volume discounts are illustrative and vary by distributor.</p>
    </div>
  )
}

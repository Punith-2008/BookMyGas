import { Minus, Plus } from 'lucide-react'
import { CylinderIllustration } from '../brand/CylinderIllustration'
import { CYLINDERS, getCylinder } from '../../data/cylinders'
import { SAMPLE_CONNECTION } from '../../data/connection'
import { priceBreakdown, type BookingDispatch, type BookingState } from '../../hooks/useBooking'
import { formatINR } from '../../lib/format'
import { AnimatedINR } from '../ui/AnimatedNumber'

interface StepCylinderProps {
  state: BookingState
  dispatch: BookingDispatch
  maxQty: number
}

export function StepCylinder({ state, dispatch, maxQty }: StepCylinderProps) {
  const price = priceBreakdown(state)
  const selected = getCylinder(state.cylinder)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold">Choose cylinder</h2>
        <p className="text-sm text-slate-500">Illustrative RSP, incl. GST</p>
      </div>

      <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Cylinder type">
        {CYLINDERS.map((c) => {
          const active = c.id === state.cylinder
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => dispatch({ type: 'setCylinder', cylinder: c.id })}
              className={`relative flex flex-col items-center rounded-2xl p-3 text-center transition ${
                active ? 'bg-flame-50 ring-2 ring-flame-500' : 'bg-white shadow-card hover:ring-1 hover:ring-flame-200'
              }`}
            >
              <div className="flex h-20 items-end">
                <CylinderIllustration variant={c.id} className="h-auto w-10" />
              </div>
              <span className="mt-2 text-xs font-bold leading-tight">{c.name}</span>
              <span className="mt-0.5 text-sm font-extrabold text-flame-600">{formatINR(c.price)}*</span>
              {c.id === 'domestic14' && (
                <span className="absolute -right-1 -top-2 rotate-6 rounded-md border-2 border-white bg-amber-400 px-1.5 py-0.5 text-[0.55rem] font-extrabold shadow-sticker">
                  Most booked
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card">
        <div>
          <p className="text-sm font-bold">Quantity</p>
          <p className="text-xs text-slate-500">
            Max {maxQty} for {selected.category === 'Commercial' ? 'commercial' : SAMPLE_CONNECTION.connectionType}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={state.qty <= 1}
            onClick={() => dispatch({ type: 'setQty', qty: state.qty - 1 })}
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-4 text-center font-heading text-lg font-bold" aria-live="polite">
            {state.qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={state.qty >= maxQty}
            onClick={() => dispatch({ type: 'setQty', qty: state.qty + 1 })}
            className="grid h-9 w-9 place-items-center rounded-full bg-flame-500 text-white disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-navy-900 px-4 py-3 text-white">
        <span className="text-sm text-white/70">Refill amount</span>
        <AnimatedINR value={price.subtotal} className="font-heading text-xl font-extrabold" />
      </div>
      <p className="text-[0.65rem] text-slate-400">*Illustrative prices. Actual RSP varies by city and month.</p>
    </div>
  )
}

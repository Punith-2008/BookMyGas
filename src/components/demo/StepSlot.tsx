import { useMemo } from 'react'
import { Moon, Sun, Sunrise } from 'lucide-react'
import type { BookingDispatch, BookingState } from '../../hooks/useBooking'
import { isFillingFast, nextDates, TIME_SLOTS } from '../../lib/slots'

const SLOT_ICON = { morning: Sunrise, afternoon: Sun, evening: Moon }

export function StepSlot({ state, dispatch }: { state: BookingState; dispatch: BookingDispatch }) {
  const dates = useMemo(() => nextDates(), [])

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold">Delivery slot</h2>
        <p className="text-sm text-slate-500">Pick a day and a time window</p>
      </div>

      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Delivery date">
        {dates.map((d, i) => {
          const active = state.dateIndex === i
          return (
            <button
              key={d.iso}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => dispatch({ type: 'setDate', dateIndex: i })}
              className={`rounded-2xl px-2 py-3 text-center transition ${active ? 'bg-navy-900 text-white' : 'bg-white shadow-card'}`}
            >
              <span className={`block text-xs ${active ? 'text-white/70' : 'text-slate-500'}`}>{d.day}</span>
              <span className="block font-heading text-sm font-bold">{d.date}</span>
            </button>
          )
        })}
      </div>

      <div className="space-y-2" role="radiogroup" aria-label="Delivery time">
        {TIME_SLOTS.map((s) => {
          const active = state.slot === s.id
          const Icon = SLOT_ICON[s.id]
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => dispatch({ type: 'setSlot', slot: s.id })}
              className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition ${
                active ? 'bg-flame-50 ring-2 ring-flame-500' : 'bg-white shadow-card'
              }`}
            >
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${active ? 'bg-flame-500 text-white' : 'bg-slate-100 text-navy-900'}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-bold">{s.label}</span>
                <span className="block text-xs text-slate-500">{s.time}</span>
              </span>
              {isFillingFast(state.dateIndex, s.id) && (
                <span className="rotate-3 rounded-lg border-2 border-white bg-cylinder-red px-2 py-0.5 text-[0.6rem] font-extrabold text-white shadow-sticker">
                  Filling fast 🔥
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

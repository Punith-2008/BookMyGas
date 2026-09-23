import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { useReducedMotion } from 'framer-motion'
import { CalendarClock, FileText, KeyRound, RotateCcw, ShieldCheck, Store } from 'lucide-react'
import { CylinderIllustration } from '../brand/CylinderIllustration'
import { Sticker } from '../brand/Sticker'
import { SAMPLE_CONNECTION } from '../../data/connection'
import type { BookingState } from '../../hooks/useBooking'
import { nextDates, TIME_SLOTS } from '../../lib/slots'

interface StepConfirmedProps {
  state: BookingState
  celebrate: boolean
  onOpenMemo: () => void
  onBookAnother: () => void
}

export function StepConfirmed({ state, celebrate, onOpenMemo, onBookAnother }: StepConfirmedProps) {
  const reduced = useReducedMotion()
  const date = nextDates()[state.dateIndex]
  const slot = TIME_SLOTS.find((s) => s.id === state.slot)!

  useEffect(() => {
    if (!celebrate || reduced) return
    const colors = ['#FF6B1A', '#FBBF24', '#10B981', '#D7261E', '#FFFFFF']
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.4 }, colors, zIndex: 60 })
    const t = window.setTimeout(() => confetti({ particleCount: 60, spread: 110, origin: { y: 0.3 }, colors, zIndex: 60 }), 350)
    return () => window.clearTimeout(t)
  }, [celebrate, reduced])

  return (
    <div className="space-y-4">
      <div className="relative flex flex-col items-center pt-4 text-center">
        <CylinderIllustration mood="happy" className="h-28" />
        <Sticker shape="burst" tone="flame" rotate={-8} delay={0.2} className="absolute -top-2 right-0 w-24 text-sm">
          🎉 Refill booked!
        </Sticker>
        <h2 className="mt-3 text-2xl font-extrabold">Booking confirmed</h2>
        <p className="text-xs text-slate-500">Booking Reference No.</p>
        <p className="font-mono text-sm font-bold">{state.bookingRef}</p>
      </div>

      <div className="relative rounded-2xl bg-gradient-to-br from-flame-500 to-flame-700 p-4 text-white shadow-card">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-white/80">
            <KeyRound className="h-4 w-4" /> Delivery Authentication Code
          </span>
          <Sticker tone="white" rotate={6} delay={0.5} className="text-[0.6rem]">
            🔐 DAC ready
          </Sticker>
        </div>
        <p className="mt-2 font-mono text-4xl font-bold tracking-[0.4em]" aria-label={`DAC ${state.dac?.split('').join(' ')}`}>
          {state.dac}
        </p>
        <p className="mt-1 text-xs text-white/85">Share this code with the delivery person only when you receive the cylinder.</p>
      </div>

      <div className="space-y-2 rounded-2xl bg-white p-4 text-sm shadow-card">
        <p className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-flame-600" />
          {date.label}, {slot.time}
        </p>
        <p className="flex items-center gap-2">
          <Store className="h-4 w-4 text-flame-600" />
          {SAMPLE_CONNECTION.distributor}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onOpenMemo}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-navy-900 px-3 py-3 text-xs font-bold text-white"
        >
          <FileText className="h-4 w-4" /> Download cash memo
        </button>
        <button
          type="button"
          onClick={onBookAnother}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-3 py-3 text-xs font-bold text-navy-900 ring-1 ring-navy-900/15"
        >
          <RotateCcw className="h-4 w-4" /> Book another refill
        </button>
      </div>

      <div className="flex gap-3 rounded-2xl bg-mint-100 p-4 text-xs text-navy-900">
        <ShieldCheck className="h-5 w-5 shrink-0 text-mint-600" />
        <div>
          <p className="font-bold">Safety first</p>
          <p className="text-slate-600">
            Check the seal and weight before accepting the cylinder. Smell gas? Call{' '}
            <a href="tel:1906" className="font-bold text-cylinder-red underline">
              1906
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

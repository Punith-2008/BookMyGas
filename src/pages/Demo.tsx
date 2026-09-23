import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react'
import { CylinderLoader } from '../components/brand/CylinderLoader'
import { Cylinder3D } from '../components/brand/Cylinder3D'
import { PhoneFrame } from '../components/demo/PhoneFrame'
import { DemoTopBar } from '../components/demo/DemoTopBar'
import { CommentaryPanel } from '../components/demo/CommentaryPanel'
import { StepConnection } from '../components/demo/StepConnection'
import { StepCylinder } from '../components/demo/StepCylinder'
import { StepAddress } from '../components/demo/StepAddress'
import { StepSlot } from '../components/demo/StepSlot'
import { StepPayment } from '../components/demo/StepPayment'
import { StepConfirmed } from '../components/demo/StepConfirmed'
import { SmsToast } from '../components/demo/SmsToast'
import { CashMemo } from '../components/demo/CashMemo'
import { STEP_LABELS } from '../data/commentary'
import { SAMPLE_CONNECTION } from '../data/connection'
import { getCylinder } from '../data/cylinders'
import { LAST_STEP, priceBreakdown, useBooking } from '../hooks/useBooking'
import { formatINR } from '../lib/format'

const PAY_STEP = LAST_STEP - 1
const PROCESSING_MS = 1500

export default function Demo() {
  const { state, dispatch, maxQty } = useBooking()
  const [processing, setProcessing] = useState(false)
  const [memoOpen, setMemoOpen] = useState(false)
  const [showSms, setShowSms] = useState(false)
  // Only celebrate for a booking made in this session, not one restored from storage.
  const [celebrate, setCelebrate] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Book Indane Refill · BookMyGas'
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [state.step])

  const pay = useCallback(() => {
    if (processing) return
    setProcessing(true)
    window.setTimeout(() => {
      dispatch({ type: 'confirm' })
      setProcessing(false)
      setCelebrate(true)
      setShowSms(true)
      window.setTimeout(() => setShowSms(false), 6500)
    }, PROCESSING_MS)
  }, [dispatch, processing])

  const next = useCallback(() => {
    if (state.step === PAY_STEP) pay()
    else if (state.step < PAY_STEP) dispatch({ type: 'next' })
  }, [state.step, pay, dispatch])

  const reset = useCallback(() => {
    setProcessing(false)
    setCelebrate(false)
    setShowSms(false)
    setMemoOpen(false)
    dispatch({ type: 'reset' })
  }, [dispatch])

  const blocked = state.step === 0 && state.notEligible

  // Keyboard: Enter = Next, Esc = Back (ignored while typing or on buttons/links).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (memoOpen || processing) return
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT', 'BUTTON', 'A', 'TEXTAREA', 'SELECT'].includes(tag)) return
      if (e.key === 'Enter' && !blocked) next()
      if (e.key === 'Escape' && state.step > 0 && state.step < LAST_STEP) dispatch({ type: 'back' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, dispatch, state.step, blocked, memoOpen, processing])

  const price = priceBreakdown(state)
  const cyl = getCylinder(state.cylinder)

  const stepContent = [
    <StepConnection key="c" notEligible={state.notEligible} />,
    <StepCylinder key="y" state={state} dispatch={dispatch} maxQty={maxQty} />,
    <StepAddress key="a" />,
    <StepSlot key="s" state={state} dispatch={dispatch} />,
    <StepPayment key="p" state={state} dispatch={dispatch} />,
    <StepConfirmed
      key="d"
      state={state}
      celebrate={celebrate}
      onOpenMemo={() => setMemoOpen(true)}
      onBookAnother={reset}
    />,
  ][state.step]

  return (
    <div className="flex min-h-screen flex-col bg-navy-900">
      <div className="cylinder-pattern pointer-events-none fixed inset-0 opacity-[0.04]" aria-hidden="true" />
      <div className="pointer-events-none fixed -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-flame-500/20 blur-3xl" aria-hidden="true" />

      <DemoTopBar onReset={reset} />

      <p className="sr-only" aria-live="polite">
        Step {state.step + 1} of {STEP_LABELS.length}: {STEP_LABELS[state.step]}
      </p>

      <main className="relative mx-auto flex w-full max-w-7xl flex-1 items-stretch justify-center gap-10 lg:items-center lg:px-6 lg:py-8">
        {/* commentary (desktop) */}
        <div className="hidden flex-1 justify-end lg:flex">
          <CommentaryPanel
            step={state.step}
            notEligible={state.notEligible}
            onToggleNotEligible={(value) => {
              setCelebrate(false)
              dispatch({ type: 'setNotEligible', value })
            }}
          />
        </div>

        {/* the app */}
        <div className="flex w-full flex-col lg:w-auto">
          <PhoneFrame>
            <div className="bg-navy-900 px-4 pb-3 pt-3 lg:pt-10">
              <div className="flex items-center justify-between text-white">
                <span className="font-heading text-sm font-bold">Book Indane Refill</span>
                <span className="text-[0.65rem] text-white/60">Consumer No. {SAMPLE_CONNECTION.consumerNo}</span>
              </div>
            </div>

            <div ref={scrollRef} className="relative flex-1 overflow-y-auto px-4 py-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={state.step}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                >
                  {stepContent}
                </motion.div>
              </AnimatePresence>
            </div>

            {state.step < LAST_STEP && (
              <div className="flex items-center gap-2 border-t border-navy-900/5 bg-white px-4 py-3">
                {state.step > 0 && (
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'back' })}
                    aria-label="Back"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-slate-100 text-navy-900"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                {state.step >= 1 && (
                  <div className="mr-auto min-w-0 text-xs leading-tight">
                    <p className="truncate text-slate-500">
                      {cyl.weight} × {state.qty}
                    </p>
                    <p className="font-heading text-base font-extrabold">{formatINR(state.step === PAY_STEP ? price.total : price.subtotal)}</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={next}
                  disabled={blocked || processing}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-full bg-flame-500 px-6 font-heading text-sm font-bold text-white transition hover:bg-flame-600 disabled:cursor-not-allowed disabled:bg-slate-300 ${
                    state.step === 0 ? 'w-full' : ''
                  }`}
                >
                  {state.step === 0 && (blocked ? 'Not eligible yet' : 'Book Refill')}
                  {state.step > 0 && state.step < PAY_STEP && 'Continue'}
                  {state.step === PAY_STEP && (
                    <>
                      <Lock className="h-4 w-4" /> Pay &amp; Book Refill
                    </>
                  )}
                  {state.step < PAY_STEP && !blocked && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            )}

            <AnimatePresence>
              {processing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 grid place-items-center bg-white/90 backdrop-blur-sm"
                >
                  <CylinderLoader label={state.payment === 'cod' ? 'Confirming booking…' : 'Processing payment…'} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showSms && state.bookingRef && state.dac && (
                <SmsToast bookingRef={state.bookingRef} dac={state.dac} distributor={SAMPLE_CONNECTION.distributor} />
              )}
            </AnimatePresence>
          </PhoneFrame>

          {/* mobile-only: eligibility scenario toggle */}
          <label className="flex items-center gap-2 bg-navy-900 px-4 py-3 text-xs text-slate-300 lg:hidden">
            <input
              type="checkbox"
              checked={state.notEligible}
              onChange={(e) => {
                setCelebrate(false)
                dispatch({ type: 'setNotEligible', value: e.target.checked })
              }}
              className="h-4 w-4 accent-amber-400"
            />
            Show the “Not eligible yet” scenario
          </label>
        </div>

        {/* selected cylinder in 3D (desktop) */}
        <div className="hidden flex-1 flex-col items-start justify-center lg:flex">
          <div className="w-full max-w-xs">
            <Cylinder3D variant={state.cylinder} className="h-[380px] w-full" />
            <p className="text-center font-heading text-lg font-bold text-white">{cyl.name}</p>
            <p className="text-center text-sm text-slate-400">{cyl.useCase}</p>
          </div>
        </div>
      </main>

      <p className="relative pb-4 text-center text-[0.65rem] text-slate-500">
        Not an official IOCL product. Prices are illustrative.
      </p>

      {memoOpen && <CashMemo state={state} onClose={() => setMemoOpen(false)} />}
    </div>
  )
}

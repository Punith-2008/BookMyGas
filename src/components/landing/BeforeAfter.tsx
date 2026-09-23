import { useRef, useState } from 'react'
import { CheckCircle2, Phone } from 'lucide-react'
import { CylinderIllustration } from '../brand/CylinderIllustration'

function BeforeScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-around bg-gradient-to-br from-slate-200 to-slate-300 px-6">
      <div className="flex flex-col items-center gap-2">
        <CylinderIllustration mood="empty" className="h-36 -rotate-12 sm:h-44" />
        <span className="rounded-full bg-slate-500/20 px-2 py-0.5 text-xs font-bold text-slate-600">Cylinder empty</span>
      </div>
      <div className="flex flex-col items-center gap-3 text-slate-600">
        <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 shadow">
          <Phone className="h-5 w-5 animate-pulse" />
          <div className="text-left text-xs">
            <p className="font-bold">IVRS: on hold…</p>
            <p>“Press 1 for Hindi…”</p>
          </div>
        </div>
        <div className="flex items-end gap-1" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="h-3 w-3 rounded-full bg-slate-500" />
              <span className="h-6 w-4 rounded-t-md bg-slate-500" />
            </div>
          ))}
        </div>
        <span className="text-xs font-semibold">Queue at the distributor&apos;s office</span>
      </div>
    </div>
  )
}

function AfterScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-around bg-gradient-to-br from-flame-50 to-mint-100 px-6">
      <div className="w-40 rounded-3xl border-[6px] border-navy-900 bg-white p-3 shadow-xl sm:w-44">
        <CheckCircle2 className="mx-auto h-10 w-10 text-mint-500" />
        <p className="mt-2 text-center font-heading text-sm font-bold">Refill booked!</p>
        <p className="text-center text-[0.65rem] text-slate-500">BMG-2026-40731</p>
        <div className="mt-2 rounded-xl bg-flame-100 py-1.5 text-center font-mono text-sm font-bold tracking-[0.3em] text-flame-700">DAC 4821</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CylinderIllustration mood="happy" className="h-36 sm:h-44" />
        <span className="rounded-full bg-mint-500/15 px-2 py-0.5 text-xs font-bold text-mint-600">Arriving tomorrow, 8–12</span>
      </div>
    </div>
  )
}

/** Drag slider comparing refill booking today vs with BookMyGas. */
export function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)

  const setFromClientX = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }

  return (
    <div>
      <div
        ref={ref}
        className="relative h-72 touch-none select-none overflow-hidden rounded-3xl shadow-card sm:h-80"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          setFromClientX(e.clientX)
        }}
        onPointerMove={(e) => e.buttons === 1 && setFromClientX(e.clientX)}
      >
        <AfterScene />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <BeforeScene />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-bold text-white">Before</span>
        <span className="absolute right-4 top-4 rounded-full bg-flame-500 px-3 py-1 text-xs font-bold text-white">With BookMyGas</span>
        <div className="absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 grid h-10 w-10 -translate-x-[18px] -translate-y-1/2 place-items-center rounded-full bg-white font-bold text-navy-900 shadow-lg">
            ⇆
          </div>
        </div>
      </div>
      <label className="mt-3 block text-center text-sm text-slate-500">
        <span className="sr-only">Compare before and after</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="w-full max-w-xs accent-flame-500"
        />
        <span className="block">Drag to compare</span>
      </label>
    </div>
  )
}

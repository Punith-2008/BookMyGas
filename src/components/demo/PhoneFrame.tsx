import type { ReactNode } from 'react'

/** Realistic phone frame on desktop; plain full-screen container on mobile. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex w-full flex-1 flex-col overflow-hidden bg-slate-50 lg:h-[760px] lg:w-[372px] lg:flex-none lg:rounded-[3rem] lg:border-[12px] lg:border-black lg:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] lg:ring-2 lg:ring-white/10">
      {/* notch (desktop only) */}
      <div className="pointer-events-none absolute left-1/2 top-2 z-30 hidden h-6 w-28 -translate-x-1/2 rounded-full bg-black lg:block" />
      {children}
    </div>
  )
}

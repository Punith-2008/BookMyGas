import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Shape = 'pill' | 'circle' | 'burst' | 'cylinder'
type Tone = 'flame' | 'navy' | 'mint' | 'amber' | 'white' | 'red'

const TONES: Record<Tone, string> = {
  flame: 'bg-flame-500 text-white',
  navy: 'bg-navy-900 text-white',
  mint: 'bg-mint-500 text-white',
  amber: 'bg-amber-400 text-navy-900',
  white: 'bg-white text-navy-900',
  red: 'bg-cylinder-red text-white',
}

const BURST_FILL: Record<Tone, string> = {
  flame: '#FF6B1A',
  navy: '#0B1F3A',
  mint: '#10B981',
  amber: '#FBBF24',
  white: '#FFFFFF',
  red: '#D7261E',
}

interface StickerProps {
  children: ReactNode
  shape?: Shape
  tone?: Tone
  rotate?: number
  className?: string
  delay?: number
  /** Animate the "slap on" the first time it scrolls into view (default true). */
  slap?: boolean
}

function burstPath(points = 14, outer = 50, inner = 43) {
  const d: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (Math.PI * i) / points - Math.PI / 2
    d.push(`${i === 0 ? 'M' : 'L'}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`)
  }
  return d.join('') + 'Z'
}
const BURST = burstPath()

/** Die-cut sticker: thick white outline, soft shadow, slight tilt, and a peel-corner on hover. Decorative. */
export function Sticker({ children, shape = 'pill', tone = 'flame', rotate = -6, className = '', delay = 0, slap = true }: StickerProps) {
  const motionProps = slap
    ? {
        initial: { scale: 1.35, opacity: 0, rotate: rotate - 10 },
        whileInView: { scale: 1, opacity: 1, rotate },
        viewport: { once: true, margin: '-40px' },
        transition: { type: 'spring' as const, stiffness: 420, damping: 16, delay },
      }
    : { style: { rotate } }

  if (shape === 'burst') {
    return (
      <motion.div
        aria-hidden="true"
        {...motionProps}
        whileHover={{ scale: 1.06 }}
        className={`group relative grid aspect-square place-items-center drop-shadow-[0_6px_10px_rgba(11,31,58,0.35)] ${className}`}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <path d={BURST} fill={BURST_FILL[tone]} stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
        </svg>
        <span
          className={`relative px-3 text-center font-heading text-[0.7rem] font-extrabold leading-tight ${tone === 'amber' || tone === 'white' ? 'text-navy-900' : 'text-white'}`}
        >
          {children}
        </span>
      </motion.div>
    )
  }

  const shapeClass =
    shape === 'circle'
      ? 'aspect-square rounded-full grid place-items-center text-center p-3'
      : shape === 'cylinder'
        ? 'rounded-t-[2rem] rounded-b-xl px-3 pt-4 pb-2 text-center'
        : 'rounded-2xl px-3.5 py-2'

  return (
    <motion.div
      aria-hidden="true"
      {...motionProps}
      whileHover={{ scale: 1.06 }}
      className={`group relative inline-flex select-none items-center gap-1.5 overflow-hidden border-[5px] border-white font-heading text-sm font-extrabold shadow-sticker ${TONES[tone]} ${shapeClass} ${className}`}
    >
      {children}
      {/* peel corner */}
      <span className="pointer-events-none absolute -bottom-1 -right-1 h-5 w-5 origin-bottom-right scale-0 rounded-tl-lg bg-gradient-to-br from-white to-slate-300 shadow-md transition-transform duration-200 group-hover:scale-100" />
    </motion.div>
  )
}

import { motion } from 'framer-motion'

interface CylinderProgressProps {
  step: number
  labels: readonly string[]
}

/** Demo progress bar drawn as a horizontal cylinder that fills with flame orange. */
export function CylinderProgress({ step, labels }: CylinderProgressProps) {
  const pct = (step / (labels.length - 1)) * 100
  return (
    <div className="w-full">
      <div
        className="relative flex items-center"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={labels.length}
        aria-valuenow={step + 1}
        aria-valuetext={`Step ${step + 1} of ${labels.length}: ${labels[step]}`}
      >
        {/* foot ring (left) */}
        <div className="h-5 w-1.5 rounded-l-sm bg-navy-700" />
        <div className="relative h-7 flex-1 overflow-hidden rounded-full border-2 border-navy-700 bg-navy-800">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-b from-flame-400 via-flame-500 to-flame-700"
            initial={false}
            animate={{ width: `${Math.max(pct, 8)}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          <div className="absolute inset-x-3 top-1 h-1 rounded-full bg-white/25" />
        </div>
        {/* valve (right) */}
        <div className="h-3 w-2 bg-navy-700" />
        <div className="h-4 w-2.5 rounded-sm bg-cylinder-brass" />
      </div>
      <ol className="mt-2 grid text-center text-[0.65rem] font-semibold" style={{ gridTemplateColumns: `repeat(${labels.length}, 1fr)` }}>
        {labels.map((l, i) => (
          <li key={l} className={i <= step ? 'text-flame-400' : 'text-white/40'}>
            {l}
          </li>
        ))}
      </ol>
    </div>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquareQuote } from 'lucide-react'
import { COMMENTARY, STEP_LABELS } from '../../data/commentary'
import type { Segment } from '../../data/cylinders'

interface CommentaryPanelProps {
  segment: Segment
  step: number
  notEligible: boolean
  onToggleNotEligible: (value: boolean) => void
}

export function CommentaryPanel({ segment, step, notEligible, onToggleNotEligible }: CommentaryPanelProps) {
  const c = COMMENTARY[segment][step]
  const labels = STEP_LABELS[segment]
  return (
    <aside className="w-full max-w-xs space-y-5" aria-label="Presenter commentary">
      <div>
        <p className="eyebrow text-flame-400">What’s happening</p>
        <p className="mt-1 text-xs text-slate-400">
          Step {step + 1} of {labels.length} · {labels[step]}
        </p>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10"
        >
          <MessageSquareQuote className="h-6 w-6 text-flame-400" aria-hidden="true" />
          <h2 className="mt-3 text-xl font-bold text-white">{c.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.body}</p>
        </motion.div>
      </AnimatePresence>

      {segment === 'household' && (
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <input
            type="checkbox"
            checked={notEligible}
            onChange={(e) => onToggleNotEligible(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-amber-400"
          />
          <span className="text-sm">
            <span className="block font-semibold text-white">“Not eligible yet” scenario</span>
            <span className="text-slate-400">Pretend the last refill was 5 days ago to show the refill-interval check.</span>
          </span>
        </label>
      )}

      <p className="text-xs text-slate-500">Tip: press Enter for Next and Esc for Back.</p>
    </aside>
  )
}

import { motion } from 'framer-motion'
import { DemoLink } from '../ui/DemoLink'

export function CtaBanner() {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-navy-900 px-6 py-14 sm:px-14">
        <div className="cylinder-pattern pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-flame-500/30 blur-3xl" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-flame-400">Live demo</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              See it in action. Book an Indane refill in under a minute.
            </h2>
            <p className="mt-4 max-w-lg text-slate-300">No login, no downloads. Click through the full booking flow, from connection to DAC.</p>
            <DemoLink size="lg" className="mt-8">
              Launch Demo
            </DemoLink>
          </div>
          <motion.div
            className="mx-auto origin-bottom"
            animate={{ rotate: [0, -6, 6, -6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4 }}
            aria-hidden="true"
          >
            <img src="/mascot-cylinder.png" alt="" draggable={false} className="h-56 w-auto select-none drop-shadow-[0_0_40px_rgba(255,106,26,0.45)] sm:h-64" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Truck } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'

const MILESTONES = [
  { q: 'Q1', title: 'MVP', body: 'Consumer booking app and distributor web console' },
  { q: 'Q2', title: 'Pilot', body: '10 Indane distributors in 1 city' },
  { q: 'Q3', title: 'Scale', body: 'Expand to 5 cities' },
  { q: 'Q4', title: 'SaaS launch', body: 'Distributor SaaS plans go live' },
]

const TRACTION = ['X pilot distributors', 'Y refill bookings', 'Z% repeat rate']

export function Roadmap() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })
  const truckLeft = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <section id="roadmap" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Traction & roadmap" title="The road ahead" />

        <div ref={ref} className="relative mx-auto max-w-5xl pt-10">
          {/* road */}
          <div className="relative mx-3 hidden h-6 rounded-full bg-navy-900 md:block">
            <div className="absolute inset-x-4 top-1/2 h-0.5 -translate-y-1/2 border-t-2 border-dashed border-amber-400/80" />
            <motion.div style={{ left: truckLeft }} className="absolute -top-9 -translate-x-1/2" aria-hidden="true">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-flame-500 text-white shadow-lg">
                <Truck className="h-5 w-5" />
              </span>
            </motion.div>
          </div>

          <ol className="mt-6 grid gap-6 md:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <motion.li
                key={m.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative rounded-3xl border border-navy-900/5 bg-slate-50 p-5"
              >
                <span className="font-heading text-sm font-extrabold text-flame-600">{m.q}</span>
                <h3 className="mt-1 text-lg font-bold">{m.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{m.body}</p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {TRACTION.map((t) => (
              <span key={t} className="rounded-full bg-flame-100 px-4 py-2 text-sm font-semibold text-flame-700">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">Traction placeholders, updated after the pilot.</p>
        </div>
      </div>
    </section>
  )
}

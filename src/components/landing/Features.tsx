import { motion } from 'framer-motion'
import { BellRing, CalendarCheck, Search, ShieldAlert, Smartphone, Zap } from 'lucide-react'
import { Sticker } from '../brand/Sticker'
import { SectionHeading } from '../ui/SectionHeading'

const FEATURES = [
  { icon: Zap, title: 'One-tap refill rebooking', body: 'Your last order is remembered, so the next refill is a single tap.' },
  {
    icon: Search,
    title: 'Refill eligibility check',
    body: 'See your last refill date and when you’re eligible next, with no failed bookings.',
  },
  { icon: CalendarCheck, title: 'Choose-your-slot delivery', body: 'Morning, afternoon or evening windows, so you know when to be home.' },
  {
    icon: Smartphone,
    title: 'UPI and digital cash memo',
    body: 'Pay with any UPI app and keep every cash memo on your phone.',
    sticker: '🧾 Digital cash memo',
  },
  {
    icon: BellRing,
    title: 'Smart reminders',
    body: 'Refill reminders based on your usage, plus mandatory safety-inspection due dates.',
  },
  {
    icon: ShieldAlert,
    title: 'LPG safety built in',
    body: 'Leak-safety tips, Suraksha hose reminders and a one-tap call to the 1906 emergency helpline.',
    sticker: '🛡️ Safety first · 1906',
  },
]

export function Features() {
  return (
    <section id="features" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Features"
          title="Everything an Indane household needs"
          subtitle="Built around how refills actually work: consumer numbers, distributors, DAC and cash memos."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6, rotate: i % 2 ? 0.6 : -0.6 }}
              className="relative overflow-hidden rounded-3xl border border-navy-900/5 bg-slate-50 p-6"
            >
              {/* tiny cylinder accent */}
              <svg viewBox="0 0 24 36" className="absolute -right-2 -top-2 h-16 text-flame-500/10" aria-hidden="true">
                <rect x="9" y="1" width="6" height="5" rx="1" fill="currentColor" />
                <path d="M3 14c0-5 4-8 9-8s9 3 9 8v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="currentColor" />
              </svg>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-flame-400">
                <f.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-slate-600">{f.body}</p>
              {f.sticker && (
                <Sticker tone={f.sticker.includes('1906') ? 'red' : 'amber'} rotate={i % 2 ? 5 : -5} className="mt-4 text-xs">
                  {f.sticker}
                </Sticker>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

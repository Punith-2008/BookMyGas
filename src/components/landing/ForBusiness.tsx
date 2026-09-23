import { motion } from 'framer-motion'
import { FileText, Layers, Repeat, TrendingDown } from 'lucide-react'
import { CylinderIllustration } from '../brand/CylinderIllustration'
import { Sticker } from '../brand/Sticker'
import { DemoLink } from '../ui/DemoLink'
import { Reveal } from '../ui/Reveal'
import { VOLUME_TIERS } from '../../data/offers'

const POINTS = [
  {
    icon: Layers,
    title: 'Bulk orders in one go',
    body: 'Order 5, 25 or 100 cylinders at once, and mix 19 kg and 47.5 kg commercial cylinders in one order.',
  },
  {
    icon: TrendingDown,
    title: 'Volume pricing',
    body: 'Discounts unlock automatically as the order grows. No phone negotiations.',
  },
  {
    icon: Repeat,
    title: 'Recurring deliveries',
    body: 'Weekly, fortnightly or monthly schedules, so the kitchen never runs dry mid-service.',
  },
  {
    icon: FileText,
    title: 'GST tax invoices',
    body: 'Every order is billed to your GSTIN with an 18% GST breakdown, ready for input tax credit.',
  },
]

const WHO = ['Restaurants & dhabas', 'Hotels', 'Caterers', 'Industrial canteens', 'Hostels & PGs', 'Bakeries']

export function ForBusiness() {
  return (
    <section id="business" className="section relative overflow-hidden bg-gradient-to-br from-cylinder-blueDark via-navy-900 to-navy-900">
      <div className="cylinder-pattern pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-cylinder-blue/40 blur-3xl" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <p className="eyebrow text-flame-400">For business</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Bulk commercial LPG, ordered like a pro.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-slate-300">
              Restaurants, hotels and caterers book Indane commercial cylinders in bulk, lock in a delivery schedule, and get a GST
              invoice. Distributors get one clean, predictable order instead of ten phone calls.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-flame-500 text-white">
                    <p.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 font-bold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Who it’s for">
            {WHO.map((w) => (
              <li key={w} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
                {w}
              </li>
            ))}
          </ul>

          <DemoLink business size="lg" className="mt-8">
            Try a bulk order
          </DemoLink>
        </div>

        {/* visual: stacked commercial cylinders + tier card */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="flex items-end justify-center gap-1" aria-hidden="true">
            {(['commercial19', 'commercial47', 'commercial19', 'commercial47', 'commercial19'] as const).map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 90 }}
              >
                <CylinderIllustration variant={v} className={v === 'commercial47' ? 'h-56 w-auto sm:h-64' : 'h-44 w-auto sm:h-52'} />
              </motion.div>
            ))}
          </div>
          <div className="mx-auto mt-2 h-3 w-4/5 rounded-full bg-black/40 blur-md" aria-hidden="true" />

          <Sticker shape="burst" tone="amber" rotate={10} delay={0.6} className="absolute -top-6 right-0 w-28">
            Up to {Math.round(VOLUME_TIERS[VOLUME_TIERS.length - 1].pct * 100)}% off bulk
          </Sticker>

          <div className="relative -mt-6 rounded-2xl bg-white p-5 shadow-2xl">
            <p className="text-sm font-bold text-navy-900">Volume discounts (illustrative)</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {VOLUME_TIERS.map((t) => (
                <div key={t.minQty} className="rounded-xl bg-flame-50 px-2 py-3">
                  <p className="font-heading text-xl font-extrabold text-flame-600">{Math.round(t.pct * 100)}%</p>
                  <p className="text-xs text-slate-600">{t.minQty}+ cylinders</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[0.65rem] text-slate-400">Subject to distributor and IOCL commercial pricing policy.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

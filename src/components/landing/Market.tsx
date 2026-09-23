import { motion } from 'framer-motion'
import { CountUp } from '../ui/CountUp'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const STATS = [
  { value: 33, suffix: ' crore', prefix: '~', label: 'Domestic LPG connections in India' },
  { value: 15, suffix: ' crore+', prefix: '~', label: 'Indane (IOCL) customers, the largest share' },
  { value: 12000, suffix: '+', prefix: '~', label: 'Indane distributors nationwide' },
  { value: 10, suffix: ' crore+', prefix: '~', label: 'PMUY (Ujjwala) connections' },
]

const RINGS = [
  { label: 'TAM', title: 'All LPG consumers in India', size: 'h-[300px] w-[300px] sm:h-[360px] sm:w-[360px]', tone: 'bg-white/5 ring-white/15' },
  { label: 'SAM', title: 'Indane (IOCL) consumers', size: 'h-[210px] w-[210px] sm:h-[250px] sm:w-[250px]', tone: 'bg-flame-500/15 ring-flame-400/40' },
  { label: 'SOM', title: 'Urban & semi-urban Indane smartphone users', size: 'h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]', tone: 'bg-flame-500 ring-white/60' },
]

export function Market() {
  return (
    <section id="market" className="section relative overflow-hidden bg-navy-900">
      <div className="cylinder-pattern pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          dark
          eyebrow="Market opportunity"
          title="India’s largest LPG network is ready to go digital"
          subtitle="Indane serves more households than any other LPG brand in India. Every refill is a booking we can make faster."
        />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="font-heading text-3xl font-extrabold text-flame-400 sm:text-4xl">
                    <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-slate-300">{s.label}</p>
                </div>
              </Reveal>
            ))}
            <p className="col-span-2 text-xs text-slate-400">
              Indicative figures. Verify against the latest PPAC / IOCL data before pitching.
            </p>
          </div>

          <div className="relative mx-auto grid h-[320px] w-full place-items-center sm:h-[380px]" role="img" aria-label="TAM: all LPG consumers in India. SAM: Indane consumers. SOM: urban and semi-urban Indane smartphone users.">
            {RINGS.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: 'spring', stiffness: 70 }}
                className={`absolute flex items-start justify-center rounded-full ring-1 ${r.size} ${r.tone}`}
              >
                <span className={`mt-4 text-center text-[0.7rem] font-semibold leading-tight sm:mt-5 ${i === 2 ? 'mt-9 px-3 text-white sm:mt-11' : 'px-8 text-slate-300'}`}>
                  <span className="block font-heading text-sm font-extrabold text-white">{r.label}</span>
                  {r.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

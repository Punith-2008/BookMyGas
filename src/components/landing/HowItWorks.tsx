import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { CalendarClock, CreditCard, IdCard, Truck } from 'lucide-react'
import { Sticker } from '../brand/Sticker'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const STEPS = [
  {
    icon: IdCard,
    title: 'Confirm your Indane connection',
    mascot: '/mascots/confirm.png',
    body: 'Consumer number, LPG ID and distributor are already linked, and refill eligibility is checked instantly.',
  },
  {
    icon: CalendarClock,
    title: 'Choose cylinder and slot',
    mascot: '/mascots/choose.png',
    body: '14.2 kg, 10 kg Xtralite, FTL or 19 kg commercial. Then pick a morning, afternoon or evening delivery window.',
  },
  {
    icon: CreditCard,
    title: 'Pay your way',
    mascot: '/mascots/pay.png',
    body: 'UPI, card or cash on delivery, with a clear MRP breakdown before you confirm.',
  },
  {
    icon: Truck,
    title: 'Share DAC, get cash memo',
    mascot: '/mascots/memo.png',
    body: 'Give the delivery person your DAC at the door and get a digital cash memo instantly.',
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="how-it-works" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="How it works" title="From empty cylinder to doorstep in 4 steps" />

        <div ref={ref} className="relative">
          {/* track + fill: horizontal on desktop, vertical on mobile */}
          <div className="absolute left-[27px] top-0 h-full w-1 rounded-full bg-navy-900/10 lg:left-0 lg:top-[27px] lg:h-1 lg:w-full" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-[27px] top-0 h-full w-1 origin-top rounded-full bg-flame-500 lg:hidden"
          />
          <motion.div
            style={{ scaleX: fill }}
            className="absolute left-0 top-[27px] hidden h-1 w-full origin-left rounded-full bg-flame-500 lg:block"
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <li className="flex gap-5 lg:flex-col">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white shadow-card">
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-flame-500 text-xs font-bold">
                      {i + 1}
                    </span>
                  </span>
                  <div className="relative flex-1 rounded-3xl bg-white p-5 shadow-card">
                    <img src={s.mascot} alt="" aria-hidden="true" loading="lazy" className="absolute -top-8 right-3 h-20 w-auto" />
                    <h3 className="pr-20 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{s.body}</p>
                    {i === 3 && (
                      <Sticker tone="mint" rotate={-5} className="mt-4 text-xs">
                        🚚 Doorstep delivery
                      </Sticker>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

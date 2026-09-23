import { HelpCircle, PhoneCall, Receipt } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { BeforeAfter } from './BeforeAfter'

const PAINS = [
  {
    icon: PhoneCall,
    stat: '10+ min',
    title: 'Busy IVRS lines and missed calls',
    body: 'Booking a refill by phone means menus, waiting, and calling again when the line drops.',
  },
  {
    icon: HelpCircle,
    stat: '“Kab aayega?”',
    title: 'No delivery visibility',
    body: 'Consumers don’t know when the delivery person will arrive, or whether to wait at home all day.',
  },
  {
    icon: Receipt,
    stat: 'Cash + paper',
    title: 'Cash, memos and DAC confusion',
    body: 'Exact change, paper cash memos that get lost, and DAC codes buried in SMS threads.',
  },
]

export function Problem() {
  return (
    <section id="problem" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="The problem"
          title="Refilling LPG shouldn’t be this hard"
          subtitle="Crores of Indane households book refills every month, and the experience still depends on phone lines and paper."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="h-full rounded-3xl border border-navy-900/5 bg-slate-50 p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-flame-100 text-flame-600">
                    <p.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-lg font-extrabold text-navy-900/80">{p.stat}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-slate-600">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">Figures are illustrative.</p>

        <Reveal className="mx-auto mt-14 max-w-4xl">
          <BeforeAfter />
        </Reveal>
      </div>
    </section>
  )
}

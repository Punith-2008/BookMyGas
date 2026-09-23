import { Building2, Handshake, Sparkles } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const MODELS = [
  {
    icon: Building2,
    tag: 'Primary',
    title: 'Distributor SaaS',
    body: 'A monthly plan for Indane distributors covering booking intake, slot planning, delivery-person assignment, DAC verification and digital cash memos.',
    highlight: true,
  },
  {
    icon: Sparkles,
    tag: 'Optional',
    title: 'Premium convenience',
    body: 'Priority or exact-time delivery windows for consumers who want them, only where IOCL distributor guidelines allow.',
  },
  {
    icon: Handshake,
    tag: 'Add-on',
    title: 'Partnerships',
    body: 'Stove servicing, Suraksha hose replacement and kitchen-safety products, offered at the right moment in the refill journey.',
  },
]

const UNIT_ECONOMICS = [
  { metric: 'CAC per distributor', value: '₹ —' },
  { metric: 'LTV per distributor', value: '₹ —' },
  { metric: 'Payback period', value: '— months' },
]

export function BusinessModel() {
  return (
    <section id="business-model" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Business model"
          title="Distributors pay for efficiency. Consumers get convenience."
          subtitle="Revenue lines to be validated against IOCL distributor guidelines on consumer charges."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {MODELS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1}>
              <article
                className={`h-full rounded-3xl p-6 ${m.highlight ? 'bg-navy-900 text-white shadow-card' : 'border border-navy-900/5 bg-slate-50'}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${m.highlight ? 'bg-flame-500 text-white' : 'bg-flame-100 text-flame-600'}`}
                  >
                    <m.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${m.highlight ? 'bg-white/10 text-flame-400' : 'bg-white text-slate-500'}`}
                  >
                    {m.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold">{m.title}</h3>
                <p className={`mt-2 ${m.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{m.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-10 max-w-xl">
          <table className="w-full overflow-hidden rounded-2xl text-left text-sm ring-1 ring-navy-900/10">
            <caption className="mb-2 text-left text-sm font-semibold text-slate-500">Unit economics (placeholders)</caption>
            <tbody>
              {UNIT_ECONOMICS.map((u) => (
                <tr key={u.metric} className="border-b border-navy-900/5 last:border-0">
                  <th scope="row" className="bg-slate-50 px-4 py-3 font-semibold">
                    {u.metric}
                  </th>
                  <td className="px-4 py-3 font-mono text-slate-500">{u.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}

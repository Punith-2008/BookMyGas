import { Check, Minus, X } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type Mark = 'yes' | 'no' | 'partial'

const COLUMNS = ['BookMyGas', 'IVRS call', 'SMS / missed call', 'Visit distributor']

const ROWS: { feature: string; marks: Mark[] }[] = [
  { feature: 'Choose a delivery slot', marks: ['yes', 'no', 'no', 'partial'] },
  { feature: 'UPI payment at booking', marks: ['yes', 'no', 'no', 'partial'] },
  { feature: 'Delivery visibility', marks: ['yes', 'partial', 'partial', 'no'] },
  { feature: 'DAC shown in-app', marks: ['yes', 'partial', 'partial', 'no'] },
  { feature: 'Digital cash memo', marks: ['yes', 'no', 'no', 'no'] },
  { feature: 'Refill & safety reminders', marks: ['yes', 'no', 'no', 'no'] },
]

const ICON: Record<Mark, { el: JSX.Element; label: string }> = {
  yes: { el: <Check className="mx-auto h-5 w-5 text-mint-500" />, label: 'Yes' },
  no: { el: <X className="mx-auto h-5 w-5 text-slate-300" />, label: 'No' },
  partial: { el: <Minus className="mx-auto h-5 w-5 text-amber-500" />, label: 'Partly' },
}

export function Compare() {
  return (
    <section id="compare" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Why BookMyGas" title="A better layer on top of today’s booking channels" />
        <Reveal>
          {/* mobile: one card per feature */}
          <ul className="space-y-3 md:hidden">
            {ROWS.map((r) => (
              <li key={r.feature} className="rounded-2xl bg-white p-4 shadow-card">
                <p className="font-semibold">{r.feature}</p>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {r.marks.map((m, i) => (
                    <li
                      key={COLUMNS[i]}
                      className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 ${i === 0 ? 'bg-flame-500 font-bold text-white' : 'bg-slate-50'}`}
                    >
                      <span className={`[&>svg]:mx-0 [&>svg]:h-4 [&>svg]:w-4 ${i === 0 ? '[&>svg]:text-white' : ''}`}>{ICON[m].el}</span>
                      {COLUMNS[i]}
                      <span className="sr-only">: {ICON[m].label}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-hidden rounded-3xl bg-white shadow-card md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-900/5">
                  <th scope="col" className="p-4 text-left font-semibold text-slate-500">
                    Feature
                  </th>
                  {COLUMNS.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`p-4 text-center font-heading font-bold ${i === 0 ? 'bg-flame-500 text-white' : 'text-navy-900'}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.feature} className="border-b border-navy-900/5 last:border-0">
                    <th scope="row" className="p-4 text-left font-medium">
                      {r.feature}
                    </th>
                    {r.marks.map((m, i) => (
                      <td key={i} className={`p-4 ${i === 0 ? 'bg-flame-50' : ''}`}>
                        {ICON[m].el}
                        <span className="sr-only">{ICON[m].label}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">
            BookMyGas works alongside IOCL’s official booking channels. It does not replace them.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

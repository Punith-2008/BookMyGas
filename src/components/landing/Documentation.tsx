import { Building2, CalendarDays, FileText, MapPin, Phone } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { MRP_CIRCULAR, MRP_GLOSSARY, MRP_ROWS } from '../../data/mrp'
import { formatINR } from '../../lib/format'


export function Documentation() {
  const c = MRP_CIRCULAR

  return (
    <section id="docs" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Cylinders & prices"
          title="Indane LPG prices, straight from IOCL"
          subtitle={`Every cylinder below can be booked in the demo, at the MRPs in IOCL’s price circular for the ${c.market} market, ${c.month}.`}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          {/* circular details */}
          <Reveal>
            <div className="h-full rounded-3xl bg-navy-900 p-6 text-slate-300">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-flame-500 text-white">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{c.subject}</h3>

              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Reference</dt>
                    <dd className="font-semibold text-white">
                      {c.ref}, dated {c.date}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Issued by</dt>
                    <dd className="font-semibold text-white">
                      {c.issuedBy.name}, {c.issuedBy.designation}
                    </dd>
                    <dd>{c.office.name}</dd>
                    <dd>{c.office.division}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Office</dt>
                    <dd>{c.office.address}</dd>
                    <dd className="mt-1 text-xs text-slate-400">Regd. office: {c.regdOffice}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Phone</dt>
                    <dd>{c.office.phones.join(', ')}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* price list */}
          <Reveal delay={0.08}>
            <div className="overflow-x-auto rounded-3xl bg-white p-2 shadow-card sm:p-4">
              <table className="w-full text-sm">
                <caption className="px-3 pb-3 pt-2 text-left text-sm font-semibold text-slate-500">
                  MRP of LPG cylinders, {c.market}, {c.month} (₹, incl. GST)
                </caption>
                <thead>
                  <tr className="border-b border-navy-900/10 text-left text-xs uppercase tracking-wider text-slate-500">
                    <th scope="col" className="px-3 py-2 font-semibold">Cylinder type</th>
                    <th scope="col" className="px-3 py-2 text-right font-semibold">MRP</th>
                    <th scope="col" className="px-3 py-2 text-right font-semibold">XtraTej MRP</th>
                  </tr>
                </thead>
                <tbody>
                  {MRP_ROWS.map((r) => (
                    <tr key={r.type} className="border-b border-navy-900/5 last:border-0">
                      <th scope="row" className="px-3 py-2.5 text-left font-semibold">
                        {r.type}
                      </th>
                      <td className="whitespace-nowrap px-3 py-2.5 text-right font-heading font-bold tabular-nums">{formatINR(r.price)}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-right tabular-nums text-slate-500">
                        {r.xtraTej ? formatINR(r.xtraTej) : <span aria-label="Not listed">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        {/* glossary */}
        <Reveal delay={0.12}>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MRP_GLOSSARY.map((g) => (
              <div key={g.term} className="rounded-2xl bg-white p-4 shadow-card">
                <dt className="font-heading text-sm font-bold text-flame-600">{g.term}</dt>
                <dd className="mt-1 text-sm text-slate-600">{g.meaning}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-center text-xs text-slate-400">
            Prices apply to the {c.market} market for {c.month} and change monthly. Volume discounts shown in the demo are illustrative.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

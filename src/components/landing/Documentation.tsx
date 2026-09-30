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

        {/* price cards */}
        <Reveal>
          <h3 className="text-lg font-bold sm:text-xl">
            MRP of LPG cylinders, {c.market}, {c.month} (₹, incl. GST)
          </h3>
          <ul className="mt-5 flex flex-wrap justify-center gap-3 sm:gap-4">
            {MRP_ROWS.map((r) => (
              <li
                key={r.type}
                className="flex w-[calc(50%-0.375rem)] flex-col rounded-3xl bg-white p-3 text-center shadow-card sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(16.666%-0.834rem)]"
              >
                <img src={r.image} alt={`${r.type} Indane cylinder`} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
                <h4 className="mt-3 flex min-h-[2.5rem] items-center justify-center font-heading text-sm font-bold leading-tight sm:text-base">
                  {r.type}
                </h4>
                <div className="mt-2 rounded-xl bg-slate-100 px-2 py-2">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">MRP</p>
                  <p className="font-heading text-base font-extrabold tabular-nums">{formatINR(r.price)}</p>
                </div>
                <div className="mt-2 flex-1 rounded-xl px-2 py-1.5">
                  <p className="rounded-lg bg-slate-50 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-slate-500">XtraTej MRP</p>
                  <p className="mt-1 text-sm tabular-nums text-slate-600">
                    {r.xtraTej ? formatINR(r.xtraTej) : <span aria-label="Not listed">—</span>}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* glossary */}
        <Reveal delay={0.12}>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

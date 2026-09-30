import { BadgeCheck, Building2, FileText, Repeat } from 'lucide-react'
import { Sticker } from '../brand/Sticker'
import { SAMPLE_BUSINESS } from '../../data/connection'

export function StepBusinessAccount() {
  const b = SAMPLE_BUSINESS
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold">Namaste, {b.contactPerson.split(' ')[0]} 👋</h2>
        <p className="text-sm text-slate-500">Your commercial account is ready for bulk orders.</p>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cylinder-blueDark to-navy-900 p-5 text-white shadow-card">
        <div className="cylinder-pattern pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        <div className="relative">
          <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-flame-400">
            <Building2 className="h-3.5 w-3.5" /> Indane commercial account
          </p>
          <p className="mt-1 font-heading text-lg font-bold">{b.businessName}</p>
          <p className="text-xs text-white/70">{b.category}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div>
              <dt className="text-white/60">Commercial Consumer No.</dt>
              <dd className="font-semibold">{b.commercialConsumerNo}</dd>
            </div>
            <div>
              <dt className="text-white/60">Contact person</dt>
              <dd className="font-semibold">{b.contactPerson}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-white/60">GSTIN</dt>
              <dd className="font-mono font-semibold tracking-wider">{b.gstin}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-white/60">Distributor</dt>
              <dd className="font-semibold">{b.distributor}</dd>
            </div>
          </dl>
        </div>
      </div>

      <Sticker tone="mint" rotate={-4} className="text-xs">
        <BadgeCheck className="h-4 w-4" /> Bulk ordering enabled
      </Sticker>

      <div className="flex flex-col items-start gap-2 text-xs font-semibold">
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-card">
          <FileText className="h-3.5 w-3.5 text-navy-600" /> GST invoice
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-card">
          <Repeat className="h-3.5 w-3.5 text-navy-600" /> Recurring orders
        </span>
      </div>
    </div>
  )
}

import { AlertTriangle, BadgeCheck, Landmark, Smartphone } from 'lucide-react'
import { Sticker } from '../brand/Sticker'
import { LAST_REFILL_DAYS, SAMPLE_CONNECTION } from '../../data/connection'
import { refillEligibility } from '../../lib/eligibility'
import { formatDate } from '../../lib/format'

export function StepConnection({ notEligible }: { notEligible: boolean }) {
  const c = SAMPLE_CONNECTION
  const days = notEligible ? LAST_REFILL_DAYS.notEligible : LAST_REFILL_DAYS.eligible
  const e = refillEligibility(days)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold">Namaste, {c.consumerName.split(' ')[0]} 👋</h2>
        <p className="text-sm text-slate-500">Your Indane connection is linked and ready.</p>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 p-5 text-white shadow-card">
        <div className="cylinder-pattern pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        <div className="relative">
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-flame-400">Indane LPG connection</p>
          <p className="mt-1 font-heading text-lg font-bold">{c.consumerName}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div>
              <dt className="text-white/60">Consumer No.</dt>
              <dd className="font-semibold">{c.consumerNo}</dd>
            </div>
            <div>
              <dt className="text-white/60">Connection</dt>
              <dd className="font-semibold">{c.connectionType === 'DBC' ? 'DBC (Double Bottle)' : 'SBC (Single Bottle)'}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-white/60">LPG ID</dt>
              <dd className="font-mono font-semibold tracking-wider">{c.lpgId}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-white/60">Distributor</dt>
              <dd className="font-semibold">{c.distributor}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-white/60">Last refill</dt>
              <dd className="font-semibold">
                {days} days ago · {formatDate(e.lastRefill)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {e.eligible ? (
        <Sticker tone="mint" rotate={-4} className="text-xs">
          <BadgeCheck className="h-4 w-4" /> Eligible for refill
        </Sticker>
      ) : (
        <div className="flex gap-3 rounded-2xl bg-amber-100 p-4 text-sm text-navy-900" role="alert">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <p className="font-bold">Refill interval not met</p>
            <p className="text-slate-600">Your next booking opens on {formatDate(e.nextEligible)}. We will remind you.</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {c.dbtlLinked && (
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-card">
            <Landmark className="h-3.5 w-3.5 text-navy-600" /> DBTL subsidy linked
          </span>
        )}
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-card">
          <Smartphone className="h-3.5 w-3.5 text-navy-600" /> Registered mobile {c.registeredMobile}
        </span>
      </div>
    </div>
  )
}

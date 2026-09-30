import { Building, CreditCard, IndianRupee, Info, Smartphone, Tag, TrendingDown } from 'lucide-react'
import { SAMPLE_BUSINESS, SAMPLE_CONNECTION } from '../../data/connection'
import { getCylinder } from '../../data/cylinders'
import { DEMO_OFFER } from '../../data/offers'
import { priceBreakdown, type BookingDispatch, type BookingState, type PaymentMethod } from '../../hooks/useBooking'
import { formatINR } from '../../lib/format'
import { frequencyLabel, nextDates, TIME_SLOTS } from '../../lib/slots'
import { AnimatedINR } from '../ui/AnimatedNumber'

const METHODS: { id: PaymentMethod; label: string; sub: string; icon: typeof Smartphone; business: boolean; household: boolean }[] = [
  { id: 'upi', label: 'UPI', sub: 'Pay with any UPI app', icon: Smartphone, business: true, household: true },
  { id: 'netbanking', label: 'Net banking', sub: 'Pay from your business account', icon: Building, business: true, household: false },
  { id: 'card', label: 'Debit / Credit card', sub: 'Visa, Mastercard, RuPay', icon: CreditCard, business: true, household: true },
  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay the delivery person', icon: IndianRupee, business: true, household: true },
]

export function StepPayment({ state, dispatch }: { state: BookingState; dispatch: BookingDispatch }) {
  const business = state.segment === 'business'
  const price = priceBreakdown(state)
  const date = nextDates()[state.dateIndex]
  const slot = TIME_SLOTS.find((s) => s.id === state.slot)!
  const gstPct = price.gstRate === null ? '5% / 18%' : `${Math.round(price.gstRate * 100)}%`

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-extrabold">Review &amp; pay</h2>

      <div className="rounded-2xl bg-white p-4 text-sm shadow-card">
        <div className="flex justify-between gap-2">
          <div className="space-y-0.5">
            {price.lines.map((l) => (
              <p key={l.cylinder} className="font-bold">
                {l.name} × {l.qty}
              </p>
            ))}
          </div>
          <button type="button" onClick={() => dispatch({ type: 'goto', step: 1 })} className="self-start text-xs font-bold text-flame-600">
            Change
          </button>
        </div>
        {business && <p className="mt-1 text-xs font-semibold text-slate-600">{SAMPLE_BUSINESS.businessName}</p>}
        <p className="mt-1 text-xs text-slate-500">{SAMPLE_CONNECTION.distributor}</p>
        <p className="text-xs text-slate-500">
          {date.label} · {slot.label} ({slot.time})
          {business && ` · ${frequencyLabel(state.frequency)}`}
        </p>
      </div>

      <div className="space-y-1.5 rounded-2xl bg-white p-4 text-sm shadow-card">
        {price.lines.map((l) => (
          <div key={l.cylinder} className="flex justify-between">
            <span className="text-slate-600">
              {business ? `${l.name} (${l.qty} × ${formatINR(l.unit)})` : getCylinder(l.cylinder).nc ? 'MRP (incl. GST)' : 'Refill MRP (incl. GST)'}
            </span>
            <span>{formatINR(l.amount)}</span>
          </div>
        ))}
        <div className="flex justify-between">
          <span className="text-slate-600">{business ? 'Bulk delivery' : 'Home delivery'}</span>
          <span className="font-semibold text-mint-600">FREE</span>
        </div>

        {business ? (
          price.discount > 0 && (
            <div className="flex items-center justify-between rounded-xl bg-mint-100/60 px-3 py-2 text-xs font-bold text-mint-600">
              <span className="flex items-center gap-2">
                <TrendingDown className="h-3.5 w-3.5" /> {price.discountLabel}
              </span>
              <span>−{formatINR(price.discount)}</span>
            </div>
          )
        ) : (
          <button
            type="button"
            onClick={() => dispatch({ type: 'toggleOffer' })}
            aria-pressed={state.offerApplied}
            className="flex w-full items-center justify-between rounded-xl border border-dashed border-mint-500 bg-mint-100/50 px-3 py-2 text-left"
          >
            <span className="flex items-center gap-2 text-xs font-bold text-mint-600">
              <Tag className="h-3.5 w-3.5" /> {DEMO_OFFER.code} {state.offerApplied ? 'applied' : '(tap to apply)'}
            </span>
            {state.offerApplied && <span className="text-xs font-bold text-mint-600">−{formatINR(DEMO_OFFER.discount)}</span>}
          </button>
        )}

        <div className="flex justify-between border-t border-navy-900/10 pt-2 font-heading text-base font-extrabold">
          <span>Total</span>
          <AnimatedINR value={price.total} />
        </div>
        {business && (
          <p className="flex justify-between text-xs text-slate-500">
            <span>Includes GST ({gstPct}), claimable as ITC</span>
            <span>{formatINR(price.gst)}</span>
          </p>
        )}
      </div>

      <div className="space-y-2" role="radiogroup" aria-label="Payment method">
        {METHODS.filter((m) => (business ? m.business : m.household)).map((m) => {
          const active = state.payment === m.id
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => dispatch({ type: 'setPayment', payment: m.id })}
              className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                active ? 'bg-flame-50 ring-2 ring-flame-500' : 'bg-white shadow-card'
              }`}
            >
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${active ? 'bg-flame-500 text-white' : 'bg-slate-100'}`}>
                <m.icon className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-bold">{m.label}</span>
                <span className="block text-xs text-slate-500">{m.sub}</span>
              </span>
              {m.id === 'upi' && (
                <span className="flex gap-1" aria-hidden="true">
                  {['#5F259F', '#00BAF2', '#1A73E8'].map((c) => (
                    <span key={c} className="h-4 w-4 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <p className="flex gap-2 rounded-xl bg-navy-900/5 p-3 text-xs text-slate-600">
        <Info className="h-4 w-4 shrink-0 text-navy-600" />
        {business
          ? `A GST tax invoice is issued to GSTIN ${SAMPLE_BUSINESS.gstin}. Commercial LPG carries no subsidy.`
          : 'If eligible, the DBTL subsidy is credited to your linked bank account after delivery.'}
      </p>
    </div>
  )
}

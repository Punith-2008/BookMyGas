import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Printer, X } from 'lucide-react'
import { CylinderLogo } from '../brand/CylinderLogo'
import { SAMPLE_BUSINESS, SAMPLE_CONNECTION } from '../../data/connection'
import { getCylinder } from '../../data/cylinders'
import { priceBreakdown, type BookingState } from '../../hooks/useBooking'
import { formatDate, formatINR } from '../../lib/format'
import { frequencyLabel, nextDates, TIME_SLOTS } from '../../lib/slots'

const PAYMENT_LABEL = { upi: 'UPI', netbanking: 'Net banking', card: 'Card', cod: 'Cash on Delivery' } as const

/** Printable cash memo (household) or GST tax invoice (business). Demo document, not a valid tax invoice. */
export function CashMemo({ state, onClose }: { state: BookingState; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const business = state.segment === 'business'
  const price = priceBreakdown(state)
  const gstPct = price.gstRate === null ? null : price.gstRate * 100
  const date = nextDates()[state.dateIndex]
  const slot = TIME_SLOTS.find((s) => s.id === state.slot)!
  const c = SAMPLE_CONNECTION
  const b = SAMPLE_BUSINESS
  const title = business ? 'TAX INVOICE' : 'CASH MEMO'

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-navy-900/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title.toLowerCase()}>
      <div className="mx-auto max-w-lg">
        <div className="mb-3 flex justify-end gap-2 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-flame-500 px-4 py-2 text-sm font-bold text-white hover:bg-flame-600"
          >
            <Printer className="h-4 w-4" /> Print / Save PDF
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <article id="cash-memo" className="relative overflow-hidden rounded-2xl bg-white p-6 text-sm text-navy-900 shadow-2xl">
          <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
            <span className="-rotate-[24deg] whitespace-nowrap font-heading text-3xl font-extrabold text-cylinder-red/10">
              SAMPLE · NOT A TAX INVOICE
            </span>
          </div>

          <header className="flex items-start justify-between border-b border-dashed border-navy-900/20 pb-4">
            <CylinderLogo size={32} />
            <div className="text-right">
              <p className="font-heading font-bold">{title}</p>
              <p className="text-xs text-slate-500">{state.bookingRef}</p>
              <p className="text-xs text-slate-500">
                {formatDate(new Date(state.bookedAt ?? Date.now()), { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </header>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-dashed border-navy-900/20 py-4 text-xs">
            {business ? (
              <>
                <div className="col-span-2">
                  <dt className="text-slate-500">Bill to</dt>
                  <dd className="font-semibold">
                    {b.businessName} (Attn: {b.contactPerson})
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">GSTIN</dt>
                  <dd className="font-mono font-semibold">{b.gstin}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Commercial Consumer No.</dt>
                  <dd className="font-semibold">{b.commercialConsumerNo}</dd>
                </div>
              </>
            ) : (
              <>
                <div>
                  <dt className="text-slate-500">Consumer</dt>
                  <dd className="font-semibold">{c.consumerName}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Consumer No.</dt>
                  <dd className="font-semibold">{c.consumerNo}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-slate-500">LPG ID</dt>
                  <dd className="font-mono font-semibold">{c.lpgId}</dd>
                </div>
              </>
            )}
            <div className="col-span-2">
              <dt className="text-slate-500">Distributor</dt>
              <dd className="font-semibold">
                {c.distributor} ({c.distributorCode})
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-slate-500">Delivery</dt>
              <dd className="font-semibold">
                {date.label}, {slot.time}
                {business && state.frequency !== 'once' && ` · repeats ${frequencyLabel(state.frequency).toLowerCase()}`} · {c.address}, {c.city}
              </dd>
            </div>
          </dl>

          <table className="w-full text-xs">
            <tbody>
              {price.lines.map((l, i) => (
                <tr key={l.cylinder}>
                  <td className={i === 0 ? 'pt-4' : ''}>
                    {l.name} {business ? 'cylinder' : getCylinder(l.cylinder).nc ? '' : 'refill'} × {l.qty}
                    {business && <span className="text-slate-500"> @ {formatINR(l.unit)}</span>}
                  </td>
                  <td className={`text-right ${i === 0 ? 'pt-4' : ''}`}>{formatINR(l.amount)}</td>
                </tr>
              ))}
              <tr>
                <td className="text-slate-500">{business ? 'Bulk delivery' : 'Home delivery'}</td>
                <td className="text-right text-slate-500">{formatINR(0)}</td>
              </tr>
              {price.discount > 0 && (
                <tr>
                  <td className="text-mint-600">{price.discountLabel}</td>
                  <td className="text-right text-mint-600">−{formatINR(price.discount)}</td>
                </tr>
              )}
              <tr className="border-t border-navy-900/10">
                <td className="pt-2 text-slate-500">Taxable value</td>
                <td className="pt-2 text-right text-slate-500">{formatINR(price.taxable)}</td>
              </tr>
              <tr>
                <td className="text-slate-500">CGST{gstPct !== null && ` (${gstPct / 2}%)`}</td>
                <td className="text-right text-slate-500">{formatINR(price.cgst)}</td>
              </tr>
              <tr>
                <td className="text-slate-500">SGST{gstPct !== null && ` (${gstPct / 2}%)`}</td>
                <td className="text-right text-slate-500">{formatINR(price.gst - price.cgst)}</td>
              </tr>
              <tr className="border-t border-navy-900/10 font-heading text-base font-bold">
                <td className="pt-3">Total</td>
                <td className="pt-3 text-right">{formatINR(price.total)}</td>
              </tr>
              <tr>
                <td className="text-slate-500">Paid via</td>
                <td className="text-right text-slate-500">{PAYMENT_LABEL[state.payment]}</td>
              </tr>
            </tbody>
          </table>

          <footer className="mt-4 space-y-1 border-t border-dashed border-navy-900/20 pt-4 text-[0.65rem] text-slate-500">
            <p>Check the seal and weight of every cylinder before accepting delivery. LPG emergency: 1906.</p>
            <p>Prices: IOCL MRP, Hyderabad, September 2026. Sample document generated by BookMyGas, not an official IOCL {business ? 'tax invoice' : 'cash memo'}.</p>
          </footer>
        </article>
      </div>
    </div>,
    document.body,
  )
}

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Printer, X } from 'lucide-react'
import { CylinderLogo } from '../brand/CylinderLogo'
import { SAMPLE_CONNECTION } from '../../data/connection'
import { getCylinder } from '../../data/cylinders'
import { DEMO_OFFER } from '../../data/offers'
import { priceBreakdown, type BookingState } from '../../hooks/useBooking'
import { formatDate, formatINR } from '../../lib/format'
import { nextDates, TIME_SLOTS } from '../../lib/slots'

const PAYMENT_LABEL = { upi: 'UPI', card: 'Card', cod: 'Cash on Delivery' } as const

/** Printable cash memo (demo document, not a valid tax invoice). */
export function CashMemo({ state, onClose }: { state: BookingState; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const cyl = getCylinder(state.cylinder)
  const price = priceBreakdown(state)
  const gstRate = 0.05
  const taxable = Math.round(price.subtotal / (1 + gstRate))
  const gst = price.subtotal - taxable
  const date = nextDates()[state.dateIndex]
  const slot = TIME_SLOTS.find((s) => s.id === state.slot)!
  const c = SAMPLE_CONNECTION

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-navy-900/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Cash memo">
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
            aria-label="Close cash memo"
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <article id="cash-memo" className="relative overflow-hidden rounded-2xl bg-white p-6 text-sm text-navy-900 shadow-2xl">
          <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
            <span className="-rotate-[24deg] whitespace-nowrap font-heading text-3xl font-extrabold text-cylinder-red/10">
              DEMO · NOT A TAX INVOICE
            </span>
          </div>

          <header className="flex items-start justify-between border-b border-dashed border-navy-900/20 pb-4">
            <CylinderLogo size={32} />
            <div className="text-right">
              <p className="font-heading font-bold">CASH MEMO</p>
              <p className="text-xs text-slate-500">{state.bookingRef}</p>
              <p className="text-xs text-slate-500">{formatDate(new Date(state.bookedAt ?? Date.now()), { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
          </header>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-dashed border-navy-900/20 py-4 text-xs">
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
            <div className="col-span-2">
              <dt className="text-slate-500">Distributor</dt>
              <dd className="font-semibold">
                {c.distributor} ({c.distributorCode})
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-slate-500">Delivery</dt>
              <dd className="font-semibold">
                {date.label}, {slot.time} · {c.address}, {c.city}
              </dd>
            </div>
          </dl>

          <table className="w-full py-4 text-xs">
            <tbody>
              <tr>
                <td className="pt-4">
                  {cyl.name} refill × {state.qty}
                </td>
                <td className="pt-4 text-right">{formatINR(taxable)}</td>
              </tr>
              <tr>
                <td className="text-slate-500">GST (5%, included in RSP)</td>
                <td className="text-right text-slate-500">{formatINR(gst)}</td>
              </tr>
              <tr>
                <td className="text-slate-500">Home delivery</td>
                <td className="text-right text-slate-500">{formatINR(0)}</td>
              </tr>
              {price.discount > 0 && (
                <tr>
                  <td className="text-mint-600">Offer {DEMO_OFFER.code}</td>
                  <td className="text-right text-mint-600">−{formatINR(price.discount)}</td>
                </tr>
              )}
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
            <p>Check the seal and weight of the cylinder before accepting delivery. LPG emergency: 1906.</p>
            <p>Illustrative prices. Demo document generated by BookMyGas, not an official IOCL cash memo.</p>
          </footer>
        </article>
      </div>
    </div>,
    document.body,
  )
}

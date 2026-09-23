import { useEffect, useReducer } from 'react'
import { SAMPLE_CONNECTION } from '../data/connection'
import { BUSINESS_CYLINDERS, getCylinder, type CylinderVariant, type Segment } from '../data/cylinders'
import { DEMO_OFFER, volumeTier } from '../data/offers'
import { generateBookingRef, generateDac } from '../lib/ids'
import type { TimeSlotId } from '../lib/slots'

export type PaymentMethod = 'upi' | 'netbanking' | 'card' | 'cod'
export type Frequency = 'once' | 'weekly' | 'fortnightly' | 'monthly'
export type BulkQty = Partial<Record<CylinderVariant, number>>

export const LAST_STEP = 5

export interface BookingState {
  segment: Segment
  step: number
  /** Household: the booked cylinder. Business: the cylinder last adjusted (shown in 3D). */
  cylinder: CylinderVariant
  qty: number
  bulk: BulkQty
  frequency: Frequency
  dateIndex: number
  slot: TimeSlotId
  payment: PaymentMethod
  offerApplied: boolean
  notEligible: boolean
  bookingRef: string | null
  dac: string | null
  bookedAt: string | null
}

type Action =
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'goto'; step: number }
  | { type: 'setSegment'; segment: Segment }
  | { type: 'setCylinder'; cylinder: CylinderVariant }
  | { type: 'setQty'; qty: number }
  | { type: 'setBulkQty'; cylinder: CylinderVariant; qty: number }
  | { type: 'setFrequency'; frequency: Frequency }
  | { type: 'setDate'; dateIndex: number }
  | { type: 'setSlot'; slot: TimeSlotId }
  | { type: 'setPayment'; payment: PaymentMethod }
  | { type: 'toggleOffer' }
  | { type: 'setNotEligible'; value: boolean }
  | { type: 'confirm' }
  | { type: 'reset' }

const householdInitial: BookingState = {
  segment: 'household',
  step: 0,
  cylinder: 'domestic14',
  qty: 1,
  bulk: {},
  frequency: 'once',
  dateIndex: 0,
  slot: 'morning',
  payment: 'upi',
  offerApplied: true,
  notEligible: false,
  bookingRef: null,
  dac: null,
  bookedAt: null,
}

const businessInitial: BookingState = {
  ...householdInitial,
  segment: 'business',
  cylinder: 'commercial19',
  // Sensible bulk defaults so a presenter can click straight through.
  bulk: { commercial19: 10, commercial47: 2 },
  frequency: 'weekly',
  payment: 'netbanking',
  offerApplied: false,
}

export const initialFor = (segment: Segment) => (segment === 'business' ? businessInitial : householdInitial)

const STORAGE_KEY = 'bookmygas.demo.booking'

const householdMax = (cylinder: CylinderVariant) => getCylinder(cylinder).maxQty[SAMPLE_CONNECTION.connectionType]

export const totalBulkQty = (bulk: BulkQty) => Object.values(bulk).reduce((a, b) => a + (b ?? 0), 0)

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'next':
      if (state.step === 0 && state.notEligible && state.segment === 'household') return state
      if (state.step === 1 && state.segment === 'business' && totalBulkQty(state.bulk) === 0) return state
      return { ...state, step: Math.min(state.step + 1, LAST_STEP - 1) }
    case 'back':
      return { ...state, step: Math.max(state.step - 1, 0) }
    case 'goto':
      return { ...state, step: action.step }
    case 'setSegment':
      return initialFor(action.segment)
    case 'setCylinder':
      return { ...state, cylinder: action.cylinder, qty: Math.min(state.qty, householdMax(action.cylinder)) }
    case 'setQty':
      return { ...state, qty: Math.max(1, Math.min(action.qty, householdMax(state.cylinder))) }
    case 'setBulkQty': {
      const max = getCylinder(action.cylinder).maxQty.bulk
      const qty = Math.max(0, Math.min(Math.round(action.qty) || 0, max))
      return { ...state, cylinder: action.cylinder, bulk: { ...state.bulk, [action.cylinder]: qty } }
    }
    case 'setFrequency':
      return { ...state, frequency: action.frequency }
    case 'setDate':
      return { ...state, dateIndex: action.dateIndex }
    case 'setSlot':
      return { ...state, slot: action.slot }
    case 'setPayment':
      return { ...state, payment: action.payment }
    case 'toggleOffer':
      return { ...state, offerApplied: !state.offerApplied }
    case 'setNotEligible':
      return { ...householdInitial, notEligible: action.value }
    case 'confirm':
      return {
        ...state,
        step: LAST_STEP,
        bookingRef: generateBookingRef(state.segment),
        dac: generateDac(),
        bookedAt: new Date().toISOString(),
      }
    case 'reset':
      return initialFor(state.segment)
  }
}

export interface PriceLine {
  cylinder: CylinderVariant
  name: string
  qty: number
  unit: number
  amount: number
}

export function priceBreakdown(state: BookingState) {
  const lines: PriceLine[] =
    state.segment === 'business'
      ? BUSINESS_CYLINDERS.filter((c) => (state.bulk[c.id] ?? 0) > 0).map((c) => ({
          cylinder: c.id,
          name: c.name,
          qty: state.bulk[c.id]!,
          unit: c.price,
          amount: c.price * state.bulk[c.id]!,
        }))
      : [
          {
            cylinder: state.cylinder,
            name: getCylinder(state.cylinder).name,
            qty: state.qty,
            unit: getCylinder(state.cylinder).price,
            amount: getCylinder(state.cylinder).price * state.qty,
          },
        ]

  const totalQty = lines.reduce((a, l) => a + l.qty, 0)
  const subtotal = lines.reduce((a, l) => a + l.amount, 0)
  const tier = volumeTier(totalQty)

  let discount = 0
  let discountLabel = ''
  if (state.segment === 'business' && tier.current) {
    discount = Math.round(subtotal * tier.current.pct)
    discountLabel = `Volume discount (${Math.round(tier.current.pct * 100)}%)`
  } else if (state.segment === 'household' && state.offerApplied) {
    discount = DEMO_OFFER.discount
    discountLabel = `Offer ${DEMO_OFFER.code}`
  }

  const total = subtotal - discount
  const gstRate = lines.length ? getCylinder(lines[0].cylinder).gstRate : 0.05
  const taxable = Math.round(total / (1 + gstRate))
  return { lines, totalQty, subtotal, delivery: 0, discount, discountLabel, total, gstRate, taxable, gst: total - taxable, tier }
}

function load(segment: Segment): BookingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialFor(segment)
    const saved = JSON.parse(raw) as BookingState
    const valid = saved.step === LAST_STEP && saved.bookingRef && saved.segment === segment
    return valid ? { ...initialFor(segment), ...saved } : initialFor(segment)
  } catch {
    return initialFor(segment)
  }
}

export function useBooking(segment: Segment) {
  const [state, dispatch] = useReducer(reducer, segment, load)

  useEffect(() => {
    try {
      if (state.step === LAST_STEP) localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* storage unavailable: demo still works without persistence */
    }
  }, [state])

  const maxQty = state.segment === 'household' ? householdMax(state.cylinder) : getCylinder(state.cylinder).maxQty.bulk
  return { state, dispatch, maxQty }
}

export type BookingDispatch = ReturnType<typeof useBooking>['dispatch']

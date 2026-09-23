import { useEffect, useReducer } from 'react'
import { SAMPLE_CONNECTION } from '../data/connection'
import { getCylinder, type CylinderVariant } from '../data/cylinders'
import { DEMO_OFFER } from '../data/offers'
import { generateBookingRef, generateDac } from '../lib/ids'
import type { TimeSlotId } from '../lib/slots'

export type PaymentMethod = 'upi' | 'card' | 'cod'

export const LAST_STEP = 5

export interface BookingState {
  step: number
  cylinder: CylinderVariant
  qty: number
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
  | { type: 'setCylinder'; cylinder: CylinderVariant }
  | { type: 'setQty'; qty: number }
  | { type: 'setDate'; dateIndex: number }
  | { type: 'setSlot'; slot: TimeSlotId }
  | { type: 'setPayment'; payment: PaymentMethod }
  | { type: 'toggleOffer' }
  | { type: 'setNotEligible'; value: boolean }
  | { type: 'confirm' }
  | { type: 'reset' }

export const initialBooking: BookingState = {
  step: 0,
  cylinder: 'domestic14',
  qty: 1,
  dateIndex: 0,
  slot: 'morning',
  payment: 'upi',
  offerApplied: true,
  notEligible: false,
  bookingRef: null,
  dac: null,
  bookedAt: null,
}

const STORAGE_KEY = 'bookmygas.demo.booking'

const maxQtyFor = (cylinder: CylinderVariant) => getCylinder(cylinder).maxQty[SAMPLE_CONNECTION.connectionType]

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'next':
      if (state.step === 0 && state.notEligible) return state
      return { ...state, step: Math.min(state.step + 1, LAST_STEP - 1) }
    case 'back':
      return { ...state, step: Math.max(state.step - 1, 0) }
    case 'goto':
      return { ...state, step: action.step }
    case 'setCylinder':
      return { ...state, cylinder: action.cylinder, qty: Math.min(state.qty, maxQtyFor(action.cylinder)) }
    case 'setQty':
      return { ...state, qty: Math.max(1, Math.min(action.qty, maxQtyFor(state.cylinder))) }
    case 'setDate':
      return { ...state, dateIndex: action.dateIndex }
    case 'setSlot':
      return { ...state, slot: action.slot }
    case 'setPayment':
      return { ...state, payment: action.payment }
    case 'toggleOffer':
      return { ...state, offerApplied: !state.offerApplied }
    case 'setNotEligible':
      return { ...initialBooking, notEligible: action.value }
    case 'confirm':
      return {
        ...state,
        step: LAST_STEP,
        bookingRef: generateBookingRef(),
        dac: generateDac(),
        bookedAt: new Date().toISOString(),
      }
    case 'reset':
      return initialBooking
  }
}

export function priceBreakdown(state: BookingState) {
  const cyl = getCylinder(state.cylinder)
  const subtotal = cyl.price * state.qty
  const discount = state.offerApplied ? DEMO_OFFER.discount : 0
  return { unit: cyl.price, subtotal, delivery: 0, discount, total: subtotal - discount }
}

function load(): BookingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialBooking
    const saved = JSON.parse(raw) as BookingState
    return saved.step === LAST_STEP && saved.bookingRef ? { ...initialBooking, ...saved } : initialBooking
  } catch {
    return initialBooking
  }
}

export function useBooking() {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    try {
      if (state.step === LAST_STEP) localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* storage unavailable: demo still works without persistence */
    }
  }, [state])

  return { state, dispatch, maxQty: maxQtyFor(state.cylinder) }
}

export type BookingDispatch = ReturnType<typeof useBooking>['dispatch']

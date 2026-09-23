import { addDays, formatDate } from './format'

export const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', time: '8 AM – 12 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '12 – 4 PM' },
  { id: 'evening', label: 'Evening', time: '4 – 8 PM' },
] as const

export type TimeSlotId = (typeof TIME_SLOTS)[number]['id']

export interface DateOption {
  iso: string
  day: string
  date: string
  label: string
}

export function nextDates(count = 3, from = new Date()): DateOption[] {
  return Array.from({ length: count }, (_, i) => {
    const d = addDays(from, i + 1)
    return {
      iso: d.toISOString().slice(0, 10),
      day: i === 0 ? 'Tomorrow' : formatDate(d, { weekday: 'short' }),
      date: formatDate(d, { day: 'numeric', month: 'short' }),
      label: formatDate(d, { weekday: 'long', day: 'numeric', month: 'long' }),
    }
  })
}

/** Deterministic "filling fast" marker so the demo looks the same each run. */
export const isFillingFast = (dateIndex: number, slot: TimeSlotId) => dateIndex === 0 && slot === 'evening'

export const FREQUENCIES = [
  { id: 'once', label: 'One-time', sub: 'Just this order' },
  { id: 'weekly', label: 'Weekly', sub: 'Same day every week' },
  { id: 'fortnightly', label: 'Fortnightly', sub: 'Every 2 weeks' },
  { id: 'monthly', label: 'Monthly', sub: 'Once a month' },
] as const

export const frequencyLabel = (id: (typeof FREQUENCIES)[number]['id']) => FREQUENCIES.find((f) => f.id === id)!.label

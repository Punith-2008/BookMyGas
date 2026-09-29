const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
const inrPaise = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })

/** Whole rupees print without decimals; amounts with paise print both digits. */
export const formatINR = (n: number) => (Number.isInteger(round2(n)) ? inr : inrPaise).format(round2(n))

export const round2 = (n: number) => Math.round(n * 100) / 100

export const formatDate = (d: Date, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }) =>
  d.toLocaleDateString('en-IN', opts)

export const addDays = (d: Date, days: number) => {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + days)
  return copy
}

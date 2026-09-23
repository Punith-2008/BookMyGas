const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export const formatINR = (n: number) => inr.format(n)

export const formatDate = (d: Date, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }) =>
  d.toLocaleDateString('en-IN', opts)

export const addDays = (d: Date, days: number) => {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + days)
  return copy
}

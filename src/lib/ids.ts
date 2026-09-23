const digits = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')

export const generateBookingRef = () => `BMG-2026-${digits(5)}`

export const generateDac = () => String(1000 + Math.floor(Math.random() * 9000))

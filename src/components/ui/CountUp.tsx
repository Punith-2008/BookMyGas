import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
}

export function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? to : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, to, { duration, ease: 'easeOut', onUpdate: setValue })
    return () => controls.stop()
  }, [inView, reduced, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

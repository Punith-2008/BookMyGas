import { animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { formatINR } from '../../lib/format'

/** Rupee amount that animates smoothly between values. */
export function AnimatedINR({ value, className = '' }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)

  useEffect(() => {
    const controls = animate(prev.current, value, { duration: 0.5, ease: 'easeOut', onUpdate: (v) => setDisplay(Math.round(v)) })
    prev.current = value
    return () => controls.stop()
  }, [value])

  return <span className={className}>{formatINR(display)}</span>
}

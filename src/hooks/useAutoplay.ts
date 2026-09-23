import { useEffect, useRef } from 'react'

/** Calls `tick` every `interval` ms while `active`, stopping when `tick` returns false. */
export function useAutoplay(active: boolean, tick: () => boolean, interval = 3000) {
  const tickRef = useRef(tick)
  tickRef.current = tick

  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => {
      if (!tickRef.current()) window.clearInterval(id)
    }, interval)
    return () => window.clearInterval(id)
  }, [active, interval])
}

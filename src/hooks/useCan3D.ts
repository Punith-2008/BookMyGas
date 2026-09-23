import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    return false
  }
}

/** True when the 3D cylinder should render: WebGL available, motion allowed, and viewport ≥ 640px. */
export function useCan3D() {
  const reduced = useReducedMotion()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const webgl = hasWebGL()
    const update = () => setOk(webgl && mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return ok && !reduced
}

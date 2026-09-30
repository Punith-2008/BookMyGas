import { lazy, Suspense } from 'react'
import type { CylinderLook } from '../../data/cylinders'
import { useCan3D } from '../../hooks/useCan3D'
import { CylinderIllustration } from './CylinderIllustration'

const Scene = lazy(() => import('./IndaneCylinderScene'))

/**
 * A rotating, realistic 3D Indane cylinder (drag to spin), shaped and coloured for the given cylinder type.
 * Falls back to a still image on small screens, reduced motion, missing WebGL, and while the three.js chunk loads.
 */
export function IndaneCylinder3D({ look = 'domestic14', className = '' }: { look?: CylinderLook; className?: string }) {
  const can3D = useCan3D()
  const fallback = (
    <div className="grid h-full w-full place-items-center">
      {look === 'domestic14' ? (
        <img src="/indane-cylinder.png" alt="" className="h-[80%] w-auto animate-floaty drop-shadow-2xl" />
      ) : (
        <CylinderIllustration variant={look} className="h-[78%] w-auto animate-floaty drop-shadow-2xl" />
      )}
    </div>
  )

  return (
    <div className={`relative cursor-grab active:cursor-grabbing ${className}`} aria-hidden="true">
      {can3D ? (
        <Suspense fallback={fallback}>
          <Scene look={look} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}

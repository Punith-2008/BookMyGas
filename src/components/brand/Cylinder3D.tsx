import { lazy, Suspense } from 'react'
import type { CylinderLook } from '../../data/cylinders'
import { useCan3D } from '../../hooks/useCan3D'
import { CylinderIllustration } from './CylinderIllustration'

const Scene = lazy(() => import('./Cylinder3DScene'))

interface Cylinder3DProps {
  variant?: CylinderLook
  className?: string
  interactive?: boolean
}

/**
 * Interactive 3D LPG cylinder. Falls back to the SVG illustration on small screens,
 * reduced motion, missing WebGL, and while the three.js chunk loads.
 */
export function Cylinder3D({ variant = 'domestic14', className = '', interactive = true }: Cylinder3DProps) {
  const can3D = useCan3D()
  const fallback = (
    <div className="grid h-full w-full place-items-center">
      <CylinderIllustration variant={variant} className="h-[78%] w-auto animate-floaty drop-shadow-2xl" />
    </div>
  )

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {can3D ? (
        <Suspense fallback={fallback}>
          <Scene variant={variant} interactive={interactive} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}

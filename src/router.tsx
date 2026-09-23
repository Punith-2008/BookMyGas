import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import { CylinderLoader } from './components/brand/CylinderLoader'

const Demo = lazy(() => import('./pages/Demo'))

function DemoFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-navy-900">
      <CylinderLoader label="Loading demo…" dark />
    </div>
  )
}

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  {
    path: '/demo',
    element: (
      <Suspense fallback={<DemoFallback />}>
        <Demo />
      </Suspense>
    ),
  },
  { path: '*', element: <NotFound /> },
])

import { Link } from 'react-router-dom'
import { CylinderIllustration } from '../components/brand/CylinderIllustration'
import { DemoLink } from '../components/ui/DemoLink'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <CylinderIllustration mood="happy" className="mx-auto h-44 animate-floaty" />
        <h1 className="mt-6 text-3xl font-extrabold">This page ran out of gas</h1>
        <p className="mt-2 text-slate-600">The page you’re looking for doesn’t exist.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="rounded-full px-5 py-3 font-heading font-bold ring-1 ring-navy-900/15 hover:bg-white">
            ← Back to home
          </Link>
          <DemoLink>Try the Live Demo</DemoLink>
        </div>
      </div>
    </main>
  )
}

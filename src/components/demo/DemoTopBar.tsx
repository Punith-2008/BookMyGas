import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { CylinderLogo } from '../brand/CylinderLogo'

export function DemoTopBar({ onReset }: { onReset: () => void }) {
  return (
    <header className="relative z-20 border-b border-white/10 bg-navy-900/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4">
        <Link to="/" className="flex items-center gap-2 text-white" aria-label="Back to BookMyGas home">
          <CylinderLogo variant="mark" size={30} />
          <span className="font-heading font-extrabold">
            BookMy<span className="text-flame-400">Gas</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/20"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Start over</span>
          </button>
          <Link
            to="/"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-white/80 hover:text-white md:inline-flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
        </div>
      </div>
    </header>
  )
}

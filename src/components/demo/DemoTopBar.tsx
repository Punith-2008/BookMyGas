import { Link } from 'react-router-dom'
import { ArrowLeft, Pause, Play, RotateCcw } from 'lucide-react'
import { CylinderLogo } from '../brand/CylinderLogo'

interface DemoTopBarProps {
  autoplay: boolean
  onToggleAutoplay: () => void
  onReset: () => void
}

export function DemoTopBar({ autoplay, onToggleAutoplay, onReset }: DemoTopBarProps) {
  return (
    <header className="relative z-20 border-b border-white/10 bg-navy-900/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-white" aria-label="Back to BookMyGas home">
            <CylinderLogo variant="mark" size={30} />
            <span className="hidden font-heading font-extrabold sm:inline">
              BookMy<span className="text-flame-400">Gas</span>
            </span>
          </Link>
          <span className="hazard shrink-0 rounded-md border-2 border-white p-0.5 shadow-sticker" style={{ transform: 'rotate(-3deg)' }}>
            <span className="block rounded-sm bg-navy-900 px-2 py-0.5 font-heading text-[0.65rem] font-extrabold tracking-widest text-amber-400">
              DEMO MODE
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleAutoplay}
            aria-pressed={autoplay}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition ${autoplay ? 'bg-flame-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {autoplay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">Autoplay</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/20"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset demo</span>
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

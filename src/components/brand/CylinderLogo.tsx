interface CylinderLogoProps {
  variant?: 'full' | 'mark' | 'mono'
  className?: string
  size?: number
}

/**
 * BookMyGas brand mark: an LPG cylinder whose flame doubles as a location pin.
 * Original artwork, not derived from any IOCL/Indane logo.
 */
export function CylinderLogo({ variant = 'full', className = '', size = 36 }: CylinderLogoProps) {
  const mono = variant === 'mono'
  const flame = mono ? '#FFFFFF' : '#FF6B1A'
  const body = mono ? '#FFFFFF' : '#D7261E'
  const valve = mono ? '#FFFFFF' : '#C9A227'
  const band = mono ? '#0B1F3A' : '#FFFFFF'

  const mark = (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
      {/* flame + pin: evenodd cut-out forms the pin hole */}
      <path
        fillRule="evenodd"
        fill={flame}
        d="M24 1.5c4.6 5.2 7.4 8.6 7.4 12.6a7.4 7.4 0 0 1-14.8 0c0-4 2.8-7.4 7.4-12.6zM24 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
      />
      <rect x="20.5" y="21.5" width="7" height="4" rx="1.2" fill={valve} />
      <path d="M13 34c0-5.2 4.6-8 11-8s11 2.8 11 8v9a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3z" fill={body} />
      <rect x="13" y="35.5" width="22" height="4" fill={band} opacity="0.95" />
    </svg>
  )

  if (variant === 'mark') return <span className={className}>{mark}</span>

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {mark}
      <span className={`font-heading text-xl font-extrabold tracking-tight ${mono ? 'text-white' : 'text-navy-900'}`}>
        BookMy<span className="text-flame-500">Gas</span>
      </span>
    </span>
  )
}

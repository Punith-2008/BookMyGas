import { useId } from 'react'

interface CylinderLoaderProps {
  label?: string
  dark?: boolean
  size?: number
}

/** A small cylinder that fills with orange, used as a loading/processing indicator. */
export function CylinderLoader({ label = 'Loading…', dark = false, size = 64 }: CylinderLoaderProps) {
  const uid = useId().replace(/:/g, '')
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3">
      <svg width={size} height={size * 1.4} viewBox="0 0 60 84" aria-hidden="true">
        <defs>
          <clipPath id={`clip-${uid}`}>
            <path d="M8 30c0-11 10-16 22-16s22 5 22 16v42a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5z" />
          </clipPath>
        </defs>
        <rect x="24" y="4" width="12" height="9" rx="2" fill="#C9A227" />
        <path
          d="M8 30c0-11 10-16 22-16s22 5 22 16v42a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5z"
          fill={dark ? '#1E3A8A' : '#E2E8F0'}
        />
        <g clipPath={`url(#clip-${uid})`}>
          <rect x="0" y="0" width="60" height="84" fill="#FF6B1A">
            <animate attributeName="y" values="80;14;80" dur="2.2s" repeatCount="indefinite" />
          </rect>
          <path d="M0 0q7.5-4 15 0t15 0 15 0 15 0v6H0z" fill="#FF8A4C">
            <animateTransform attributeName="transform" type="translate" values="0 80;0 14;0 80" dur="2.2s" repeatCount="indefinite" />
          </path>
        </g>
        <path
          d="M8 30c0-11 10-16 22-16s22 5 22 16v42a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5z"
          fill="none"
          stroke={dark ? '#fff' : '#0B1F3A'}
          strokeOpacity="0.25"
          strokeWidth="2"
        />
      </svg>
      <span className={`text-sm font-semibold ${dark ? 'text-white/80' : 'text-navy-900/70'}`}>{label}</span>
    </div>
  )
}

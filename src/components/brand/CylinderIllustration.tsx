import { useId } from 'react'
import type { CylinderVariant } from '../../data/cylinders'

interface Palette {
  dark: string
  mid: string
  light: string
  text: string
}

const PALETTES: Record<CylinderVariant | 'empty', Palette> = {
  domestic14: { dark: '#9E1812', mid: '#D7261E', light: '#F4665E', text: '#0B1F3A' },
  domestic5: { dark: '#9E1812', mid: '#D7261E', light: '#F4665E', text: '#0B1F3A' },
  ftl5: { dark: '#8A96A6', mid: '#C9D1DB', light: '#F3F6FA', text: '#0B1F3A' },
  commercial19: { dark: '#143670', mid: '#1F4FA3', light: '#5C88D6', text: '#0B1F3A' },
  empty: { dark: '#7C8594', mid: '#A3ACB9', light: '#CDD3DC', text: '#64748B' },
}

/** Body height (in viewBox units) per variant, which gives realistic relative sizes. */
const BODY_HEIGHT: Record<CylinderVariant, number> = {
  domestic14: 150,
  domestic5: 96,
  ftl5: 96,
  commercial19: 176,
}

const LABEL: Record<CylinderVariant, string> = {
  domestic14: '14.2 kg',
  domestic5: '5 kg',
  ftl5: 'FTL 5 kg',
  commercial19: '19 kg',
}

interface CylinderIllustrationProps {
  variant?: CylinderVariant
  mood?: 'normal' | 'happy' | 'empty'
  className?: string
  title?: string
}

/** Original 2.5D SVG LPG cylinder with gradient shading. Used across the site and as the 3D fallback. */
export function CylinderIllustration({ variant = 'domestic14', mood = 'normal', className = '', title }: CylinderIllustrationProps) {
  const uid = useId().replace(/:/g, '')
  const p = mood === 'empty' ? PALETTES.empty : PALETTES[variant]
  const h = BODY_HEIGHT[variant]
  const top = 40
  const bottom = top + h
  const labelY = top + h * 0.42
  const vbH = bottom + 16

  return (
    <svg
      viewBox={`0 0 120 ${vbH}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor={p.dark} />
          <stop offset="0.28" stopColor={p.light} />
          <stop offset="0.5" stopColor={p.mid} />
          <stop offset="1" stopColor={p.dark} />
        </linearGradient>
        <linearGradient id={`brass-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8C6D12" />
          <stop offset="0.4" stopColor="#F2D16B" />
          <stop offset="1" stopColor="#8C6D12" />
        </linearGradient>
      </defs>

      {/* guard ring (shroud) with handle holes */}
      <path
        fillRule="evenodd"
        fill={`url(#body-${uid})`}
        d={`M36 ${top - 30}h48a4 4 0 0 1 4 4v26H32v-26a4 4 0 0 1 4-4zM42 ${top - 24}h12v8H42zM66 ${top - 24}h12v8H66z`}
      />
      {/* valve */}
      <rect x="52" y={top - 14} width="16" height="12" rx="2" fill={`url(#brass-${uid})`} />
      <rect x="56" y={top - 18} width="8" height="5" rx="1" fill="#6B7280" />

      {/* body with rounded shoulders */}
      <path
        fill={`url(#body-${uid})`}
        d={`M18 ${top + 30}C18 ${top + 8} 38 ${top} 60 ${top}S102 ${top + 8} 102 ${top + 30}V${bottom - 10}c0 7-5 10-12 10H30c-7 0-12-3-12-10z`}
      />
      {/* shoulder weld seam */}
      <path d={`M19 ${top + 30}H101`} stroke={p.dark} strokeOpacity="0.5" strokeWidth="1.2" />
      {/* specular highlight */}
      <rect x="30" y={top + 16} width="6" height={h - 36} rx="3" fill="#fff" opacity="0.28" />

      {/* label band */}
      <rect x="18" y={labelY} width="84" height="26" fill="#fff" opacity={mood === 'empty' ? 0.6 : 0.95} />
      <text
        x="60"
        y={labelY + 12}
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontSize="9"
        fontWeight="800"
        fill={p.text}
      >
        LPG · {LABEL[variant]}
      </text>
      <text x="60" y={labelY + 21} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fontWeight="600" fill="#FF6B1A">
        BookMyGas
      </text>

      {mood === 'happy' && (
        <g>
          <circle cx="48" cy={top + 20} r="4" fill="#0B1F3A" />
          <circle cx="72" cy={top + 20} r="4" fill="#0B1F3A" />
          <circle cx="49.4" cy={top + 18.6} r="1.3" fill="#fff" />
          <circle cx="73.4" cy={top + 18.6} r="1.3" fill="#fff" />
          <path d={`M50 ${top + 27}q10 8 20 0`} stroke="#0B1F3A" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <circle cx="40" cy={top + 27} r="3" fill="#FF8A4C" opacity="0.6" />
          <circle cx="80" cy={top + 27} r="3" fill="#FF8A4C" opacity="0.6" />
        </g>
      )}
      {mood === 'empty' && (
        <g stroke="#475569" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d={`M44 ${top + 18}l6 5m0-5l-6 5`} />
          <path d={`M70 ${top + 18}l6 5m0-5l-6 5`} />
          <path d={`M50 ${top + 30}q10 -6 20 0`} />
        </g>
      )}

      {/* foot ring */}
      <rect x="26" y={bottom - 1} width="68" height="12" rx="2" fill={p.dark} />
      <rect x="26" y={bottom - 1} width="68" height="3" fill="#000" opacity="0.18" />
    </svg>
  )
}

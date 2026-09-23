import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'bare'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-flame-500 text-white hover:bg-flame-600 animate-pulseGlow',
  secondary: 'bg-white text-navy-900 hover:bg-flame-50 ring-1 ring-navy-900/10',
  ghost: 'text-flame-600 hover:text-flame-700 underline-offset-4 hover:underline',
  bare: '',
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-lg',
}

interface DemoLinkProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  showIcon?: boolean
}

/**
 * The ONLY way the landing page links to the demo. Every CTA opens /demo in a new tab,
 * so the pitch deck and landing page stay open in the original tab.
 */
export function DemoLink({ children, variant = 'primary', size = 'md', className = '', showIcon = true }: DemoLinkProps) {
  const base = variant === 'bare' ? '' : 'inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold transition-colors'
  return (
    <Link
      to="/demo"
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${VARIANTS[variant]} ${variant === 'bare' || variant === 'ghost' ? '' : SIZES[size]} ${className}`}
    >
      {children}
      {showIcon && <ArrowUpRight className="h-[1.1em] w-[1.1em]" aria-hidden="true" />}
      <span className="sr-only"> (opens the live demo in a new tab)</span>
    </Link>
  )
}

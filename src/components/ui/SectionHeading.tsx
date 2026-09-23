import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  dark?: boolean
  align?: 'center' | 'left'
}

export function SectionHeading({ eyebrow, title, subtitle, dark = false, align = 'center' }: SectionHeadingProps) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${dark ? 'text-flame-400' : ''}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-extrabold leading-tight sm:text-4xl ${dark ? 'text-white' : 'text-navy-900'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-lg ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>}
    </Reveal>
  )
}

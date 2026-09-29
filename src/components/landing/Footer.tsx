import { Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react'
import { CylinderLogo } from '../brand/CylinderLogo'
import { Sticker } from '../brand/Sticker'
import { DemoLink } from '../ui/DemoLink'

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Twitter, label: 'X (Twitter)' },
  { icon: Instagram, label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-slate-300">
      <div className="cylinder-pattern pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
      <div className="container-x relative grid gap-10 py-14 md:grid-cols-3">
        <div>
          <CylinderLogo variant="mono" />
          <p className="mt-3 font-heading font-bold text-white">Book. Track. Cook.</p>
          <p className="mt-2 text-sm">Smart refill booking for Indane LPG consumers.</p>
          <DemoLink variant="ghost" className="mt-4 inline-flex items-center gap-1 text-flame-400">
            Try the live demo
          </DemoLink>
        </div>

        <div className="space-y-3 text-sm">
          <a href="mailto:hello@bookmygas.in" className="flex items-center gap-2 hover:text-white">
            <Mail className="h-4 w-4" aria-hidden="true" /> hello@bookmygas.in
          </a>
          <a href="tel:1906" className="flex items-center gap-2 hover:text-white">
            <Phone className="h-4 w-4" aria-hidden="true" /> LPG Emergency Helpline: 1906
          </a>
          <div className="flex gap-3 pt-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#top"
                aria-label={`${s.label} (placeholder)`}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 transition hover:bg-flame-500 hover:text-white"
              >
                <s.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:justify-self-end">
          <Sticker tone="red" rotate={-6} className="text-sm">
            🛡️ LPG Emergency: 1906
          </Sticker>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x space-y-2 py-6 text-xs text-slate-400">
          <p>
            Indane and IndianOil are trademarks of Indian Oil Corporation Ltd. BookMyGas is an independent concept demo and not an
            official IOCL product.
          </p>
          <p>Cylinder prices are IOCL MRPs for Hyderabad (September 2026). Volume discounts are illustrative and market figures are indicative. Built for demo purposes.</p>
          <p>© 2026 BookMyGas</p>
        </div>
      </div>
    </footer>
  )
}

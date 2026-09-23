import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { CylinderLogo } from '../brand/CylinderLogo'
import { DemoLink } from '../ui/DemoLink'

const LINKS = [
  { href: '#problem', label: 'Problem' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#business', label: 'For Business' },
  { href: '#market', label: 'Market' },
  { href: '#business-model', label: 'Business Model' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-white/80 shadow-card backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" aria-label="BookMyGas home">
          <CylinderLogo />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-semibold text-navy-900/80 transition-colors hover:text-flame-600">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <DemoLink size="sm" className="hidden sm:inline-flex">
            Try Live Demo
          </DemoLink>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-navy-900 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-navy-900/5 lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-semibold text-navy-900 hover:bg-flame-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <DemoLink className="w-full">Try Live Demo</DemoLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

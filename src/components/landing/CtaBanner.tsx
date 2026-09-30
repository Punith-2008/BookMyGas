import { motion } from 'framer-motion'

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 26" className="h-8 w-8 shrink-0" aria-hidden="true">
      <path d="M1.2.6 13.4 12.8 1.2 25a1.6 1.6 0 0 1-.7-1.4V2A1.6 1.6 0 0 1 1.2.6Z" fill="#00D7FE" />
      <path d="m17.5 8.7-4.1 4.1-12.2-12.2c.5-.3 1.2-.3 1.8 0l14.5 8.1Z" fill="#00F076" />
      <path d="M17.5 16.9 3 25c-.6.3-1.3.3-1.8 0l12.2-12.2 4.1 4.1Z" fill="#F83C4F" />
      <path d="m22.6 14.3-5.1 2.6-4.1-4.1 4.1-4.1 5.1 2.8c1.1.6 1.1 2.2 0 2.8Z" fill="#FFC400" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M16.37 1.43c0 1.14-.42 2.2-1.11 2.97-.8.9-2.1 1.6-3.14 1.51-.13-1.1.41-2.24 1.1-2.98.78-.85 2.12-1.49 3.15-1.5ZM20.5 17.2c-.56 1.3-.83 1.88-1.55 3.03-1 1.6-2.42 3.6-4.18 3.61-1.56.02-1.96-1.02-4.08-1-2.12.01-2.56 1.02-4.12 1-1.76-.01-3.1-1.82-4.1-3.42-2.8-4.46-3.1-9.7-1.37-12.5 1.23-1.98 3.17-3.14 5-3.14 1.85 0 3.02 1.02 4.56 1.02 1.5 0 2.4-1.02 4.56-1.02 1.63 0 3.36.89 4.6 2.42-4.04 2.22-3.38 8 .68 10Z" />
    </svg>
  )
}

const STORES = [
  { name: 'Google Play', icon: GooglePlayIcon },
  { name: 'App Store', icon: AppleIcon },
]

export function CtaBanner() {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-navy-900 px-6 py-14 sm:px-14">
        <div className="cylinder-pattern pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-flame-500/30 blur-3xl" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-flame-400">Coming soon</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              See it in action. Book an Indane refill in under a minute.
            </h2>
            <p className="mt-4 max-w-lg text-slate-300">No login, no downloads. Click through the full booking flow, from connection to DAC.</p>
            {/* Store badges: not links yet, the apps aren't published. */}
            <ul className="mt-8 flex flex-wrap gap-3" aria-label="Mobile apps">
              {STORES.map((s) => (
                <li
                  key={s.name}
                  className="inline-flex items-center gap-3 rounded-2xl bg-black px-5 py-2.5 text-white ring-1 ring-white/25"
                >
                  <s.icon />
                  <span className="leading-tight">
                    <span className="block text-xs text-white/80">Coming soon on</span>
                    <span className="block text-xl font-semibold tracking-tight">{s.name}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            className="mx-auto origin-bottom"
            animate={{ rotate: [0, -6, 6, -6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4 }}
            aria-hidden="true"
          >
            <img src="/mascot-cylinder.png" alt="" draggable={false} className="h-56 w-auto select-none drop-shadow-[0_0_40px_rgba(255,106,26,0.45)] sm:h-64" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

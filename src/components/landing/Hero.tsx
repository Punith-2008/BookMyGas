import { motion } from 'framer-motion'
import { ArrowDown, BadgeCheck, Flame } from 'lucide-react'
import { IndaneCylinder3D } from '../brand/IndaneCylinder3D'
import { Sticker } from '../brand/Sticker'
import { DemoLink } from '../ui/DemoLink'
import { SAMPLE_CONNECTION } from '../../data/connection'

function PhonePreview() {
  return (
    <div className="w-[210px] rounded-[2.2rem] border-[7px] border-navy-900 bg-navy-900 shadow-2xl">
      <div className="overflow-hidden rounded-[1.7rem] bg-slate-50">
        <div className="flex items-center justify-between bg-navy-900 px-4 pb-2 pt-3 text-[0.55rem] font-semibold text-white/80">
          <span>9:41</span>
          <span className="h-3 w-14 rounded-full bg-black" />
          <span>5G</span>
        </div>
        <div className="space-y-2 p-3">
          <p className="text-[0.6rem] font-semibold text-slate-500">Your Indane connection</p>
          <div className="rounded-xl bg-white p-2.5 shadow-card">
            <p className="font-heading text-xs font-bold">{SAMPLE_CONNECTION.consumerName}</p>
            <p className="text-[0.55rem] text-slate-500">Consumer No. {SAMPLE_CONNECTION.consumerNo}</p>
            <p className="mt-1 truncate text-[0.55rem] text-slate-500">{SAMPLE_CONNECTION.distributor}</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-mint-100 px-2 py-0.5 text-[0.55rem] font-bold text-mint-600">
              <BadgeCheck className="h-3 w-3" /> Eligible for refill
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {['14.2 kg', '10 kg', 'FTL 5 kg', '19 kg'].map((w, i) => (
              <div
                key={w}
                className={`rounded-lg p-1.5 text-center text-[0.55rem] font-bold ${i === 0 ? 'bg-flame-500 text-white' : 'bg-white text-navy-900 shadow-card'}`}
              >
                {w}
              </div>
            ))}
          </div>
          <div className="rounded-full bg-flame-500 py-1.5 text-center text-[0.6rem] font-bold text-white">Book Refill →</div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
      {/* glow + rising flame particles */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[640px] w-[640px] rounded-full bg-flame-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-navy-600/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[12, 28, 46, 63, 78, 90].map((left, i) => (
          <span
            key={left}
            className="absolute bottom-10 h-2 w-2 animate-rise rounded-full bg-flame-400/70"
            style={{ left: `${left}%`, animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </div>

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-flame-100 px-3 py-1.5 text-xs font-semibold text-flame-700"
            >
              <Flame className="h-3.5 w-3.5" /> For Indane (IOCL) consumers &amp; distributors
            </motion.p>
            <Sticker tone="amber" rotate={5} delay={0.6} className="text-xs">
              🔥 Gas khatam? No tension.
            </Sticker>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl"
          >
            Book your Indane LPG refill in <span className="whitespace-nowrap text-flame-500">30 seconds.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-slate-600"
          >
            Confirm your connection, pick a delivery slot, pay by UPI, and get your DAC and digital cash memo on your phone. No IVRS
            calls. No visits to the distributor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <DemoLink size="lg">Try the Live Demo</DemoLink>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-heading font-bold text-navy-900 ring-1 ring-navy-900/15 transition hover:bg-white"
            >
              See how it works <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>

          <p className="mt-6 text-sm text-slate-500">Book. Track. Cook. · Works alongside IOCL&apos;s official booking channels</p>
        </div>

        {/* visual: 3D cylinder + phone */}
        <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[520px]">
          <div className="absolute inset-y-0 left-0 w-[64%]">
            <IndaneCylinder3D className="h-full w-full" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
            className="absolute bottom-0 right-0 origin-bottom-right scale-[0.85] sm:bottom-4 sm:scale-100"
          >
            <div className="relative">
              <PhonePreview />
              <Sticker shape="burst" tone="flame" rotate={-10} delay={0.9} className="absolute -left-12 -top-12 w-24 sm:w-28">
                ⚡ Booked in 30 sec
              </Sticker>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

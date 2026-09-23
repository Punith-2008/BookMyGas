import { motion } from 'framer-motion'
import { Home, Info, MapPin, Truck } from 'lucide-react'
import { SAMPLE_CONNECTION } from '../../data/connection'

function MapIllustration() {
  return (
    <div className="relative h-44 overflow-hidden rounded-2xl bg-[#EAF1E4]" aria-hidden="true">
      <svg viewBox="0 0 320 176" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="176" fill="#EAF1E4" />
        <rect x="0" y="0" width="90" height="60" fill="#D8E8CF" />
        <rect x="220" y="110" width="100" height="66" fill="#D8E8CF" />
        <path d="M-10 120 L330 70" stroke="#fff" strokeWidth="16" />
        <path d="M150 -10 L190 190" stroke="#fff" strokeWidth="12" />
        <path d="M-10 30 L330 150" stroke="#fff" strokeWidth="8" />
        <path d="M-10 120 L330 70" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M58 118 C 110 100, 150 92, 196 82" stroke="#FF6B1A" strokeWidth="3" fill="none" strokeDasharray="4 5" strokeLinecap="round" />
        <path d="M250 20 q10 -10 20 0 t20 0" stroke="#9EC5E8" strokeWidth="10" fill="none" />
      </svg>
      {/* distributor godown with the delivery truck waiting */}
      <div className="absolute bottom-8 left-5 flex flex-col items-center">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-900 text-white shadow-lg">
          <Truck className="h-4 w-4" />
        </span>
        <span className="mt-1 rounded bg-white/90 px-1.5 text-[0.55rem] font-bold">Godown</span>
      </div>
      {/* dropping pin */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.2 }}
        className="absolute left-[58%] top-[22%] flex flex-col items-center"
      >
        <MapPin className="h-10 w-10 fill-flame-500 text-white drop-shadow-lg" />
        <span className="h-1.5 w-4 rounded-full bg-black/20 blur-[1px]" />
      </motion.div>
    </div>
  )
}

export function StepAddress() {
  const c = SAMPLE_CONNECTION
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold">Delivery address</h2>
        <p className="text-sm text-slate-500">Where should we deliver your refill?</p>
      </div>
      <MapIllustration />
      <div className="flex gap-3 rounded-2xl bg-flame-50 p-4 ring-2 ring-flame-500">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-flame-500 text-white">
          <Home className="h-5 w-5" />
        </span>
        <div className="text-sm">
          <p className="font-bold">
            Home <span className="ml-1 rounded-full bg-white px-2 py-0.5 text-[0.6rem] font-bold text-flame-700">Registered</span>
          </p>
          <p className="mt-0.5 text-slate-600">{c.address}</p>
          <p className="text-slate-600">{c.city}</p>
        </div>
      </div>
      <p className="flex gap-2 text-xs text-slate-500">
        <Info className="h-4 w-4 shrink-0" /> Refills are delivered to your registered address. To change it, contact your distributor.
      </p>
    </div>
  )
}

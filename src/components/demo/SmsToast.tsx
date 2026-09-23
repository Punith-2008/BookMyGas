import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

export function SmsToast({ bookingRef, dac, distributor, bulk }: { bookingRef: string; dac: string; distributor: string; bulk: boolean }) {
  return (
    <motion.div
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -120, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.8 }}
      className="absolute inset-x-3 top-3 z-40 rounded-2xl bg-white/95 p-3 shadow-2xl ring-1 ring-navy-900/10 backdrop-blur lg:top-8"
      role="status"
    >
      <div className="flex items-center gap-2 text-[0.65rem] font-semibold text-slate-500">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-mint-500 text-white">
          <MessageSquare className="h-3 w-3" />
        </span>
        MESSAGES · BK-BMYGAS · now
      </div>
      <p className="mt-1.5 text-xs leading-snug text-navy-900">
        Your Indane {bulk ? 'commercial bulk order' : 'refill booking'} <b>{bookingRef}</b> is confirmed. DAC: <b>{dac}</b>. Distributor: {distributor}. – BookMyGas
      </p>
    </motion.div>
  )
}

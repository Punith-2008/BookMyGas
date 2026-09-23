import { motion } from 'framer-motion'
import { CylinderIllustration } from '../brand/CylinderIllustration'
import { Sticker } from '../brand/Sticker'
import { DemoLink } from '../ui/DemoLink'
import { SectionHeading } from '../ui/SectionHeading'
import { CYLINDERS } from '../../data/cylinders'

export function CylinderRange() {
  return (
    <section id="range" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Indane range"
          title="Every Indane cylinder, one app"
          subtitle="From the everyday 14.2 kg kitchen refill to 19 kg and 47.5 kg commercial cylinders for businesses."
        />

        <div className="grid grid-cols-2 items-end gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {CYLINDERS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 90 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative flex h-64 items-end sm:h-72">
                <CylinderIllustration
                  variant={c.id}
                  title={c.name}
                  className="h-auto w-28 transition-transform duration-300 group-hover:-translate-y-3 group-hover:scale-105 sm:w-32"
                />
                <Sticker shape="cylinder" tone={c.category === 'Commercial' ? 'navy' : 'flame'} rotate={i % 2 ? 8 : -8} delay={0.3 + i * 0.1} className="absolute -right-2 top-1/3 text-[0.7rem] sm:-right-6">
                  {c.weight}
                </Sticker>
              </div>
              <div className="mx-auto mt-3 h-2 w-24 rounded-full bg-navy-900/10 blur-[2px]" />
              <h3 className="mt-4 text-base font-bold">{c.name}</h3>
              <p className="mt-1 max-w-[16rem] text-sm text-slate-600">{c.useCase}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <DemoLink variant="secondary" size="lg">
            Book any of these in the demo
          </DemoLink>
        </div>
      </div>
    </section>
  )
}

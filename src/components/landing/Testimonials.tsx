import { Quote, Star } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const QUOTES = [
  {
    initials: 'AK',
    persona: 'Homemaker, Pune',
    quote: 'I booked our refill while the dal was cooking. The DAC was right there when the cylinder came, with no hunting through SMS.',
  },
  {
    initials: 'RS',
    persona: 'Indane distributor, Indore',
    quote: 'Seeing bookings by slot the evening before means my delivery boys run full routes. Fewer missed deliveries, fewer calls.',
  },
  {
    initials: 'MJ',
    persona: 'Restaurant owner, Nagpur (19 kg commercial)',
    quote: 'Two commercial cylinders, a fixed morning slot and a digital cash memo for my accounts. That’s all I wanted.',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="What people would say" title="Built for households and distributors alike" />
        <div className="grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.persona} delay={i * 0.1}>
              <figure className="relative h-full rounded-3xl bg-white p-6 shadow-card">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-flame-100" aria-hidden="true" />
                <div className="flex gap-0.5 text-amber-400" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-slate-700">“{q.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy-900 font-heading text-sm font-bold text-white">
                    {q.initials}
                  </span>
                  <span className="text-sm font-semibold">{q.persona}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">Sample personas for illustration, not real reviews.</p>
      </div>
    </section>
  )
}

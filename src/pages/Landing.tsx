import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { Problem } from '../components/landing/Problem'
import { HowItWorks } from '../components/landing/HowItWorks'
import { Features } from '../components/landing/Features'
import { CylinderRange } from '../components/landing/CylinderRange'
import { ForBusiness } from '../components/landing/ForBusiness'
import { Market } from '../components/landing/Market'
import { BusinessModel } from '../components/landing/BusinessModel'
import { Compare } from '../components/landing/Compare'
import { Roadmap } from '../components/landing/Roadmap'
import { Testimonials } from '../components/landing/Testimonials'
import { CtaBanner } from '../components/landing/CtaBanner'
import { Footer } from '../components/landing/Footer'

export default function Landing() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <CylinderRange />
        <ForBusiness />
        <Compare />
        <Market />
        <BusinessModel />
        <Roadmap />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}

import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { HowItWorks } from '../components/landing/HowItWorks'
import { Documentation } from '../components/landing/Documentation'
import { ForBusiness } from '../components/landing/ForBusiness'
import { Compare } from '../components/landing/Compare'
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
        <HowItWorks />
        <Documentation />
        <ForBusiness />
        <Compare />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}

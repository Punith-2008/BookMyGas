import { useEffect } from 'react'
import { Navbar, type NavLinkItem } from '../components/landing/Navbar'
import { Problem } from '../components/landing/Problem'
import { Market } from '../components/landing/Market'
import { BusinessModel } from '../components/landing/BusinessModel'
import { Roadmap } from '../components/landing/Roadmap'
import { CtaBanner } from '../components/landing/CtaBanner'
import { Footer } from '../components/landing/Footer'

const PITCH_LINKS: NavLinkItem[] = [
  { href: '#problem', label: 'Problem' },
  { href: '#market', label: 'Market' },
  { href: '#business-model', label: 'Business Model' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '/', label: 'Home' },
]

/** Investor / IOCL pitch: the problem, market, business model and roadmap. */
export default function Pitch() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const previous = document.title
    document.title = 'Pitch · BookMyGas'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <>
      <Navbar links={PITCH_LINKS} home="/" />
      <main id="main">
        <header className="container-x pb-4 pt-28 text-center sm:pt-32">
          <p className="eyebrow">The pitch</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">Why BookMyGas, and how it grows</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            The problem with LPG refill booking today, the size of the opportunity, and how BookMyGas makes money.
          </p>
        </header>
        <Problem />
        <Market />
        <BusinessModel />
        <Roadmap />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}

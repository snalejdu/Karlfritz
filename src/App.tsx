import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP, reduceMotion } from './lib/gsap'
import { startLenis } from './lib/lenis'
import { initLiquidGlass } from './lib/liquid'
import { GlassFilters, detectGlass } from './components/GlassFilters'
import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { Built } from './sections/Built'
import { Tools } from './sections/Tools'
import { Services } from './sections/Services'
import { Statement } from './sections/Statement'
import { Work } from './sections/Work'
import { Process } from './sections/Process'
import { Split } from './sections/Split'
import { About } from './sections/About'
import { Proof } from './sections/Proof'
import { Why } from './sections/Why'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { profile } from './content/site'

export default function App() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    detectGlass()
    startLenis()
    return initLiquidGlass()
  }, [])

  // Global scroll reveals: [data-reveal], [data-split] headings, [data-words] scrubbed word fade
  useGSAP(
    () => {
      if (reduceMotion()) return

      gsap.set('[data-reveal]', { y: 36, opacity: 0 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, overwrite: true }),
      })

      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines,words',
          mask: 'lines',
          wordsClass: 'w',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 140,
              duration: 1.3,
              stagger: 0.04,
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
              onComplete: () => self.revert(),
            }),
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-words]').forEach((el) => {
        SplitText.create(el, {
          type: 'words',
          wordsClass: 'w',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(self.words, { opacity: 0.16 }, {
              opacity: 1, stagger: 0.1, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
            }),
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-underline]').forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => el.classList.add('is-in') })
      })

      gsap.utils.toArray<HTMLElement>('[data-ghost]').forEach((el) => {
        gsap.fromTo(el, { yPercent: 12, opacity: 0 }, { yPercent: -8, opacity: 1, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      })

      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <GlassFilters />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Built />
        <Tools />
        <Services />
        <Statement />
        <Work />
        <Split />
        <Process />
        <Proof />
        <Why />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      {profile.available && (
        <a href="#contact" className="glass glass-dark glass-liquid fixed bottom-5 left-5 z-40 hidden items-center rounded-full px-5 py-2.5 text-[13px] font-semibold sm:flex">
          Available for projects
        </a>
      )}
    </div>
  )
}

import { useRef } from 'react'
import { gsap, SplitText, useGSAP, reduceMotion } from '../lib/gsap'
import { scrollToTarget } from '../lib/lenis'
import { hero } from '../content/site'
import { Arrow } from '../components/Icons'

/** Hero background: Karl's workspace, pre-blurred and darkened (public/images/hero-workspace.webp). */
function HeroScene() {
  return (
    <div className="theme-keep absolute inset-0" data-hero-bg>
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <img src="images/hero-workspace.webp" alt="" aria-hidden width={1280} height={720} decoding="async" fetchPriority="high" className="hero-photo absolute inset-0 h-full w-full scale-105 object-cover" />
      {/* same shade recipe as the reference: vignette + fade to page black */}
      <div className="hero-shade absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_46%,rgba(0,0,0,.1),rgba(0,0,0,.72)_78%)]" />
      <div className="hero-shade absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      if (reduceMotion()) return
      SplitText.create(q('[data-hero-title] > span'), {
        type: 'lines,words',
        mask: 'lines',
        wordsClass: 'w',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, { yPercent: 140, duration: 1.4, stagger: 0.06, delay: 0.35, onComplete: () => self.revert() })
        },
      })
      gsap.from(q('[data-hero-fade]'), { y: 24, opacity: 0, duration: 1.3, stagger: 0.1, delay: 0.9 })
      gsap.from(q('[data-hero-bg]'), { scale: 1.15, opacity: 0, duration: 2.2, ease: 'power2.out' })

      // parallax out on scroll
      gsap.to(q('[data-hero-bg]'), { yPercent: 18, scale: 1.06, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to(q('[data-hero-content]'), { yPercent: -12, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root}>
      <div className="relative flex min-h-[max(640px,100svh)] flex-col overflow-hidden bg-[var(--hero-bg)]">
        <HeroScene />
        <div data-hero-content className="relative z-10 flex flex-1 flex-col items-center justify-center px-[var(--pad-x)] pb-[90px] pt-[110px] text-center sm:pb-20 sm:pt-[120px]">
          <span data-hero-fade className="eyebrow eyebrow-pill glass glass-liquid mb-7 text-[11px] sm:text-[12px]"><span className="sm:hidden">{hero.eyebrowShort}</span><span className="hidden sm:inline">{hero.eyebrow}</span></span>
          <h1 data-hero-title className="h-display max-w-[1480px]">
            <span className="block">{hero.line1}</span>
            <span className="block">{hero.line2}</span>
          </h1>
          <p data-hero-fade className="mt-7 max-w-[640px] text-[clamp(1rem,1.45vw,1.16rem)] leading-[1.55] text-[var(--text-2)]">{hero.sub}</p>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#work" onClick={(e) => { e.preventDefault(); scrollToTarget('#work') }} className="btn btn-primary">View my work <Arrow /></a>
            <a href="#process" onClick={(e) => { e.preventDefault(); scrollToTarget('#process') }} className="btn btn-glass glass glass-liquid">How I build</a>
          </div>
          <ul data-hero-fade className="mt-11 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)] sm:text-[12px]">
            {hero.ticker.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>


        <div className="absolute bottom-10 left-[var(--pad-x)] z-10 hidden flex-col items-center gap-3 md:flex" data-hero-fade>
          <span className="text-[11px] tracking-[0.24em] text-[var(--text-3)]">SCROLL</span>
          <span className="relative h-[46px] w-px overflow-hidden bg-white/15">
          </span>
        </div>
      </div>
    </section>
  )
}

import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { process } from '../content/site'
import { Eyebrow } from '../components/Eyebrow'

export function Process() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 58%',
          end: 'bottom 58%',
          onToggle: (self) => self.isActive && setActive(i),
        })
      })
      gsap.fromTo('[data-progress]', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '[data-steps]', start: 'top 58%', end: 'bottom 58%', scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="process" className="section wrap">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,514px)_minmax(0,566px)] lg:justify-between">
        <div className="lg:sticky lg:top-[128px] lg:h-fit">
          <Eyebrow>How I build</Eyebrow>
          <h2 className="h-section-sm mt-5" data-split>
            Idea to live app,
            <br />
            <span className="text-grad">in five steps.</span>
          </h2>

          {/* number reel: all numbers stacked, the column slides to the active one */}
          <div className="mt-8 hidden h-[clamp(7rem,13vw,10.4rem)] overflow-hidden lg:block" aria-hidden>
            <div
              className="transition-transform duration-[900ms]"
              style={{ transform: `translateY(-${(active * 100) / process.length}%)`, transitionTimingFunction: 'var(--ease)' }}
            >
              {process.map((_, i) => (
                <div key={i} className="chrome-deep h-[clamp(7rem,13vw,10.4rem)] text-[clamp(7rem,13vw,10.4rem)] font-bold leading-none tracking-[-0.07em]">
                  0{i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 hidden h-[2px] w-[240px] overflow-hidden rounded-[2px] bg-white/[.09] lg:block">
            <div data-progress className="h-full origin-left bg-white" />
          </div>
          <div className="mt-4 hidden text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--text-3)] lg:block">
            {process[active].step}
          </div>
        </div>

        <div data-steps className="space-y-4 lg:pb-32 lg:pt-36">
          {process.map((p, i) => (
            <div
              key={p.step}
              data-step
              className={`glass rounded-[28px] px-[30px] pb-[34px] pt-8 transition-opacity duration-700 sm:px-[38px] sm:pb-[38px] sm:pt-[34px] ${active === i ? 'opacity-100' : 'lg:opacity-[.32]'}`}
              style={{ transitionTimingFunction: 'var(--ease)' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--text-3)]">
                  <span className="mr-2 lg:hidden">0{i + 1} ·</span>{p.step}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {p.tools.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
              <h3 className="mt-5 text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-[1.08] tracking-[-0.035em]">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--text-lede)]">{p.desc}</p>
              {/* TODO(Karl): replace with a real prompt / terminal output you used */}
              <pre className="mono mt-6 overflow-x-auto whitespace-pre-wrap rounded-2xl bg-black/40 p-4 text-[12.5px] leading-relaxed text-white/[.7] shadow-[0_0_0_1px_rgba(255,255,255,.06)]">{p.snippet}</pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

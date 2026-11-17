import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { projects } from '../content/site'
import { Eyebrow } from '../components/Eyebrow'
import { ProjectShots } from '../components/ProjectShots'
import { ArrowUpRight } from '../components/Icons'

export function Work() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduceMotion()) return
      const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        const st = { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true }
        gsap.to(card.querySelector('[data-stack-inner]'), { scale: 0.9, ease: 'none', scrollTrigger: st })
        gsap.to(card.querySelector('[data-stack-dim]'), { opacity: 0.6, ease: 'none', scrollTrigger: { ...st } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="work" className="pb-[clamp(72px,6vw,88px)]">
      <div className="wrap flex flex-wrap items-end justify-between gap-6 pt-[clamp(72px,6vw,88px)]">
        <div>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="h-section mt-6" data-split>
            From idea to live.
            <br />
            <span className="text-grad">Projects that ship.</span>
          </h2>
        </div>
      </div>

      <div className="wrap mt-12">
        {projects.map((p, i) => (
          <article
            key={p.slug}
            data-stack-card
            className="sticky mb-[6vh] last:mb-0"
            style={{ top: `calc(${82 + i * 12}px + clamp(0px, 1vw, 12px))` }}
          >
            <div
              data-stack-inner
              className="theme-keep relative aspect-[335/363] origin-top overflow-hidden rounded-[32px] bg-[#0b0b0b] shadow-[0_50px_120px_-40px_rgba(0,0,0,.95),0_0_0_1px_rgba(255,255,255,.09)] will-change-transform sm:aspect-[1157/608]"
            >
              <ProjectShots shots={p.shots} alt={`${p.title} screenshot`} rotate />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <span className="badge-live glass glass-dark absolute right-4 top-4 z-10 sm:right-5 sm:top-5">{p.status}</span>

              <div className="glass glass-cap absolute inset-x-3 bottom-3 rounded-[24px] px-5 pb-[22px] pt-[18px] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[min(418px,calc(100%-48px))] sm:px-[26px] sm:pb-6 sm:pt-[22px]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-lede)] sm:text-[11.5px]">{p.kicker}</div>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <h3 className="text-[clamp(1.6rem,2.6vw,2.3rem)] font-semibold leading-none tracking-[-0.035em]">{p.title}</h3>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer" className="corner-icon shrink-0" aria-label={`Open ${p.title}`}>
                      <ArrowUpRight />
                    </a>
                  )}
                </div>
                <p className="mt-2.5 hidden text-[14.5px] leading-relaxed text-[var(--text-lede)] md:block">{p.summary}</p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              </div>
              <div data-stack-dim className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />
            </div>
          </article>
        ))}
      </div>

    </section>
  )
}

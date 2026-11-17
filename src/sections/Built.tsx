import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { Eyebrow } from '../components/Eyebrow'
import { ScaledFrame } from '../components/ScaledFrame'
import { projects } from '../content/site'

const FULL = { src: 'images/projects/waypt-full.webp', w: 1600, h: 2065 }
const waypt = projects.find((p) => p.slug === 'waypt')

const VIEW_H = 760

export function Built() {
  const root = useRef<HTMLElement>(null)
  const page = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduceMotion()) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 0px)', () => {
        gsap.from('[data-browser]', {
          y: 140, scale: 0.9, opacity: 0.3, ease: 'none',
          scrollTrigger: { trigger: '[data-browser]', start: 'top bottom', end: 'top 30%', scrub: true },
        })
        gsap.to(page.current, {
          y: () => -((page.current?.offsetHeight ?? VIEW_H) - VIEW_H), ease: 'none',
          scrollTrigger: { trigger: '[data-browser-pin]', start: 'center center', end: '+=900', scrub: 0.6, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="built" className="pb-[clamp(56px,5.6vw,80px)] pt-[clamp(80px,7.6vw,110px)]">
      <div className="wrap text-center">
        <Eyebrow pill>Featured build · Waypt</Eyebrow>
        <h2 className="h-section mt-6" data-split>
          Built <span className="text-grad">like this.</span>
        </h2>
      </div>

      <div data-browser-pin className="wrap mt-12">
        <div data-browser className="glass mx-auto max-w-[1040px] rounded-[30px] px-2.5 pb-2.5">
          <div className="flex h-[35px] items-center gap-3 px-2">
            <div className="flex gap-1.5">
              <i className="h-3 w-3 rounded-full bg-white/20" /><i className="h-3 w-3 rounded-full bg-white/20" /><i className="h-3 w-3 rounded-full bg-white/20" />
            </div>
            <div className="glass mx-auto flex h-5 items-center gap-1 rounded-full px-[22px] text-[12.5px] text-[var(--text-lede)] [box-shadow:none]">
              <span className="text-[var(--text-4)]">https://</span>{waypt?.url?.replace(/^https?:\/\//, '') ?? 'waypt.app'}
            </div>
            <div className="w-[52px]" />
          </div>
          <ScaledFrame width={1280} height={VIEW_H} className="rounded-[22px] bg-[#0b0b0b] shadow-[0_0_0_1px_rgba(255,255,255,.06)]">
            <div ref={page} className="will-change-transform"><img src={FULL.src} width={1280} height={Math.round((FULL.h * 1280) / FULL.w)} alt="Waypt home page, scrolled" className="block h-auto w-[1280px]" /></div>
          </ScaledFrame>
        </div>
      </div>

      <p className="mx-auto mt-9 max-w-[560px] px-[var(--pad-x)] text-center text-[17px] leading-relaxed text-[var(--text-lede)]" data-reveal>
        A real project, scrolled live. Planned with AI, refined by hand, built for tourists exploring Bohol.
      </p>
    </section>
  )
}

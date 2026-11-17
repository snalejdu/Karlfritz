import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { contact, profile } from '../content/site'
import { Arrow, Social } from '../components/Icons'

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const sphere = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduceMotion()) return
      const s = sphere.current!
      gsap.to(s, { y: -26, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.fromTo(s, { xPercent: 30, scale: 0.7, opacity: 0 }, {
        xPercent: 0, scale: 1, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'center center', scrub: true },
      })
      const xTo = gsap.quickTo(s, 'x', { duration: 1.6, ease: 'power3' })
      const move = (e: PointerEvent) => xTo((e.clientX / window.innerWidth - 0.5) * 160)
      window.addEventListener('pointermove', move)
      return () => window.removeEventListener('pointermove', move)
    },
    { scope: root },
  )

  return (
    <section ref={root} id="contact" className="relative overflow-hidden pb-[clamp(96px,9.4vw,120px)] pt-[clamp(110px,10.6vw,136px)]">
      <div className="wrap relative text-center">
        <h2 className="text-[clamp(2.25rem,6vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.055em]" data-split>
          {contact.line1}
          <br />
          <span className="text-grad">{contact.line2}</span>
        </h2>
        <div
          ref={sphere}
          aria-hidden
          className="sphere pointer-events-none absolute right-[-4%] top-[-10%] z-10 sm:right-[8%] lg:right-[17%] h-[clamp(120px,16vw,220px)] w-[clamp(120px,16vw,220px)]"
        />
        <p className="lead mx-auto mt-7 max-w-[620px]" data-reveal>{contact.sub}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3" data-reveal>
          <a href={`mailto:${profile.email}`} className="btn btn-primary btn-lg">Email me <Arrow /></a>
          <a href={profile.socials.find((s) => s.label === 'Facebook')?.href} target="_blank" rel="noreferrer" className="btn btn-glass btn-lg glass glass-liquid">Message on Facebook</a>
        </div>
        <p className="mt-4 text-[14px] text-[var(--text-3)]" data-reveal>{profile.email}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2" data-reveal>
          <span className="glass glass-liquid mr-2 inline-flex items-center gap-2.5 rounded-full py-[11px] pl-[15px] pr-[18px] text-[14px] text-[var(--text-lede)]">
            Usually replies within 24 hours
          </span>
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="glass grid h-11 w-11 place-items-center rounded-full text-[var(--text-2)] transition-colors hover:text-white">
              <Social label={s.label} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

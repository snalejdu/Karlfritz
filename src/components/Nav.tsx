import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { getLenis, scrollToTarget } from '../lib/lenis'
import { profile, projects } from '../content/site'
import { ProjectShots } from './ProjectShots'
import { Chevron } from './Icons'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { label: 'Work', href: '#work', mega: true },
  { label: 'Process', href: '#process' },
  { label: 'Stack', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Logo() {
  return (
    <a href="#top" onClick={(e) => { e.preventDefault(); scrollToTarget(0) }} className="flex items-center gap-2.5" aria-label="Home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[13px] font-extrabold tracking-[-0.04em] text-black transition-colors duration-500">KFP</span>
      <span className="hidden text-[15px] font-semibold tracking-[-0.02em] sm:block">Karl Pagas</span>
    </a>
  )
}

export function Nav() {
  const header = useRef<HTMLElement>(null)
  const [mega, setMega] = useState(false)
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number>(0)
  const openTimer = useRef<number>(0)
  const openRef = useRef(false)
  openRef.current = open
  const megaRef = useRef(false)
  megaRef.current = mega

  useGSAP(() => {
    const el = header.current!
    let hidden = false
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (openRef.current) return
        if (megaRef.current) setMega(false) // any scroll closes the Work menu
        // jumping via a nav link: keep the bar visible, don't animate it every frame
        const jumping = document.documentElement.classList.contains('is-jumping')
        const hide = !jumping && self.direction === 1 && self.scroll() > 160
        if (hide === hidden) return // only animate when the state actually changes
        hidden = hide
        gsap.to(el, { yPercent: hide ? -140 : 0, duration: 0.7, ease: 'expo.out', overwrite: true })
      },
    })
    gsap.from(el, { yPercent: -140, duration: 1.4, delay: 0.25 })
  }, [])

  useEffect(() => {
    const l = getLenis()
    if (open) { l?.stop(); document.body.style.overflow = 'hidden' }
    else { l?.start(); document.body.style.overflow = '' }
  }, [open])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false); setMega(false)
    setTimeout(() => scrollToTarget(href), open ? 350 : 0)
  }
  // hover intent: open only after the pointer rests on "Work", close as soon as it leaves
  const enterTrigger = () => {
    window.clearTimeout(closeTimer.current)
    openTimer.current = window.setTimeout(() => setMega(true), 120)
  }
  const enterPanel = () => window.clearTimeout(closeTimer.current)
  const leave = () => {
    window.clearTimeout(openTimer.current)
    closeTimer.current = window.setTimeout(() => setMega(false), 120)
  }
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && (setMega(false), setOpen(false))
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  return (
    <header ref={header} className="pointer-events-none fixed inset-x-0 top-3.5 z-50 px-3.5">
      <div className="glass glass-dark glass-liquid pointer-events-auto mx-auto flex h-[60px] max-w-[1180px] items-center justify-between rounded-full pl-3 pr-2 sm:pl-6">
        <Logo />
        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={go(l.href)}
              onMouseEnter={l.mega ? enterTrigger : undefined}
              onMouseLeave={l.mega ? leave : undefined}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14.5px] text-white/[.86] transition-colors duration-200 hover:bg-white/[.07] hover:text-white"
            >
              {l.label}
              {l.mega && <Chevron open={mega} />}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a href="#contact" onClick={go('#contact')} className="btn btn-primary btn-sm">Let's talk</a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-white/[.06] lg:hidden"
          >
            <span className={`absolute h-[1.5px] w-4 bg-white transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
            <span className={`absolute h-[1.5px] w-4 bg-white transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
          </button>
        </div>
      </div>

      {/* Work mega menu (desktop) */}
      <div
        onMouseEnter={enterPanel}
        onMouseLeave={leave}
        aria-hidden={!mega}
        className={`glass glass-dark glass-menu absolute inset-x-0 top-[70px] mx-auto hidden w-[min(880px,calc(100vw-28px))] rounded-[26px] p-4 transition-[opacity,transform,visibility] duration-300 lg:block ${mega ? 'pointer-events-auto visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-2 opacity-0'}`}
        style={{ transitionTimingFunction: 'var(--ease)' }}
      >
        <div className="grid grid-cols-4 gap-3">
          {projects.map((p) => (
            <a key={p.slug} href="#work" onClick={go('#work')} className="group rounded-2xl p-2 transition-colors hover:bg-white/[.05]">
              <div className="theme-keep relative aspect-[16/10] overflow-hidden rounded-xl grayscale transition duration-500 group-hover:grayscale-0">
                <ProjectShots shots={p.shots.slice(0, 1)} alt={`${p.title} screenshot`} />
              </div>
              <div className="mt-3 px-1 text-[14px] font-semibold text-white">{p.title}</div>
              <div className="px-1 text-[12.5px] leading-snug text-white/[.78]">{p.kicker}</div>
            </a>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between px-2 pt-1 text-[13px]">
          <span className="text-white/[.7]">Selected builds, 2024 – 2026.</span>
          <a href="#work" onClick={go('#work')} className="glass glass-dark glass-liquid link-arrow inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white">View all work <span>→</span></a>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`glass glass-dark glass-menu absolute inset-x-3.5 top-[70px] mx-auto max-w-[1180px] overflow-hidden rounded-[26px] transition-all duration-500 lg:hidden ${open ? 'pointer-events-auto visible max-h-[80vh] opacity-100' : 'pointer-events-none invisible max-h-0 opacity-0'}`}
        style={{ transitionTimingFunction: 'var(--ease)' }}
      >
        <div className="p-6">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={go(l.href)} className="flex items-center justify-between border-b border-white/[.07] py-3.5 text-[26px] font-semibold tracking-[-0.03em]">
              {l.label} <span className="text-[18px] text-[var(--text-3)]">→</span>
            </a>
          ))}
          <div className="flex flex-wrap gap-x-5 gap-y-2 py-5 text-[14px] text-white/[.72]">
            {profile.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
          </div>
          <a href="#contact" onClick={go('#contact')} className="btn btn-primary w-full">Let's talk</a>
        </div>
      </div>
    </header>
  )
}

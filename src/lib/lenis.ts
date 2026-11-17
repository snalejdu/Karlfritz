import Lenis from 'lenis'
import { gsap, ScrollTrigger, reduceMotion } from './gsap'

let lenis: Lenis | null = null

export function startLenis() {
  if (lenis || reduceMotion()) return lenis
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

/**
 * Smooth jump to a section.
 * While the page flies past, heavy effects (glass refraction, grain) are paused
 * via html.is-jumping, then restored when the jump lands.
 */
export function scrollToTarget(target: string | number) {
  const html = document.documentElement
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : null
  const destY = typeof target === 'number' ? target : el ? el.getBoundingClientRect().top + window.scrollY - 24 : 0
  const distance = Math.abs(destY - window.scrollY)
  // short hops are quick, long jumps a bit longer, never sluggish
  const duration = Math.min(1.25, Math.max(0.55, distance / 5200))

  if (!lenis) {
    window.scrollTo({ top: destY, behavior: 'smooth' })
    return
  }
  html.classList.add('is-jumping')
  lenis.scrollTo(destY, {
    duration,
    easing: (t: number) => 1 - Math.pow(1 - t, 4), // quartOut: fast start, soft landing
    lock: true,
    force: true,
    onComplete: () => html.classList.remove('is-jumping'),
  })
  // safety net in case onComplete never fires (interrupted jump)
  window.setTimeout(() => html.classList.remove('is-jumping'), duration * 1000 + 400)
}

export const getLenis = () => lenis

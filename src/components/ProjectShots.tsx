import { useEffect, useRef, useState } from 'react'
import { reduceMotion } from '../lib/gsap'

/** Real project screenshots. With `rotate`, cross-fades through them while the card is on screen. */
export function ProjectShots({ shots, alt, rotate = false, className = '' }: { shots: string[]; alt: string; rotate?: boolean; className?: string }) {
  const [i, setI] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!rotate || shots.length < 2 || !el || reduceMotion()) return
    let timer: number | undefined
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer)
      if (e.isIntersecting) timer = window.setInterval(() => setI((n) => (n + 1) % shots.length), 3800)
    }, { threshold: 0.35 })
    io.observe(el)
    return () => { io.disconnect(); window.clearInterval(timer) }
  }, [rotate, shots.length])

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {shots.map((s, k) => (
        <img
          key={s}
          src={s}
          alt={k === 0 ? alt : ''}
          aria-hidden={k !== 0}
          loading={k === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-1000 sm:object-top ${k === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  )
}

import { scrollToTarget } from '../lib/lenis'

export function Statement() {
  return (
    <section className="wrap-narrow pb-[clamp(80px,8.2vw,110px)] pt-[clamp(72px,7.6vw,100px)] text-center">
      <p className="text-[clamp(1.75rem,4.3vw,3.9rem)] font-semibold leading-[1.1] tracking-[-0.038em]" data-words>
        Most student portfolios show screenshots. Mine shows the process, from first prompt to final deploy.
      </p>
      <p className="mx-auto mt-8 max-w-[680px] text-[clamp(1.05rem,1.5vw,1.2rem)] leading-relaxed text-[var(--text-lede)]" data-reveal>
        Every project below was planned with AI, scaffolded by agents, then reviewed, fixed and polished by me, so you see{' '}
        <span className="g-underline" data-underline>how it got built</span>, not just how it looks.
      </p>
      <div className="mt-10" data-reveal>
        <a href="#process" onClick={(e) => { e.preventDefault(); scrollToTarget('#process') }} className="btn btn-glass glass glass-liquid">See how I build</a>
      </div>
    </section>
  )
}

import { services } from '../content/site'
import { scrollToTarget } from '../lib/lenis'
import { ArrowUpRight } from '../components/Icons'

export function Services() {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <section id="services" className="section wrap">
      <div className="grid gap-10">
        <h2 className="h-statement max-w-[1160px]" data-words>
          I turn ideas into working software, fast with AI, careful where it counts.
        </h2>
        <div className="max-w-[460px] lg:justify-self-end" data-reveal>
          <p className="lead">
            Web apps, desktop systems and the automations behind them. I use AI to move fast on the boring parts, so I can spend my time on what users actually feel.
          </p>
          <div className="mt-6 flex gap-7">
            <a href="#work" onClick={(e) => { e.preventDefault(); scrollToTarget('#work') }} className="link-arrow">See my work <span>→</span></a>
            <a href="#process" onClick={(e) => { e.preventDefault(); scrollToTarget('#process') }} className="link-arrow text-[var(--text-3)] transition-opacity hover:opacity-70">How I build <span>→</span></a>
          </div>
        </div>
      </div>

      <div className="glass mt-16 overflow-hidden rounded-[32px]" data-reveal>
        <div className="-mb-px -mr-px grid sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            onPointerMove={onMove}
            className="spot group relative flex min-h-[142px] flex-col justify-between border-b border-r border-white/[.07] px-6 pb-[26px] pt-[30px] transition-colors duration-[400ms] hover:bg-white/[.03] sm:min-h-[230px] sm:px-8 sm:pb-[34px]"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">{s.tag}</span>
              <span className="corner-icon"><ArrowUpRight /></span>
            </div>
            <div>
              <div className="text-[clamp(1.2rem,1.7vw,1.5rem)] font-semibold tracking-[-0.025em]">{s.title}</div>
              <p className="mt-1.5 text-[15px] text-[var(--text-lede)]">{s.desc}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}

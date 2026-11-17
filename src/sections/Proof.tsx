import { proof } from '../content/site'

export function Proof() {
  return (
    <section id="proof" className="relative overflow-hidden pb-[clamp(72px,6.4vw,96px)] pt-[clamp(80px,7vw,104px)]">
      {/* giant outlined number behind the copy */}
      <div
        aria-hidden
        className="ghost-outline pointer-events-none absolute left-1/2 top-[40px] -translate-x-1/2 select-none text-[clamp(14rem,31vw,28rem)] font-bold leading-[0.9] tracking-[-0.075em]"
        data-ghost
      >
        {proof.ghost}
      </div>

      <div className="wrap-narrow relative text-center">
        <h2 className="text-[clamp(2.2rem,5.2vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.05em]" data-split>
          {proof.lead1}
          <br />
          <span className="text-grad">{proof.lead2}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[760px] text-[clamp(1.05rem,1.6vw,1.28rem)] leading-relaxed text-[var(--text-lede)]" data-reveal>{proof.body}</p>
        <p className="mt-5 text-[clamp(1.05rem,1.6vw,1.28rem)] font-semibold tracking-[-0.015em]" data-reveal>{proof.tag}</p>
      </div>

      <div className="wrap relative mt-14">
        <div className="glass grid overflow-hidden rounded-[32px] sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {proof.stats.map((s) => (
            <div key={s.label} className="border-b border-r border-white/[.07] px-8 pb-11 pt-10 max-sm:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0">
              <div className="stat-num text-[clamp(2.8rem,4.6vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.055em]">{s.n}</div>
              <div className="mt-4 text-[12px] font-semibold uppercase tracking-[0.18em]">{s.label}</div>
              <p className="mt-2 text-[15px] text-[var(--text-lede)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

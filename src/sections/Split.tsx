import { split } from '../content/site'
import { Eyebrow } from '../components/Eyebrow'

export function Split() {
  return (
    <section id="split" className="section wrap">
      <Eyebrow>The honest split</Eyebrow>
      <h2 className="h-section mt-6" data-split>
        What AI does.
        <br />
        <span className="text-grad">What I do.</span>
      </h2>
      <p className="lead mt-6 max-w-[600px]" data-reveal>
        AI makes me faster. It doesn't make the decisions. Here's exactly where the line sits on every project.
      </p>

      <div className="glass mt-12 rounded-[32px] p-1.5" data-reveal>
        <div className="overflow-hidden rounded-[26px]">
        <div className="grid grid-cols-[1fr_1fr] border-b border-white/[.07] sm:grid-cols-[0.8fr_1fr_1fr]">
          <div className="hidden p-6 sm:block" />
          <div className="border-white/[.07] p-6 sm:border-l">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-3)]">AI</div>
            <div className="mt-2 text-[clamp(1.4rem,2.4vw,2.1rem)] font-semibold tracking-[-0.035em]">The co-pilot</div>
            <div className="mt-1 text-[15px] text-[var(--text-lede)]">Speed, drafts and options.</div>
          </div>
          <div className="border-l border-white/[.07] bg-white/[.03] p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-3)]">Me</div>
            <div className="mt-2 text-[clamp(1.4rem,2.4vw,2.1rem)] font-semibold tracking-[-0.035em]">The pilot</div>
            <div className="mt-1 text-[15px] text-[var(--text-lede)]">Judgment, quality and ownership.</div>
          </div>
        </div>
        {split.map((r) => (
          <div key={r.row} className="grid grid-cols-[1fr_1fr] border-b border-white/[.07] text-[15px] last:border-0 sm:grid-cols-[0.8fr_1fr_1fr]">
            <div className="col-span-2 px-6 pt-5 font-semibold sm:col-span-1 sm:py-5">{r.row}</div>
            <div className="border-white/[.07] px-6 py-4 text-[var(--text-lede)] sm:border-l sm:py-5">{r.ai}</div>
            <div className="border-l border-white/[.07] bg-white/[.03] px-6 py-4 text-[var(--text-2)] sm:py-5">{r.me}</div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}

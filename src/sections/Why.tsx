import { why, profile } from '../content/site'

/** Tall tile: Karl's workspace. */
export function Why() {
  return (
    <section id="why" className="section wrap">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.95fr]">
        <div className="lg:col-span-2">
          <h2 className="pb-8 text-[clamp(2.2rem,4.9vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em]" data-split>
            Why people
            <br />
            <span className="text-grad">work with me.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {why.map((w) => (
              <div key={w.no} className="glass lift rounded-[28px] px-[34px] pb-9 pt-8" data-reveal>
                <div className="text-[13px] font-semibold tracking-[0.06em] text-[var(--text-3)]">{w.no}</div>
                <h3 className="mt-10 text-[clamp(1.3rem,1.9vw,1.65rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{w.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-lede)]">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="theme-keep relative min-h-[480px] overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(255,255,255,.08)]" data-reveal>
          <div className="absolute inset-0 bg-[#0b0b0b]">
            <img src="images/workspace.webp" alt="Karl's desk and workspace" width={900} height={1205} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          </div>
          <div className="glass glass-cap absolute inset-x-3.5 bottom-3.5 rounded-[22px] px-[26px] pb-7 pt-[26px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-lede)]">{profile.brand}</div>
            <p className="mt-3 text-[clamp(1.15rem,1.6vw,1.35rem)] font-semibold leading-snug tracking-[-0.02em]">
              Student by day, builder by night. Based in Bohol, working with anyone.
            </p>
            <a href="#contact" className="link-arrow mt-5">Start a project <span>→</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}

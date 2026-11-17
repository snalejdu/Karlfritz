import { about, profile } from '../content/site'
import { Eyebrow } from '../components/Eyebrow'

/** Portrait swaps with the theme: dark hoodie in dark mode, light hoodie in light mode. */
function Portrait() {
  return (
    <div className="theme-keep glass relative aspect-[4/5] overflow-hidden rounded-[32px]" data-reveal>
      <img src="images/karl-dark.webp" alt={profile.name} width={1000} height={1250} loading="lazy" decoding="async" className="only-dark absolute inset-0 h-full w-full object-cover" />
      <img src="images/karl-light.webp" alt={profile.name} width={1000} height={1250} loading="lazy" decoding="async" className="only-light absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/55 to-transparent" />
      <div className="glass glass-cap absolute inset-x-4 bottom-4 flex items-center justify-between rounded-[22px] px-5 py-4 text-[13px]">
        <span className="font-semibold">{profile.name}</span>
        <span className="text-[var(--text-3)]">{profile.location}</span>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="section wrap">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[14vh] lg:h-fit">
          <Portrait />
        </div>
        <div>
          <Eyebrow>About me</Eyebrow>
          <h2 className="h-section-sm mt-5" data-split>
            Hi, I'm Karl.
            <br />
            <span className="text-grad">Builder from Bohol.</span>
          </h2>
          <div className="mt-8 space-y-5">
            {about.bio.map((b) => <p key={b} className="lead" data-reveal>{b}</p>)}
          </div>

          <dl className="mt-10 grid gap-x-8 sm:grid-cols-2" data-reveal>
            {about.facts.map((f) => (
              <div key={f.k} className="border-t border-white/[.08] py-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">{f.k}</dt>
                <dd className="mt-1 text-[15.5px]">{f.v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-12 text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--text-3)]" data-reveal>Experience</h3>
          <div className="mt-4" data-reveal>
            {about.experience.map((e) => (
              <div key={e.what} className="grid grid-cols-[110px_1fr] gap-4 border-t border-white/[.08] py-4 text-[15px] sm:grid-cols-[130px_1fr_auto]">
                <span className="text-[var(--text-3)]">{e.when}</span>
                <span className="font-semibold">{e.what}</span>
                <span className="col-start-2 text-[var(--text-3)] sm:col-start-auto">{e.where}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}

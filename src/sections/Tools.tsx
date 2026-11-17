import { tools } from '../content/site'

function Row({ items, reverse = false, dur = 70 }: { items: string[]; reverse?: boolean; dur?: number }) {
  const content = (
    <div className="marquee-track" style={{ ['--dur' as string]: `${dur}s` }}>
      {items.map((t) => (
        <span key={t} className="flex items-center whitespace-nowrap">
          <span className="px-7 text-[clamp(1.75rem,4.2vw,3.8rem)] font-semibold leading-[1.15] tracking-[-0.04em] text-[var(--text-4)] transition-colors duration-[400ms] hover:text-white">{t}</span>
          <span aria-hidden className="text-[clamp(1.4rem,3vw,2.6rem)] font-light text-white/15">/</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`marquee ${reverse ? 'marquee-reverse' : ''}`}>
      {content}
      <div aria-hidden className="contents">{content}</div>
    </div>
  )
}

export function Tools() {
  const half = Math.ceil(tools.length / 2)
  return (
    <section id="tools" className="pb-[clamp(56px,5.6vw,80px)] pt-[clamp(44px,4.4vw,64px)]">
      <p className="mb-7 px-[var(--pad-x)] text-center text-[clamp(1.25rem,2.1vw,1.9rem)] font-semibold tracking-[-0.02em] text-[var(--text-lede)]" data-reveal>
        Built with <span className="text-grad">{tools.length}+</span> tools, every day
      </p>
      <div className="space-y-2">
        <Row items={tools.slice(0, half)} dur={60} />
        <Row items={tools.slice(half)} reverse dur={70} />
      </div>
    </section>
  )
}

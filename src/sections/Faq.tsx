import { useState } from 'react'
import { faq } from '../content/site'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="wrap py-[clamp(64px,5.6vw,80px)]">
      <div className="grid gap-10 lg:grid-cols-[1fr_639px] lg:gap-16">
        <h2 className="h-section-sm lg:sticky lg:top-[144px] lg:h-fit" data-split>
          Questions,
          <br />
          <span className="text-grad">answered.</span>
        </h2>
        <div className="space-y-3">
          {faq.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className="glass overflow-hidden rounded-[22px]" data-reveal>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex min-h-[80px] w-full items-center justify-between gap-6 px-7 py-5 text-left text-[16.5px] font-semibold tracking-[-0.01em]"
                >
                  {f.q}
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-[18px] font-normal transition-transform duration-500 ${isOpen ? 'rotate-45 bg-white text-black' : ''}`}
                    style={{ transitionTimingFunction: 'var(--ease)' }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', transitionTimingFunction: 'var(--ease)' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-7 text-[15.5px] leading-relaxed text-[var(--text-lede)]">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

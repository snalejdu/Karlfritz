/** SVG displacement filters used as `backdrop-filter: url(#lq)` in Chromium. */
export function GlassFilters() {
  return (
    <svg width="0" height="0" aria-hidden style={{ position: 'absolute' }}>
      <defs>
        <filter id="lq" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="4" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="3" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="34" xChannelSelector="R" yChannelSelector="G" result="disp" />
          <feGaussianBlur in="disp" stdDeviation="7" />
        </filter>
        <filter id="lq-strong" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="1" seed="9" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="6" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="90" xChannelSelector="R" yChannelSelector="B" result="disp" />
          <feGaussianBlur in="disp" stdDeviation="1.2" />
        </filter>
      </defs>
    </svg>
  )
}

export function detectGlass() {
  const nav = navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }
  const chromium = !!nav.userAgentData?.brands?.some((b) => /Chromium|Google Chrome|Microsoft Edge/.test(b.brand))
  const fine = window.matchMedia('(pointer: fine)').matches
  if (chromium && fine) document.documentElement.classList.add('glass-on')
}

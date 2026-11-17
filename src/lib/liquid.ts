/**
 * Liquid glass, edge refraction.
 *
 * For every `.glass` element (and the contact sphere) we draw a
 * displacement map the exact size of the element: neutral grey in the middle,
 * pushing pixels inward near the rounded edge. Used as an SVG filter in
 * `backdrop-filter: url(#id)`, the page behind bends like light through a lens.
 *
 * Chromium only (html.glass-on). Other browsers keep the CSS blur fallback.
 */

type Opts = { band?: number; scale?: number; blur?: number; saturate?: number }

const NS = 'http://www.w3.org/2000/svg'
let defs: SVGDefsElement | null = null
let uid = 0
const mapCache = new Map<string, string>()
const tracked = new WeakMap<Element, { id: string; w: number; h: number }>()

function getDefs() {
  if (defs) return defs
  const svg = document.createElementNS(NS, 'svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.position = 'absolute'
  defs = document.createElementNS(NS, 'defs')
  svg.appendChild(defs)
  document.body.appendChild(svg)
  return defs
}

/** Signed distance to a rounded rectangle + its outward normal. */
function sdf(px: number, py: number, hw: number, hh: number, r: number) {
  const qx = Math.abs(px) - (hw - r)
  const qy = Math.abs(py) - (hh - r)
  const ox = Math.max(qx, 0), oy = Math.max(qy, 0)
  const d = Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r
  let nx: number, ny: number
  if (qx > 0 && qy > 0) {
    const l = Math.hypot(qx, qy) || 1
    nx = (qx / l) * Math.sign(px); ny = (qy / l) * Math.sign(py)
  } else if (qx > qy) { nx = Math.sign(px) || 1; ny = 0 }
  else { nx = 0; ny = Math.sign(py) || 1 }
  return { d, nx, ny }
}

function makeMap(w: number, h: number, r: number, band: number) {
  const key = `${w}x${h}x${r}x${band}`
  const hit = mapCache.get(key)
  if (hit) return hit
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(w, h)
  const hw = w / 2, hh = h / 2
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const { d, nx, ny } = sdf(x + 0.5 - hw, y + 0.5 - hh, hw, hh, r)
      const inside = -d // distance from the edge, inward
      const f = inside <= 0 ? 1 : inside >= band ? 0 : Math.pow(1 - inside / band, 1.15)
      const i = (y * w + x) * 4
      img.data[i] = Math.round(128 - 127 * nx * f) // sample inward (lens)
      img.data[i + 1] = Math.round(128 - 127 * ny * f)
      img.data[i + 2] = 128
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  const url = c.toDataURL('image/png')
  mapCache.set(key, url)
  return url
}

function build(el: HTMLElement, o: Required<Opts>) {
  const rect = el.getBoundingClientRect()
  // getBoundingClientRect includes transforms; use layout size
  const w = Math.round(el.offsetWidth || rect.width)
  const h = Math.round(el.offsetHeight || rect.height)
  if (w < 4 || h < 4) return
  if (w * h > MAX_AREA && !el.classList.contains('glass-liquid')) return
  const prev = tracked.get(el)
  if (prev && prev.w === w && prev.h === h) return

  const cs = getComputedStyle(el)
  const r = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, w / 2, h / 2)
  const band = Math.max(6, Math.min(o.band, h * 0.45, w * 0.45))

  const id = prev?.id ?? `lg${++uid}`
  let f = getDefs().querySelector<SVGFilterElement>(`#${id}`)
  if (!f) {
    f = document.createElementNS(NS, 'filter')
    f.id = id
    f.setAttribute('x', '0'); f.setAttribute('y', '0')
    f.setAttribute('filterUnits', 'userSpaceOnUse')
    f.setAttribute('color-interpolation-filters', 'sRGB')
    f.innerHTML = `
      <feImage x="0" y="0" preserveAspectRatio="none" result="map"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="${o.blur}" result="soft"/>
      <feDisplacementMap in="soft" in2="map" scale="${o.scale}" xChannelSelector="R" yChannelSelector="G" result="bent"/>
      <feColorMatrix in="bent" type="saturate" values="${o.saturate}"/>`
    getDefs().appendChild(f)
  }
  f.setAttribute('width', String(w)); f.setAttribute('height', String(h))
  const fe = f.querySelector('feImage')!
  fe.setAttribute('width', String(w)); fe.setAttribute('height', String(h))
  fe.setAttribute('href', makeMap(w, h, r, band))

  el.style.setProperty('backdrop-filter', `url(#${id})`)
  tracked.set(el, { id, w, h })
}

const ro = typeof ResizeObserver !== 'undefined'
  ? new ResizeObserver((entries) => entries.forEach((e) => {
      const el = e.target as HTMLElement
      build(el, optsFor(el))
    }))
  : null

function optsFor(el: HTMLElement): Required<Opts> {
  if (el.classList.contains('sphere')) return { band: 120, scale: 90, blur: 1.2, saturate: 1.4 }
  // captions sit over busy screenshots: more blur keeps the text readable
  if (el.classList.contains('glass-cap')) return { band: 30, scale: 42, blur: 10, saturate: 1.7 }
  // dropdown menus: nav-bar glass, more frost so hero type behind doesn't fight the menu text
  if (el.classList.contains('glass-menu')) return { band: 26, scale: 38, blur: 14, saturate: 1.7 }
  return { band: 26, scale: 38, blur: 3.2, saturate: 1.7 }
}

/** Very large panels keep the rim + glow + blur but skip per-pixel refraction (scroll performance). */
const MAX_AREA = 520_000

/** Attach liquid glass to every matching element now and in the future. */
export function initLiquidGlass() {
  if (!document.documentElement.classList.contains('glass-on')) return () => {}
  const sel = '.glass-liquid, .glass-dark, .glass-cap, .badge-live, .sphere'
  const attach = (root: ParentNode) =>
    root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      if ((el as any).__lq) return
      ;(el as any).__lq = true
      build(el, optsFor(el))
      ro?.observe(el)
    })
  attach(document)
  const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => n instanceof Element && attach(n.parentNode ?? document))))
  mo.observe(document.body, { childList: true, subtree: true })

  // pointer-follow highlight (::after) on liquid surfaces
  const move = (e: PointerEvent) => {
    const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('.glass')
    if (!t) return
    const r = t.getBoundingClientRect()
    t.style.setProperty('--mx', `${e.clientX - r.left}px`)
    t.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  window.addEventListener('pointermove', move, { passive: true })
  return () => { mo.disconnect(); window.removeEventListener('pointermove', move) }
}

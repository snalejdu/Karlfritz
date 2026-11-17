/**
 * Light / dark theme.
 * The class is set before first paint by the inline script in index.html (no flash),
 * persisted in localStorage, and switched with a circular reveal from the toggle
 * (View Transitions API in Chromium/Safari; a soft color crossfade elsewhere).
 */
export type Theme = 'light' | 'dark'

const KEY = 'theme'
const META = { light: '#f5f5f5', dark: '#050506' }

export const getTheme = (): Theme =>
  document.documentElement.classList.contains('light') ? 'light' : 'dark'

function apply(t: Theme) {
  document.documentElement.classList.toggle('light', t === 'light')
  try { localStorage.setItem(KEY, t) } catch { /* private mode */ }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[t])
  window.dispatchEvent(new CustomEvent<Theme>('themechange', { detail: t }))
}

/** Toggle the theme, revealing the new one as a circle growing from (x, y). */
export function toggleTheme(x = innerWidth / 2, y = 0) {
  const next: Theme = getTheme() === 'light' ? 'dark' : 'light'
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }

  if (reduce) return apply(next)

  if (!doc.startViewTransition) {
    // fallback: crossfade colors for a moment
    const root = document.documentElement
    root.classList.add('theme-fade')
    apply(next)
    window.setTimeout(() => root.classList.remove('theme-fade'), 600)
    return
  }

  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const t = doc.startViewTransition(() => apply(next))
  t.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  }).catch(() => {})
}

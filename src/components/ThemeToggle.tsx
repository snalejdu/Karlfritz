import { useEffect, useState } from 'react'
import { getTheme, toggleTheme, type Theme } from '../lib/theme'

/** Glass light/dark switch: sun ↔ moon morph, lift on hover, squish on press. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() => (typeof document === 'undefined' ? 'dark' : getTheme()))

  useEffect(() => {
    const on = (e: Event) => setTheme((e as CustomEvent<Theme>).detail)
    window.addEventListener('themechange', on)
    return () => window.removeEventListener('themechange', on)
  }, [])

  const light = theme === 'light'

  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        toggleTheme(r.left + r.width / 2, r.top + r.height / 2)
      }}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={light}
      title={light ? 'Dark mode' : 'Light mode'}
      className={`theme-toggle ${light ? 'is-light' : ''} ${className}`}
    >
      {/* moon: shown in dark mode */}
      <svg className="tt-icon tt-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
      {/* sun: shown in light mode */}
      <svg className="tt-icon tt-sun" width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <g className="tt-rays" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </g>
      </svg>
    </button>
  )
}

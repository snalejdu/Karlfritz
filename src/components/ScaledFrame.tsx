import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/** Renders children at a fixed design size (e.g. 1280×800) and scales them to fit the box. */
export function ScaledFrame({
  width = 1280,
  height = 800,
  className = '',
  innerClassName = '',
  children,
}: {
  width?: number
  height?: number
  className?: string
  innerClassName?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [s, setS] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setS(e.contentRect.width / width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return (
    <div ref={ref} className={`theme-keep relative overflow-hidden ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className={`absolute left-0 top-0 origin-top-left ${innerClassName}`}
        style={{ width, height, transform: `scale(${s})`, visibility: s ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    </div>
  )
}

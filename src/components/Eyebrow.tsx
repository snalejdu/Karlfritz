export function Eyebrow({ children, pill = false, className = '' }: { children: React.ReactNode; pill?: boolean; className?: string }) {
  return (
    <span className={`eyebrow ${pill ? 'eyebrow-pill glass glass-liquid' : ''} ${className}`} data-reveal>
      {children}
    </span>
  )
}

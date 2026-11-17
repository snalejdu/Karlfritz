import { profile, projects } from '../content/site'
import { scrollToTarget } from '../lib/lenis'
import { Social } from '../components/Icons'

const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Stack', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const go = (href: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollToTarget(href) }
  return (
    <footer className="wrap pb-10 pt-[72px]">
      <div className="hairline" />
      <div className="grid gap-12 pb-16 pt-14 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[14px] font-extrabold tracking-[-0.04em] text-black">KFP</span>
            <div className="leading-tight">
              <div className="text-[16px] font-semibold">{profile.name}</div>
              <div className="text-[13px] text-[var(--text-3)]">{profile.brand}</div>
            </div>
          </div>
          <p className="mt-6 max-w-[300px] text-[15px] text-[var(--text-2)]">Student developer. AI-assisted builder. Based in Bohol, building for anywhere.</p>
          <div className="mt-6 flex gap-2">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-[var(--text-2)] transition-colors hover:bg-white hover:text-black">
                <Social label={s.label} />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Sections">{nav.map((n) => <a key={n.label} href={n.href} onClick={go(n.href)}>{n.label}</a>)}</FooterCol>
        <FooterCol title="Projects">{projects.map((p) => <a key={p.slug} href="#work" onClick={go('#work')}>{p.title}</a>)}</FooterCol>
        <FooterCol title="Contact">
          <a href={`mailto:${profile.email}`} className="break-all">{profile.email}</a>
          <span className="italic text-[var(--text-3)]">{profile.location}</span>
        </FooterCol>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[.07] pt-6 text-[13px] text-[var(--text-3)]">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Built with React, GSAP &amp; Lenis, and a lot of prompting.</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-3)]">{title}</div>
      <div className="flex flex-col gap-3 text-[15px] text-[var(--text-2)] [&_a:hover]:text-white [&_a]:transition-colors">{children}</div>
    </div>
  )
}

# Karl Fritz Pagas — Portfolio

Dark "liquid glass" portfolio. Vite + React + TypeScript + Tailwind v4 + GSAP (ScrollTrigger, SplitText) + Lenis.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
npm run preview   # preview the build
```

## Where things are

| Path | What |
|---|---|
| `src/content/site.ts` | **All text, projects, links and numbers.** Edit this first. Every placeholder is marked `TODO(Karl)`. |
| `public/images/` | Portrait, workspace and project screenshots (`projects/<name>-N.webp`). |
| `src/sections/` | One file per page section (Hero, Built, Tools, Services, Statement, Work, Process, Split, About, Contact, Footer). |
| `src/components/` | Nav (glass pill + Work mega menu + mobile sheet), Cursor, GlassFilters, ScaledFrame, Icons. |
| `src/lib/lenis.ts` | Lenis smooth scroll, driven by GSAP's ticker. |
| `src/lib/gsap.ts` | GSAP plugin registration and defaults. |
| `src/index.css` | Design tokens, glass, buttons, cursor, marquee. |

## Swapping a placeholder for a real screenshot

1. Put the image in `public/images/` (e.g. `waypt.webp`, 1280×800 or larger, same 16:10 ratio).
2. In `src/sections/Work.tsx`, replace `<ProjectMock kind={p.mock} />` with
   `<img src={`./images/${p.slug}.webp`} alt={p.title} className="h-full w-full object-cover" />`.

## Animation map

- Hero: SplitText word rise, background parallax
- Built: browser mockup pins, Waypt page scrolls inside it
- Headings with `data-split`: words rise on enter
- Text with `data-words`: grey → white word reveal, scrubbed
- Anything with `data-reveal`: fade + rise on enter
- Work: sticky cards stack and shrink as the next arrives
- Process: left number 01→05 follows the active step card
- Contact: glass sphere refracts the headline (Chromium), floats and follows the mouse

All motion is disabled when the visitor has "reduce motion" on.

## Test it in Laragon

```bash
npm run laragon   # builds straight into C:\laragon\www\portfolio
```
Then open http://localhost/portfolio/

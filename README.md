# DailyGrit Studio — site

Vite + React (JSX) + Framer Motion + Lucide. No CSS framework: design tokens and
component-scoped CSS files. Deploys to Vercel as a static build (`dist`).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # writes dist/
npm run preview  # serve the built site locally
```

Node 18+ required.

## Where everything lives

```
DailyGrit/
├── index.html                  fonts, meta tags, root div
├── package.json                deps and scripts
├── vite.config.js              build config + chunk splitting
├── vercel.json                 Vercel build + cache headers
├── public/favicon.svg
└── src/
    ├── main.jsx                mounts React
    ├── App.jsx                 theme, currency, modal routing, section order
    ├── context/studio.js       shared state + useStudio() hook
    ├── data/site.js            ALL COPY AND PRICING — edit this first
    ├── styles/global.css       tokens, three themes, base typography
    ├── hooks/
    │   ├── useTheme.js         paper / ink / midnight, saved to localStorage
    │   ├── useReducedMotion.js honours the OS motion setting
    │   └── useClock.js         live clock + timezone maths
    └── components/
        ├── IntroPreloader.jsx  kinetic letters + four corner panels
        ├── CursorRing.jsx      spring cursor, pointer-fine devices only
        ├── Magnetic.jsx        wrapper that makes anything lean to the cursor
        ├── Reveal.jsx          scroll-triggered spring reveal
        ├── Header.jsx          sticky nav, theme dots, scroll progress
        ├── Hero.jsx            headline, slot pill, teardown URL bar
        ├── Marquee.jsx         capabilities ticker
        ├── SelectedWorks.jsx   3D tilt cards → work modals
        ├── PricingLadder.jsx   offer ladder + currency switch
        ├── Price.jsx           spring-animated converted prices
        ├── Process.jsx         five-step roadmap
        ├── StudioTimezone.jsx  founders + live IST vs visitor clocks
        ├── Faq.jsx             spring accordion
        ├── ContactSection.jsx  brief form with validation
        ├── Footer.jsx
        └── Modals/
            ├── ModalWrapper.jsx    backdrop, escape key, focus trap
            ├── QuelesslyModal.jsx
            ├── EshaniModal.jsx
            ├── BrandModal.jsx
            ├── DiagnosticModal.jsx
            ├── ReferralModal.jsx
            └── DeliverablesModal.jsx
```

Each component keeps its CSS in a file of the same name next to it
(`Hero.jsx` → `Hero.css`). Vite bundles them together at build time.

## Editing the site

- **Copy, prices, work, FAQ, process, founders** → `src/data/site.js`. Nothing
  else needs touching for a content change.
- **Colours and type** → the three `[data-theme]` blocks at the top of
  `src/styles/global.css`.
- **Currency rates** → `CURRENCIES` in `src/data/site.js`. They are indicative
  and rounded on purpose; update them when they drift.

## Contact form

With no configuration the form opens the visitor's mail client with the brief
filled in, so it works on a static host with nothing behind it.

To collect submissions instead, set an environment variable in Vercel:

```
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

It posts JSON. There is a hidden honeypot field for bots.

## Putting it on GitHub

From the folder containing these files:

```bash
git init
git add .
git commit -m "Rebuild site on Vite + React + Framer Motion"
git branch -M main
git remote add origin https://github.com/shanzxt/DailyGrit.git
git push -u origin main --force   # only if replacing the old static site
```

## Vercel

The repo is already connected. On the next push, check Project Settings →
Build & Development Settings read:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

`vercel.json` sets those too, so a fresh import needs no clicking.

## Accessibility and motion

Everything is keyboard reachable with visible focus rings. The intro, cursor
ring, magnetic pull, tilt and marquee all switch off when the visitor's system
asks for reduced motion.

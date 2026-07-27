# Abdullah Mohammad Mushtaq — Cybersecurity Portfolio

## Overview
A single-page React + Vite + Tailwind CSS portfolio website for Abdullah Mohammad Mushtaq. Originally exported from Figma. The app lives entirely in `src/app/App.tsx` (one large file) with supporting styles in `src/styles/`.

## Stack
- **React 19** + **TypeScript**
- **Vite 6** (dev server on port 5000, host `0.0.0.0`)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Framer Motion** for animations
- **MUI + Radix UI** components available (mostly unused — app uses inline styles)
- No backend, no database, no secrets required

## Running the app
```bash
npm install   # first time only
npm run dev   # starts dev server at http://localhost:5000
```
The Replit workflow "Start application" runs `npm run dev` automatically.

## Project structure
```
src/
  app/
    App.tsx          ← entire app (hero, about, education, certs, projects, experience, skills, contact)
    translations.ts  ← EN / AR / DE strings
    components/
      figma/ImageWithFallback.tsx
  styles/
    index.css        ← imports fonts, tailwind, theme
    tailwind.css
    theme.css
public/
  certs/             ← certificate images (grouped by issuer)
  profile.jpg        ← profile photo
  *.jpg / *.png      ← achievement & project images
```

## Key components (all in App.tsx)
- `TechLineButton` — hero CTA buttons with animated SVG border on hover
- `TechBorderOverlay` — same revolving border effect for cards
- `CertGroup` / `CertImageCard` — certifications section with image lightbox
- `NetworkCanvas` — animated particle network background (canvas)
- `SectionHeading`, `Card`, `Tag`, `Divider` — shared UI primitives

## Adding certificates
Add entries to the `certifications` object inside the `App` component (line ~594). Each entry is:
```ts
{ name: 'Cert Name', year: '2025', verify: 'https://...', image: '/certs/<issuer>/<file>.png' }
```
Drop the image file in `public/certs/<issuer>/` and add the entry; it appears automatically.

## Responsiveness
- All sections use `px-4 sm:px-6` padding with `max-w-*xl mx-auto` containers
- Hero buttons stack vertically on mobile (`flex-col sm:flex-row`)
- About card info rows use `wordBreak: 'break-all'` + `minWidth: 0` to handle long emails/URLs
- Mobile nav uses a hamburger menu

## User preferences
- Keep existing file structure and stack — do not restructure or migrate
- Certificates section: user will provide new certs to add over time

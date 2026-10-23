# ROJ Content Hub

A responsive creative-agency landing page for ROJ Content Hub, Ikota Villa, Lekki, Lagos. Built with Next.js App Router, React, TypeScript, Tailwind CSS and GSAP. The first release is a static export: no database, paid backend or API keys are required.

## Run locally

Use Node.js 22.18+ and npm. The project lockfile records exact dependency versions.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3100. Port 3100 avoids other local projects on port 3000.

```sh
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
```

`npm run build` uses Webpack because Turbopack's build worker encountered a port permission error in this environment. The generated `out/` directory can be hosted on any static host. To preview an export locally: `python3 -m http.server 3101 --bind 127.0.0.1 --directory out`. Do not use `next start` for a static export.

## Content and contact details

- `src/components/landing-page.tsx`: page content, services, FAQs and enquiry dialog.
- `src/components/hardware-stack.tsx`: responsive 3D hero plates; motion is scoped in `src/components/use-hero-motion.ts`.
- `src/app/globals.css`: responsive layout, brand colors and motion preferences.
- `src/lib/enquiry.ts`: approved Instagram and WhatsApp destinations; validation and message encoding.
- `public/brand/`: original user-provided artwork and brand references.
- `public/images/`: downloaded reference photography.
- `Asset/images/`: optimized supplied photos and preserved originals.
- `public/Asset/images/`: browser-served copies of the optimized photos.

The form validates a name, service and short brief, then opens a prefilled WhatsApp conversation with **+234 706 281 9883**. The visitor must send the message themselves. Nothing is stored or submitted to a backend, and no session is automatically booked. Instagram links point to **@rojcontenthub**. No invented pricing, client logos, testimonials or portfolio claims are included.

The current visual system follows the supplied Vertex Platform guide in `design.md`, with explicit ROJ overrides: black and white, brand orange `#F44606`, locally hosted Inter headings, Playfair Display body copy and JetBrains Mono labels. The guide's referenced HTML was not supplied, so the composition interprets its written direction. Original and previous design references are preserved in `Asset/design/`.

The redesign includes a split hero with an extruded CSS 3D stack inspired by the supplied screenshot, two audience columns, a two-column service accordion, paired image showcases, and a centered contact section. GSAP handles a 950ms hero entrance, eased pointer tilt (up to 6° vertically and 8° horizontally), a restrained magnetic primary CTA, and reversible scroll-linked layer separation without pinning. Separate transform layers prevent entrance, pointer and scroll effects from competing. Pointer tracking runs only on fine hover devices; cached geometry and finite tweens avoid a continuous render loop. Existing image reveals and marquee movement remain. All motion honors reduced-motion preferences. No WebGL runtime or paid service is needed.

## Image sources

The hero, film/podcast/music service panels and work showcase now use supplied ROJ courtyard and studio photos. Source files are preserved in `Asset/images/originals/`; optimized, correctly oriented WebP versions live in `Asset/images/` and are copied to `public/Asset/images/` for static hosting. Public copies omit embedded source metadata. See `Asset/images/README.md` for the source-to-slot mapping.

The photography service and inline camera image still use `camera-detail.jpg` as a visual reference. The remaining Unsplash files are retained for provenance but are no longer displayed. The logo is preserved as supplied.

- `recording-studio.jpg`: https://images.unsplash.com/photo-1598488035139-bdbb2231ce04
- `studio-camera.jpg`: https://images.unsplash.com/photo-1492691527719-9d1e07e534b4
- `camera-detail.jpg`: https://images.unsplash.com/photo-1516035069371-29a1b244cc32
- `microphone.jpg`: https://images.unsplash.com/photo-1478737270239-2f02b77fc618

## Next phase: payments and dashboard

Paystack and the dashboard are intentionally deferred. Before adding them, move from static export to server-capable Next.js hosting. Add authenticated dashboard access, server-side payment initialization and verification, signed webhook validation, idempotent transaction processing and persistent transaction records. Keep secret keys in server environment variables; never expose them to the browser or store them in client storage. Confirm pricing, deposits, cancellation terms and payment ownership with the business before enabling charges.

## Verification

`npm test` uses Node's built-in test runner for destination correctness, message encoding, required-field validation and length limits. Browser checks cover desktop/mobile layout, dialog behavior, navigation, services and FAQs. Motion is disabled for visitors who request reduced motion.

Installation reported five development-tool advisories through ESLint's transitive `braces` dependency. The suggested npm fix downgrades the Next.js lint configuration by two major versions, so it is not applied blindly. `npm audit --omit=dev` reported zero production dependency vulnerabilities during verification. Recheck `npm audit` when updating dependencies.

# ROJ Content Hub

A multi-page creative production website for ROJ Content Hub, Ikota Villa, Lekki, Lagos. Built with Next.js App Router, React, TypeScript, Tailwind CSS and GSAP. It exports a static site: no database or paid backend is required. Enquiries use WhatsApp.

## Run locally

Use Node.js 22.18+ and npm. The lockfile records dependency versions.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3100. Validate with `npm run lint`, `npm run typecheck`, `npm test`, `npm run format:check` and `npm run build`. After building, run `npm run verify:export` to check every exported page, local link, image reference and demo-indexing flag.

The build uses Webpack and generates `out/`. Every page exports as a directory with an `index.html`, so deep links work on ordinary static hosts. To preview the production export, run `python3 -m http.server 3101 --bind 127.0.0.1 --directory out`. Do not use `next start` with a static export.

## Pages and content

- `/`: homepage with the existing interactive CSS 3D hero, service links and journal previews.
- `/about/`: company story, creator/brand audiences and production process.
- `/services/`: service directory. `/services/[slug]/` provides six individual service pages.
- `/studio/`: a scroll-driven perspective gallery of six supplied studio photos, booking enquiries and FAQs.
- `/work/`: clearly labelled demo project concepts, using actual ROJ space photos. These are not claimed client projects or results.
- `/contact/`: WhatsApp, phone, Instagram, project brief dialog and Google Maps.
- `/blog/`: searchable, category-filtered journal. `/blog/[slug]/` provides three full demo articles with contents links and related reading.

`src/components/site-shell.tsx` owns the shared header, footer and enquiry dialog. Server-rendered page content lives in `src/app/`; reusable editorial components live in `src/components/`. `src/content/services.ts` and `src/content/posts.ts` hold service and article content. Add a post with a unique slug, category, excerpt, photo, date, service and sections, then rebuild: its route is generated automatically.

The enquiry form validates a name, service and brief, then opens a prefilled conversation with **+234 706 281 9883**. The visitor reviews and sends the message in WhatsApp. No booking, payment or backend submission happens automatically. Instagram points to **@rojcontenthub**.

## SEO and launch configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final public origin before building for deployment. Page titles, descriptions, Open Graph metadata, canonical URLs, `robots.txt` and `sitemap.xml` are generated centrally. If the domain is unset, canonicals and the sitemap URL are omitted and the sitemap is empty; no placeholder domain is published.

Articles are intentionally marked `demo: true`, labelled as demo content and served with `noindex, follow`. They are excluded from the sitemap. Review and approve the copy, set the real publication date and change `demo` to `false` to enable indexing and BlogPosting structured data. No SEO ranking outcomes are promised.

The confirmed address is **House 16B, Road 13, Ikota Villa, Lekki, Lagos**. `src/lib/site.ts` configures the address-based Google Maps embed and directions link, plus a WhatsApp request for arrival guidance. No GPS coordinates or Google business place ID have been invented. Update the address, map query and directions together if the business moves. The map links follow [Google Maps URL documentation](https://developers.google.com/maps/documentation/urls/get-started).

## Deploy (Firebase Hosting)

The site is hosted on Firebase project `rojhub-648fd` at https://rojhub-648fd.web.app (`firebase.json` serves `out/`). Sign in once with `firebase login` (or use a `FIREBASE_TOKEN`/service account in CI), then:

```bash
NEXT_PUBLIC_SITE_URL=https://rojhub-648fd.web.app npm run build && npm run verify:export && firebase deploy --only hosting
```

When a custom domain is connected, change `NEXT_PUBLIC_SITE_URL` to it and redeploy.

## Visual system and assets

The supplied Vertex guide in `design.md` is adapted to ROJ orange `#F44606`, black and white. Fonts are locally hosted Inter, Playfair Display and JetBrains Mono. The original ROJ logo is preserved. The favicon, Apple touch icon and web-app icons are cropped from the unaltered `public/brand/roj-logo.png` wordmark on black; regenerate them with `node scripts/generate-icons.mjs` if the logo changes. The default link-preview image, `public/og-image.jpg`, layers that icon over the darkened courtyard photo; rebuild it with `node scripts/generate-og-image.mjs`. The homepage retains the layered CSS hardware sculpture, GSAP entrance, pointer tilt and reversible scroll motion. Motion respects reduced-motion preferences; pointer effects only run on fine hover devices.

The shared header uses `src/components/ui/liquid-glass-navbar.tsx`, adapted from the supplied Nimbus Waterline component with its author attribution retained. It uses ROJ orange refraction, route-aware Next.js links, keyboard focus navigation and a CSS fallback when WebGL is unavailable. The renderer pauses when hidden, responds to reduced-motion preferences and releases GPU resources on cleanup. Mobile navigation uses a matching glass panel with visible labels; navigation is silent. No new package dependencies are required.

The studio gallery lives in `src/components/ui/animated-gallery.tsx`; its images, captions and crops are configured in `src/components/studio-showcase.tsx`. It adapts the supplied gallery reference to the existing GSAP runtime, with no additional animation or button dependencies. Desktop scrolling unfolds the three-column gallery and moves its columns in opposite directions. Small screens, short viewports and reduced-motion preferences use a static gallery without sticky scroll space.

All page photography uses supplied ROJ images. Originals remain in `Asset/images/originals/`; optimized copies live in `Asset/images/` and `public/Asset/images/`. Public copies omit source metadata. Original design references are retained in `Asset/design/`. Old reference photographs remain in `public/images/` for provenance but are not displayed.

## Validation and future work

`npm test` covers enquiry validation and encoding. Check desktop/mobile layouts, keyboard navigation, blog filtering, route changes, dialog focus restoration and the map before publishing. No live test messages or payments should be sent.

Paystack and its dashboard remain a future phase. They require server-capable hosting, authentication, server-side payment verification, signed webhooks, idempotency and persistent transaction records. Confirm pricing and booking terms before enabling charges. Publishing or pushing a new release requires an explicit request.

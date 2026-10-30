Whatever action you can do yourself, please do yourself, this includes starting apps and verification

# Repository Guidelines

## Project Scope & Current State

ROJ Content Hub is a creative content and digital media company in Ikota, Lekki, Lagos. The site has Home, About, Services, Studio, Work, Contact and Blog routes, including service detail pages and demo articles. Future work includes Paystack payments and an expandable dashboard for payment settings and transactions.

The website uses Next.js, React, TypeScript, Tailwind CSS and GSAP. It exports a static site; WhatsApp handles enquiries. Favor low initial costs and maintainable architecture.

## Project Structure & Module Organization

- `src/app/`: App Router pages, metadata, sitemap, robots and global styles.
- `src/components/`: shared shell, hero, page components and interactive controls.
- `src/content/`: editable services and articles.
- `src/lib/`: enquiries, contact destinations, location and SEO configuration.
- `public/brand/`: supplied artwork; `public/images/`: reference photography.
- `Asset/images/`: supplied photos, with originals in `originals/`; `public/Asset/images/`: optimized web copies.
- `tests/`: Node test-runner tests named `*.test.ts`.
- `out/`: generated production export; do not commit it.

## Build, Test, and Development Commands

Use Node.js 22.18+ and `npm ci`. Run `npm run dev` for the local preview on port 3100, `npm run build` for the production export, `npm run lint` for ESLint, `npm run typecheck` for TypeScript, and `npm test` for enquiry tests. Use `npm run format` or `npm run format:check` for Prettier. See README for static preview instructions.

## Coding Style & Naming Conventions

Use TypeScript, two-space indentation, PascalCase React components, camelCase functions and variables, and kebab-case filenames. Keep components focused. Follow the configured ESLint and Prettier rules.

## Testing Guidelines

Test meaningful behavior, especially enquiry encoding and validation. No numeric coverage threshold is imposed. Verify responsive layouts, keyboard navigation, reduced motion and primary calls to action in a browser. Record checks and limitations. Never send real test messages or payments.

## Commit & Pull Request Guidelines

Use concise imperative commit messages, following the initial commit’s prefix style: `feat:`, `fix:`, or `docs:`. PRs should explain the change, link relevant issues, list validation, and include screenshots for visual changes.

## Security & Agent Instructions

Paystack and the dashboard remain future work. Keep future secret keys server-side and out of Git; verify payments server-side and authenticate dashboard access. Preserve supplied artwork. Label demo projects and articles; demo posts stay noindex until approved. Configure the real domain before deployment. Confirm the exact office pin before claiming precise directions. Use the selected `gpt-taste` skill and do not use Sites. Publishing requires an explicit request.

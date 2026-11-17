<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project shape

- Single-package Next.js **16.4.6** app (App Router, React 19.3, TS `strict`). Not a monorepo.
- Package manager: **npm** (`package-lock.json` present). Don't use pnpm/yarn/bun.
- Path alias `@/*` → `./src/*` (tsconfig). Routes in `src/app/`, root layout at `src/app/layout.tsx`.
- No tests, no CI, no pre-commit hooks. `npm run build` is the strongest verification.

## Commands

- `npm run dev` — dev server (Turbopack). Also regenerates `.next/types` and the managed block above.
- `npm run build` — production build; runs the TypeScript check too.
- `npm run lint` — ESLint flat config (`eslint.config.mjs`, eslint-config-next).
- Typecheck standalone: `npx tsc --noEmit` (there is no `typecheck` script).
- **Order before finishing:** `npm run lint` → `npx tsc --noEmit` → `npm run build`.
- Gotcha: `npx tsc --noEmit` fails with `Cannot find name 'LayoutProps'` / `PageProps` until `.next/types/routes.d.ts` exists (it's generated). Run `npm run build` or `npm run dev` first — e.g. after a fresh clone or `next clean`.
- Known pre-existing lint failure (not your regression): `src/components/ui/carousel.tsx:98`, rule `react-hooks/set-state-in-effect`, in a shadcn-generated file.

## Toolchain quirks (`next.config.ts`)

- `cacheComponents: true` (Next 16 Cache Components) and `partialPrefetching: true` — data-fetching/caching rules differ from older Next; check `node_modules/next/dist/docs/` before touching them.
- `reactCompiler: true` (babel-plugin-react-compiler) — React Compiler is on; lint enforces strict `react-hooks` rules (no setState in effects, no side effects during render).
- Tailwind **v4**, configured in CSS only: `src/app/globals.css` holds `@import "tailwindcss"`, `@theme inline`, and all shadcn theme variables. There is no `tailwind.config.*` — don't create one.

## Layout & branding

- `src/app/layout.tsx` renders `<Navbar />` → `<div className="flex-1">{children}</div>` → `<Footer />` (both from `src/components/HomePage/`). They're global — don't re-add them to individual pages (avoids duplicate header/footer).
- Brand palette (use as arbitrary Tailwind values, e.g. `bg-[#6D28D9]`): bg `#F5F3FF`, primary `#6D28D9`, secondary `#C4B5FD`, text `#2E1065`, muted text `#6B7280`.
- Logo is `public/logo.png`, 2055×765 (wide lockup): `<Image src="/logo.png" width={2055} height={765} className="h-10 w-auto" />`.
- Stub routes exist so nav links resolve (each is a minimal placeholder page): `/tuitions`, `/pricing`, `/about`, `/sign-up`, `/sign-in`.

## Icons (lucide-react)

- `lucide-react` has **no brand/social icons** (no Facebook/Instagram/LinkedIn/Twitter/X) — brand logos must be inline SVG paths (see `Footer.tsx`). Don't add an icon package for them.
- Use the suffixed import style this codebase follows: `MenuIcon`, `XIcon`, `MailIcon` (both `Menu` and `MenuIcon` are exported; pick the `*Icon` form).
- `next/image`: the `priority` prop is **deprecated in Next 16** — use `preload` instead.

## shadcn / UI

- `components.json`: style `base-nova`, RSC on, lucide icons. Primitives are **Base UI (`@base-ui/react`)**, not Radix — don't import Radix packages.
- Generated primitives live in `src/components/ui/`. Add/upgrade with the `shadcn` CLI (a local dependency: `npx shadcn add <component>`); re-adding overwrites local edits.
- `cn` is the npm package: `import { cn } from "cn"`. `src/lib/utils.ts` only re-exports it — don't write a local clsx/tailwind-merge helper.
- App-specific components go in `src/components/<Feature>/` (e.g. `HomePage/Navbar.tsx`).

# QuackForge — Deployment Guide

This document explains how to deploy QuackForge to **`quackforge.web.app`** (Firebase Hosting) and how the current Vercel deployment works as a fallback / staging.

---

## Current live deployments

| URL | Platform | Status |
|-----|----------|--------|
| https://quackforge.vercel.app | Vercel (production, auto-deploy from GitHub `main`) | Live, primary |
| https://quackforge-git-main-stxaviersofficials-projects.vercel.app | Vercel (per-commit alias) | Live |
| https://quackforge-stxaviersofficials-projects.vercel.app | Vercel (branch alias) | Live |
| https://quackforge.web.app | Firebase Hosting | **Not yet — requires one-time setup below** |
| GitHub repo | https://github.com/StXaviersOfficial/quackforge | Live |

Vercel auto-deploys on every push to `main`. SSO protection is disabled so the URL is public.

---

## Why `quackforge.web.app` is not live yet

The subdomain `quackforge.web.app` is reserved by Firebase for a Firebase project whose ID is exactly `quackforge`. That project does not exist yet in your Google account, and I cannot create Firebase projects programmatically without interactive Google OAuth (the Firebase Management API requires a user consent flow, not just a service account).

To activate `quackforge.web.app`, you need to:

1. Create the Firebase project named **`quackforge`** in the Firebase console.
2. Add Firebase Hosting to it.
3. Run `firebase deploy` from this directory.

The repo already has the correct `firebase.json`, `.firebaserc`, and `firestore.rules` for that deploy. The only missing piece is the project itself.

---

## One-time setup (you do this — ~5 minutes)

### 1. Create the `quackforge` Firebase project

Open https://console.firebase.google.com and click **Add project**.

- Project name: `QuackForge`
- Project ID: **`quackforge`** (must be exactly this — Firebase will offer `quackforge` if available, or `quackforge-1` / `quackforge-xyz` if taken. If the exact ID is taken, you can't get `quackforge.web.app` and must either pick a different domain or use a custom domain like `app.quackforge.dev` instead.)
- Google Analytics: optional, recommended off for a marketing site.

### 2. Enable Hosting

In the new project's left sidebar, click **Hosting → Get started**. Skip the CLI install step (you already have it). Don't add any files yet.

### 3. Add Firestore (for the contact form)

In the sidebar, click **Firestore Database → Create database**. Pick **production mode** and a location close to your users (e.g., `asia-south1` for India).

### 4. Generate a service account for the contact form

In Project settings (gear icon → Project settings) → **Service accounts** tab → click **Generate new private key**. Save the JSON file somewhere safe. This is what the Next.js API route uses to write enquiries to Firestore.

### 5. Add the env var to Vercel

The current Vercel deploy is using the `stxavierswebsite` service account. To switch it to the new `quackforge` project:

1. Open https://vercel.com/stxaviersofficials-projects/quackforge/settings/environment-variables
2. Find `FIREBASE_SERVICE_ACCOUNT`, click edit, paste the new JSON from step 4.
3. Redeploy: Vercel → Deployments → ⋮ on latest → Redeploy.

OR run this from your laptop:

```bash
cd /path/to/quackforge
firebase functions:secrets:set FIREBASE_SERVICE_ACCOUNT  # if using functions
# or set it via the Vercel dashboard
```

---

## Deploy commands (after the one-time setup)

### Vercel (auto-deploy)

```bash
git push origin main
# Vercel builds & deploys automatically
```

### Firebase Hosting (manual — run from project root)

```bash
# First-time login (one-time, interactive)
firebase login

# Or non-interactive with a token:
firebase login:ci   # save the token

# Build the static export
bun run build:static   # see scripts below — adds a static-export build target

# Deploy to quackforge.web.app
firebase deploy --project quackforge

# Or with a CI token:
firebase deploy --project quackforge --token "$FIREBASE_CI_TOKEN"
```

---

## Next.js static export for Firebase Hosting

The current build target outputs a Vercel-style SSR app. For Firebase Hosting (which is static-only unless paired with Cloud Functions), you need to enable `output: 'export'` in `next.config.ts`. The repo currently uses the SSR config because Vercel is the primary deploy target.

To switch to static export for Firebase, change `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
```

Then `bun run build` outputs to `out/` — that's what `firebase.json` points at. Note: the contact form's `/api/contact` route will NOT work on static hosting because there's no server runtime. You'd need to move that route to a Cloud Function or a Cloudflare Worker.

**Recommendation:** Keep Vercel as primary (full SSR + API routes work out of the box). Use Firebase Hosting only if you specifically need the `quackforge.web.app` subdomain — and in that case, point Firebase Hosting's rewrite rules at the Vercel URL instead of trying to host the Next.js app on Firebase directly.

---

## Custom domain option (alternative to .web.app)

If `quackforge` is taken as a project ID, you can:

1. Create a Firebase project with any ID (e.g., `quackforge-site`).
2. In Hosting → Add custom domain → enter `quackforge.web.app` — Firebase will tell you to verify ownership of `quackforge.web.app` first.
3. Skip this; it only works if you own the apex `quackforge` domain.

The cleanest path if you want a real custom domain: register `quackforge.dev` (or `.com`, `.io`) and add it to either Firebase Hosting or Vercel as a custom domain. Vercel auto-issues SSL.

---

## Vercel project settings (already configured)

- **Project ID**: `prj_rr8SKp9c6OrQKMXoNEaAzXf95Uqr`
- **Team**: `stxaviersofficials-projects`
- **Linked GitHub repo**: `StXaviersOfficial/quackforge` (main branch → production)
- **Build command**: `next build`
- **Output dir**: `.next`
- **Install command**: `bun install`
- **SSO protection**: disabled (public URL)
- **Production alias**: `quackforge.vercel.app`
- **Env vars**: `FIREBASE_SERVICE_ACCOUNT` (encrypted, all environments)

---

## GitHub repo

- URL: https://github.com/StXaviersOfficial/quackforge
- Default branch: `main`
- Auto-deploys to Vercel on push

To push changes from a local clone:

```bash
git clone https://github.com/StXaviersOfficial/quackforge.git
cd quackforge
bun install
# make changes
git add -A && git commit -m "..."
git push origin main
# Vercel auto-deploys in ~60s
```

---

## Local dev

```bash
bun install
bun run dev     # http://localhost:3000
bun run lint    # ESLint check
```

Required env vars (copy to `.env` for local dev):

```
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...full JSON...}
```

Get this JSON from Firebase console → Project settings → Service accounts → Generate new private key.

---

## File layout

```
quackforge/
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts    # Firestore-backed contact form
│   │   ├── globals.css             # QuackForge brand colors + dark theme
│   │   ├── layout.tsx              # Geist + Instrument Serif fonts, ThemeProvider
│   │   └── page.tsx                # Composes all sections
│   ├── components/
│   │   ├── sections/
│   │   │   ├── hero.tsx            # Logo + tagline + terminal demo
│   │   │   ├── services.tsx        # 6 services grid
│   │   │   ├── pricing.tsx         # 6-tier pricing (Free/Demo/$99/$149/$299/Custom)
│   │   │   ├── work.tsx            # 6 placeholder case studies
│   │   │   ├── process.tsx         # 5-step timeline
│   │   │   ├── contact.tsx         # Firestore-backed form
│   │   │   └── footer.tsx          # Sticky footer
│   │   ├── site-nav.tsx            # Sticky nav with theme toggle + mobile menu
│   │   ├── theme-provider.tsx      # next-themes wrapper
│   │   └── theme-toggle.tsx        # Light/dark/system toggle
│   └── lib/
│       ├── firebase-admin.ts       # Server-side Firebase Admin SDK
│       └── utils.ts                # cn() helper
├── public/quackforge-logo.png      # Brand logo (2508x2508)
├── firebase.json                   # Firebase Hosting config
├── .firebaserc                     # Firebase project aliases
├── firestore.rules                 # Public-write, no-read rules for enquiries
└── package.json
```

---

## Tech stack

- Next.js 16 (App Router, Turbopack)
- TypeScript 5 (strict)
- Tailwind CSS 4 + shadcn/ui (New York)
- next-themes (system + manual toggle)
- Firebase Admin SDK (server-side Firestore writes)
- Geist Sans + Geist Mono + Instrument Serif (Google Fonts)
- Brand colors: electric blue `#1E6FFF`, orange `#FF6B1A`

---

## What to do next

1. **Verify the live site**: open https://quackforge.vercel.app on mobile + desktop, test the contact form yourself, click every CTA.
2. **Swap portfolio placeholders**: edit `src/components/sections/work.tsx`, replace the 6 placeholder objects with your real projects (names, screenshots, links).
3. **Add Google Analytics / Plausible**: drop the snippet into `src/app/layout.tsx` (one line). Recommended: Plausible (privacy-friendly, no cookie banner needed).
4. **Set up the `quackforge` Firebase project** (one-time, ~5 min, see above) if you specifically need `quackforge.web.app` as the URL.
5. **Add a sitemap + robots.txt**: Next.js 16 supports `app/sitemap.ts` and `app/robots.ts` natively — add both for SEO.
6. **Submit to Google Search Console**: add the site, verify via DNS TXT record on your domain, submit the sitemap.
7. **Wire Fiverr / contact channels**: update the email and social links in `src/components/sections/contact.tsx` and `footer.tsx` if you want different ones.

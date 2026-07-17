# PTC Creative — Full-stack Platform

Creative Technology Platform: CNC · Werbetechnik · Printing · Branding · Website · Marketing (DE market).

UI design system is preserved. This document covers **backend, auth, CMS, portals, AI, GDPR**.

## Stack

| Layer | Tech |
|-------|------|
| App | Next.js 16 App Router, TypeScript strict, Tailwind |
| DB | PostgreSQL + Prisma 6 |
| Auth | Auth.js (NextAuth v5) credentials + JWT |
| Validation | Zod + React Hook Form (forms) |
| i18n UI | Existing dictionaries (`vi` / `de`) + locale URLs |
| AI | Google Gen AI SDK (Gemini) — **server-only** |
| Email | Resend (console fallback in dev) |

## Quick start

### 1. PostgreSQL

```bash
# Docker (recommended)
docker compose up -d

# Or local Postgres 16 — create DB `ptc_creative` and user matching DATABASE_URL
```

### 2. Environment

```bash
cp .env.example .env
# Set DATABASE_URL, AUTH_SECRET, optional GEMINI_API_KEY / RESEND_API_KEY
```

### 3. Install & migrate

```bash
npm install
npx prisma db push
# or: npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000 → `/vi`.

### Demo accounts (after seed)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | `admin@ptc-creative.de` | `Password123!` |
| Staff | `staff@ptc-creative.de` | `Password123!` |
| Editor | `editor@ptc-creative.de` | `Password123!` |
| User | `demo@ptc-creative.de` | `Password123!` |

## Architecture

```
src/
  auth.ts / auth.config.ts     # Auth.js
  actions/                     # Server Actions (auth, quotes, portal, contact)
  app/api/                     # REST: auth, AI stream, files, consent
  app/[locale]/               # Public + portal + admin pages
  lib/
    prisma.ts, rbac.ts, rate-limit.ts, cms.ts, upload.ts
    ai/gemini.ts               # Gemini + fallbacks
    validations/               # Zod schemas
    email.ts + email-templates.ts
  components/                  # Existing UI + auth forms + cookie consent
prisma/
  schema.prisma                # Full domain + translation tables
  seed.ts
```

### RBAC (server-side)

`GUEST | USER | STAFF | EDITOR | ADMIN | SUPER_ADMIN`

- **User**: portal, own quotes/projects/appointments  
- **Staff**: leads, quotes, assigned projects  
- **Editor**: CMS content only  
- **Admin / Super Admin**: full console (+ settings for Super Admin)  
- **User never** reaches Admin without elevated role  

### Quote statuses

`DRAFT → SUBMITTED → REVIEWING → NEED_MORE_INFO → QUOTED → ACCEPTED | REJECTED → CONVERTED_TO_PROJECT | ARCHIVED`

Dynamic specs by category:

- **CNC / Printing / Werbetechnik**: product, material, sizes, thickness, qty, color, process, finish, design file, delivery/install, location, deadline, notes  
- **Website**: industry, type, goals, pages, features, languages, refs, budget, deadline  
- **Marketing**: industry, area, goals, channels, website, ad budget, duration, KPIs  

### AI (Gemini)

| Endpoint | Purpose |
|----------|---------|
| `POST /api/ai/chat` | Streaming assistant + history |
| `POST /api/ai/brief` | Structured brief (Zod `aiBriefSchema`) |
| `POST /api/ai/recommend` | Preliminary solution stack |

Rules enforced in prompts: no fake prices, no deadline commitments, no legal/tax advice, locale-aware, PII redaction, rate limits, fallback if key missing.

### Uploads

`POST /api/files/upload` — MIME + extension allowlist (PDF, JPG/PNG/WebP, SVG sanitized, AI/EPS/PSD, DXF/DWG, ZIP), size limit, private storage, signed access via `GET /api/files/...`.

### GDPR

Cookie consent banner + `ConsentLog`, AI consent, data export & account deletion actions, legal pages (`/legal/privacy|imprint|terms|cookies`).

## Key file map

| Path | Role |
|------|------|
| `prisma/schema.prisma` | DB models + translation tables |
| `prisma/seed.ts` | Bilingual seed (services, 7 industries, 12 cases, 12 blogs, 20 FAQ, team, testimonials, quotes) |
| `src/auth.ts` | Credentials provider, email verified check, rate limit |
| `src/lib/rbac.ts` | Permission matrix |
| `src/actions/auth.ts` | Register/login/logout/verify/reset/GDPR |
| `src/actions/quotes.ts` | Quote CRUD + accept/reject → project |
| `src/actions/portal.ts` | Profile, appointments, feedback, dashboard stats |
| `src/actions/contact.ts` | Contact → Lead + email |
| `src/lib/cms.ts` | Published CMS loaders (locale-aware) |
| `src/lib/ai/gemini.ts` | Gemini client + streaming + brief/recommend |
| `src/app/[locale]/dashboard/**` | User portal |
| `src/app/[locale]/admin/**` | Admin console |
| `src/components/auth/auth-forms.tsx` | Auth UI wired to server actions |

## Checklist — delivered in this phase

- [x] Prisma schema (users, RBAC, CMS translations, leads, quotes, projects, AI, media, consent, audit)
- [x] Auth.js register / login / logout / email verify / forgot+reset / remember flag / rate limit
- [x] Server-side RBAC helpers + admin/portal guards
- [x] Quote workflow with category-specific Zod specs
- [x] User dashboard stats + quote create form
- [x] Admin dashboard KPIs + module links (role-filtered)
- [x] Gemini chat stream, brief JSON (Zod), recommender, fallbacks
- [x] File upload API + private serve
- [x] Bilingual email templates
- [x] Cookie consent + consent API
- [x] Legal pages + GDPR export/delete actions
- [x] Seed script (no Lorem Ipsum)
- [x] `.env.example` + README

## Pending / ops notes

- Run `prisma db push` / migrate against a live PostgreSQL (this environment may block local Postgres binaries).
- Wire remaining admin CRUD screens to CMS actions (scaffold + dashboard live; extend modules as needed).
- next-intl message catalogs can gradually replace dictionary files for form errors.
- Production: set strong `AUTH_SECRET`, HTTPS cookies, Resend domain, Gemini key, S3-compatible storage for uploads.

## Scripts

```bash
npm run dev
npm run build
npm run db:push
npm run db:seed
npm run db:studio
```

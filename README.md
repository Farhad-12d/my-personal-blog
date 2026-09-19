# Field Notes — personal publishing site

A Next.js 14 (App Router) blog: Markdown articles, categories/tags, comments
with moderation, a password-protected admin panel, and a small restrained
3D hero (React Three Fiber) on the homepage. Built for deployment on Netlify
with a Postgres database.

## Stack

- Next.js 14 + TypeScript + Tailwind CSS
- Prisma ORM + PostgreSQL
- React Three Fiber / Three.js (homepage hero only)
- Auth: a single admin account, signed JWT cookie (no external auth service)

## 1. Install

```bash
npm install
```

## 2. Database

Get a Postgres connection string — the easiest path is Netlify's own
database (`netlify db:init` from the Netlify CLI, or **Add-ons → Postgres**
in the Netlify dashboard), which gives you a `NETLIFY_DATABASE_URL`. Any
other Postgres host (Supabase, Neon, Railway, etc.) works the same way.

Copy `.env.example` to `.env` and fill in `DATABASE_URL` plus the admin
credentials and `SESSION_SECRET` (generate one with `openssl rand -base64 32`).

Then create the tables and seed your admin account:

```bash
npx prisma migrate dev --name init
npm run seed
```

`npm run seed` creates one admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD`
in `.env`, a "Notes" category, and one sample article so the homepage isn't
empty on first run.

## 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin`
to log in and write.

## 4. Deploy to Netlify

1. Push this project to a GitHub repo.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
   The included `netlify.toml` (with `@netlify/plugin-nextjs`) handles the
   build config automatically.
3. In **Site configuration → Environment variables**, add `DATABASE_URL`,
   `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`.
   Never commit `.env` — it's already in `.gitignore`.
4. Deploy. Then run the migration + seed once against the production
   database (either via `netlify dev` locally pointed at the prod
   `DATABASE_URL`, or `npx prisma migrate deploy` from CI/your machine).

## Project structure

```
app/                  routes (App Router)
  admin/(site)/        authenticated admin pages (dashboard, articles, comments)
  admin/login/          public login page (outside the admin chrome)
  api/                  route handlers: auth, articles, comments
  articles/[slug]/      article detail
  category/[slug]/, tag/[slug]/, search/, about/
components/
  3d/                   the homepage hero scene
  admin/, articles/, layout/, ui/
lib/                    db client, session/auth, article queries, markdown/utils
prisma/                 schema.prisma, seed.ts
```

## Notes on what's here vs. what's a good v2

This is a working v1 scoped for a single-author blog, matching the
"personal publishing platform" plan: write in Markdown, organize with
categories/tags, moderate comments, toggle draft/published. Deliberately
left out for now (all straightforward to add later):

- Scheduled/timed publishing (the `SCHEDULED` status exists in the schema
  but nothing currently flips it to `PUBLISHED` automatically — a cron
  Netlify Function reading `publishedAt` would do it)
- Rich-text/WYSIWYG editor (currently Markdown + preview toggle — swapping
  in something like Tiptap is a contained change to `ArticleEditor.tsx`)
- Image uploads (featured images are just a URL field right now — wiring
  up something like Cloudinary or Netlify Blobs for uploads is the next step)
- Multi-author roles (schema supports multiple `User` rows, but the admin
  UI assumes one writer)

## Design

Dark "ink" theme by default with a light-mode toggle. Type: Spectral
(serif, headings + article body) and Space Grotesk (sans, UI chrome).
Color tokens live in `tailwind.config.ts` (`ink`, `paper`, `brass`, `moss`,
`line`, `muted`) if you want to retheme.

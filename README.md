# GetItDone (MVP)

A services marketplace built with Next.js 15 (App Router), TypeScript and Tailwind CSS. It follows your Figma screens: landing page, category browse, provider profile with booking, and the customer dashboard.

## Run it locally

You need Node 18.18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com, click **Add New Project**, and import the repo.
3. Leave every setting on its default. Vercel detects Next.js on its own.
4. Click **Deploy**.

No environment variables are needed for this version.

## What works

- Home page with search, categories, popular services, top providers
- `/services` with keyword, location, category and sort filters
- `/providers/[id]` with services, reviews and a working booking form (10% platform fee)
- Join / Sign in (demo auth, see below)
- `/dashboard` with bookings, messages, saved providers and services, wallet and requests
- `/become-a-provider` application form

## Demo mode (read this before launch)

There is no database yet. Accounts, bookings, saved items and requests are stored in the visitor's browser (localStorage). Provider and service data lives in `lib/data.ts`. Payments, chat and the provider application form are placeholders.

First sign in creates a few sample bookings so the dashboard looks like the design.

## Swapping in real images

Cards use gradient tiles with category icons. To use photos, drop them in `public/images/` and replace the `ServiceThumb` and `Avatar` components with `next/image`.

## Suggested next steps

1. Auth and database: Supabase (Auth + Postgres) or Clerk + Prisma
2. Payments: Paystack or Flutterwave
3. Real-time chat: Supabase Realtime or Pusher
4. Image uploads for provider portfolios: Supabase Storage or Cloudinary

## Project layout

```
app/                 pages (home, services, providers/[id], dashboard, ...)
components/          shared UI and the dashboard client
lib/data.ts          categories, providers, services, reviews
lib/store.tsx        client state saved to localStorage
```

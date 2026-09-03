# Kathmandu Valley Heritage Guide

A static Next.js travel-guide site for Kathmandu Valley, built from the source data in `places-data.json` and styled around a dark temple-inspired palette.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

- `app/` contains the route pages and global layout
- `components/` contains the site header and search UI
- `lib/places.ts` holds the site data model, slug generation, and static route helpers
- `places-data.json` is the authoritative content source for all 51 heritage sites

## Adding new places

1. Edit `places-data.json`.
2. Add a new object with `name`, `district`, and `description`.
3. Restart the dev server or rebuild to regenerate static routes.

The app derives slugs and routes automatically from the data file.

## Adding photography later

Use a local `/public` image set or a CMS-backed image field for each site. Keep alt text descriptive and mark placeholders clearly until licensed photography is available.

## Notes

- The site is pre-rendered with static generation and works as a Vercel-ready Next.js app.
- The data is intentionally read-only and not backed by a database or API.

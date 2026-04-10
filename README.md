# Commodity Intelligence Terminal

Private, premium-style intelligence dashboard for a commodity trader. The MVP is designed to run on free/public sources first, with explicit source transparency and clean adapter interfaces for premium feeds later.

## What is included

- Next.js App Router application in TypeScript
- Prisma schema for the core domain
- Single-user secure login flow using signed JWT cookies
- Dashboard, briefings, events, watchlists, templates, sources, and settings pages
- Free/public source adapter layer plus premium adapter interfaces
- Grounded briefing generation pipeline with confidence/freshness labeling
- PDF export scaffold via `@react-pdf/renderer`
- Seeded mock/demo data so the product is usable before live feeds are connected

## Local setup

1. Install Node.js 20+ and PostgreSQL 15+.
2. Copy `.env.example` to `.env`.
3. Generate a bcrypt hash for your password:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

4. Put the hash into `AUTH_PASSWORD_HASH`.
5. Install dependencies:

```bash
npm install
```

6. Push the schema and seed the database:

```bash
npx prisma db push
npm run db:seed
```

7. Start the app:

```bash
npm run dev
```

8. Open [http://localhost:3000/login](http://localhost:3000/login).

## MVP source model

### Tier 1: free/public first

- FRED for macro time series and policy-sensitive indicators
- EIA public endpoints for energy and inventory context
- World Bank commodity data where appropriate
- Official central bank and institutional calendars
- Official conference and event organizer pages
- Company press releases and official publications

### Tier 2: public news and RSS

- Reuters public article pages for linking and grounded summaries
- Public maritime and commodity news feeds
- Financial and macro RSS feeds

### Tier 3: optional premium

- Bloomberg
- Reuters licensed feeds
- S&P Global Commodity Insights
- Baltic Exchange licensed freight data

Premium providers are represented by interfaces only. They are never shown as available unless explicitly configured later.

## Architecture notes

- UI is optimized for desktop first, but remains responsive for mobile review.
- Every item in the UI includes source, timestamp, source type, and freshness/credibility labels.
- Freight modules distinguish official, public, manual, estimated, and demo values.
- Briefings are built from normalized feed items, grouped stories, scoring, and grounded summarization prompts.

Detailed architecture, source notes, scoring logic, and prompt templates live in [docs/architecture.md](docs/architecture.md) and [docs/sources.md](docs/sources.md).

## Manual GitHub upload

If you are uploading through the GitHub website, drag and drop the project files and folders from the prepared upload folder, not the `.git` folder and not a compressed `.zip` if you want Vercel to deploy it as an app.

Required root-level files and folders include:

- `app/`
- `components/`
- `docs/`
- `lib/`
- `prisma/`
- `.env.example`
- `.gitignore`
- `README.md`
- `package.json`
- `next.config.mjs`
- `tailwind.config.ts`
- `tsconfig.json`
- `postcss.config.js`
- `middleware.ts`
- `next-env.d.ts`

Do not upload `.env`, `.next`, `node_modules`, `.DS_Store`, or `.git`.

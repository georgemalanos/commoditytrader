# Architecture

## Full app architecture

- `app/`
  Next.js App Router pages, authenticated routes, and API endpoints.
- `components/`
  Reusable terminal-style UI building blocks and domain components.
- `lib/auth/`
  Single-user authentication and cookie session management.
- `lib/adapters/free/`
  Free/public data connectors used by the MVP.
- `lib/adapters/premium/`
  Interfaces for licensed providers, intentionally disconnected by default.
- `lib/briefings/`
  Report generation and grounded summarization prompt architecture.
- `lib/events/`
  Event scoring and relevance logic.
- `lib/pdf/`
  PDF rendering for exportable briefings.
- `lib/data/`
  Demo seed content and mock fallbacks used when live sources are unavailable.
- `prisma/`
  Database schema and seed script.

## File/folder structure

```text
.
├── app
│   ├── (auth)/login
│   ├── api
│   │   ├── briefings
│   │   ├── events
│   │   ├── sources
│   │   ├── templates
│   │   └── watchlists
│   ├── briefings
│   ├── dashboard
│   ├── events
│   ├── settings
│   ├── sources
│   ├── templates
│   └── watchlists
├── components
│   ├── briefings
│   ├── dashboard
│   ├── events
│   ├── layout
│   └── ui
├── docs
├── lib
│   ├── adapters
│   │   ├── free
│   │   └── premium
│   ├── auth
│   ├── briefings
│   ├── data
│   ├── events
│   ├── pdf
│   ├── scoring
│   └── types
├── prisma
└── public
```

## Report generation pipeline

1. Collect enabled source adapters by source-priority profile.
2. Normalize raw payloads into commodity, freight, news, and event records.
3. Deduplicate by canonical URL, event slug, and commodity/freight identity.
4. Score freshness and credibility.
5. Group related stories and surface contradictions.
6. Compose a grounded briefing payload.
7. Generate morning or close briefing.
8. Store the briefing with its sections and source references.
9. Render to UI, PDF, and optional email.

## Queue/job design

Recommended production setup:

- `ingestSources` cron job every 15-30 minutes
- `generateMorningBriefing` at local market-prep time
- `generateCloseBriefing` at local market-close time
- `sendAlerts` event-triggered or minutely

Suggested queue technologies:

- `pg-boss` if you want to stay close to PostgreSQL
- `BullMQ` if Redis is available

The current MVP keeps this logic modular so the adapters and generators can move into jobs without changing page code.

## Sample Morning Briefing layout

- Executive summary
- Top commodity movers
- Freight highlights
- Overnight macro and geopolitics
- Important events today
- Risks and what to watch

## Sample Market Close layout

- Executive summary
- Biggest moves of the day
- Why markets moved
- Risk assessment
- Tomorrow's watchlist
- Changes versus the morning view

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/PHP-8.4-777BB4?logo=php&logoColor=white">
    <img alt="PHP 8.4" src="https://img.shields.io/badge/PHP-8.4-777BB4?logo=php&logoColor=white">
  </picture>
  <img alt="Laravel 13" src="https://img.shields.io/badge/Laravel-13-FF2D20?logo=laravel&logoColor=white">
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
</p>

# BA Event

**Full-stack event planner for Blue Archive.** Laravel 13 + Next.js 16 monorepo.

Track raid schedules, plan pyroxene spending, coordinate with your club — all in one place.

---

## Screenshots

> *Coming soon.*

---

## What Is This?

BA Event is a community tool for **Blue Archive** players who want to plan ahead. The game runs multiple overlapping events, raids, and limited-time banners — it's easy to miss something or waste premium currency.

This app gives you a dashboard to track everything, share plans with your club, and optimize your resource spending. Currently in active development with auth fully implemented.

---

## ✨ Technical Highlights

| Highlight | Why It Matters |
|-----------|---------------|
| **Cookie-based Sanctum auth** | `auth_token` is HttpOnly — immune to XSS. Middleware bridges cookie to Bearer header. On 401, server clears cookie automatically. |
| **Single Nginx entry point** | Port 8080 proxies `/api/*` → Laravel, `/*` → Next.js. **Zero CORS issues** in development or production. |
| **OpenAPI-first API client** | Laravel attributes → auto-generated OpenAPI spec → type-safe React Query hooks on the frontend. Change an API endpoint, Typescript catches mismatches instantly. |
| **Multi-stage Docker builds** | Separate `vendor`, `prod`, `app`, `dev` stages. Production images are minimal — no build tooling, no git. |
| **Nix dev shell** | `nix develop` gives PHP 8.4, Composer, Node 22 — no Docker needed. Reproducible across machines. |
| **Pest + Playwright** | Full test coverage: backend unit/feature tests with Pest, browser E2E tests with Playwright in Docker. |
| **Latest versions** | Laravel 13, Next.js 16, React 19, Tailwind v4, shadcn/ui v4 — using the newest ecosystem. |

---

## Architecture

```
                  ┌─────────────────┐
                  │   Nginx :8080   │
                  │  (single entry) │
                  └────────┬────────┘
                           │
                  ┌────────┴────────┐
                  │                 │
           /api/* │                 │  /*
                  ▼                 ▼
        ┌──────────────┐   ┌──────────────┐
        │  PHP-FPM     │   │   Next.js    │
        │  (Laravel)   │   │  (Standalone)│
        │  :9000       │   │  :3000       │
        └──────┬───────┘   └──────────────┘
               │
      ┌────────┴────────┐
      │                 │
  PostgreSQL 17    Redis 7
```

---

## Quick Start

```bash
cp .env.example .env
docker compose up --build
```

Open **http://localhost:8080**. Nginx routes everything.

### Production

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Multi-stage images — minimal, no build deps.

### Without Docker (Nix)

```bash
nix develop
```

Provides PHP 8.4, Composer 2.9, Node 22. Runs natively.

---

## Project Structure

```
ba-event/
├── api/               # Laravel 13 REST API
│   ├── app/
│   │   ├── Http/Controllers/Api/   # Auth, SocialAuth
│   │   ├── Http/Middleware/        # ApiTokenFromCookie
│   │   ├── Http/Requests/         # Form requests with validation
│   │   ├── Http/Resources/        # API Resources
│   │   └── Models/                # User, SocialAccount
│   ├── database/migrations/       # 5 migrations
│   ├── routes/api.php             # All API routes
│   └── tests/                     # Pest feature tests
│
├── web/               # Next.js 16 frontend
│   ├── src/
│   │   ├── app/                   # Pages + layouts
│   │   ├── components/            # shadcn/ui components
│   │   ├── lib/                   # API client, types, utils
│   │   └── middleware.ts          # Auth guard
│   └── e2e/                       # Playwright tests
│
├── docker-compose.yml             # Dev: 7 services
├── docker-compose.prod.yml        # Production overrides
├── docker-compose.e2e.yml         # E2E runner
├── flake.nix                      # Nix dev shell
├── lefthook.yml                   # Pre-commit hooks
└── AGENTS.md                      # AI coding guidelines
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **API** | Laravel 13, Sanctum 4, Socialite 5 |
| **Frontend** | Next.js 16, React 19, shadcn/ui v4, Tailwind v4 |
| **Types** | TypeScript 5, openapi-fetch, openapi-react-query |
| **Database** | PostgreSQL 17, Redis 7 |
| **Infra** | Docker Compose, Nginx, Nix |
| **Testing** | Pest 4 (PHP), Playwright (E2E) |
| **Quality** | Laravel Pint, ESLint, Lefthook |

---

## Testing

```bash
# Backend (Pest)
docker compose exec api-php php artisan test --compact

# E2E (Playwright)
docker compose up -d
docker compose -f docker-compose.yml -f docker-compose.e2e.yml run --rm e2e
```

---

## Roadmap

- [x] Auth (email/password + Google OAuth)
- [ ] Raid schedule tracker
- [ ] Pyroxene income/expense planner
- [ ] Club coordination & notes
- [ ] Event countdowns & notifications

---

## License

MIT — free as in freedom.

# BA Event

Monorepo for a Blue Archive event planner. Contains a **Laravel API backend** (`api/`) and
a **Next.js frontend** (`web/`) with shadcn/ui.

```bash
docker compose up
# → API + frontend served at http://localhost:8080
```

## Structure

```
.
├── api/              # Laravel 13 — REST API with Sanctum auth
│   ├── app/          # Controllers, models, requests
│   ├── config/       # Laravel config
│   ├── routes/       # API routes
│   ├── tests/        # Pest test suite
│   └── Dockerfile    # PHP-FPM Docker image
├── web/              # Next.js — frontend with shadcn/ui
│   ├── src/          # App router pages and components
│   └── Dockerfile    # Next.js standalone Docker image
├── docker-compose.yml
├── dev.sh            # Nix + Docker local dev script
└── flake.nix         # Optional Nix shell
```

## Quick Start (Docker)

```bash
cp .env.example .env
docker compose up
```

Open http://localhost:8080 — nginx proxies `/api/*` to Laravel and `/*` to the Next.js
frontend. No separate ports needed.

The entrypoint script auto-runs `composer install` and generates `APP_KEY` on first start.

## Development (Nix + Docker)

For contributors who prefer running dev servers directly:

```bash
./dev.sh
```

This starts PostgreSQL/Redis/Mailpit via Docker, installs deps, runs migrations, and
prints instructions for starting both dev servers.

## API

Token-based authentication via Laravel Sanctum. All API routes are prefixed with `/api`.

Pass the token as `Authorization: Bearer <token>`.

### Public Endpoints

| Method | Path | Description | Rate Limit |
|---|---|---|---|
| POST | `/api/register` | Create account | 3/min |
| POST | `/api/login` | Login via email + password | 5/min |
| GET | `/api/auth/google/url` | Get Google OAuth redirect URL | — |
| POST | `/api/auth/google/callback` | Exchange Google code for user + token | — |

### Authenticated Endpoints (`auth:sanctum`)

| Method | Path | Description |
|---|---|---|
| POST | `/api/logout` | Revoke current token |
| GET | `/api/user` | Get authenticated user |

### OAuth Setup

Set these in `.env`:

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | Google Cloud OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google Cloud OAuth client secret |
| `GOOGLE_REDIRECT_URI` | Frontend callback URL |

## Docker Services

| Service | Role |
|---|---|
| `postgresql` | Database |
| `redis` | Cache / queue backend |
| `mailpit` | Dev email catcher (UI at port 8025) |
| `api-php` | PHP-FPM serving Laravel |
| `api-queue` | Queue worker |
| `api-nginx` | Reverse proxy (port 8080) — `/api/*` → Laravel, `/*` → Next.js |
| `web` | Next.js standalone server (internal, port 3000) |

## Development Commands

```bash
# API
cd api && php artisan serve
cd api && php artisan test --compact
cd api && vendor/bin/pint --format agent

# Frontend
cd web && npm run dev
```

## Testing

```bash
cd api && php artisan test --compact
cd api && php artisan test --compact --filter=AuthTest
cd api && php artisan test --compact --filter=SocialAuthTest
```

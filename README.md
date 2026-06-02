# BA Event

Monorepo for a Blue Archive event planner. Contains a **Laravel API backend** (`api/`) and
a **Next.js frontend** (`web/`) with shadcn/ui.

## Quick Start

```bash
cp .env.example .env
docker compose up --build
```

Open http://localhost:8080 — nginx proxies `/api/*` to Laravel PHP-FPM and `/*` to the
Next.js dev server with hot module replacement.

## Production Build

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## Structure

```
.
├── api/              # Laravel 13 — REST API with Sanctum auth
│   ├── app/          # Controllers, models, requests
│   ├── config/       # Laravel config
│   ├── routes/       # API routes
│   ├── tests/        # Pest test suite
│   └── Dockerfile    # PHP-FPM multi-stage Dockerfile
├── web/              # Next.js — frontend with shadcn/ui
│   ├── src/          # App router pages and components
│   └── Dockerfile    # Next.js multi-stage Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
└── flake.nix         # Optional: provides PHP/Composer/Node for one-off commands
```

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
| `web` | Next.js (HMR in dev, standalone in prod) |

## Testing

```bash
docker compose exec api-php php artisan test --compact
docker compose exec api-php php artisan test --compact --filter=AuthTest
docker compose exec api-php php artisan test --compact --filter=SocialAuthTest
```

## Optional: Nix Shell

If you have Nix installed, `nix develop` provides PHP 8.4, Composer, and Node 22
for running one-off commands without Docker:

```bash
nix develop --command php artisan make:model Something
nix develop --command npm run lint
nix develop --command npm run build
```

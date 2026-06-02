# BA Event

Monorepo for a Blue Archive event planner. Contains a **Laravel API backend** (`api/`) and
a **Next.js frontend** (`web/`) with shadcn/ui.

## Table of Contents

- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Production Build](#production-build)
- [Structure](#structure)
- [API](#api)
- [Docker Services](#docker-services)
- [Testing](#testing)
- [Optional: Nix Shell](#optional-nix-shell)

## Requirements

- **Docker** (v24+) & **Docker Compose** (v2.24+) — the only hard requirement.
  Everything runs in containers; no local PHP/Node setup needed.
- **Optional: Nix** (with flakes) — provides PHP 8.4, Composer 2.9, Node 22
  for running one-off commands without Docker. See [Optional: Nix Shell](#optional-nix-shell).

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

### Backend (Pest)

```bash
docker compose exec api-php php artisan test --compact
docker compose exec api-php php artisan test --compact --filter=AuthTest
docker compose exec api-php php artisan test --compact --filter=SocialAuthTest
```

### E2E (Playwright)

Runs inside a dedicated Docker container — no host dependencies beyond Docker itself.

```bash
# Start the stack (if not already running)
docker compose up -d

# Run E2E tests
docker compose -f docker-compose.yml -f docker-compose.e2e.yml run --rm e2e
```

Tests run against the app at `http://localhost:8080` through the nginx proxy.
Chromium and all system libraries are bundled in the `mcr.microsoft.com/playwright` image.

## Optional: Nix Shell

[Nix](https://nixos.org/) is a cross-platform package manager that provides
a reproducible development environment. When configured with
[flakes](https://nixos.wiki/wiki/Flakes), a single `nix develop` gives you
exactly the tool versions this project needs, regardless of what's installed
system-wide:

| Tool      | Version   |
|-----------|-----------|
| PHP       | 8.4       |
| Composer  | 2.9       |
| Node.js   | 22        |
| pdo_pgsql | (included)|

Using Nix is **optional** — all tools are already bundled in the Docker
containers. It's only useful when you want to run a command outside of
Docker (e.g. a quick `php artisan make:model` or `npm run lint`).

### Installing Nix

```bash
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```

### Usage

```bash
nix develop                           # enter dev shell
nix develop --command php artisan tinker   # run one command
```

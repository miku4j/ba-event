# BA Event – Full‑stack Blue Archive Event Planner

Monorepo that provides a complete event‑planning tool for the game **Blue Archive**. It combines a **Laravel 13 API** (PHP 8.4) with a **Next.js** frontend built using **shadcn/ui** and TypeScript.

## Quick Start
```bash
cp .env.example .env
docker compose up --build
```
The app is reachable at `http://localhost:8080` – Nginx proxies `/api/*` to Laravel and `/*` to the Next.js dev server.

## Production Build
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```
Multi‑stage Docker images produce a minimal production container.

## Key Features
- **Secure auth** – Email/password & Google OAuth, cookies are HttpOnly (`auth_token`) and cleared server‑side on 401.
- **Rate‑limited public endpoints** – Register (3 req/min) & login (5 req/min).
- **Laravel 13 REST API** with Sanctum, Socialite, and auto‑generated OpenAPI spec.
- **Next.js UI** using shadcn/ui components, TypeScript, and React‑Query (`useQuery`/`useMutation`).
- **Docker‑first workflow** – PostgreSQL, Redis, Mailpit, PHP‑FPM, Nginx, and Next.js services.
- **Optional Nix shell** – Reproducible dev environment (PHP 8.4, Composer 2.9, Node 22) without Docker.
- **Full test suite** – Pest backend tests + Playwright end‑to‑end tests in Docker.

## Tech Stack
| Layer | Technology |
|-------|------------|
| API | Laravel 13, Sanctum, Socialite |
| Frontend | Next.js, TypeScript, shadcn/ui, TailwindCSS |
| Auth | HttpOnly `auth_token` cookie, Google OAuth |
| DevOps | Docker Compose, Nix, Pint (code formatting) |
| Tests | Pest (PHP), Playwright (E2E) |

## Testing
```bash
# Backend tests
docker compose exec api-php php artisan test --compact

# End‑to‑end tests
docker compose up -d
docker compose -f docker-compose.yml -f docker-compose.e2e.yml run --rm e2e
```

## Optional Nix Shell
```bash
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
nix develop
```
Provides PHP 8.4, Composer 2.9, and Node 22 without Docker.

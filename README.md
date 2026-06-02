# BA Event

Headless Laravel API backend for a Blue Archive event planner. Built with Laravel 13,
Sanctum (token-based auth), PostgreSQL, and designed to serve a Next.js frontend.

## Requirements

- PHP 8.4
- Composer
- Node.js 22
- PostgreSQL 17
- Redis 7 (optional, for caching)

## Setup

Architecture: **Nix provides the app server** (PHP, Composer, Node). **Docker runs stateful
services** (PostgreSQL, Redis, Mailpit).

### Nix + Docker (recommended)

```bash
# Terminal 1: stateful services
docker compose up -d postgresql redis mailpit

# Terminal 2: app server
nix develop
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Docker (all-in-one)

```bash
docker compose up -d
docker compose exec php php artisan migrate
```

The entrypoint script auto-runs `composer install` and generates `.env` + `APP_KEY` on first start.

### Manual

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

### OAuth Setup

For Google login, fill in these env vars in `.env`:

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | Google Cloud OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google Cloud OAuth client secret |
| `GOOGLE_REDIRECT_URI` | Frontend callback URL (default: `http://localhost:3000/auth/google/callback`) |
| `APP_FRONTEND_URL` | Frontend origin for CORS (default: `http://localhost:3000`) |

## API

Token-based authentication via Laravel Sanctum. Pass the token as
`Authorization: Bearer <token>`.

### Public Endpoints

| Method | Path | Description | Rate Limit |
|---|---|---|---|
| POST | `/api/register` | Create account (name, email, password, password_confirmation) | 3/min |
| POST | `/api/login` | Login via email + password | 5/min |
| GET | `/api/auth/google/url` | Get Google OAuth redirect URL | — |
| POST | `/api/auth/google/callback` | Exchange Google code for user + token | — |

### Authenticated Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/logout` | Revoke current token |
| GET | `/api/user` | Get authenticated user |

Responses include the user object and `token` (plain-text Bearer token). Store the token
client-side and send it on subsequent requests.

## Docker

| Environment | Command |
|---|---|
| Development | `docker compose up` |
| Production | `docker compose -f docker-compose.prod.yml up -d` |

### Ports

| Service | Default | Env Var |
|---|---|---|
| Nginx | 8080 | `APP_PORT` |
| PostgreSQL | 5432 | `DB_PORT` |
| Redis | 6379 | `REDIS_PORT` |
| Mailpit UI | 8025 | `MAILPIT_PORT` |

### Services

- **php** — PHP-FPM with auto-entrypoint
- **nginx** — reverse proxy to PHP-FPM
- **postgresql** — database with health check
- **redis** — cache / queue backend
- **mailpit** — dev email catcher (UI at port 8025)
- **queue** — `php artisan queue:listen` for job processing

### Production

```bash
# Set required env vars before starting
export APP_KEY="base64:..."
export DB_DATABASE="ba_event"
export DB_USERNAME="ba_event"
export DB_PASSWORD="..."

docker compose -f docker-compose.prod.yml up -d
```

## Development

| Command | Description |
|---|---|
| `php artisan serve` | Start dev server |
| `php artisan test --compact` | Run tests |
| `php artisan test --compact --filter=testName` | Run a specific test |
| `vendor/bin/pint --format agent` | Format code |

## Testing

```bash
php artisan test --compact
php artisan test --compact --filter=AuthTest
php artisan test --compact --filter=SocialAuthTest
```

The test suite covers registration, login, logout, token validation, unauthenticated access,
Google OAuth URL generation, and callback with new/existing users.

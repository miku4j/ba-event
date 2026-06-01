# BA Event

## Requirements

- PHP 8.4
- Composer
- Node.js 22
- PostgreSQL 17
- Redis 7 (optional, for caching)

## Setup

### Nix (recommended)

```bash
nix develop
cp .env.example .env
php artisan key:generate
php artisan migrate
npm ci && npm run build
```

### Docker

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
npm ci && npm run build
```

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
| Vite HMR | 5173 | `VITE_PORT` |

### Services

- **php** — PHP-FPM with auto-entrypoint
- **nginx** — reverse proxy to PHP-FPM
- **postgresql** — database with health check
- **redis** — cache / queue backend
- **mailpit** — dev email catcher (UI at port 8025)
- **queue** — `php artisan queue:listen` for job processing
- **vite** — Vite dev server with HMR

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
| `npm run dev` | Start Vite HMR (non-Docker) |
| `npm run build` | Build assets for production |
| `php artisan serve` | Start dev server |
| `php artisan test --compact` | Run tests |
| `vendor/bin/pint --format agent` | Format code |

## Testing

```bash
php artisan test --compact
php artisan test --compact --filter=testName
```

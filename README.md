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
cp .env.example .env
docker compose exec php php artisan key:generate
docker compose exec php php artisan migrate
```

### Manual

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm ci && npm run build
```

## Development

| Command | Description |
|---|---|
| `npm run dev` | Start Vite HMR |
| `npm run build` | Build assets for production |
| `php artisan serve` | Start dev server |
| `php artisan test --compact` | Run tests |
| `vendor/bin/pint --format agent` | Format code |

## Docker

| Environment | Command |
|---|---|
| Development | `docker compose up` |
| Production | `docker compose -f docker-compose.prod.yml up -d` |

Services: nginx (port 8080), PHP-FPM, PostgreSQL (5432), Redis (6379), Mailpit (8025).

## Testing

```bash
php artisan test --compact
php artisan test --compact --filter=testName
```

#!/bin/sh
set -e

echo "==> Starting stateful services (PostgreSQL, Redis, Mailpit)..."
docker compose up -d postgresql redis mailpit

echo "==> Installing API dependencies..."
nix develop --command sh -c "cd api && composer install --no-interaction --prefer-dist"

if [ ! -f api/.env ]; then
    echo "==> Creating api/.env..."
    cp api/.env.example api/.env
    nix develop --command php artisan key:generate --env=../api/.env
fi

echo "==> Running migrations..."
nix develop --command sh -c "cd api && php artisan migrate"

echo "==> Installing web dependencies..."
nix develop --command sh -c "cd web && npm ci"

echo ""
echo "============================================"
echo "  Ready!"
echo "  API:  nix develop --command sh -c 'cd api && php artisan serve'"
echo "  Web:  nix develop --command sh -c 'cd web && npm run dev'"
echo "============================================"
echo ""
echo "Or run everything with: docker compose up"

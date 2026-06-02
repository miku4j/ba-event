#!/bin/sh
set -e

if [ ! -f vendor/autoload.php ]; then
    composer install --no-interaction --prefer-dist
fi

if [ ! -f .env ]; then
    cp .env.example .env
    php artisan key:generate
fi

if [ -f public/build/manifest.json ]; then
    echo "Built assets found in api/public/build."
fi

exec "$@"

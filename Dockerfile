FROM php:8.4-fpm-alpine AS base

RUN set -eux; \
    apk add --no-cache \
        libpq-dev \
        libzip-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        icu-dev \
        libsodium-dev \
        oniguruma-dev \
    ; \
    docker-php-ext-configure gd --with-freetype --with-jpeg; \
    docker-php-ext-install -j$(nproc) \
        bcmath \
        gd \
        intl \
        mbstring \
        pcntl \
        opcache \
        pdo \
        pdo_pgsql \
        pdo_sqlite \
        pgsql \
        posix \
        sodium \
        xml \
        xmlwriter \
        zip \
    ;

COPY --from=composer:2.9 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY .docker/php/php.ini /usr/local/etc/php/conf.d/ba-event.ini

FROM base AS vendor

COPY composer.json composer.lock ./
RUN composer install \
    --no-interaction \
    --no-autoloader \
    --no-dev \
    --prefer-dist

FROM vendor AS prod

COPY . .
RUN composer install \
    --no-interaction \
    --no-dev \
    --prefer-dist \
    && php artisan storage:link \
    && php artisan view:cache \
    && php artisan route:cache

FROM node:22-alpine AS node

WORKDIR /build
COPY package.json package-lock.json vite.config.js ./
COPY resources/ resources/
RUN npm ci && npm run build

FROM prod AS app

COPY --from=node /build/public/build public/build

EXPOSE 9000

CMD ["php-fpm"]

FROM base AS dev

RUN apk add --no-cache git

COPY --from=composer:2.9 /usr/bin/composer /usr/bin/composer

HEALTHCHECK NONE

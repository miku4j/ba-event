<?php

return [

    'paths' => ['api/*', 'login', 'register'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [env('APP_FRONTEND_URL', 'http://localhost:3000')],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];

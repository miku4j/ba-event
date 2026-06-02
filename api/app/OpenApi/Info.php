<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '0.1',
    title: 'BA Event API',
    description: 'API for the Blue Archive event planner application.',
)]
#[OA\Server(
    url: '{L5_SWAGGER_CONST_HOST}',
    description: 'API server',
)]
class Info
{
}

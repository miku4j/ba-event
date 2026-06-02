<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'AuthResponse',
    required: ['user', 'token'],
    properties: [
        new OA\Property(
            property: 'user',
            ref: '#/components/schemas/User',
        ),
        new OA\Property(property: 'token', type: 'string', example: '1|abc123def456'),
    ],
)]
class AuthResponseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'user' => new UserResource($this->resource['user']),
            'token' => $this->resource['token'],
        ];
    }
}

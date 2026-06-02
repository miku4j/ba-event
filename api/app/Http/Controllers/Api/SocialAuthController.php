<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthResponseResource;
use App\Http\Resources\UserResource;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use OpenApi\Attributes as OA;

class SocialAuthController extends Controller
{
    #[OA\Get(
        path: '/api/auth/google/url',
        summary: 'Get Google OAuth redirect URL',
        tags: ['Social Authentication'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Google OAuth URL',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'url', type: 'string', format: 'uri', example: 'https://accounts.google.com/o/oauth2/auth?...'),
                    ],
                ),
            ),
        ],
    )]
    public function redirectUrl(): JsonResponse
    {
        return response()->json([
            'url' => Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl(),
        ]);
    }

    #[OA\Post(
        path: '/api/auth/google/callback',
        summary: 'Handle Google OAuth callback',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'code', type: 'string', description: 'Google OAuth authorization code'),
                ],
            ),
        ),
        tags: ['Social Authentication'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Authentication successful',
                content: new OA\JsonContent(ref: '#/components/schemas/AuthResponse'),
            ),
            new OA\Response(
                response: 422,
                description: 'Validation error',
            ),
        ],
    )]
    public function callback(Request $request): JsonResponse
    {
        $request->validate(['code' => 'required|string']);

        $socialUser = Socialite::driver('google')->stateless()->user();

        $socialAccount = SocialAccount::where('provider_name', 'google')
            ->where('provider_id', $socialUser->getId())
            ->first();

        if ($socialAccount) {
            $user = $socialAccount->user;
        } else {
            $user = User::where('email', $socialUser->getEmail())->first();

            if (! $user) {
                $user = User::create([
                    'name' => $socialUser->getName() ?? $socialUser->getNickname() ?? 'User',
                    'email' => $socialUser->getEmail(),
                    'password' => bcrypt(Str::password(24)),
                ]);
            }

            $user->socialAccounts()->create([
                'provider_name' => 'google',
                'provider_id' => $socialUser->getId(),
                'provider_token' => $socialUser->token,
                'provider_refresh_token' => $socialUser->refreshToken,
            ]);
        }

        $token = $user->createToken('api')->plainTextToken;

        return response()->json(
            new AuthResponseResource(['user' => $user, 'token' => $token]),
        )->cookie('auth_token', $token, 1440, '/', null, config('app.env') === 'production', true);
    }
}

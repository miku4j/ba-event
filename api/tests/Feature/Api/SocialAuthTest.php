<?php

use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Laravel\Socialite\Socialite;
use Laravel\Socialite\Two\User as SocialUser;

uses(LazilyRefreshDatabase::class);

it('returns a google redirect url', function () {
    Socialite::fake('google');

    $response = $this->getJson('/api/auth/google/url');

    $response->assertOk()
        ->assertJsonStructure(['url']);
});

it('registers a new user via google callback', function () {
    Socialite::fake('google', (new SocialUser)->map([
        'id' => 'google-123',
        'name' => 'Google User',
        'email' => 'google@example.com',
    ])->setToken('fake-token'));

    $response = $this->postJson('/api/auth/google/callback', [
        'code' => 'valid-code',
    ]);

    $response->assertOk()
        ->assertJsonStructure(['user' => ['id', 'name', 'email'], 'token']);

    $this->assertDatabaseHas('users', ['email' => 'google@example.com']);
    $this->assertDatabaseHas('social_accounts', [
        'provider_name' => 'google',
        'provider_id' => 'google-123',
    ]);
});

it('logs in an existing user via google callback', function () {
    $user = User::factory()->create(['email' => 'google@example.com']);

    $user->socialAccounts()->create([
        'provider_name' => 'google',
        'provider_id' => 'google-123',
        'provider_token' => 'old-token',
    ]);

    Socialite::fake('google', (new SocialUser)->map([
        'id' => 'google-123',
        'name' => 'Google User',
        'email' => 'google@example.com',
    ])->setToken('new-token'));

    $response = $this->postJson('/api/auth/google/callback', [
        'code' => 'valid-code',
    ]);

    $response->assertOk()
        ->assertJsonStructure(['user', 'token']);
});

it('requires a code for google callback', function () {
    $response = $this->postJson('/api/auth/google/callback', []);

    $response->assertUnprocessable()
        ->assertJsonValidationErrors(['code']);
});

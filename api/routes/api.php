<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:3,1');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
Route::get('/auth/google/url', [SocialAuthController::class, 'redirectUrl']);
Route::post('/auth/google/callback', [SocialAuthController::class, 'callback']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/events/{event}/rsvp', [EventController::class, 'rsvp']);
    Route::delete('/events/{event}/rsvp', [EventController::class, 'cancelRsvp']);
});

Route::get('/openapi.json', function () {
    return response()->file(storage_path('api-docs/api-docs.json'));
});

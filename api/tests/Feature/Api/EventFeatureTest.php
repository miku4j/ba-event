<?php

use App\Models\Event;
use App\Models\Rsvp;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

uses(LazilyRefreshDatabase::class);

it('allows guest to list events', function () {
    Event::factory()->count(3)->create();

    $response = $this->getJson('/api/events');

    $response->assertStatus(200)
        ->assertJsonCount(3);
});

it('allows guest to show event', function () {
    $event = Event::factory()->create();

    $response = $this->getJson("/api/events/{$event->id}");

    $response->assertStatus(200)
        ->assertJsonPath('title', $event->title);
});

it('allows authorized user to rsvp for an event', function () {
    $user = User::factory()->create();
    $event = Event::factory()->create(['capacity' => 10]);

    $response = $this->actingAs($user)
        ->postJson("/api/events/{$event->id}/rsvp");

    $response->assertStatus(200);
    $this->assertDatabaseHas('rsvps', [
        'user_id' => $user->id,
        'event_id' => $event->id,
        'status' => 'attending',
    ]);
});

it('prevents user from rsvping for a full event', function () {
    $user = User::factory()->create();
    $event = Event::factory()->create(['capacity' => 1]);

    // Fill the event
    $otherUser = User::factory()->create();
    Rsvp::create(['user_id' => $otherUser->id, 'event_id' => $event->id, 'status' => 'attending']);

    $response = $this->actingAs($user)
        ->postJson("/api/events/{$event->id}/rsvp");

    $response->assertStatus(403)
        ->assertJsonPath('message', 'Event is full.');
});

it('allows user to cancel rsvp', function () {
    $user = User::factory()->create();
    $event = Event::factory()->create();
    Rsvp::create(['user_id' => $user->id, 'event_id' => $event->id, 'status' => 'attending']);

    $response = $this->actingAs($user)
        ->deleteJson("/api/events/{$event->id}/rsvp");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('rsvps', [
        'user_id' => $user->id,
        'event_id' => $event->id,
    ]);
});

it('prevents guest from rsvping', function () {
    $event = Event::factory()->create();

    $response = $this->postJson("/api/events/{$event->id}/rsvp");

    $response->assertStatus(401);
});

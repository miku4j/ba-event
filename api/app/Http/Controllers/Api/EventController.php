<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Rsvp;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        $events = Event::withCount(['rsvps' => function ($query) {
            $query->where('status', 'attending');
        }])->get();

        return response()->json($events);
    }

    public function show(Event $event): JsonResponse
    {
        $event->loadCount(['rsvps' => function ($query) {
            $query->where('status', 'attending');
        }]);

        return response()->json($event);
    }

    public function rsvp(Request $request, Event $event): JsonResponse
    {
        $user = $request->user();

        if ($event->isFull()) {
            return response()->json(['message' => 'Event is full.'], 403);
        }

        $rsvp = Rsvp::updateOrCreate(
            ['user_id' => $user->id, 'event_id' => $event->id],
            ['status' => 'attending']
        );

        return response()->json($rsvp);
    }

    public function cancelRsvp(Request $request, Event $event): JsonResponse
    {
        $user = $request->user();

        Rsvp::where('user_id', $user->id)
            ->where('event_id', $event->id)
            ->delete();

        return response()->json(['message' => 'RSVP cancelled.']);
    }
}

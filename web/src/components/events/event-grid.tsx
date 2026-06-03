"use client";

import { EventCard } from "@/components/events/event-card";
import type { Event } from "@/types";

interface EventGridProps {
  events: Event[];
  onRSVP?: (id: number) => void;
}

export function EventGrid({ events, onRSVP }: EventGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onRSVP={onRSVP} />
      ))}
    </div>
  );
}

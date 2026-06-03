"use client";

import { EventCard } from "@/components/events/event-card";
import type { Event } from "@/types";

interface EventGridProps {
  events: Event[];
  isLoading?: boolean;
  onRSVP?: (id: number) => void;
  skeletonCount?: number;
}

export function EventGrid({ events, isLoading, onRSVP, skeletonCount = 6 }: EventGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(skeletonCount)].map((_, i) => (
          <div key={i} className="h-64 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onRSVP={onRSVP} />
      ))}
    </div>
  );
}

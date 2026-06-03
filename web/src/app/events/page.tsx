"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { EventCard } from "@/components/events/event-card";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  image_url?: string;
  starts_at: string;
  capacity: number;
  rsvps_count: number;
}

// Placeholder until we have the real API hook
export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-sky-600 dark:text-sky-400">
            Kivotos Events
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Participate in activities across different academies.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRSVP={(id) => console.log("RSVP for", id)} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

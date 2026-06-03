"use client";

import { Header } from "@/components/header";
import { EventGrid } from "@/components/events/event-grid";
import { useEvents } from "@/lib/hooks";

export default function EventsPage() {
  const { events, isLoading } = useEvents();

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

        <EventGrid events={events} isLoading={isLoading} skeletonCount={6} />
      </main>
    </div>
  );
}

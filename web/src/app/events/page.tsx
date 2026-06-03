import { cookies } from "next/headers";
import { Header } from "@/components/header";
import { EventGrid } from "@/components/events/event-grid";
import type { Event } from "@/types";

export default async function EventsPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const headers: Record<string, string> = {};
  if (cookie) headers.cookie = cookie;

  const res = await fetch("http://api-nginx/api/events", {
    headers,
    cache: "no-store",
  });
  const events: Event[] = await res.json();

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

        <EventGrid events={events} />
      </main>
    </div>
  );
}

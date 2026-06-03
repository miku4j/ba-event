import { cookies } from "next/headers";
import { Header } from "@/components/header";
import { FeaturedEvent } from "@/components/events/featured-event";
import { EventGrid } from "@/components/events/event-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Event, User } from "@/types";

export default async function Home() {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const headers: Record<string, string> = {};
  if (cookie) headers.cookie = cookie;

  const [eventsRes, userRes] = await Promise.all([
    fetch("http://api-nginx/api/events", {
      headers,
      cache: "no-store",
    }),
    fetch("http://api-nginx/api/user", {
      headers,
      cache: "no-store",
    }).catch(() => new Response(null, { status: 401 })),
  ]);

  const events: Event[] = await eventsRes.json();
  const user: User | null = userRes.ok ? await userRes.json() : null;

  const featured = events[0];
  const upcoming = events.slice(1, 7);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-sky-950/30 dark:via-zinc-950 dark:to-indigo-950/30 pb-12 pt-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-200/30 dark:bg-sky-600/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-200/30 dark:bg-indigo-600/10 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <FeaturedEvent featured={featured} user={user} />
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                Upcoming Events
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
                Next events across Kivotos
              </p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="text-sm">
                View all events &rarr;
              </Button>
            </Link>
          </div>

          <EventGrid events={upcoming} />

          {events.length > 7 && (
            <div className="mt-10 text-center">
              <Link href="/events">
                <Button variant="outline" size="lg">
                  View all {events.length} events
                </Button>
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

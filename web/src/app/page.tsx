"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, Sparkles } from "lucide-react";
import Link from "next/link";

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

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredImgError, setFeaturedImgError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/events").then((r) => r.json()),
      fetch("/api/user")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([eventsData, userData]) => {
        setEvents(eventsData);
        setUser(userData);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

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
            {isLoading ? (
              <div className="h-72 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ) : featured ? (
              <div className="rounded-2xl border border-sky-200/50 dark:border-sky-800/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm overflow-hidden">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-3 p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-sky-500 hover:bg-sky-600 text-white text-xs px-3 py-1">
                        <Sparkles className="h-3.5 w-3.5 mr-1" />
                        Featured Event
                      </Badge>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-sky-600 dark:text-sky-400 mb-4 line-clamp-2">
                      {featured.title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3">
                      {featured.description}
                    </p>
                    <div className="flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-sky-500" />
                        <span>
                          {new Date(featured.starts_at).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-sky-500" />
                        <span>{featured.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-sky-500" />
                        <span>
                          {featured.rsvps_count} / {featured.capacity} Students
                        </span>
                      </div>
                    </div>
                    <div className="mt-8 flex items-center gap-4">
                      <Link href={user ? "#" : "/auth/login"}>
                        <Button
                          size="lg"
                          className="bg-sky-500 hover:bg-sky-600 text-white"
                          disabled={
                            featured.rsvps_count >= featured.capacity
                          }
                        >
                          {user ? "RSVP" : "Sign in to RSVP"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-2 hidden md:flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 p-0 overflow-hidden">
                    {featured.image_url && !featuredImgError ? (
                      <div className="relative w-full h-full min-h-64">
                        <Image
                          src={featured.image_url}
                          alt={featured.title}
                          fill
                          className="object-cover"
                          onError={() => setFeaturedImgError(true)}
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <div className="text-7xl mb-4">🎉</div>
                        <p className="text-sky-600 dark:text-sky-400 font-medium text-xl">
                          {featured.location}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {!isLoading && events.length > 7 && (
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

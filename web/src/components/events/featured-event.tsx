"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, Sparkles } from "lucide-react";
import type { Event, User } from "@/types";

interface FeaturedEventProps {
  featured: Event;
  user: User | null;
}

export function FeaturedEvent({ featured, user }: FeaturedEventProps) {
  const [imgError, setImgError] = useState(false);

  if (!featured) return null;

  return (
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
                {new Date(featured.starts_at).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-500" />
              <span>{featured.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-sky-500" />
              <span>{featured.rsvps_count} / {featured.capacity} Students</span>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <Link href={user ? "#" : "/auth/login"}>
              <Button
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 text-white"
                disabled={featured.rsvps_count >= featured.capacity}
              >
                {user ? "RSVP" : "Sign in to RSVP"}
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:col-span-2 hidden md:flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 p-0 overflow-hidden">
          {featured.image_url && !imgError ? (
            <div className="relative w-full h-full min-h-64">
              <Image
                src={featured.image_url}
                alt={featured.title}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
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
  );
}

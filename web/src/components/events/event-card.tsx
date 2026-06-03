"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users } from "lucide-react";

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

interface EventCardProps {
  event: Event;
  onRSVP?: (id: number) => void;
  isRSVPed?: boolean;
  isLoading?: boolean;
}

export function EventCard({ event, onRSVP, isRSVPed, isLoading }: EventCardProps) {
  const [imgError, setImgError] = useState(false);
  const isFull = event.rsvps_count >= event.capacity;
  const startDate = new Date(event.starts_at).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800">
      {event.image_url && !imgError ? (
        <div className="relative aspect-video overflow-hidden -mt-4">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-950/30 dark:to-indigo-950/30 -mt-4" />
      )}
      <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold text-sky-600 dark:text-sky-400">
            {event.title}
          </CardTitle>
          {isFull && <Badge variant="destructive">FULL</Badge>}
        </div>
        <CardDescription className="flex items-center gap-2 mt-2">
          <MapPin className="h-4 w-4" /> {event.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {event.description}
        </p>
        <div className="flex flex-col gap-2 mt-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-zinc-400" />
            {startDate}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-zinc-400" />
            {event.rsvps_count} / {event.capacity} Students
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={isRSVPed ? "outline" : "default"}
          disabled={isFull && !isRSVPed || isLoading}
          onClick={() => onRSVP?.(event.id)}
        >
          {isLoading ? "Processing..." : isRSVPed ? "Cancel RSVP" : isFull ? "Event Full" : "RSVP"}
        </Button>
      </CardFooter>
    </Card>
  );
}

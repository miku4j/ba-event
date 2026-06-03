"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/query-client";
import type { Event } from "@/types";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return { events, isLoading };
}

export function useUser() {
  return api.useQuery("get", "/api/user");
}

export function useRSVP(eventId: number) {
  const [isLoading, setIsLoading] = useState(false);

  const rsvp = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, { method: "POST" });
      if (!res.ok) throw new Error("RSVP failed");
      return await res.json();
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  const cancelRsvp = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, { method: "DELETE" });
      if (!res.ok) throw new Error("Cancel RSVP failed");
      return await res.json();
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  return { rsvp, cancelRsvp, isLoading };
}

export function useLogout() {
  const logout = api.useMutation("post", "/api/logout");

  const handleLogout = useCallback(async () => {
    await logout.mutateAsync({});
    queryClient.clear();
  }, [logout]);

  return { logout: handleLogout, isLoading: logout.isPending };
}

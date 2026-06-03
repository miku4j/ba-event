import type { components } from "@/lib/api.d";

export type User = components["schemas"]["User"];

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  image_url?: string;
  wiki_url?: string;
  starts_at: string;
  capacity: number;
  rsvps_count: number;
  created_at?: string;
  updated_at?: string;
}

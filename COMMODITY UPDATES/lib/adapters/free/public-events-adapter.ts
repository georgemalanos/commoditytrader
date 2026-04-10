import type { EventAdapter } from "@/lib/adapters/free/types";
import { events } from "@/lib/data/mock";

export const publicEventsAdapter: EventAdapter = {
  slug: "public-events-seed",
  displayName: "Public Events Seed",
  async fetch() {
    return events;
  }
};

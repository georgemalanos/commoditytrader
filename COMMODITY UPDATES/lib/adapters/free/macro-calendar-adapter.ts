import type { EventAdapter } from "@/lib/adapters/free/types";
import { events } from "@/lib/data/mock";

export const macroCalendarAdapter: EventAdapter = {
  slug: "macro-calendar-proxy",
  displayName: "Official Macro Calendar Proxy",
  async fetch() {
    return events.filter((event) => ["central_bank", "energy_policy", "macro"].includes(event.category));
  }
};

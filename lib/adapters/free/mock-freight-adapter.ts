import type { FreightAdapter } from "@/lib/adapters/free/types";
import { freightMoves } from "@/lib/data/mock";

export const mockFreightAdapter: FreightAdapter = {
  slug: "demo-freight-seed",
  displayName: "Demo Freight Seed",
  async fetch() {
    return freightMoves;
  }
};

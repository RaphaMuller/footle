"use client";

import { useEffect, useState } from "react";
import { CatalogResponseSchema } from "@/lib/schemas";

const CATALOG_CACHE_NAME = "footle-player-catalog-v1";

export interface IndexedCatalogPlayer {
  id: number;
  name: string;
  knownName: string;
  currentClub: string;
  primaryPosition: string;
  nationality: string;
  photoUrl: string;
  normalizedKnownName: string;
  normalizedSearchText: string;
}

const memoryCatalogMap = new Map<string, IndexedCatalogPlayer[]>();

export function normalizeCatalogQuery(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function buildIndexedList(
  players: Array<{
    id: number;
    name: string;
    knownName: string;
    currentClub: string;
    primaryPosition: string;
    nationality: string;
    photoUrl: string;
  }>
): IndexedCatalogPlayer[] {
  return players.map((player) => ({
    ...player,
    normalizedKnownName: normalizeCatalogQuery(player.knownName),
    normalizedSearchText: normalizeCatalogQuery(
      `${player.knownName} ${player.name} ${player.currentClub}`
    )
  }));
}

async function readFromBrowserCache(url: string): Promise<{
  version: string;
  indexed: IndexedCatalogPlayer[];
} | null> {
  if (typeof window === "undefined" || !("caches" in window)) return null;

  try {
    const cache = await window.caches.open(CATALOG_CACHE_NAME);
    const cachedRes = await cache.match(url);
    if (!cachedRes) return null;

    const json: unknown = await cachedRes.json();
    const parsed = CatalogResponseSchema.safeParse(json);
    if (!parsed.success) {
      await cache.delete(url);
      return null;
    }

    return {
      version: parsed.data.version,
      indexed: buildIndexedList(parsed.data.players)
    };
  } catch {
    return null;
  }
}

async function fetchAndPersistCatalog(url: string): Promise<IndexedCatalogPlayer[] | null> {
  const response = await fetch(url);
  if (!response.ok) return null;

  const clone = response.clone();
  const json: unknown = await response.json();
  const parsed = CatalogResponseSchema.safeParse(json);
  if (!parsed.success) return null;

  if (typeof window !== "undefined" && "caches" in window) {
    try {
      const cache = await window.caches.open(CATALOG_CACHE_NAME);
      await cache.put(url, clone);
    } catch {
      // Ignore storage quota errors and continue with in-memory index
    }
  }

  return buildIndexedList(parsed.data.players);
}

export function usePlayerCatalog(mode: string = "big-five") {
  const [indexedPlayers, setIndexedPlayers] = useState<IndexedCatalogPlayer[]>(
    () => memoryCatalogMap.get(mode) ?? []
  );

  useEffect(() => {
    let cancelled = false;
    const requestUrl = `/api/catalog?mode=${encodeURIComponent(mode)}`;
    const today = new Date().toISOString().split("T")[0];

    async function hydrateCatalog() {
      const inMemory = memoryCatalogMap.get(mode);
      if (inMemory && inMemory.length > 0) {
        if (!cancelled) setIndexedPlayers(inMemory);
        return;
      }

      const cached = await readFromBrowserCache(requestUrl);
      if (cached && cached.indexed.length > 0) {
        memoryCatalogMap.set(mode, cached.indexed);
        if (!cancelled) setIndexedPlayers(cached.indexed);
        if (cached.version === today) return;
      }

      try {
        const fresh = await fetchAndPersistCatalog(requestUrl);
        if (fresh && fresh.length > 0) {
          memoryCatalogMap.set(mode, fresh);
          if (!cancelled) setIndexedPlayers(fresh);
        }
      } catch (err) {
        console.warn("Catalog background sync failed, falling back to API search:", err);
      }
    }

    hydrateCatalog();

    return () => {
      cancelled = true;
    };
  }, [mode]);

  return {
    indexedPlayers,
    isCatalogReady: indexedPlayers.length > 0
  };
}

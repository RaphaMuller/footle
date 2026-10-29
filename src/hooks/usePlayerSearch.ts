"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import {
  normalizeCatalogQuery,
  usePlayerCatalog,
  type IndexedCatalogPlayer
} from "@/hooks/usePlayerCatalog";
import { CatalogPlayerSchema, SearchResponseSchema } from "@/lib/schemas";

const DEFAULT_EXCLUDE_IDS: number[] = [];
const MAX_SEARCH_RESULTS = 8;

export type SearchPlayerItem = z.infer<typeof CatalogPlayerSchema>;

interface UsePlayerSearchOptions {
  debounceMs?: number;
  excludeIds?: number[];
  mode?: string;
}

function toSearchItem(player: IndexedCatalogPlayer): SearchPlayerItem {
  return {
    id: player.id,
    name: player.name,
    knownName: player.knownName,
    currentClub: player.currentClub,
    primaryPosition: CatalogPlayerSchema.shape.primaryPosition.catch("Atacante").parse(player.primaryPosition),
    nationality: player.nationality,
    photoUrl: player.photoUrl
  };
}

function searchIndexedCatalog(
  indexedPlayers: IndexedCatalogPlayer[],
  normalizedQuery: string,
  excluded: Set<number>
): SearchPlayerItem[] {
  const prefixMatches: SearchPlayerItem[] = [];
  const substringMatches: SearchPlayerItem[] = [];

  for (const player of indexedPlayers) {
    if (excluded.has(player.id) || !player.normalizedSearchText.includes(normalizedQuery)) continue;

    if (player.normalizedKnownName.startsWith(normalizedQuery)) {
      prefixMatches.push(toSearchItem(player));
    } else {
      substringMatches.push(toSearchItem(player));
    }

    if (prefixMatches.length >= MAX_SEARCH_RESULTS) break;
  }

  return [...prefixMatches, ...substringMatches].slice(0, MAX_SEARCH_RESULTS);
}

export function usePlayerSearch(options: UsePlayerSearchOptions = {}) {
  const router = useRouter();
  const { debounceMs = 200, excludeIds = DEFAULT_EXCLUDE_IDS, mode = "big-five" } = options;

  const { indexedPlayers, isCatalogReady } = usePlayerCatalog(mode);
  const [query, setRawQuery] = useState("");
  const [remoteResults, setRemoteResults] = useState<SearchPlayerItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const excludeKey = excludeIds.join(",");
  const excludedSet = useMemo(
    () => (excludeKey ? new Set(excludeKey.split(",").map(Number)) : new Set<number>()),
    [excludeKey]
  );

  const normalizedQuery = useMemo(() => normalizeCatalogQuery(query), [query]);

  const localResults = useMemo(() => {
    if (!isCatalogReady || normalizedQuery.length < 2) return [];
    return searchIndexedCatalog(indexedPlayers, normalizedQuery, excludedSet);
  }, [isCatalogReady, indexedPlayers, normalizedQuery, excludedSet]);

  useEffect(() => {
    if (isCatalogReady || normalizedQuery.length < 2) return;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const url = `/api/search?q=${encodeURIComponent(query.trim())}&mode=${encodeURIComponent(mode)}`;
        const res = await fetch(url);
        if (res.status === 503) {
          router.push("/offline");
          return;
        }
        if (!res.ok) return;

        const parsed = SearchResponseSchema.safeParse(await res.json());
        if (!parsed.success) return;

        const filtered = parsed.data.results.filter((p) => !excludedSet.has(p.id));
        setRemoteResults(filtered);
        setIsOpen(filtered.length > 0);
      } catch (err) {
        console.error("Failed fallback player search:", err);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [isCatalogReady, normalizedQuery, query, mode, debounceMs, excludedSet, router]);

  const setQuery = useCallback((nextValue: string) => {
    setRawQuery(nextValue);
    if (normalizeCatalogQuery(nextValue).length >= 2) {
      setIsOpen(true);
    } else {
      setRemoteResults([]);
      setIsOpen(false);
    }
  }, []);

  const clear = useCallback(() => {
    setRawQuery("");
    setRemoteResults([]);
    setIsOpen(false);
  }, []);

  let results: SearchPlayerItem[] = [];
  if (isCatalogReady) {
    results = localResults;
  } else if (normalizedQuery.length >= 2) {
    results = remoteResults;
  }

  return {
    query,
    setQuery,
    results,
    isLoading: !isCatalogReady && isLoading,
    isOpen,
    setIsOpen,
    clear
  };
}

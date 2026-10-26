"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface SearchPlayerItem {
  id: number;
  name: string;
  knownName: string;
  currentClub: string;
  primaryPosition: string;
  nationality: string;
  photoUrl: string;
}

interface UsePlayerSearchOptions {
  debounceMs?: number;
  excludeIds?: number[];
  mode?: string;
}

export function usePlayerSearch(options: UsePlayerSearchOptions = {}) {
  const router = useRouter();
  const { debounceMs = 200, excludeIds = [], mode = "big-five" } = options;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchPlayerItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const trimmed = query.trim();
      if (trimmed.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&mode=${encodeURIComponent(mode)}`);
        if (res.status === 503) {
          router.push("/offline");
          return;
        }
        if (res.ok) {
          const data = await res.json();
          const filtered = (data.results || []).filter(
            (p: SearchPlayerItem) => !excludeIds.includes(p.id)
          );
          setResults(filtered);
          setIsOpen(filtered.length > 0);
        }
      } catch (err) {
        console.error("Erro ao buscar jogadores:", err);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, excludeIds, mode, router]);

  const clear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    clear
  };
}

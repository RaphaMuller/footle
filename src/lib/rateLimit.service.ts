import { NextRequest, NextResponse } from "next/server";

const ONE_MINUTE_MS = 60_000;
const MAX_TRACKED_KEYS = 5_000;
const MAX_IP_HEADER_LENGTH = 64;

export type RateLimitScope = "guess" | "search" | "catalog";

interface RateLimitPolicy {
  maxRequests: number;
  windowMs: number;
}

const RATE_LIMIT_POLICIES: Record<RateLimitScope, RateLimitPolicy> = {
  guess: { maxRequests: 20, windowMs: ONE_MINUTE_MS },
  search: { maxRequests: 45, windowMs: ONE_MINUTE_MS },
  catalog: { maxRequests: 15, windowMs: ONE_MINUTE_MS }
};

const requestBuckets = new Map<string, number[]>();

function extractClientIp(req: NextRequest): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp && realIp.length <= MAX_IP_HEADER_LENGTH) {
    return realIp;
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstHop = forwardedFor.split(",")[0]?.trim();
    if (firstHop && firstHop.length <= MAX_IP_HEADER_LENGTH) {
      return firstHop;
    }
  }

  return "local-client";
}

function evictOldestBucketIfFull(key: string): void {
  if (requestBuckets.has(key) || requestBuckets.size < MAX_TRACKED_KEYS) return;
  const oldestKey = requestBuckets.keys().next().value;
  if (typeof oldestKey === "string") {
    requestBuckets.delete(oldestKey);
  }
}

export function enforceRateLimit(
  req: NextRequest,
  scope: RateLimitScope
): NextResponse | null {
  const policy = RATE_LIMIT_POLICIES[scope];
  const clientIp = extractClientIp(req);
  const bucketKey = `${scope}:${clientIp}`;
  const now = Date.now();
  const windowStart = now - policy.windowMs;

  const existingTimestamps = requestBuckets.get(bucketKey) ?? [];
  const activeTimestamps = existingTimestamps.filter((ts) => ts > windowStart);

  if (activeTimestamps.length >= policy.maxRequests) {
    const oldestActive = activeTimestamps[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldestActive + policy.windowMs - now) / 1000));

    return NextResponse.json(
      { error: "Muitas tentativas seguidas. Aguarde alguns segundos." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSec),
          "X-RateLimit-Limit": String(policy.maxRequests),
          "X-RateLimit-Remaining": "0"
        }
      }
    );
  }

  activeTimestamps.push(now);
  evictOldestBucketIfFull(bucketKey);
  requestBuckets.delete(bucketKey);
  requestBuckets.set(bucketKey, activeTimestamps);

  return null;
}

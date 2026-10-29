import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_PREFIX = "footle_chain_";
const ONE_DAY_SECONDS = 86_400;
const MAX_CHAIN_LENGTH = 10;
const SHA256_HEX_LENGTH = 64;
const HMAC_CONTEXT = "footle-attempt-chain-v1";

let hasWarnedMissingKey = false;

export interface AttachAttemptCookieParams {
  res: NextResponse;
  dateStr: string;
  mode: string;
  ids: number[];
}

function getSigningKey(): Buffer | null {
  const rawSecret = process.env.FOOTLE_HMAC_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawSecret) {
    if (!hasWarnedMissingKey) {
      hasWarnedMissingKey = true;
      console.warn(
        "[Footle Security] FOOTLE_HMAC_SECRET e SUPABASE_SERVICE_ROLE_KEY ausentes; assinatura de cadeia de tentativas desativada."
      );
    }
    return null;
  }
  return createHmac("sha256", rawSecret).update(HMAC_CONTEXT).digest();
}

export function isAttemptSigningConfigured(): boolean {
  return getSigningKey() !== null;
}

function signPayload(payload: string, key: Buffer): string {
  return createHmac("sha256", key).update(payload).digest("hex");
}

function verifySignature(payload: string, signatureHex: string, key: Buffer): boolean {
  if (signatureHex.length !== SHA256_HEX_LENGTH || !/^[0-9a-f]+$/i.test(signatureHex)) {
    return false;
  }
  const expectedBuf = Buffer.from(signPayload(payload, key), "hex");
  const receivedBuf = Buffer.from(signatureHex, "hex");
  if (expectedBuf.length !== receivedBuf.length) return false;
  return timingSafeEqual(expectedBuf, receivedBuf);
}

function parseIdsSegment(rawIds: string): number[] {
  if (!rawIds) return [];
  const parsed: number[] = [];
  for (const part of rawIds.split(",")) {
    const num = Number(part);
    if (Number.isInteger(num) && num > 0 && !parsed.includes(num)) {
      parsed.push(num);
    }
    if (parsed.length >= MAX_CHAIN_LENGTH) break;
  }
  return parsed;
}

export function readVerifiedAttemptIds(
  req: NextRequest,
  dateStr: string,
  mode: string
): number[] {
  const key = getSigningKey();
  if (!key) return [];

  const rawCookie = req.cookies.get(`${COOKIE_PREFIX}${mode}`)?.value;
  if (!rawCookie) return [];

  const dotIndex = rawCookie.lastIndexOf(".");
  if (dotIndex <= 0) return [];

  const payload = rawCookie.slice(0, dotIndex);
  const signatureHex = rawCookie.slice(dotIndex + 1);
  if (!verifySignature(payload, signatureHex, key)) return [];

  const [cookieDate, cookieMode, idsSegment = ""] = payload.split("|");
  if (cookieDate !== dateStr || cookieMode !== mode) return [];

  return parseIdsSegment(idsSegment);
}

export function attachAttemptCookie({
  res,
  dateStr,
  mode,
  ids
}: AttachAttemptCookieParams): NextResponse {
  const key = getSigningKey();
  if (!key) return res;

  const uniqueIds = Array.from(new Set(ids)).slice(0, MAX_CHAIN_LENGTH);
  const payload = `${dateStr}|${mode}|${uniqueIds.join(",")}`;
  const signature = signPayload(payload, key);

  res.cookies.set(`${COOKIE_PREFIX}${mode}`, `${payload}.${signature}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/api/guess",
    maxAge: ONE_DAY_SECONDS
  });

  return res;
}

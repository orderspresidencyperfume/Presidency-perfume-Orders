import { NextRequest, NextResponse } from "next/server";

type RateLimitPolicy = {
  windowMs: number;
  maxRequests: number;
};

type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

type Bucket = { count: number; resetAt: number; failures: number; backoffUntil: number };

const buckets = new Map<string, Bucket>();

function positiveInteger(name: string, fallback: number) {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`Invalid ${name} configuration`);
  }
  return value;
}

function policy(prefix: "PUBLIC" | "AUTH" | "USER"): RateLimitPolicy {
  return {
    windowMs: positiveInteger(`RATE_LIMIT_${prefix}_WINDOW_SECONDS`, 60) * 1000,
    maxRequests: positiveInteger(`RATE_LIMIT_${prefix}_MAX_REQUESTS`, prefix === "AUTH" ? 10 : prefix === "PUBLIC" ? 60 : 180),
  };
}

function clientIp(request: NextRequest) {
  // Trust X-Forwarded-For only when the deployment platform overwrites it.
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function check(key: string, currentPolicy: RateLimitPolicy, failedAttempt = false): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);
  const active = !bucket || bucket.resetAt <= now
    ? { count: 0, resetAt: now + currentPolicy.windowMs, failures: 0, backoffUntil: 0 }
    : bucket;

  if (failedAttempt) {
    active.failures += 1;
    active.backoffUntil = now + Math.min(
      positiveInteger("RATE_LIMIT_AUTH_MAX_BACKOFF_SECONDS", 900) * 1000,
      1000 * 2 ** Math.max(0, active.failures - 1),
    );
  }
  if (active.count >= currentPolicy.maxRequests || active.backoffUntil > now) {
    buckets.set(key, active);
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil(Math.max(active.resetAt - now, active.backoffUntil - now) / 1000)) };
  }

  active.count += 1;
  buckets.set(key, active);
  return { allowed: true };
}

export function limitPublicRequest(request: NextRequest, scope: string) {
  return check(`public:${scope}:${clientIp(request)}`, policy("PUBLIC"));
}

export function limitAuthenticatedRequest(request: NextRequest, userId: string, scope: string) {
  return check(`user:${scope}:${userId}:${clientIp(request)}`, policy("USER"));
}

// Call once with an account identifier and once with the request IP. Failed attempts back off exponentially.
export function limitAuthAttempt(request: NextRequest, account: string, scope: string, failedAttempt = false) {
  const currentPolicy = policy("AUTH");
  const byIp = check(`auth:ip:${scope}:${clientIp(request)}`, currentPolicy, failedAttempt);
  const byAccount = check(`auth:account:${scope}:${account.toLowerCase()}`, currentPolicy, failedAttempt);
  if (byIp.allowed && byAccount.allowed) return { allowed: true } as const;
  return { allowed: false, retryAfterSeconds: Math.max(byIp.allowed ? 0 : byIp.retryAfterSeconds, byAccount.allowed ? 0 : byAccount.retryAfterSeconds) } as const;
}

export function rateLimitResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}

// In-memory buckets are suitable only for a single process. Replace this adapter with Redis/KV before horizontally scaling.

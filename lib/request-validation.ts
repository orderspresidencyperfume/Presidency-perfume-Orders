import { NextRequest, NextResponse } from "next/server";

export function rejectUnexpectedQuery(request: NextRequest) {
  if ([...request.nextUrl.searchParams.keys()].length > 0) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  return null;
}

export function isValidAccountIdentifier(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

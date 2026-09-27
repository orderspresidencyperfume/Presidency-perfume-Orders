import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { limitPublicRequest, rateLimitResponse } from "../../../lib/rate-limit";
import { rejectUnexpectedQuery } from "../../../lib/request-validation";

export async function GET(request: NextRequest) {
  // This route is only a local diagnostic; it must not expose database state in production.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const invalidQuery = rejectUnexpectedQuery(request);
  if (invalidQuery) return invalidQuery;

  const limited = limitPublicRequest(request, "test-supabase");
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSeconds);

  try {
    const { error } = await supabase.from("orders").select("id").limit(1);

    if (error) {
      console.error("Supabase diagnostic failed", error);
      return NextResponse.json(
        { success: false, error: "The service is temporarily unavailable." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: "Service available." });
  } catch (error) {
    console.error("Unexpected Supabase diagnostic failure", error);
    return NextResponse.json(
      { success: false, error: "The service is temporarily unavailable." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export async function GET() {
  const startTime = Date.now();

  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "not_configured",
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }

  try {
    const { count, error } = await supabase
      .from("players")
      .select("id", { count: "exact", head: true });

    const latencyMs = Date.now() - startTime;

    if (error) {
      return NextResponse.json(
        {
          status: "unhealthy",
          database: "error",
          latencyMs,
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        status: "healthy",
        database: "connected",
        totalPlayers: count || 0,
        latencyMs,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch {
    const latencyMs = Date.now() - startTime;
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "unreachable",
        latencyMs,
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
}

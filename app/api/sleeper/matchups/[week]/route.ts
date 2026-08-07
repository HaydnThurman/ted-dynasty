import { NextResponse } from "next/server";
import { getMatchups } from "@/lib/sleeper";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ week: string }> }
) {
  const { week: weekParam } = await params;
  const week = Number.parseInt(weekParam, 10);
  if (!Number.isFinite(week) || week < 1) {
    return NextResponse.json({ error: "Invalid week" }, { status: 400 });
  }
  const data = await getMatchups(week);
  return NextResponse.json({ data, fetchedAt: Date.now() });
}

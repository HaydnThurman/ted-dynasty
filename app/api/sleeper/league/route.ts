import { NextResponse } from "next/server";
import { getLeague } from "@/lib/sleeper";

export async function GET() {
  const data = await getLeague();
  return NextResponse.json({ data, fetchedAt: Date.now() });
}

import { NextResponse } from "next/server";
import { getNflState } from "@/lib/sleeper";

export async function GET() {
  const data = await getNflState();
  return NextResponse.json({ data, fetchedAt: Date.now() });
}

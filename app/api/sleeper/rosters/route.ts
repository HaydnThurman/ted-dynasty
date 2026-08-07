import { NextResponse } from "next/server";
import { getRosters } from "@/lib/sleeper";

export async function GET() {
  const data = await getRosters();
  return NextResponse.json({ data, fetchedAt: Date.now() });
}

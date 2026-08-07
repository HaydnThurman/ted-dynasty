import { NextResponse } from "next/server";
import { getUsers } from "@/lib/sleeper";

export async function GET() {
  const data = await getUsers();
  return NextResponse.json({ data, fetchedAt: Date.now() });
}

import { db } from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });

  try {
    const userId = "xod56wl4sd4q3j4imh23ox3m";
    const user = db.select().from(users).where(eq(users.id, userId));

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

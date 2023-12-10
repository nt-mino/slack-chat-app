import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });

  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (request.method !== "POST") return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });

  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

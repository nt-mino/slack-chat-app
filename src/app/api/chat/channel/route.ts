import { db } from "@/database";
import { channelMembers, channels, users } from "@/database/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

interface ApiRequest {
  ownerId: string;
  channelName: string;
}

export async function GET(request: NextRequest) {
  if (request.method !== "GET") return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });

  try {
    const channelsData = await db.select().from(channels);
    // const channelsData = await db.select().from(channels).innerJoin(users, eq(channels.ownerId, users.id));

    return NextResponse.json({ channels: channelsData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (request.method !== "POST") return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });

  try {
    const body = await request.json();
    const { ownerId, channelName } = body as ApiRequest;
    await db.transaction(async tx => {
      // * チャンネルID作成
      const channelId = createId();
      // * チャンネル作成
      const channel = await tx.insert(channels).values({ id: channelId, ownerId, name: channelName });
      // * メンバー登録（チャンネルオーナーも追加）
      await tx.insert(channelMembers).values({ channelId, userId: ownerId });
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

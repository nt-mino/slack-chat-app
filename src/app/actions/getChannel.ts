"use server";

import { db } from "@/database";
import { channels } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getChannel = async (channel: string) => {
  if (!channel) throw new Error("Channel not found...");

  const channelData = await db.select().from(channels).where(eq(channels.id, channel));
  if (!channelData[0]) throw new Error("Channel not found...");

  return {
    channels: channelData[0],
  };
};

import { db } from "@/database";
import { messages, users } from "@/database/schema";
import { asc, desc, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const getMessage = async (channel: string) => {
  if (!channel) throw new Error("Channel not found...");

  const messagesData = await db.select().from(messages).where(eq(messages.channelId, channel)).innerJoin(users, eq(messages.userId, users.id)).orderBy(asc(messages.createdAt));

  revalidateTag("messages");

  return {
    messages: messagesData,
  };
};

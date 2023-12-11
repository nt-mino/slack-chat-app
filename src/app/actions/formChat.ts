"use server";

import { db } from "@/database";
import { messages } from "@/database/schema";
import { revalidateTag } from "next/cache";

export const createChat = async (userId: string, channelId: string, formData: FormData) => {
  "use server";

  const chat = formData.get("chat") as string;
  if (chat === "") return; // * メッセージが空の場合は送信しない
  try {
    // * メッセージの作成
    await db.insert(messages).values({
      userId,
      channelId,
      content: chat,
    });

    revalidateTag("messages");
  } catch (error) {
    console.log(error);
  }
};

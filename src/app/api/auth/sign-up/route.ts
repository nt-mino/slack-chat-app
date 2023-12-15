/**
 * @description : 新規登録時に呼ばれるWebhook
 * @doc         : https://zenn.dev/hayato94087/articles/bfe72f794e0407
 */

import { NextRequest } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/database";
import { users } from "@/database/schema";

const webhookSecret: string = process.env.NGROK_WEBHOOK_SECRET || "";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};
type EventType = "user.created" | "user.deleted";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    console.log("svixId", svixId);
    console.log("svixIdTimeStamp", svixIdTimeStamp);
    console.log("svixSignature", svixSignature);
    return new Response("Error occured", {
      status: 400,
    });
  }
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payloadString, svixHeaders) as Event;
  } catch (_) {
    console.log("error");
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType: EventType = evt.type;

  if (eventType === "user.created") {
    const { id, ...attributes } = evt.data;
    await db.insert(users).values({
      id: id as string,
      email: (attributes.email_addresses as any)[0].email_address as string,
    });
    return new Response("success!!", {
      status: 201,
    });
  } else if (eventType === "user.deleted") {
    const { id, ...attributes } = evt.data;
    console.log("user.deleted: ", id);

    return new Response("success!!", {
      status: 201,
    });
  }
}

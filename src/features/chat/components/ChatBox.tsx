"use client";

import { createChat } from "@/app/actions";
import { messages } from "@/database/schema";
import { Button } from "@/features/ui/button";
import { Textarea } from "@/features/ui/textarea";
import { SendHorizontal } from "lucide-react";

interface Props {
  userId: string;
  channelId: string;
}

export default function ChatBox({ userId, channelId }: Props) {
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        await createChat(userId, channelId, formData);
        const textarea = document.querySelector('textarea[name="chat"]') as HTMLTextAreaElement;
        if (textarea) textarea.value = "";
      }}
    >
      <div className="flex flex-row gap-4">
        <Textarea name="chat" className="min-h-[30px] max-h-[300px] h-full resize-none text-[16px] border-gray-500" rows={1} />
        <Button type="submit" className="mb-2 mr-2 px-2 py-2">
          <SendHorizontal size={20} strokeWidth={2} />
        </Button>
      </div>
    </form>
  );
}

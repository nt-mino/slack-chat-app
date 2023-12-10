import { Button } from "@/features/ui/button";
import { Textarea } from "@/features/ui/textarea";
import { SendHorizontal } from "lucide-react";

export default function ChatBox() {
  async function createChat(formData: FormData) {
    "use server";
    const chat = formData.get("chat");

    // mutate data
    // revalidate cache
  }

  return (
    <form action={createChat}>
      <div className="flex flex-row gap-4">
        <Textarea name="chat" className="min-h-[30px] max-h-[300px] h-full resize-none text-[16px] border-gray-500" rows={1} />
        <Button type="submit" className="mb-2 mr-2 px-2 py-2">
          <SendHorizontal size={20} strokeWidth={2} />
        </Button>
      </div>
    </form>
  );
}

import { Channel, Header } from "@/features/chat/components";
import React from "react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-row">
      {/* チャンネルリスト */}
      <Channel />
      <div className="w-full h-full flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}

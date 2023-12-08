import { Header } from "@/features/chat/components";
import React from "react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
}

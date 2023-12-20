"use client";

import { useSocket } from "@/lib/provider/socket-provider";
import { UserButton, SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";

export default function Page({}) {
  const { socket, isConnected } = useSocket();
  console.log("socket", socket);
  console.log("isConnected", isConnected);
  const test = () => {
    socket.emit("msg", "test");
  };
  useEffect(() => {
    if (!socket) return;
    socket.on("chat message", (msg: string) => {
      console.log("msg", msg);
    });
  }, [socket, test]);
  return (
    <div className="p-8">
      <h1>トップページ</h1>
      <button onClick={test}>テスト</button>
      {/* <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut> */}
    </div>
  );
}

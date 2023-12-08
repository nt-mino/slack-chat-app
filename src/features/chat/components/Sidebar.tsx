"use client";

import { Home, Settings, MessagesSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/features/ui/avatar";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const sidebarItems = [
    { name: "ホーム", link: "/chat", icon: <Home color="background" size={24} strokeWidth={1.5} /> },
    { name: "DM", link: "/chat/dm", icon: <MessagesSquare color="background" size={24} strokeWidth={1.5} /> },
    { name: "設定", link: "/chat/setting", icon: <Settings color="background" size={24} strokeWidth={1.5} /> },
  ];
  return (
    <div className="flex-none w-[80px] h-full bg-primary">
      <div className="flex flex-col justify-between items-center h-full px-4 py-4">
        <div className="flex flex-col gap-4">
          {sidebarItems.map((item, index) => (
            <Link href={item.link} key={`sidebar-item${index}`}>
              <div className="flex flex-col items-center">
                <div key={index} className={`flex items-center justify-center w-full py-2 rounded-md cursor-pointer ${pathname.includes(item.link) ? "bg-amber-500" : "none"} hover:bg-amber-500`}>
                  {item.icon}
                </div>
                <p className="text-[12px] text-background">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

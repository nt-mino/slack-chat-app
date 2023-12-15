"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Loader2, PlusSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/features/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/features/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/features/ui/input";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/utils/swr";
import { SelectChannel } from "@/database/helper";
import { Skeleton } from "@/features/ui/skeleton";
import { mutate } from "swr";
import { Avatar, AvatarFallback, AvatarImage } from "@/features/ui/avatar";

interface ApiResponse {
  channels: SelectChannel[];
}

export default function Channel() {
  const userId = "xod56wl4sd4q3j4imh23ox3m";
  const params = useParams();

  const { data: dateChannel } = useSWRImmutable<ApiResponse>("/api/chat/channel/", fetcher);
  const channels = dateChannel?.channels;

  const [isLoading, setIsLoading] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [openChannel, setOpenChannel] = useState(true);
  const [openMember, setOpenMember] = useState(true);

  const createChannel = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/chat/channel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerId: userId,
          channelName: newChannelName,
        }),
      });
      if (res.status !== 200) throw new Error("チャンネルの作成に失敗しました");
      mutate("/api/chat/channel/", undefined, true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-none w-[250px] h-full bg-primary-foreground border-r-[1px]">
      <div className="flex flex-col gap-8 py-4 px-4">
        {/* チャンネル */}
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-4 mb-2">
            {!openChannel && <ChevronRight size={20} strokeWidth={2} cursor={"pointer"} onClick={() => setOpenChannel(true)} />}
            {openChannel && <ChevronDown size={20} strokeWidth={2} cursor={"pointer"} onClick={() => setOpenChannel(false)} />}
            <p className="text-[15px]">チャンネル</p>
          </div>
          {openChannel && (
            <div className="flex flex-col gap-1 px-4">
              {!channels ? (
                <Skeleton className="h-4 w-full rounded-sm  bg-gray-300" />
              ) : (
                channels.map((channel, index) => {
                  return (
                    <Link key={`channel${index}`} href={`/chat/${channel.id}`}>
                      <div className={`flex flex-row items-center gap-2 mt-2 hover:text-amber-500 ${params.channel === channel.id ? "text-amber-500" : "foreground"}`}>
                        <p className={"text-[15px] pl-1"}>#</p>
                        <p className={"text-[15px]"}>{channel.name}</p>
                      </div>
                    </Link>
                  );
                })
              )}
              {/* チャンネルの作成 */}
              <div className="mt-2">
                <Dialog>
                  <DialogTrigger className="flex flex-row gap-2 items-center cursor-pointer hover:text-amber-500">
                    <PlusSquare size={18} strokeWidth={2} />
                    <p className="text-[15px] pt-[2px]">チャンネルの作成</p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-[21px]">チャンネルを作成</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mb-8">
                      <p className="text-[15px] text-gray-400">チャンネル名を入力してください</p>
                      <Input value={newChannelName} onChange={e => setNewChannelName(e.target.value)} />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          キャンセル
                        </Button>
                      </DialogClose>
                      {isLoading ? (
                        <Button type="submit" variant="default" disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          チャンネルを作成
                        </Button>
                      ) : (
                        <Button type="submit" variant="default" onClick={createChannel} disabled={newChannelName === ""}>
                          チャンネルを作成
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
        {/* 登録メンバー */}
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-4 mb-2">
            {!openMember && <ChevronRight size={20} strokeWidth={2} cursor={"pointer"} onClick={() => setOpenMember(true)} />}
            {openMember && <ChevronDown size={20} strokeWidth={2} cursor={"pointer"} onClick={() => setOpenMember(false)} />}
            <p className="text-[15px]">参加メンバー</p>
          </div>
          {openMember && (
            <div className="flex flex-col gap-1 px-4">
              {false ? (
                <Skeleton className="h-4 w-full rounded-sm  bg-gray-300" />
              ) : (
                <div className={`flex flex-row items-center gap-2 mt-2`}>
                  <div>
                    <Avatar className="w-[25px] h-[25px] rounded-sm">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className={"text-[15px]"}>{"みのる"}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

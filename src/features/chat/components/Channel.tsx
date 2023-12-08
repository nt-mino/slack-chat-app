"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Loader2, PlusSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/features/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/features/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/features/ui/input";

export default function Channel() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [openChannel, setOpenChannel] = useState(true);

  const channelList = [
    { id: "567899870", name: "チャンネル1" },
    { id: "567897456", name: "チャンネル2" },
    { id: "456789098", name: "チャンネル3" },
  ];

  const createChannel = async () => {
    try {
      setIsLoading(true);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-none w-[250px] h-full bg-primary-foreground border-r-[1px]">
      <div className="flex flex-col py-4 px-4">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-4 mb-2">
            {!openChannel && <ChevronRight size={20} strokeWidth={2} cursor={"pointer"} onClick={() => setOpenChannel(true)} />}
            {openChannel && <ChevronDown size={20} strokeWidth={2} cursor={"pointer"} onClick={() => setOpenChannel(false)} />}
            <p className="text-[15px]">チャンネル</p>
          </div>
          {openChannel && (
            <div className="flex flex-col gap-1 px-4">
              {channelList.map((channel, index) => {
                return (
                  <Link key={`channel${index}`} href={`/chat/${channel.id}`}>
                    <div className={`flex flex-row items-center gap-4 mt-2 hover:text-amber-500 ${params.channel === channel.id ? "text-amber-500" : "foreground"}`}>
                      <p className={"text-[15px] pl-1"}>#</p>
                      <p className={"text-[15px]"}>{channel.name}</p>
                    </div>
                  </Link>
                );
              })}
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
      </div>
    </div>
  );
}

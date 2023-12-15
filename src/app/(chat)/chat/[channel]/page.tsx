import { getChannel, getMessage } from "@/app/actions";
import { ChatBox } from "@/features/chat/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/features/ui/avatar";
import { convertTimestampToDate } from "@/utils/time";
import { currentUser } from "@clerk/nextjs";

export default async function ChannelPage({ params }: { params: { channel: string } }) {
  const user = await currentUser();
  console.log("user:", user);
  const userId = "xod56wl4sd4q3j4imh23ox3m";
  const { channel } = params;
  const channelData = await getChannel(channel);
  const channels = channelData.channels;
  const messagesData = await getMessage(channel);

  return (
    <div className="w-full pt-8 py-4 flex flex-col" style={{ height: "calc(100vh - 70px)" }}>
      {/* メッセージ */}
      <div className="w-full h-full overflow-y-auto pb-4">
        {/* 初期メッセージ */}
        <div className="flex flex-col border-b-[1px] border-b-gray-400 px-4 pb-8">
          <h1 className="text-[32px] font-bold mb-4"># {channels.name}</h1>
          <p className="text-[16px] font-bold text-gray-400"># {channels.name} チャンネルへようこそ！このチャンネルで色んな人とチャットして繋がろう！</p>
          {/* TODO: 色々説明加える!! */}
          {/* TODO: 色々説明加える!! */}
          {/* TODO: 色々説明加える!! */}
        </div>
        {/* メッセージ */}
        {messagesData.messages.map((message, index) => {
          const isLastMessage = index === messagesData.messages.length - 1;
          return (
            <div key={`user-message${index}`} className={`flex flex-col px-4 pt-4 pb-6 ${isLastMessage ? "border-b-none" : "border-b-[1px] border-b-gray-400"}`}>
              <div className="flex flex-row mb-4">
                <Avatar className="rounded-sm">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-[16px] font-semibold ml-4">{message.users.name}</p>
                <p className="text-[14px] text-gray-500 ml-2 pt-[2px]">{convertTimestampToDate(message.messages.createdAt as Date)}</p>
              </div>
              <div className="w-full ml-12">
                <p>{message.messages.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full px-4">
        <ChatBox userId={userId} channelId={channel} />
      </div>
    </div>
  );
}

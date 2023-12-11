export type Message = {
  id: string;
  channelId: string;
  userId: string;
  content: string;
  createdAt: Date;
};
export type Messages = Message[];

export type ChatContents = {
  imageUrl: string;
  name: string;
  messages: Message[];
};

export type Message = {
  id: string;
  isMyMessage: boolean;
  message: string;
  createdAt: Date;
};

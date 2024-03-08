import { Message } from "./Message";

export type ChatContents = {
  imageUrl: string;
  name: string;
  messages: Message[];
};

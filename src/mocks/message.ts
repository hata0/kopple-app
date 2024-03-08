import { Message } from "@/features/chat/types/ChatContents";

export const message = (message: string): Message => {
  return {
    createdAt: new Date(),
    id: crypto.randomUUID(),
    isMyMessage: true,
    message,
  };
};

import { subDays } from "date-fns";

import { ChatContents } from "@/features/chat/types/ChatContents";

const id = () => crypto.randomUUID();
const randomIsMyMessage = () => (Math.random() < 0.5 ? true : false);

export const chatContents = (): ChatContents => {
  return {
    imageUrl: "/portrait/1.jpg",
    messages: [
      {
        createdAt: new Date(),
        id: id(),
        isMyMessage: randomIsMyMessage(),
        message: "こんにちは！",
      },
      {
        createdAt: subDays(new Date(), 1),
        id: id(),
        isMyMessage: randomIsMyMessage(),
        message: "最近どう？",
      },
      {
        createdAt: subDays(new Date(), 2),
        id: id(),
        isMyMessage: randomIsMyMessage(),
        message: "会いたいね！",
      },
      {
        createdAt: subDays(new Date(), 3),
        id: id(),
        isMyMessage: randomIsMyMessage(),
        message: "プロジェクトの進捗はどう？",
      },
      {
        createdAt: subDays(new Date(), 4),
        id: id(),
        isMyMessage: randomIsMyMessage(),
        message: "今晩は空いてる？",
      },
      {
        createdAt: subDays(new Date(), 5),
        id: id(),
        isMyMessage: randomIsMyMessage(),
        message: "新しいカフェを見つけたよ！",
      },
      {
        createdAt: subDays(new Date(), 6),
        id: id(),
        isMyMessage: randomIsMyMessage(),
        message: "久しぶり！",
      },
      {
        createdAt: new Date(2024, 0, 1),
        id: id(),
        isMyMessage: randomIsMyMessage(),
        message: "映画のチケット取ったよ",
      },
      {
        createdAt: new Date(2023, 11, 31),
        id: id(),
        isMyMessage: randomIsMyMessage(),
        message: "明日のミーティングについて",
      },
    ],
    name: "山本 さくら",
  };
};

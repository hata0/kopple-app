import { subDays } from "date-fns";

import { ChatCard } from "@/features/chats/types/ChatCard";

const id = () => crypto.randomUUID();

export const chatCards = (): ChatCard[] => [
  {
    id: id(),
    imageUrl: "/portrait/1.png",
    latestMessage: "こんにちは！",
    name: "ユーザー1",
    updatedAt: new Date(),
  },
  {
    id: id(),
    imageUrl: "/portrait/2.png",
    latestMessage: "最近どう？",
    name: "ユーザー2",
    updatedAt: subDays(new Date(), 1),
  },
  {
    id: id(),
    imageUrl: "/portrait/3.png",
    latestMessage: "会いたいね！",
    name: "ユーザー3",
    updatedAt: subDays(new Date(), 2),
  },
  {
    id: id(),
    imageUrl: "/portrait/4.png",
    latestMessage: "プロジェクトの進捗はどう？",
    name: "ユーザー4",
    updatedAt: subDays(new Date(), 3),
  },
  {
    id: id(),
    imageUrl: "/portrait/5.png",
    latestMessage: "今晩は空いてる？",
    name: "ユーザー5",
    updatedAt: subDays(new Date(), 4),
  },
  {
    id: id(),
    imageUrl: "/portrait/1.png",
    latestMessage: "新しいカフェを見つけたよ！",
    name: "ユーザー6",
    updatedAt: subDays(new Date(), 5),
  },
  {
    id: id(),
    imageUrl: "/portrait/2.png",
    latestMessage: null,
    name: "ユーザー7",
    updatedAt: null,
  },
  {
    id: id(),
    imageUrl: "/portrait/3.png",
    latestMessage: "久しぶり！",
    name: "ユーザー8",
    updatedAt: subDays(new Date(), 6),
  },
  {
    id: id(),
    imageUrl: "/portrait/4.png",
    latestMessage: "映画のチケット取ったよ",
    name: "ユーザー9",
    updatedAt: new Date(2024, 0, 1),
  },
  {
    id: id(),
    imageUrl: "/portrait/5.png",
    latestMessage: "明日のミーティングについて",
    name: "ユーザー10",
    updatedAt: new Date(2023, 11, 31),
  },
];

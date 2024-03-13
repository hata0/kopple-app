import { subDays } from "date-fns";

import { ChatCard } from "@/features/chats/types/ChatCard";

const id = () => crypto.randomUUID();

export const chatCards = (): ChatCard[] => [
  {
    id: id(),
    imageUrl: "/portrait/1.jpg",
    latestMessage: "こんにちは！",
    name: "佐藤 あやか",
    updatedAt: new Date(),
  },
  {
    id: id(),
    imageUrl: "/portrait/2.jpg",
    latestMessage: "最近どう？",
    name: "田中 みさき",
    updatedAt: subDays(new Date(), 1),
  },
  {
    id: id(),
    imageUrl: "/portrait/3.jpg",
    latestMessage: "会いたいね！",
    name: "山本 さくら",
    updatedAt: subDays(new Date(), 2),
  },
  {
    id: id(),
    imageUrl: "/portrait/4.jpg",
    latestMessage: "プロジェクトの進捗はどう？",
    name: "鈴木 はるか",
    updatedAt: subDays(new Date(), 3),
  },
  {
    id: id(),
    imageUrl: "/portrait/5.jpg",
    latestMessage: "今晩は空いてる？",
    name: "高橋 まゆみ",
    updatedAt: subDays(new Date(), 4),
  },
  {
    id: id(),
    imageUrl: "/portrait/1.jpg",
    latestMessage: "新しいカフェを見つけたよ！",
    name: "佐藤 あやか",
    updatedAt: subDays(new Date(), 5),
  },
  {
    id: id(),
    imageUrl: "/portrait/2.jpg",
    latestMessage: null,
    name: "田中 みさき",
    updatedAt: null,
  },
  {
    id: id(),
    imageUrl: "/portrait/3.jpg",
    latestMessage: "久しぶり！",
    name: "山本 さくら",
    updatedAt: subDays(new Date(), 6),
  },
  {
    id: id(),
    imageUrl: "/portrait/4.jpg",
    latestMessage: "映画のチケット取ったよ",
    name: "鈴木 はるか",
    updatedAt: new Date(2024, 0, 1),
  },
  {
    id: id(),
    imageUrl: "/portrait/5.jpg",
    latestMessage: "明日のミーティングについて",
    name: "高橋 まゆみ",
    updatedAt: new Date(2023, 11, 31),
  },
];

import { PortraitCard } from "@/features/dashboard/types/PortraitCard";

const id = () => crypto.randomUUID();

export const portraitCards = (): PortraitCard[] => [
  {
    age: 25,
    hashtag: "#冒険好き",
    id: id(),
    imageUrl: "/portrait/1.jpg",
    isLike: false,
    message: "こんにちは、佐藤 あやかです！",
    name: "佐藤 あやか",
  },
  {
    age: 30,
    hashtag: "#山好き",
    id: id(),
    imageUrl: "/portrait/2.jpg",
    isLike: false,
    message: "趣味は登山です。",
    name: "田中 みさき",
  },
  {
    age: 22,
    hashtag: "#好奇心旺盛",
    id: id(),
    imageUrl: "/portrait/3.jpg",
    isLike: true,
    message: "毎日が新しい発見です。",
    name: "佐藤花子",
  },
  {
    age: 28,
    hashtag: "#グルメ",
    id: id(),
    imageUrl: "/portrait/4.jpg",
    isLike: false,
    message: "美味しいものを食べることが大好き。",
    name: "田中美咲",
  },
  {
    age: 35,
    hashtag: "#写真好き",
    id: id(),
    imageUrl: "/portrait/5.jpg",
    isLike: true,
    message: "写真を撮ることが趣味です。",
    name: "山本 さくら",
  },
];

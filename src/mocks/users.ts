import { Users } from "@/features/dashboard/types/Users";

export const users: Users = {
  isLikes: [null, null, false, null, true],
  portraitCards: [
    {
      age: 25,
      hashtag: "#冒険好き",
      imageUrl: "/portrait1.png",
      message: "こんにちは、山田太郎です！",
      name: "山田太郎",
    },
    {
      age: 30,
      hashtag: "#山好き",
      imageUrl: "/portrait2.png",
      message: "趣味は登山です。",
      name: "鈴木一郎",
    },
    {
      age: 22,
      hashtag: "#好奇心旺盛",
      imageUrl: "/portrait3.png",
      message: "毎日が新しい発見です。",
      name: "佐藤花子",
    },
    {
      age: 28,
      hashtag: "#グルメ",
      imageUrl: "/portrait4.png",
      message: "美味しいものを食べることが大好き。",
      name: "田中美咲",
    },
    {
      age: 35,
      hashtag: "#写真好き",
      imageUrl: "/portrait5.png",
      message: "写真を撮ることが趣味です。",
      name: "伊藤健太",
    },
  ],
};

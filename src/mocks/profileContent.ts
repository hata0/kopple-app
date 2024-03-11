import { ProfileContent } from "@/features/dashboard/types/ProfileContent";

export const profileContent = () => {
  const randomIndex = Math.floor(Math.random() * PROFILE_CONTENTS.length);
  return PROFILE_CONTENTS[randomIndex];
};

const PROFILE_CONTENTS: ProfileContent[] = [
  {
    address: "北海道",
    age: 25,
    birthday: "1月1日",
    hashtag: "#冒険好き",
    imageUrl: "/portrait/1.png",
    last: "冒険心旺盛な登山家です。新たな山々や景色を求めて旅を続けています。一緒に自然の美しさを共有しませんか？",
    message: "こんにちは、山田太郎です！",
    name: "山田太郎",
    sex: "男",
  },
  {
    address: "東京都",
    age: 30,
    birthday: "2月2日",
    hashtag: "#山好き",
    imageUrl: "/portrait/2.png",
    last: "登山が大好きで、山頂からの絶景に心を奪われます。一緒に山に登って、感動の瞬間を共有しましょう。よろしくおねがいします。",
    message: "趣味は登山です。",
    name: "鈴木一郎",
    sex: "男",
  },
  {
    address: "大阪府",
    age: 22,
    birthday: "3月3日",
    hashtag: "#好奇心旺盛",
    imageUrl: "/portrait/3.png",
    last: "新しいことに興味津々で、世界中の未知の場所や文化に触れたいと思っています。一緒に冒険し、新たな体験を楽しみましょう！たくさんの人と話してみたいです！",
    message: "毎日が新しい発見です。",
    name: "佐藤花子",
    sex: "女",
  },
  {
    address: "愛知県",
    age: 28,
    birthday: "4月4日",
    hashtag: "#グルメ",
    imageUrl: "/portrait/4.png",
    last: "グルメな食事を楽しむことが大好きで、美味しい料理を求めて街を彷徨います。好物はたこ焼きとお好み焼きです。よろしくね！",
    message: "美味しいものを食べることが大好き。",
    name: "田中美咲",
    sex: "女",
  },
  {
    address: "福岡県",
    age: 35,
    birthday: "5月5日",
    hashtag: "#写真好き",
    imageUrl: "/portrait/5.png",
    last: " 写真を撮ることが大好きで、旅先や自然の美しさを切り取ります。一緒に写真撮影のスポットを巡り、思い出を残しましょう！よろしくお願いします。",
    message: "写真を撮ることが趣味です。",
    name: "伊藤健太",
    sex: "男",
  },
];

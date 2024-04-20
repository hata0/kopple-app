import { ProfileContent } from "@/types/ProfileContent";

export const profileContent = () => {
  const randomIndex = Math.floor(Math.random() * PROFILE_CONTENTS.length);
  return PROFILE_CONTENTS[randomIndex];
};

const PROFILE_CONTENTS: ProfileContent[] = [
  {
    address: "北海道",
    birthday: new Date(1999, 2, 3),
    hashtags: [{ name: "冒険好き" }, { name: "登山" }],
    hobbies: [{ name: "挨拶" }, { name: "自然" }],
    imageUrl: "/portrait/1.jpg",
    message:
      "冒険心旺盛な登山家です。新たな山々や景色を求めて旅を続けています。一緒に自然の美しさを共有しませんか？",
    name: "田中 みさき",
    sex: "woman",
  },
  {
    address: "東京都",
    birthday: new Date(1994, 3, 6),
    hashtags: [{ name: "山好き" }],
    hobbies: [{ name: "登山" }],
    imageUrl: "/portrait/2.jpg",
    message:
      "登山が大好きで、山頂からの絶景に心を奪われます。一緒に山に登って、感動の瞬間を共有しましょう。よろしくおねがいします。",
    name: "佐藤 あやか",
    sex: "woman",
  },
  {
    address: "大阪府",
    birthday: new Date(2002, 7, 22),
    hashtags: [{ name: "好奇心旺盛" }],
    hobbies: [{ name: "新しいこと" }],
    imageUrl: "/portrait/3.jpg",
    message:
      "新しいことに興味津々で、世界中の未知の場所や文化に触れたいと思っています。一緒に冒険し、新たな体験を楽しみましょう！たくさんの人と話してみたいです！",
    name: "佐藤花子",
    sex: "woman",
  },
  {
    address: "愛知県",
    birthday: new Date(1996, 10, 7),
    hashtags: [{ name: "グルメ" }],
    hobbies: [{ name: "美食" }],
    imageUrl: "/portrait/4.jpg",
    message:
      "グルメな食事を楽しむことが大好きで、美味しい料理を求めて街を彷徨います。好物はたこ焼きとお好み焼きです。よろしくね！",
    name: "田中美咲",
    sex: "woman",
  },
  {
    address: "",
    birthday: new Date(1989, 9, 24),
    hashtags: [],
    hobbies: [],
    imageUrl: "/portrait/5.jpg",
    message: "",
    name: "山本 さくら",
    sex: "woman",
  },
];

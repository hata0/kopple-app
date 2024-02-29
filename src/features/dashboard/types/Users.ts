export type Users = {
  portraitCards: PortraitCard[];
  isLikes: IsLike[];
};

type PortraitCard = {
  imageUrl: string;
  name: string;
  age: number;
  message: string;
  hashtag: string;
};

type IsLike = boolean | null;

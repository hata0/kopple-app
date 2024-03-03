export type Users = {
  portraitCards: PortraitCard[];
  isLikes: IsLike[];
};

export type PortraitCard = {
  imageUrl: string;
  name: string;
  age: number;
  message: string;
  hashtag: string;
};

export type IsLike = boolean | null;

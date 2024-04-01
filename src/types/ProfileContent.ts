import { Tag } from "@/types/Tag";

export type ProfileContent = {
  age: number;
  hashtags: Tag[];
  imageUrl: string;
  message: string;
  name: string;
  sex: string;
  birthday: Date | null;
  hobbies: Tag[];
  address: string;
};

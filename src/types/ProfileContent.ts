import { Tag } from "@/types/Tag";

export type ProfileContent = {
  age: number;
  hashtags: Tag[];
  imageUrl: string;
  message: string;
  name: string;
  sex: "man" | "woman";
  birthday: Date | null;
  hobbies: Tag[];
  address: string;
};

import { Tag } from "@/types/Tag";

export type ProfileContent = {
  hashtags: Tag[];
  imageUrl: string;
  message: string;
  name: string;
  sex: "man" | "woman";
  birthday: Date;
  hobbies: Tag[];
  address: string;
};

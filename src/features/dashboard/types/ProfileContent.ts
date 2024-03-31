export type ProfileContent = {
  age: number;
  hashtags: { name: string }[];
  imageUrl: string;
  message: string;
  name: string;
  sex: string;
  birthday: Date | null;
  hobbies: { name: string }[];
  address: string;
};

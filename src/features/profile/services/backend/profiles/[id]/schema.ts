import { z } from "zod";

export const profileFormInputSchema = z.object({
  address: z.string(),
  birthday: z.date(),
  hashtags: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  hobbies: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  image: z.instanceof(File).optional(),
  message: z.string(),
  name: z.string().min(1, "名前を入力してください。"),
  sex: z.enum(["man", "woman"]),
});

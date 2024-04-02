import { z } from "zod";

export const profileFormInputSchema = z.object({
  address: z.string(),
  age: z.coerce
    .number()
    .int("年齢を入力してください。")
    .nonnegative("年齢を入力してください。")
    .max(130, "年齢を入力してください。"),
  birthday: z.date().optional(),
  hashtags: z.array(
    z.object({
      name: z.string().min(1, "ハッシュタグ名が必要です"),
    }),
  ),
  hobbies: z.array(
    z.object({
      name: z.string().min(1, "趣味名が必要です"),
    }),
  ),
  image: z.instanceof(File).optional(),
  message: z.string(),
  name: z.string().min(1, "名前を入力してください。"),
  sex: z.enum(["man", "woman"]),
});

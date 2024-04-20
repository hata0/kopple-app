import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg"];

export const profileFormInputSchema = z.object({
  address: z.string(),
  age: z.coerce
    .number()
    .int()
    .nonnegative("年齢を入力してください。")
    .max(130, "年齢を入力してください。"),
  birthday: z.date().optional(),
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
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => (file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : true),
      "画像である必要があります。",
    ),
  message: z.string(),
  name: z.string().min(1, "名前を入力してください。"),
  sex: z.enum(["man", "woman"]),
});

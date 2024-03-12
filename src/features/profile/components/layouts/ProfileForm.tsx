import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DayOfBirthPicker } from "./DayOfBirthPicker";

import { Button } from "@/components/ui/button";
import { FormHeading } from "@/components/ui/domain/FormHeading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  address: z.string(),
  age: z.coerce
    .number()
    .int("年齢を入力してください。")
    .nonnegative("年齢を入力してください。")
    .max(130, "年齢を入力してください。"),
  birthday: z.date().optional(),
  hashtag: z.string(),
  hobby: z.coerce.string(),
  message: z.string(),
  name: z.string().min(1, "名前を入力してください。"),
  sex: z.string(),
});

export type FormFieldValue = z.infer<typeof formSchema>;

export const ProfileForm = () => {
  const headingId = useId();
  const form = useForm<FormFieldValue>({
    defaultValues: {
      address: "",
      age: 18,
      birthday: undefined,
      hashtag: "",
      hobby: "",
      message: "",
      name: "nu",
      sex: "man",
    },
  });

  const onSubmit = (values: FormFieldValue) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        aria-labelledby={headingId}
        className="mb-48 flex w-full flex-col items-center justify-center space-y-2 p-8"
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
      >
        <FormHeading id={headingId}>プロフィールを編集</FormHeading>
        <div className="flex h-full w-full flex-wrap items-center justify-start gap-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-48">
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="w-24">
                <FormLabel>年齢</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="w-24">
                <FormLabel>性別</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-48">
                <FormLabel>住所</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="w-48">
                <FormLabel>誕生日</FormLabel>
                <DayOfBirthPicker {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>自己紹介</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hobby"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>趣味</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hashtag"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>ハッシュタグ</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-8 pt-5">
          <Button type="submit">更新</Button>
          <Button asChild>
            <Link href="/dashboard">キャンセル</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

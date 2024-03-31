import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useId } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { DayOfBirthPicker } from "../DayOfBirthPicker";

import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { TagInput } from "@/components/ui/case/TagInput";
import { FormHeading } from "@/components/ui/domain/FormHeading";
import { ProfileContent } from "@/features/dashboard/types/ProfileContent";

const formSchema = z.object({
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
  message: z.string(),
  name: z.string().min(1, "名前を入力してください。"),
  sex: z.string(),
});

export type FormFieldValue = z.infer<typeof formSchema>;

export const ProfileForm = ({
  address,
  age,
  birthday,
  hashtags,
  hobbies,
  message,
  name,
  sex,
}: ProfileContent) => {
  const headingId = useId();
  const form = useForm<FormFieldValue>({
    defaultValues: {
      address,
      age,
      birthday: birthday === null ? undefined : birthday,
      hashtags,
      hobbies,
      message,
      name,
      sex,
    },
    resolver: zodResolver(formSchema),
  });
  const hashtagFields = useFieldArray({
    control: form.control,
    name: "hashtags",
  });
  const hobbyFields = useFieldArray({
    control: form.control,
    name: "hobbies",
  });

  const onSubmit = (values: FormFieldValue) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        aria-labelledby={headingId}
        className="mb-12 flex w-full flex-col items-center justify-center space-y-2 p-8"
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
                <DayOfBirthPicker onChange={field.onChange} value={field.value} />
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
          name="hashtags"
          render={({ field }) => {
            const tags = field.value;
            return (
              <FormItem className="w-full">
                <FormLabel>ハッシュタグ</FormLabel>
                <TagInput
                  onAddTag={({ isSameTagName, text }) => {
                    if (isSameTagName) {
                      return;
                    } else {
                      hashtagFields.append({
                        name: text,
                      });
                    }
                  }}
                  onDeleteTag={(deleteIndex) => {
                    hashtagFields.remove(deleteIndex);
                  }}
                  onDragEnd={({ active, newIndex, oldIndex, over }) => {
                    if (over === null) {
                      return;
                    } else if (active.id === over.id) {
                      return;
                    } else {
                      hashtagFields.swap(oldIndex, newIndex);
                    }
                  }}
                  render={(props) => (
                    <FormControl>
                      <Input {...props} />
                    </FormControl>
                  )}
                  tags={tags.map(({ name }) => name)}
                />
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="hobbies"
          render={({ field }) => {
            const tags = field.value;
            return (
              <FormItem className="w-full">
                <FormLabel>趣味</FormLabel>
                <TagInput
                  onAddTag={({ isSameTagName, text }) => {
                    if (isSameTagName) {
                      return;
                    } else {
                      hobbyFields.append({
                        name: text,
                      });
                    }
                  }}
                  onDeleteTag={(deleteIndex) => {
                    hobbyFields.remove(deleteIndex);
                  }}
                  onDragEnd={({ active, newIndex, oldIndex, over }) => {
                    if (over === null) {
                      return;
                    } else if (active.id === over.id) {
                      return;
                    } else {
                      hobbyFields.swap(oldIndex, newIndex);
                    }
                  }}
                  render={(props) => (
                    <FormControl>
                      <Input {...props} />
                    </FormControl>
                  )}
                  tags={tags.map(({ name }) => name)}
                />
                <FormMessage />
              </FormItem>
            );
          }}
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

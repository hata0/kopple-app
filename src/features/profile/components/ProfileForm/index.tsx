import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useId } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { profileFormInputSchema } from "../../services/backend/profiles/[id]/schema";
import { ProfileFormInput } from "../../services/backend/profiles/[id]/type";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { TagInput } from "@/components/ui/case/TagInput";
import { FormHeading } from "@/components/ui/domain/FormHeading";
import { ProfileContent } from "@/types/ProfileContent";

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
  const form = useForm<ProfileFormInput>({
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
    resolver: zodResolver(profileFormInputSchema),
  });
  const hashtagFields = useFieldArray({
    control: form.control,
    name: "hashtags",
  });
  const hobbyFields = useFieldArray({
    control: form.control,
    name: "hobbies",
  });

  const onSubmit = (values: ProfileFormInput) => {
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
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="性別を選択する" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="man">男性</SelectItem>
                    <SelectItem value="woman">女性</SelectItem>
                  </SelectContent>
                </Select>
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
                  tags={tags}
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
                  tags={tags}
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

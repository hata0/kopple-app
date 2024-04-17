import Link from "next/link";
import { useId } from "react";

import { useProfileForm } from "../../hooks/useProfileForm";
import { ProfileFormInput } from "../../services/backend/profiles/[id]/type";
import { BirthdayFormControl } from "../BirthdayFormControl";
import { HashtagsFormControl } from "../HashtagsFormControl";
import { HobbyTagsInput } from "../HobbyTagsInput";
import { PortraitInput } from "../PortraitInput";

import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { FormHeading } from "@/components/ui/domain/FormHeading";
import { ProfileContent } from "@/types/ProfileContent";

type Props = {
  profileContent: ProfileContent;
  onSubmit: (values: ProfileFormInput) => void;
};
export const ProfileForm = ({ onSubmit, profileContent }: Props) => {
  const headingId = useId();
  const { form, hashtagFields, hobbyFields } = useProfileForm(profileContent);

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
                <BirthdayFormControl onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>ポートレイト</FormLabel>
              <PortraitInput
                imageUrl={profileContent.imageUrl}
                render={(children) => <FormControl>{children}</FormControl>}
                setValue={form.setValue}
                value={field.value}
              />
              <FormDescription className="flex w-[224px] items-center justify-center">
                画像をドロップまたは選択
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>ハッシュタグ</FormLabel>
              <HashtagsFormControl hashtagFields={hashtagFields} value={field.value} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hobbies"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>趣味</FormLabel>
              <HobbyTagsInput
                hobbyFields={hobbyFields}
                render={(children) => <FormControl>{children}</FormControl>}
                value={field.value}
              />
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

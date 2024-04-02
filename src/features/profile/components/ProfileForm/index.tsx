import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { FaPortrait } from "react-icons/fa";

import { useProfileForm } from "../../hooks/useProfileForm";
import { ProfileFormInput } from "../../services/backend/profiles/[id]/type";
import { DayOfBirthPicker } from "../DayOfBirthPicker";

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
import { toast } from "@/components/shadcn/ui/use-toast";
import { DroppableFileInput } from "@/components/ui/case/DroppableFileInput";
import { TagInput } from "@/components/ui/case/TagInput";
import { FormHeading } from "@/components/ui/domain/FormHeading";
import { cn } from "@/lib/utils";
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
                <DayOfBirthPicker onChange={field.onChange} value={field.value} />
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
              <DroppableFileInput
                className={({ isDragActive }) =>
                  cn("h-[300px] w-[224px] cursor-pointer", {
                    "bg-accent": isDragActive,
                  })
                }
                dropOptions={{
                  onDrop: (files) => {
                    if (files.length > 0) {
                      form.setValue("image", files[0]);
                    } else {
                      toast({
                        title: "画像のアップロードに失敗しました",
                        variant: "destructive",
                      });
                    }
                  },
                }}
                render={({ isDragActive }) => (
                  <FormControl>
                    {!profileContent.imageUrl && !field.value ? (
                      <div
                        className={cn(
                          "flex h-full w-full items-center justify-center rounded-md border-2 border-dashed bg-accent text-accent-foreground hover:bg-gray-100 hover:text-accent-foreground/80",
                          {
                            "bg-gray-100 text-accent-foreground/80": isDragActive,
                          },
                        )}
                      >
                        <FaPortrait className="h-16 w-16" />
                      </div>
                    ) : (
                      <div className="relative h-full w-full rounded-md border-2 hover:bg-accent">
                        <Image
                          fill
                          priority
                          alt="ポートレイト"
                          className={cn("object-contain hover:opacity-50", {
                            "opacity-50": isDragActive,
                          })}
                          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          src={
                            field.value
                              ? URL.createObjectURL(field.value)
                              : profileContent.imageUrl!
                          }
                        />
                      </div>
                    )}
                  </FormControl>
                )}
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

import { Control, UseFieldArrayReturn } from "react-hook-form";

import { ProfileFormInput } from "../services/backend/profiles/[id]/type";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { TagInput } from "@/components/ui/case/TagInput";

type Props = {
  control: Control<ProfileFormInput>;
  hashtagFields: UseFieldArrayReturn<ProfileFormInput, "hashtags", "id">;
};
export const HashtagFormField = ({ control, hashtagFields }: Props) => {
  return (
    <FormField
      control={control}
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
  );
};

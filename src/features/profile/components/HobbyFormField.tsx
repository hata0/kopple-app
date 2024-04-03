import { memo } from "react";
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
  hobbyFields: UseFieldArrayReturn<ProfileFormInput, "hobbies", "id">;
};
export const HobbyFormField = memo(({ control, hobbyFields }: Props) => {
  return (
    <FormField
      control={control}
      name="hobbies"
      render={({ field }) => (
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
            tags={field.value}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
HobbyFormField.displayName = "HobbyFormField";

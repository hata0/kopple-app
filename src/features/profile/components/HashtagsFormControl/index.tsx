import { memo } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

import { ProfileFormInput } from "../../services/backend/profiles/[id]/type";

import { FormControl } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { TagInput } from "@/components/ui/case/TagInput";

type Props = {
  hashtagFields: UseFieldArrayReturn<ProfileFormInput, "hashtags", "id">;
  value: {
    name: string;
  }[];
};
export const HashtagsFormControl = memo(({ hashtagFields, value }: Props) => {
  return (
    <TagInput
      addProps={{
        "aria-label": "ハッシュタグを追加",
      }}
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
      tags={value}
    />
  );
});
HashtagsFormControl.displayName = "HashtagFormControl";

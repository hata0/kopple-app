import { memo, ReactNode } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

import { Input } from "@/components/shadcn/ui/input";
import { TagInput } from "@/components/ui/case/TagInput";
import { ProfileFormInput } from "@/services/backend/profiles/[id]/type";

type Props = {
  hashtagFields: UseFieldArrayReturn<ProfileFormInput, "hashtags", "id">;
  value: {
    name: string;
  }[];
  render: (children: ReactNode) => ReactNode;
};
export const HashtagsInput = memo(({ hashtagFields, render, value }: Props) => {
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
      render={(props) => render(<Input {...props} />)}
      tags={value}
    />
  );
});
HashtagsInput.displayName = "HashtagFormControl";

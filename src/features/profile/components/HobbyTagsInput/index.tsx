import { memo, ReactNode } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

import { ProfileFormInput } from "../../services/backend/profiles/[id]/type";

import { Input } from "@/components/shadcn/ui/input";
import { TagInput } from "@/components/ui/case/TagInput";

type Props = {
  hobbyFields: UseFieldArrayReturn<ProfileFormInput, "hobbies", "id">;
  value: {
    name: string;
  }[];
  render: (children: ReactNode) => ReactNode;
};
export const HobbyTagsInput = memo(({ hobbyFields, render, value }: Props) => {
  return (
    <TagInput
      addProps={{
        "aria-label": "趣味を追加",
      }}
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
      render={(props) => render(<Input {...props} />)}
      tags={value}
    />
  );
});
HobbyTagsInput.displayName = "HobbiesFormControl";

import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { ChangeEventHandler, memo, ReactNode, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { Tag } from "../../base/Tag";
import { SortableTagList } from "../SortableTagList";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { toast } from "@/components/shadcn/ui/use-toast";

export type Tag = {
  name: string;
  id: string;
};
export type AddTagArgs = {
  text: string;
  isSameTagName: boolean;
};
export type DragEndArgs = {
  oldIndex: number;
  newIndex: number;
} & DragEndEvent;

type Props = {
  tags: string[];
  onAddTag: (args: AddTagArgs) => void;
  onDeleteTag: (deleteIndex: number) => void;
  onDragEnd: (args: DragEndArgs) => void;
  disableSameNameError?: boolean;
  render?: (inputProps: {
    className: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    value: string;
  }) => ReactNode;
};
export const TagInput = memo(
  ({
    disableSameNameError = false,
    onAddTag,
    onDeleteTag,
    onDragEnd,
    render,
    tags: initialTags,
  }: Props) => {
    const tags: Tag[] = useMemo(
      () =>
        initialTags.map((name) => ({
          id: crypto.randomUUID(),
          name,
        })),
      [initialTags],
    );
    const [text, setText] = useState("");
    const [draggingTag, setDraggingTag] = useState<string | null>(null);

    const handleAddTag = () => {
      const isSameTagName = !!tags.find(({ name }) => name === text);
      onAddTag({ isSameTagName, text });

      if (!disableSameNameError && isSameTagName) {
        toast({
          title: "同じ名前のタグは設定できません",
          variant: "destructive",
        });
      } else {
        setText("");
      }
    };
    const handleDragEnd = (e: DragEndEvent) => {
      const { active, over } = e;
      const oldIndex = tags.findIndex((tag) => tag.id === active.id);
      const newIndex = tags.findIndex((tag) => tag.id === over?.id);
      onDragEnd({ ...e, newIndex, oldIndex });

      if (over === null) {
        return;
      } else if (active.id === over.id) {
        setDraggingTag(null);
      } else {
        setDraggingTag(null);
      }
    };
    const handleDragStart = ({ active }: DragStartEvent) => {
      setDraggingTag(tags.find((tag) => tag.id === active.id)!.name);
    };

    return (
      <div className="flex flex-col items-end space-y-2">
        <SortableTagList
          draggingTag={draggingTag}
          onDeleteTag={onDeleteTag}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          tags={tags}
        />
        <div className="flex h-full items-center justify-center space-x-2">
          {render?.({
            className: "w-40",
            onChange: (e) => setText(e.target.value),
            placeholder: "タグを追加する",
            value: text,
          }) || (
            <Input
              className="w-40"
              onChange={(e) => setText(e.target.value)}
              placeholder="タグを追加する"
              value={text}
            />
          )}
          <Button
            aria-label="追加"
            disabled={text === ""}
            onClick={handleAddTag}
            size="icon"
            type="button"
          >
            <FaPlus />
          </Button>
        </div>
      </div>
    );
  },
);
TagInput.displayName = "TagInput";

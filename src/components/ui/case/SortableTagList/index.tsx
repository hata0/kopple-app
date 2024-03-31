import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from "react";

import { Tag, TagProps } from "../../base/Tag";
import { Tag as TagType } from "../TagInput";

type Props = {
  tags: TagType[];
  onDragEnd: (event: DragEndEvent) => void;
  onDragStart: (event: DragStartEvent) => void;
  draggingTag: string | null;
  onDeleteTag?: (deleteIndex: number) => void;
};
export const SortableTagList = memo(
  ({ draggingTag, onDeleteTag, onDragEnd, onDragStart, tags }: Props) => {
    return (
      <div className="flex min-h-[52px] w-full flex-wrap items-center gap-1 rounded-md border border-border px-3 py-2">
        {tags.length === 0 ? (
          <div className="text-muted-foreground">現在、タグは設定されていません</div>
        ) : (
          <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <SortableContext items={tags}>
              {tags.map((tag, idx) => (
                <SortableTag key={tag.id} {...tag} index={idx} onDeleteTag={onDeleteTag} />
              ))}
            </SortableContext>
            <DragOverlay>{draggingTag && <Tag index={0} name={draggingTag} />}</DragOverlay>
          </DndContext>
        )}
      </div>
    );
  },
);
SortableTagList.displayName = "SortableTagList";

type SortableTagProps = {
  id: string;
} & TagProps;
const SortableTag = (props: SortableTagProps) => {
  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform } =
    useSortable({
      id: props.id,
    });

  return (
    <Tag
      {...props}
      containerProps={{
        className: isDragging ? "opacity-50" : "",
        ref: setNodeRef,
        style: {
          transform: CSS.Transform.toString(transform),
        },
      }}
      nameProps={{
        ...attributes,
        ...listeners,
        className: isDragging ? "cursor-grabbing" : "cursor-grab",
        ref: setActivatorNodeRef,
      }}
    />
  );
};

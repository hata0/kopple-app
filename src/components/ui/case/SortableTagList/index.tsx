import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from "react";

import { Tag, type Tag as TagType, TagProps } from "../../base/Tag";

type Props = {
  tags: TagType[];
  onDragEnd: (event: DragEndEvent) => void;
  onDragStart: (event: DragStartEvent) => void;
  draggingTag: TagType | null;
  onDeleteTag?: (idToDelete: string) => void;
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
                <SortableTag key={idx} {...tag} onDeleteTag={onDeleteTag} />
              ))}
            </SortableContext>
            <DragOverlay>{draggingTag && <Tag {...draggingTag} />}</DragOverlay>
          </DndContext>
        )}
      </div>
    );
  },
);
SortableTagList.displayName = "SortableTagList";

const SortableTag = (props: TagProps) => {
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

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Tag, type Tag as TagType, TagProps } from "../../base/Tag";

type Props = {
  tags: TagType[];
  onDragEnd: (event: DragEndEvent) => void;
} & Omit<TagProps, "name" | "id">;
export const SortableTagList = ({ onDragEnd, tags, ...tagProps }: Props) => {
  return (
    <div className="flex h-[52px] w-full items-center space-x-1 rounded-md border border-border px-3 py-2">
      {tags.length === 0 ? (
        <div className="text-muted-foreground">現在、タグは設定されていません</div>
      ) : (
        <DndContext onDragEnd={onDragEnd}>
          <SortableContext items={tags}>
            {tags.map((tag, idx) => (
              <SortableTag key={idx} {...tag} {...tagProps} />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

const SortableTag = (props: TagProps) => {
  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.id,
  });

  return (
    <Tag
      {...props}
      containerProps={{
        ref: setNodeRef,
        style: {
          transform: CSS.Transform.toString(transform),
          transition,
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

import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { SortableTagList } from ".";

type T = typeof SortableTagList;
type Story = StoryObj<T>;

export const Default: Story = {};

export const EmptyList: Story = {
  args: {
    draggingTag: {
      id: crypto.randomUUID(),
      name: "dragging tag",
    },
    onDeleteTag: fn(),
    onDragEnd: fn(),
    tags: [],
  },
  name: "タグがない場合",
};

export const ManyTag: Story = {
  args: {
    draggingTag: {
      id: crypto.randomUUID(),
      name: "dragging tag",
    },
    onDeleteTag: fn(),
    onDragEnd: fn(),
    tags: Array.from({ length: 20 }).map((_, idx) => ({ id: idx.toString(), name: "tag" })),
  },
  name: "タグが大量にある場合",
};

export default {
  args: {
    draggingTag: {
      id: crypto.randomUUID(),
      name: "dragging tag",
    },
    onDeleteTag: fn(),
    onDragEnd: fn(),
    tags: [
      { id: crypto.randomUUID(), name: "tag1" },
      { id: crypto.randomUUID(), name: "tag2" },
      { id: crypto.randomUUID(), name: "tag3" },
      { id: crypto.randomUUID(), name: "tag4" },
      { id: crypto.randomUUID(), name: "tag5" },
    ],
  },
  component: SortableTagList,
} satisfies Meta<T>;

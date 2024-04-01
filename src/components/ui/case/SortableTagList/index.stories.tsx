import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { SortableTagList } from ".";

type T = typeof SortableTagList;
type Story = StoryObj<T>;

export const Default: Story = {};

export const EmptyList: Story = {
  args: {
    draggingTag: "dragging tag",
    onDeleteTag: fn(),
    onDragEnd: fn(),
    onDragStart: fn(),
    tags: [],
  },
  name: "タグがない場合",
};

export const ManyTag: Story = {
  args: {
    draggingTag: "dragging tag",
    onDeleteTag: fn(),
    onDragEnd: fn(),
    onDragStart: fn(),
    tags: Array.from({ length: 20 }).map((_, idx) => ({
      id: idx.toString(),
      value: { name: "tag" },
    })),
  },
  name: "タグが大量にある場合",
};

export default {
  args: {
    draggingTag: "dragging tag",
    onDeleteTag: fn(),
    onDragEnd: fn(),
    onDragStart: fn(),
    tags: [
      { id: crypto.randomUUID(), value: { name: "tag1" } },
      { id: crypto.randomUUID(), value: { name: "tag2" } },
      { id: crypto.randomUUID(), value: { name: "tag3" } },
      { id: crypto.randomUUID(), value: { name: "tag4" } },
      { id: crypto.randomUUID(), value: { name: "tag5" } },
    ],
  },
  component: SortableTagList,
} satisfies Meta<T>;

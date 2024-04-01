import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";

import { SortableTagList } from ".";

type T = typeof SortableTagList;
type Story = StoryObj<T>;

const defaultTags = [
  { id: crypto.randomUUID(), value: { name: "tag1" } },
  { id: crypto.randomUUID(), value: { name: "tag2" } },
  { id: crypto.randomUUID(), value: { name: "tag3" } },
  { id: crypto.randomUUID(), value: { name: "tag4" } },
  { id: crypto.randomUUID(), value: { name: "tag5" } },
];

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

export const DeleteClick: Story = {
  name: "削除ボタンをクリックした時",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: `「${defaultTags[0].value.name}」を削除` }),
    );
  },
};

export default {
  args: {
    draggingTag: "dragging tag",
    onDeleteTag: fn(),
    onDragEnd: fn(),
    onDragStart: fn(),
    tags: defaultTags,
  },
  component: SortableTagList,
} satisfies Meta<T>;

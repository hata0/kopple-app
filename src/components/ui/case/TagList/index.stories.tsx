import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { TagList } from ".";

type T = typeof TagList;
type Story = StoryObj<T>;

export const Default: Story = {};

export const EmptyList: Story = {
  args: {
    onDeleteTag: fn(),
    tags: [],
  },
  name: "タグがない場合",
};

export default {
  args: {
    onDeleteTag: fn(),
    tags: ["tag1", "tag2"],
  },
  component: TagList,
} satisfies Meta<T>;

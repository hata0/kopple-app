import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Tag } from ".";

type T = typeof Tag;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    name: "tag name",
    onDeleteTag: fn(),
  },
  component: Tag,
} satisfies Meta<T>;

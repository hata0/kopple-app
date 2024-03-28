import { Meta, StoryObj } from "@storybook/react";

import { TagInput } from ".";

type T = typeof TagInput;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  component: TagInput,
} satisfies Meta<T>;

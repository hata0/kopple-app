import { Meta, StoryObj } from "@storybook/react";

import { TextareaAutosize } from ".";

type T = typeof TextareaAutosize;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  component: TextareaAutosize,
} satisfies Meta<T>;

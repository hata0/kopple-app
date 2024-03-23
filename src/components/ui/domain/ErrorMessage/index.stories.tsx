import { Meta, StoryObj } from "@storybook/react";

import { ErrorMessage } from ".";

type T = typeof ErrorMessage;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    children: "エラー内容",
  },
  component: ErrorMessage,
} satisfies Meta<T>;

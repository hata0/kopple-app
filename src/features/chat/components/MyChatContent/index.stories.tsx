import { Meta, StoryObj } from "@storybook/react";

import { MyChatContent } from ".";

type T = typeof MyChatContent;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    createdAt: new Date(2024, 3, 10, 9, 32, 32),
    message: "こんにちは",
  },
  component: MyChatContent,
  title: "Features/chat/MyChatContent",
} satisfies Meta<T>;

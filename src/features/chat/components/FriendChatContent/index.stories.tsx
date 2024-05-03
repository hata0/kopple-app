import { Meta, StoryObj } from "@storybook/react";

import { FriendChatContent } from ".";

type T = typeof FriendChatContent;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    createdAt: new Date(2024, 3, 10, 9, 32, 32),
    imageUrl: "/portrait/1.jpg",
    message: "こんにちは",
    name: "山本 さくら",
  },
  component: FriendChatContent,
  title: "Features/chat/FriendChatContent",
} satisfies Meta<T>;

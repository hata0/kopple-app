import { Meta, StoryObj } from "@storybook/react";

import { Chat } from ".";

import { chatContents } from "@/mocks/chatContents";

type T = typeof Chat;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    fallback: {
      ["/chats/id"]: chatContents(),
    },
  },
  component: Chat,
  parameters: {
    nextjs: {
      router: {
        query: { id: "id" },
      },
    },
  },
  title: "Features/chat/Chat",
} satisfies Meta<T>;

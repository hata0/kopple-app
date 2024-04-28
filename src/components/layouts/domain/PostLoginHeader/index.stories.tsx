import { Meta, StoryObj } from "@storybook/react";

import { PostLoginHeader } from ".";

type T = typeof PostLoginHeader;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Chats: Story = {
  name: "チャットリストページの場合",
  parameters: {
    nextjs: {
      router: {
        pathname: "/chats",
      },
    },
  },
};

export default {
  component: PostLoginHeader,
  parameters: {
    nextjs: {
      router: {
        pathname: "/dashboard",
      },
    },
  },
} satisfies Meta<T>;

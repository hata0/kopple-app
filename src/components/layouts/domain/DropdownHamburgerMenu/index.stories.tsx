import { Meta, StoryObj } from "@storybook/react";

import { DropdownHamburgerMenu } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";
import { deleteSessionHandler } from "@/services/api/session/mock";

type T = typeof DropdownHamburgerMenu;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Success: Story = {
  name: "成功した場合",
  parameters: {
    msw: {
      handlers: [deleteSessionHandler()],
    },
  },
};

export const NetworkError: Story = {
  name: "ネットワークエラーの時",
  parameters: {
    msw: {
      handlers: [
        deleteSessionHandler({
          isNetworkError: true,
        }),
      ],
    },
  },
};

export const Error: Story = {
  name: "エラーの時",
  parameters: {
    msw: {
      handlers: [
        deleteSessionHandler({
          error: {
            message: "セッションの削除に失敗しました",
            status: 401,
          },
        }),
      ],
    },
  },
};

export default {
  component: DropdownHamburgerMenu,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<T>;

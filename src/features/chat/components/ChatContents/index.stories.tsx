import { Meta, StoryObj } from "@storybook/react";
import { SWRConfig } from "swr";

import { Props } from "../../getServerSideProps";

import { ChatContents } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";
import { chatContents } from "@/mocks/chatContents";
import { getChatHandler } from "@/services/backend/chats/[id]/mock";

type T = typeof ChatContents;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Success: Story = {
  name: "成功したとき",
  parameters: {
    msw: {
      handlers: [getChatHandler()],
    },
  },
};

export const NetworkError: Story = {
  name: "ネットワークエラーのとき",
  parameters: {
    msw: {
      handlers: [getChatHandler({ isNetworkError: true })],
    },
  },
};

export const UnauthorizedError: Story = {
  name: "認証に失敗したとき",
  parameters: {
    msw: {
      handlers: [
        getChatHandler({
          error: {
            message: "認証に失敗しました。",
            status: 401,
          },
        }),
      ],
    },
  },
};

export default {
  component: ChatContents,
  decorators: [
    (Story) => (
      <SWRConfig
        value={{ fallback: { "/chats/id": chatContents() } } satisfies Pick<Props, "fallback">}
      >
        <Story />
        <Toaster />
      </SWRConfig>
    ),
  ],
  parameters: {
    nextjs: {
      router: {
        query: { id: "id" },
      },
    },
  },
  title: "Features/chat/ChatContents",
} satisfies Meta<T>;

import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { SWRConfig } from "swr";

import { Props } from "../../getServerSideProps";

import { Chat } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";
import { chatContents } from "@/mocks/chatContents";
import { postMessageHandler } from "@/services/backend/messages/create/[id]/mock";

type T = typeof Chat;
type Story = StoryObj<T>;

const validSubmit = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByRole("textbox", { name: "メッセージを入力" }), "こんにちは");
  await userEvent.click(canvas.getByRole("button", { name: "送信" }));
};

export const Default: Story = {};

export const Success: Story = {
  name: "成功したとき",
  parameters: {
    msw: {
      handlers: [postMessageHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    await validSubmit(canvasElement);
  },
};

export const NetworkError: Story = {
  name: "ネットワークエラーのとき",
  parameters: {
    msw: {
      handlers: [postMessageHandler({ isNetworkError: true })],
    },
  },
  play: async ({ canvasElement }) => {
    await validSubmit(canvasElement);
  },
};

export const UnauthorizedError: Story = {
  name: "認証に失敗したとき",
  parameters: {
    msw: {
      handlers: [
        postMessageHandler({
          error: {
            message: "認証に失敗しました",
            status: 401,
          },
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    await validSubmit(canvasElement);
  },
};

export default {
  component: Chat,
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
  title: "Features/chat/Chat",
} satisfies Meta<T>;

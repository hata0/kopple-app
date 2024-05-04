import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { SWRConfig } from "swr";

import { Props } from "../../getServerSideProps";

import { ChatForm } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";
import { chatContents } from "@/mocks/chatContents";
import { postMessageHandler } from "@/services/backend/messages/create/[id]/mock";

type T = typeof ChatForm;
type Story = StoryObj<T>;

const textareaLabel = "メッセージを入力";
const validSubmit = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByRole("textbox", { name: textareaLabel }), "こんにちは");
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

export const CtrlSucceedSubmit: Story = {
  name: "有効な値でctrl + enter を入力したとき",
  parameters: {
    msw: {
      handlers: [postMessageHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: textareaLabel }));
    await userEvent.keyboard("こんにちは{Control>}{Enter}{/Control}");
  },
};

export const CtrlEmptySubmit: Story = {
  name: "空のままctrl + enter を入力したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: textareaLabel }));
    await userEvent.keyboard("{Control>}{Enter}{/Control}");
  },
};

export const MetaSucceedSubmit: Story = {
  name: "有効な値でmeta + enter を入力したとき",
  parameters: {
    msw: {
      handlers: [postMessageHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: textareaLabel }));
    await userEvent.keyboard("こんにちは{Meta>}{Enter}{/Meta}");
  },
};

export const MetaEmptySubmit: Story = {
  name: "空のままmeta + enter を入力したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: textareaLabel }));
    await userEvent.keyboard("{Meta>}{Enter}{/Meta}");
  },
};

export default {
  component: ChatForm,
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
  title: "Features/chat/ChatForm",
} satisfies Meta<T>;

import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { SignIn } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";
import { getSessionHandler } from "@/services/api/session/mock";

type T = typeof SignIn;
type Story = StoryObj<T>;

const validSubmit = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  await userEvent.type(
    canvas.getByRole("textbox", { name: "メールアドレス" }),
    "email@example.com",
  );
  await userEvent.type(canvas.getByLabelText("パスワード"), "password1");
  await userEvent.click(canvas.getByRole("button", { name: "ログイン" }));
};

export const Default: Story = {};

export const SucceedSubmit: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  name: "成功した場合",
  parameters: {
    msw: {
      handlers: [getSessionHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    await validSubmit(canvasElement);
  },
};

export const ServerError: Story = {
  name: "エラーが発生した場合",
  parameters: {
    firebaseAuth: {
      credential: new Error(),
    },
  },
  play: async ({ canvasElement }) => {
    await validSubmit(canvasElement);
  },
};

export default {
  component: SignIn,
  parameters: {
    nextjs: {
      router: {
        pathname: "/sign-in",
      },
    },
  },
  title: "Features/sign-in/SignIn",
} satisfies Meta<T>;

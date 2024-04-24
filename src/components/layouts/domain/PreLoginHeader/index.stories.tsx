import { Meta, StoryObj } from "@storybook/react";

import { PreLoginHeader } from ".";

import { SetUidDecorator } from "@/tests/storybook/decorators/SetUidDecorator";

type T = typeof PreLoginHeader;
type Story = StoryObj<T>;

export const Default: Story = {};

export const SignIn: Story = {
  name: "ログインページの場合",
  parameters: {
    nextjs: {
      router: {
        pathname: "/sign-in",
      },
    },
  },
};

export const SignUp: Story = {
  name: "新規登録ページの場合",
  parameters: {
    nextjs: {
      router: {
        pathname: "/sign-up",
      },
    },
  },
};

export const HasSession: Story = {
  decorators: [SetUidDecorator],
  name: "セッションがある場合",
};

export default {
  component: PreLoginHeader,
} satisfies Meta<T>;

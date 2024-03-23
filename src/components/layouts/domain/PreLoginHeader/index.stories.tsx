import { Meta, StoryObj } from "@storybook/react";

import { PreLoginHeader } from ".";

import { SessionDecorator } from "@/tests/decorators/SessionDecorator";

type T = typeof PreLoginHeader;
type Story = StoryObj<T>;

export const Top: Story = {
  name: "トップページの場合",
};

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
  decorators: [SessionDecorator],
  name: "セッションがある場合",
};

export default {
  component: PreLoginHeader,
} satisfies Meta<T>;

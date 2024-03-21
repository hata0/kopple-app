/* eslint-disable import/named */
/* eslint-disable testing-library/prefer-screen-queries */
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";
// eslint-disable-next-line storybook/use-storybook-testing-library
import {
  ByRoleMatcher,
  ByRoleOptions,
  Matcher,
  SelectorMatcherOptions,
} from "@testing-library/react";

import { SignIn } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";
import { getSessionHandler } from "@/features/sign-in/services/api/session/mock";

type T = typeof SignIn;
type Story = StoryObj<T>;

const user = userEvent.setup();

type ValidSubmitArgs = {
  getByRole: (role: ByRoleMatcher, options?: ByRoleOptions) => HTMLElement;
  getByLabelText: (id: Matcher, options?: SelectorMatcherOptions) => HTMLElement;
};
const validSubmit = async ({ getByLabelText, getByRole }: ValidSubmitArgs) => {
  await user.type(getByRole("textbox", { name: "メールアドレス" }), "email@example.com");
  await user.type(getByLabelText("パスワード"), "password1");
  await user.click(getByRole("button", { name: "ログイン" }));
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
    firebaseAuth: {
      credential: {
        user: {
          getIdToken: fn().mockResolvedValue("id-token"),
          uid: "uid",
        },
      },
    },
    msw: {
      handlers: [getSessionHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await validSubmit(canvas);
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
    const canvas = within(canvasElement);
    await validSubmit(canvas);
  },
};

export default {
  component: SignIn,
  title: "Features/sign-in/SignIn",
} satisfies Meta<T>;

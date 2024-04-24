/* eslint-disable testing-library/prefer-screen-queries */
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
// eslint-disable-next-line storybook/use-storybook-testing-library
import type { ByRoleMatcher, ByRoleOptions, Matcher, MatcherOptions } from "@testing-library/react";

import { postProfileHandler } from "../../services/backend/profiles/[id]/mock";

import { Profile } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";
import { DeleteUidDecorator } from "@/tests/storybook/decorators/DeleteUidDecorator";
import { SetUidDecorator } from "@/tests/storybook/decorators/SetUidDecorator";

type T = typeof Profile;
type Story = StoryObj<T>;

type ValidSubmitArgs = {
  getByRole: (role: ByRoleMatcher, options?: ByRoleOptions) => HTMLElement;
  getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement;
};
const validSubmit = async ({ getByRole, getByTestId }: ValidSubmitArgs) => {
  await userEvent.upload(
    getByTestId("drop-input"),
    new File(["hello"], "hello.png", { type: "image/png" }),
  );
  await userEvent.click(getByRole("button", { name: "更新" }));
};

export const Default: Story = {};

export const SucceedSubmit: Story = {
  decorators: [SetUidDecorator],
  name: "成功した場合",
  parameters: {
    msw: {
      handlers: [postProfileHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await validSubmit(canvas);
  },
};

export const Unauthorized: Story = {
  decorators: [DeleteUidDecorator],
  name: "未ログイン時",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await validSubmit(canvas);
  },
};

export const Error: Story = {
  decorators: [SetUidDecorator],
  name: "エラーが返ってきたとき",
  parameters: {
    msw: {
      handlers: [
        postProfileHandler({
          error: {
            message: "無効なリクエストです",
            status: 400,
          },
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await validSubmit(canvas);
  },
};

export const NetworkError: Story = {
  decorators: [SetUidDecorator],
  name: "ネットワークエラーが返ってきたとき",
  parameters: {
    msw: {
      handlers: [
        postProfileHandler({
          isNetworkError: true,
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await validSubmit(canvas);
  },
};

export default {
  args: {
    address: "東京",
    birthday: new Date(1999, 10, 9),
    hashtags: [{ name: "採掘" }],
    hobbies: [{ name: "マイニング" }],
    imageUrl: null,
    message: "こんにちは",
    name: "hoge",
    sex: "man",
  },
  component: Profile,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  title: "Features/profile/Profile",
} satisfies Meta<T>;

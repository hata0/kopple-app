import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { SignInForm } from ".";

type T = typeof SignInForm;
type Story = StoryObj<T>;

const user = userEvent.setup();

export const Default: Story = {};

export const EmptySubmit: Story = {
  name: "空のまま送信した場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.click(canvas.getByRole("button", { name: "ログイン" }));
  },
};

export const InvalidInput: Story = {
  name: "無効な入力の場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.type(canvas.getByRole("textbox", { name: "メールアドレス" }), "Invalid Input");
    await user.click(canvas.getByRole("button", { name: "ログイン" }));
  },
};

export default {
  component: SignInForm,
  title: "Features/sign-in/SignInForm",
} satisfies Meta<T>;

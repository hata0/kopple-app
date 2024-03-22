import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";

import { SignInForm } from ".";

type T = typeof SignInForm;
type Story = StoryObj<T>;

export const Default: Story = {};

export const EmptySubmit: Story = {
  name: "空のまま送信した場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "ログイン" }));
  },
};

export const InvalidInput: Story = {
  name: "無効な入力の場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox", { name: "メールアドレス" }), "Invalid Input");
    await userEvent.click(canvas.getByRole("button", { name: "ログイン" }));
  },
};

export const ValidInput: Story = {
  name: "有効な入力の場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "メールアドレス" }),
      "email@example.com",
    );
    await userEvent.type(canvas.getByLabelText("パスワード"), "password1");
    await userEvent.click(canvas.getByRole("button", { name: "ログイン" }));
  },
};

export default {
  args: {
    onSubmit: fn(),
  },
  component: SignInForm,
  title: "Features/sign-in/SignInForm",
} satisfies Meta<T>;

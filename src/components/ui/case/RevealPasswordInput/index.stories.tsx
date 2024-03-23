import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { RevealPasswordInput } from ".";

import { Input } from "@/components/shadcn/ui/input";

type T = typeof RevealPasswordInput;
type Story = StoryObj<T>;

export const Default: Story = {};

export const ShowPassword: Story = {
  name: "パスワードを表示する",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "パスワードを表示" }));
  },
};

export const HidePassword: Story = {
  args: {
    isPasswordShown: true,
    render: (inputProps) => <Input {...inputProps} />,
  },
  name: "パスワードを隠す",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "パスワードを隠す" }));
  },
};

export default {
  args: {
    render: (inputProps) => <Input {...inputProps} />,
  },
  component: RevealPasswordInput,
} satisfies Meta<T>;

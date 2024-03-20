import { Meta, StoryObj } from "@storybook/react";

import { SignInForm } from ".";

type T = typeof SignInForm;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  component: SignInForm,
} satisfies Meta<T>;

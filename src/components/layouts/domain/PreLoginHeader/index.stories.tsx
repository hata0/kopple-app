import { Meta, StoryObj } from "@storybook/react";

import { PreLoginHeader } from ".";

type T = typeof PreLoginHeader;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  component: PreLoginHeader,
} satisfies Meta<T>;

import { Meta, StoryObj } from "@storybook/react";

import { Custom500 } from ".";

type T = typeof Custom500;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  component: Custom500,
  title: "Features/error/Custom500",
} satisfies Meta<T>;

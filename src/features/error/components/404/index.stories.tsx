import { Meta, StoryObj } from "@storybook/react";

import { Custom404 } from ".";

type T = typeof Custom404;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  component: Custom404,
  title: "Features/error/Custom404",
} satisfies Meta<T>;

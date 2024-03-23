import { Meta, StoryObj } from "@storybook/react";

import { FormHeading } from ".";

type T = typeof FormHeading;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    children: "ヘッダー",
  },
  component: FormHeading,
} satisfies Meta<T>;

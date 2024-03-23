import { Meta, StoryObj } from "@storybook/react";

import { FormLegend } from ".";

type T = typeof FormLegend;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    children: "グループのキャプション",
  },
  component: FormLegend,
} satisfies Meta<T>;

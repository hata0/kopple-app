import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { BirthdayPicker } from ".";

type T = typeof BirthdayPicker;
type Story = StoryObj<T>;

export const Default: Story = {};

export const HasValue: Story = {
  args: {
    onChange: fn(),
    render: (children) => children,
    value: new Date(2020, 1, 2),
  },
  name: "valueがあるとき",
};

export default {
  args: {
    onChange: fn(),
    render: (children) => children,
  },
  component: BirthdayPicker,
  title: "Features/profile/BirthdayPicker",
} satisfies Meta<T>;

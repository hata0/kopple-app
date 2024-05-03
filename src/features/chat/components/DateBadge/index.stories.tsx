import { Meta, StoryObj } from "@storybook/react";
import MockDate from "mockdate";

import { DateBadge } from ".";

type T = typeof DateBadge;
type Story = StoryObj<T>;

MockDate.set(new Date(2024, 4, 2, 10, 12, 30));

export const Today: Story = {
  args: {
    date: new Date(),
  },
  name: "今日",
};

export const Yesterday: Story = {
  args: {
    date: new Date(2024, 4, 1, 10, 12, 30),
  },
  name: "昨日",
};

export const ThisYear: Story = {
  args: {
    date: new Date(2024, 0, 3, 10, 12, 30),
  },
  name: "今年",
};

export const BeforeThisYear: Story = {
  args: {
    date: new Date(2023, 11, 3, 10, 12, 30),
  },
  name: "今年以前",
};

export default {
  component: DateBadge,
  title: "Features/chat/DateBadge",
} satisfies Meta<T>;

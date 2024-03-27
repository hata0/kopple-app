import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { DropdownCalendar } from ".";

type T = typeof DropdownCalendar;
type Story = StoryObj<T>;

export const Default: Story = {
  name: "2000 ~ 2025",
};

export const Month: Story = {
  args: {
    date: {
      from: {
        month: 5,
        year: 2000,
      },
      to: {
        month: 2,
        year: 2025,
      },
    },
  },
  name: "2000/5/1 ~ 2025/2/28",
};

export const Date: Story = {
  args: {
    date: {
      from: {
        date: 20,
        month: 5,
        year: 2000,
      },
      to: {
        date: 12,
        month: 2,
        year: 2025,
      },
    },
  },
  name: "2000/5/20 ~ 2025/2/12",
};

export const PickDate: Story = {
  args: {
    date: {
      from: {
        year: 2000,
      },
      to: {
        year: 2025,
      },
    },
    mode: "single",
    onSelect: fn(),
  },
  name: "任意の日付を選択した場合",
};

export default {
  args: {
    date: {
      from: {
        year: 2000,
      },
      to: {
        year: 2025,
      },
    },
  },
  component: DropdownCalendar,
} satisfies Meta<T>;

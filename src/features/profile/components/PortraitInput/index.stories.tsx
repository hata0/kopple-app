import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { PortraitInput } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";

type T = typeof PortraitInput;
type Story = StoryObj<T>;

export const Default: Story = {};

export const HasImageUrl: Story = {
  args: {
    imageUrl: "/portrait/2.jpg",
    render: (children) => children,
    setValue: fn(),
    value: undefined,
  },
  name: "初期値に画像が設定されているとき",
};

export default {
  args: {
    imageUrl: null,
    render: (children) => children,
    setValue: fn(),
    value: undefined,
  },
  component: PortraitInput,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  title: "Features/profile/PortraitInput",
} satisfies Meta<T>;

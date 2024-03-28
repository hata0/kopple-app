import { Meta, StoryObj } from "@storybook/react";

import { TagInput } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";

type T = typeof TagInput;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  component: TagInput,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<T>;

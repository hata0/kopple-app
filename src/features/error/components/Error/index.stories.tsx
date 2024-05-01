import { Meta, StoryObj } from "@storybook/react";

import { Error } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";

type T = typeof Error;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Error401: Story = {
  args: {
    status: 401,
  },
};

export default {
  component: Error,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  title: "Features/error/Error",
} satisfies Meta<T>;

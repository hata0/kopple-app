import { Meta, StoryObj } from "@storybook/react";

import { ProfileForm } from ".";

type T = typeof ProfileForm;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    hashtags: [],
    hobbies: [],
  },
  component: ProfileForm,
  title: "Features/profile/ProfileForm",
} satisfies Meta<T>;

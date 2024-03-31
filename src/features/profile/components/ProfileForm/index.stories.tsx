import { Meta, StoryObj } from "@storybook/react";

import { ProfileForm } from ".";

type T = typeof ProfileForm;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    address: "",
    age: 20,
    birthday: null,
    hashtags: [],
    hobbies: [],
    message: "",
    name: "bob",
    sex: "man",
  },
  component: ProfileForm,
  title: "Features/profile/ProfileForm",
} satisfies Meta<T>;

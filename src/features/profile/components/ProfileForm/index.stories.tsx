import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ProfileForm } from ".";

type T = typeof ProfileForm;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    onSubmit: fn(),
    profileContent: {
      address: "",
      age: 20,
      birthday: null,
      hashtags: [],
      hobbies: [],
      imageUrl: "/portrait/1.jpg",
      message: "",
      name: "bob",
      sex: "man",
    },
  },
  component: ProfileForm,
  title: "Features/profile/ProfileForm",
} satisfies Meta<T>;

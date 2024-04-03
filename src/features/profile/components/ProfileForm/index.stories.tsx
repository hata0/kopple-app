import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ProfileForm } from ".";

type T = typeof ProfileForm;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    onSubmit: fn(),
    profileContent: {
      address: "",
      age: 20,
      birthday: null,
      hashtags: [],
      hobbies: [],
      imageUrl: null,
      message: "",
      name: "bob",
      sex: "man",
    },
  },
  name: "空を含む時",
};

export default {
  args: {
    onSubmit: fn(),
    profileContent: {
      address: "大阪",
      age: 20,
      birthday: new Date(1999, 4, 9),
      hashtags: [{ name: "魚" }, { name: "海" }],
      hobbies: [{ name: "釣り" }],
      imageUrl: "/portrait/2.jpg",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eligendi eos quam unde tempora qui, consequuntur provident ea labore doloribus ipsum praesentium dolorum,\n saepe quibusdam iure aperiam pariatur vitae alias.",
      name: "bob",
      sex: "man",
    },
  },
  component: ProfileForm,
  title: "Features/profile/ProfileForm",
} satisfies Meta<T>;

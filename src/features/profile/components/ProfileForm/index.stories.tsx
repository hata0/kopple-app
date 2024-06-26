import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";

import { ProfileForm } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";

type T = typeof ProfileForm;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    onSubmit: fn(),
    profileContent: {
      address: "",
      birthday: new Date(1999, 4, 9),
      hashtags: [],
      hobbies: [],
      imageUrl: "/portrait/2.jpg",
      message: "",
      name: "bob",
      sex: "man",
    },
  },
  name: "初期値が空の時",
};

export const EmptySubmit: Story = {
  args: {
    onSubmit: fn(),
    profileContent: {
      address: "",
      birthday: new Date(1999, 4, 9),
      hashtags: [],
      hobbies: [],
      imageUrl: "/portrait/2.jpg",
      message: "",
      name: "",
      sex: "man",
    },
  },
  name: "空のまま送信したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "更新" }));
  },
};

export default {
  args: {
    onSubmit: fn(),
    profileContent: {
      address: "大阪",
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
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  title: "Features/profile/ProfileForm",
} satisfies Meta<T>;

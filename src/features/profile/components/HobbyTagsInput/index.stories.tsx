import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { UseFieldArrayReturn } from "react-hook-form";

import { HobbyTagsInput } from ".";

import { ProfileFormInput } from "@/services/backend/profiles/[id]/type";

type T = typeof HobbyTagsInput;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    hobbyFields: {
      append: fn(),
      remove: fn(),
      swap: fn(),
    } as unknown as UseFieldArrayReturn<ProfileFormInput, "hobbies", "id">,
    render: (children) => children,
    value: [{ name: "apple" }, { name: "melon" }],
  },
  component: HobbyTagsInput,
  title: "Features/profile/HobbyTagsInput",
} satisfies Meta<T>;

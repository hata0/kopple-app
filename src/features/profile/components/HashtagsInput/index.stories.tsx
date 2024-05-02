import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { UseFieldArrayReturn } from "react-hook-form";

import { HashtagsInput } from ".";

import { ProfileFormInput } from "@/services/backend/profiles/[id]/type";

type T = typeof HashtagsInput;
type Story = StoryObj<T>;

export const Default: Story = {};

export default {
  args: {
    hashtagFields: {
      append: fn(),
      remove: fn(),
      swap: fn(),
    } as unknown as UseFieldArrayReturn<ProfileFormInput, "hashtags", "id">,
    render: (children) => children,
    value: [{ name: "apple" }, { name: "melon" }],
  },
  component: HashtagsInput,
  title: "Features/profile/HashtagsInput",
} satisfies Meta<T>;

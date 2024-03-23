import { Meta, StoryObj } from "@storybook/react";

import { NavLinkButton } from ".";

type T = typeof NavLinkButton;
type Story = StoryObj<T>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    children: "リンク",
    href: "/",
    pathname: "/",
  },
  name: "リンクがカレントの場合",
};

export default {
  args: {
    children: "リンク",
    href: "/",
    pathname: "path",
  },
  component: NavLinkButton,
} satisfies Meta<T>;

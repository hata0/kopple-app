import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";

import { Tag } from ".";

type T = typeof Tag;
type Story = StoryObj<T>;

const tagName = "tag name";

export const Default: Story = {};

export const DeleteClick: Story = {
  name: "削除ボタンをクリックした時",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: `「${tagName}」を削除` }));
  },
};

export default {
  args: {
    name: tagName,
    onDeleteTag: fn(),
  },
  component: Tag,
} satisfies Meta<T>;

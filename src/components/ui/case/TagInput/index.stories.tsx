import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { TagInput } from ".";

import { Toaster } from "@/components/shadcn/ui/toaster";

type T = typeof TagInput;
type Story = StoryObj<T>;

export const Default: Story = {};

export const AddTag: Story = {
  name: "タグを作成する場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "tag name");
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));
  },
};

export const AddSameTag: Story = {
  args: {
    tags: [{ id: crypto.randomUUID(), name: "tag name" }],
  },
  name: "同じタグ名で作成する場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "tag name");
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));
  },
};

export const DeleteTag: Story = {
  args: {
    tags: [{ id: crypto.randomUUID(), name: "tag name" }],
  },
  name: "タグを削除する場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: `「${DeleteTag.args!.tags![0].name}」を削除` }),
    );
  },
};

export default {
  args: {
    tags: [],
  },
  component: TagInput,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<T>;
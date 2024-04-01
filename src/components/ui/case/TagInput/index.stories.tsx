import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";

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
    onAddTag: fn(),
    onDeleteTag: fn(),
    onDragEnd: fn(),
    tags: [{ name: "tag name" }],
  },
  name: "同じタグ名で作成する場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "tag name");
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));
  },
};

export const DisableSameNameError: Story = {
  args: {
    disableSameNameError: true,
    onAddTag: fn(),
    onDeleteTag: fn(),
    onDragEnd: fn(),
    tags: [{ name: "tag name" }],
  },
  name: "DisableSameNameErrorを設定したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "tag name");
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));
  },
};

export const DeleteTag: Story = {
  args: {
    onAddTag: fn(),
    onDeleteTag: fn(),
    onDragEnd: fn(),
    tags: [{ name: "tag name" }],
  },
  name: "タグを削除する場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: `「${DeleteTag.args!.tags![0].name}」を削除` }),
    );
  },
};

export const OptionalInput: Story = {
  args: {
    onAddTag: fn(),
    onDeleteTag: fn(),
    onDragEnd: fn(),
    render: () => <div data-testid="test">Test</div>,
    tags: [],
  },
  name: "任意のInputを使う場合",
};

export default {
  args: {
    onAddTag: fn(),
    onDeleteTag: fn(),
    onDragEnd: fn(),
    render: fn().mockReturnValue(undefined),
    tags: [{ name: "tag1" }, { name: "tag2" }, { name: "tag3" }, { name: "tag4" }],
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

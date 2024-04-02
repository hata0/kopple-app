import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";

import { DroppableFileInput } from ".";

type T = typeof DroppableFileInput;
type Story = StoryObj<T>;

export const Default: Story = {};

export const SelectFile: Story = {
  name: "ファイルを選択したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.upload(
      canvas.getByTestId("drop-input"),
      new File(["hello"], "hello.png", { type: "image/png" }),
    );
  },
};

export const Mock = {
  args: {
    className: fn(),
    dropOptions: {
      onDrop: fn(),
    },
    render: fn(),
  },
};

export default {
  args: {
    className: fn(),
    dropOptions: {
      onDrop: fn(),
    },
    render: () => {
      return <div>ファイルをドラッグまたは選択</div>;
    },
  },
  component: DroppableFileInput,
} satisfies Meta<T>;

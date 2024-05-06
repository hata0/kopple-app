import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";

import { ChatForm } from ".";

type T = typeof ChatForm;
type Story = StoryObj<T>;

const textareaLabel = "メッセージを入力";
const buttonLabel = "送信";
const validSubmit = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByRole("textbox", { name: textareaLabel }), "こんにちは");
  await userEvent.click(canvas.getByRole("button", { name: buttonLabel }));
};

export const Default: Story = {};

export const ValidSubmit: Story = {
  name: "有効な値の場合",
  play: async ({ canvasElement }) => {
    await validSubmit(canvasElement);
  },
};

export const EmptySubmit: Story = {
  name: "空のまま送信したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: buttonLabel }));
  },
};

export const CtrlValidSubmit: Story = {
  name: "有効な値でctrl + enter を入力したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: textareaLabel }));
    await userEvent.keyboard("こんにちは{Control>}{Enter}{/Control}");
  },
};

export const CtrlEmptySubmit: Story = {
  name: "空のままctrl + enter を入力したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: textareaLabel }));
    await userEvent.keyboard("{Control>}{Enter}{/Control}");
  },
};

export const MetaSucceedSubmit: Story = {
  name: "有効な値でmeta + enter を入力したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: textareaLabel }));
    await userEvent.keyboard("こんにちは{Meta>}{Enter}{/Meta}");
  },
};

export const MetaEmptySubmit: Story = {
  name: "空のままmeta + enter を入力したとき",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: textareaLabel }));
    await userEvent.keyboard("{Meta>}{Enter}{/Meta}");
  },
};

export default {
  args: {
    onSubmit: fn(),
  },
  component: ChatForm,
  title: "Features/chat/ChatForm",
} satisfies Meta<T>;

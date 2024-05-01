import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import MockDate from "mockdate";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import * as stories from "./index.stories";

const { Default, Empty, EmptySubmit } = composeStories(stories);

window.URL.createObjectURL = jest.fn().mockReturnValue("blob:hello");
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();

describe("ProfileForm", () => {
  it("空のまま送信したとき、エラーが表示され、onSubmitが実行されない", async () => {
    const { container } = render(<EmptySubmit />);
    await act(async () => {
      await EmptySubmit.play?.({ canvasElement: container });
    });
    expect(screen.getByRole("textbox", { name: "名前" })).toHaveAccessibleDescription(
      "名前を入力してください。",
    );
    expect(EmptySubmit.args.onSubmit).not.toHaveBeenCalled();
  });

  it("有効な入力の場合、onSubmitが実行される", async () => {
    MockDate.set(new Date(2024, 3, 10, 1, 0, 0));
    render(<Empty />);
    await userEvent.clear(screen.getByRole("textbox", { name: "名前" }));
    await userEvent.type(screen.getByRole("textbox", { name: "名前" }), "fish");
    await userEvent.click(screen.getByRole("combobox", { name: "性別" }));
    await userEvent.click(screen.getByRole("option", { name: "女性" }));
    await userEvent.type(screen.getByRole("textbox", { name: "住所" }), "大阪");
    await userEvent.click(screen.getByRole("button", { name: "誕生日" }));
    await userEvent.click(
      screen.getAllByRole("gridcell", { name: "1" }).find((elm) => {
        return !elm.classList.contains("day-outside");
      })!,
    );
    await userEvent.upload(
      screen.getByTestId("drop-input"),
      new File(["hello"], "hello.png", { type: "image/png" }),
    );
    await userEvent.type(screen.getByRole("textbox", { name: "自己紹介" }), "こんにちは");
    await userEvent.type(screen.getByRole("textbox", { name: "ハッシュタグ" }), "釣り");
    await userEvent.click(screen.getByRole("button", { name: "ハッシュタグを追加" }));
    await userEvent.type(screen.getByRole("textbox", { name: "趣味" }), "釣り");
    await userEvent.click(screen.getByRole("button", { name: "趣味を追加" }));
    await userEvent.click(screen.getByRole("button", { name: "更新" }));
    expect(Empty.args.onSubmit).toHaveBeenLastCalledWith(
      {
        address: "大阪",
        birthday: new Date(2024, 3, 1),
        hashtags: [{ name: "釣り" }],
        hobbies: [{ name: "釣り" }],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        image: expect.any(File),
        message: "こんにちは",
        name: "fish",
        sex: "woman",
      },
      expect.any(Object),
    );
    MockDate.reset();
  }, 20000);

  it("キャンセルをクリックした時、ダッシュボードページへ遷移", async () => {
    render(<Default />, {
      wrapper: MemoryRouterProvider,
    });
    await userEvent.click(screen.getByRole("link", { name: "キャンセル" }));
    expect(mockRouter.asPath).toBe("/dashboard");
  });
});

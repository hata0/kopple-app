import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import * as stories from "./index.stories";

const { Default, EmptySubmit, InvalidInput, ValidInput } = composeStories(stories);
const user = userEvent.setup();

describe("SignInForm", () => {
  it("空のまま送信した場合、エラーが表示", async () => {
    const { container } = render(<EmptySubmit />);
    await act(async () => {
      await EmptySubmit.play?.({ canvasElement: container });
    });
    expect(
      await screen.findByRole("textbox", { name: "メールアドレス" }),
    ).toHaveAccessibleDescription("メールアドレスの形式が不正です。");
    expect(await screen.findByText("パスワードを入力してください。")).toBeInTheDocument();
  });

  it("無効な入力の場合、エラーが表示", async () => {
    const { container } = render(<InvalidInput />);
    await act(async () => {
      await InvalidInput.play?.({ canvasElement: container });
    });
    expect(
      await screen.findByRole("textbox", { name: "メールアドレス" }),
    ).toHaveAccessibleDescription("メールアドレスの形式が不正です。");
    expect(await screen.findByText("パスワードを入力してください。")).toBeInTheDocument();
  });

  it("有効な入力の場合、エラーが非表示かつonSubmitが実行される", async () => {
    const { container } = render(<ValidInput />);
    await act(async () => {
      await ValidInput.play?.({ canvasElement: container });
    });
    expect(
      await screen.findByRole("textbox", { name: "メールアドレス" }),
    ).not.toHaveAccessibleDescription("メールアドレスの形式が不正です。");
    expect(screen.queryByText("パスワードを入力してください。")).not.toBeInTheDocument();
    expect(ValidInput.args.onSubmit).toHaveBeenCalled();
  });

  it("新規登録ページへ遷移するボタンをクリックした時、新規登録ページへ遷移している", async () => {
    render(<Default />, { wrapper: MemoryRouterProvider });
    await user.click(screen.getByRole("link", { name: "新規登録" }));
    expect(mockRouter.asPath).toBe("/sign-up");
  });
});

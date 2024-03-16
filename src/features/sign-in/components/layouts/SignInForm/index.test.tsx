import { render, screen } from "@testing-library/react";
// eslint-disable-next-line import/no-named-as-default
import userEvent from "@testing-library/user-event";

import { SignInForm } from ".";

describe("SignInForm", () => {
  const user = userEvent.setup();
  describe("バリデーション", () => {
    render(<SignInForm />);

    test("メールアドレスでないとき、エラーが表示", async () => {
      await user.type(screen.getByRole("textbox", { name: "メールアドレス" }), "invalid value");
      await user.click(screen.getByRole("button", { name: "ログイン" }));
      expect(screen.getByText("メールアドレスの形式が不正です。")).toBeInTheDocument();
    });
  });
});

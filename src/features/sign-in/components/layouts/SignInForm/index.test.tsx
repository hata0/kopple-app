import { render, screen } from "@testing-library/react";
// eslint-disable-next-line import/no-named-as-default
import userEvent from "@testing-library/user-event";

import { SignInForm } from ".";

const user = userEvent.setup();

describe("SignInForm", () => {
  describe("バリデーション", () => {
    const email = () => screen.getByRole("textbox", { name: "メールアドレス" });
    const password = () => screen.getByLabelText("パスワード");
    const emailError = () => screen.queryByText("メールアドレスの形式が不正です。");
    const passwordError = () => screen.queryByText("パスワードを入力してください。");
    const clickSubmit = async () => {
      await user.click(screen.getByRole("button", { name: "ログイン" }));
    };

    describe("無効な入力のとき、該当エラーが表示される", () => {
      it("メールアドレスの形式が不正なとき", async () => {
        render(<SignInForm />);
        await user.type(email(), "invalid value");
        await clickSubmit();
        expect(emailError()).toBeInTheDocument();
      });

      it("パスワードが入力されていないとき", async () => {
        render(<SignInForm />);
        await clickSubmit();
        expect(passwordError()).toBeInTheDocument();
      });
    });

    describe("有効な入力のとき、該当エラーは表示されない", () => {
      it("メールアドレスであるとき", async () => {
        render(<SignInForm />);
        await user.type(email(), "email@example.com");
        await clickSubmit();
        expect(emailError()).toBeNull();
      });

      it("パスワードであるとき", async () => {
        render(<SignInForm />);
        await user.type(password(), "password1");
        await clickSubmit();
        expect(passwordError()).toBeNull();
      });
    });
  });
});

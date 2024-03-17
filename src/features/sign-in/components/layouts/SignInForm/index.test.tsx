import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as firebaseAuth from "firebase/auth";
import { http, HttpResponse } from "msw";

import { SignInForm } from ".";

import { API_ROUTE_URL } from "@/constants/apiRouteUrl";
import { setupMockServer } from "@/tests/setupMockServer";

jest.mock("firebase/auth");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signInWithEmailAndPasswordMock = jest.spyOn<any, any>(
  firebaseAuth,
  "signInWithEmailAndPassword",
);

const user = userEvent.setup();
const server = setupMockServer(
  http.get(`${API_ROUTE_URL}/session`, () => {
    return HttpResponse.json({
      message: "セッションを作成しました",
    });
  }),
);

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
        expect(emailError()).not.toBeInTheDocument();
      });

      it("パスワードであるとき", async () => {
        render(<SignInForm />);
        await user.type(password(), "password1");
        await clickSubmit();
        expect(passwordError()).not.toBeInTheDocument();
      });
    });
  });

  describe("正しい入力値でonSubmitが実行された時", () => {
    beforeEach(() => {
      signInWithEmailAndPasswordMock.mockReset().mockResolvedValue({
        user: {
          getIdToken: jest.fn().mockResolvedValue("id-token"),
        },
      });
    });

    const renderAndValidSubmit = async () => {
      render(<SignInForm />);
      await user.type(screen.getByRole("textbox", { name: "メールアドレス" }), "email@example.com");
      await user.type(screen.getByLabelText("パスワード"), "password1");
      await user.click(screen.getByRole("button", { name: "ログイン" }));
    };

    it("signInWithEmailAndPasswordがエラーを返したとき、認証に失敗したことを知らせる", async () => {
      signInWithEmailAndPasswordMock.mockRejectedValueOnce(new Error());

      await renderAndValidSubmit();

      expect(
        screen.getByText("認証に失敗しました。もう一度入力してください。"),
      ).toBeInTheDocument();
    });

    it("sessionを作成するクエリがエラーを返したとき、認証に失敗したことを知らせる", async () => {
      server.use(
        http.get(`${API_ROUTE_URL}/session`, () => {
          return HttpResponse.json({ error: "セッションの作成に失敗しました。" }, { status: 401 });
        }),
      );

      await renderAndValidSubmit();

      expect(
        screen.getByText("認証に失敗しました。もう一度入力してください。"),
      ).toBeInTheDocument();
    });
  });
});

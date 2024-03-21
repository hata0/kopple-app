import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

// jest.mock("firebase/auth");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const signInWithEmailAndPasswordMock = jest.spyOn<any, any>(
//   firebaseAuth,
//   "signInWithEmailAndPassword",
// );

// const user = userEvent.setup();
// const server = setupMockServer(getSessionHandler());

// beforeEach(() => {
//   Object.defineProperty(global.document, "cookie", {
//     configurable: true,
//     value: "",
//     writable: true,
//   });
// });

const { EmptySubmit, InvalidInput } = composeStories(stories);

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

  // describe("正しい入力値でonSubmitが実行された時", () => {
  //   const uid = "uid";

  //   beforeEach(() => {
  //     signInWithEmailAndPasswordMock.mockReset().mockResolvedValue({
  //       user: {
  //         getIdToken: jest.fn().mockResolvedValue("id-token"),
  //         uid,
  //       },
  //     });
  //   });

  //   const validSubmit = async () => {
  //     await user.type(email(), "email@example.com");
  //     await user.type(password(), "password1");
  //     await clickSubmit();
  //   };

  //   it("バリデーションエラーは表示されない", async () => {
  //     render(<SignInForm />);
  //     await validSubmit();
  //     expect(emailError()).not.toBeInTheDocument();
  //     expect(passwordError()).not.toBeInTheDocument();
  //   });

  //   it("signInWithEmailAndPasswordがエラーを返したとき、認証に失敗したことを知らせる", async () => {
  //     signInWithEmailAndPasswordMock.mockRejectedValueOnce(new Error());
  //     render(<SignInForm />);
  //     await validSubmit();
  //     expect(
  //       view.getByText("認証に失敗しました。もう一度入力してください。"),
  //     ).toBeInTheDocument();
  //   });

  //   it("sessionを作成するするクエリがネットワークエラーを出したとき、認証に失敗したことを知らせる", async () => {
  //     server.use(getSessionHandler({ isNetworkError: true }));
  //     render(<SignInForm />);
  //     await validSubmit();
  //     expect(
  //       view.getByText("認証に失敗しました。もう一度入力してください。"),
  //     ).toBeInTheDocument();
  //   });

  //   it("sessionを作成するクエリのレスポンスが ok でないとき、認証に失敗したことを知らせる", async () => {
  //     server.use(
  //       getSessionHandler({
  //         error: {
  //           message: "セッションの作成に失敗しました。",
  //           status: 401,
  //         },
  //       }),
  //     );
  //     render(<SignInForm />);
  //     await validSubmit();
  //     expect(
  //       view.getByText("認証に失敗しました。もう一度入力してください。"),
  //     ).toBeInTheDocument();
  //   });

  //   describe("認証とセッションクッキーの作成に成功したとき", () => {
  //     it("uidのクッキーが正しく作成される", async () => {
  //       render(<SignInForm />);
  //       await validSubmit();
  //       expect(document.cookie).toContain(`uid=${uid}`);
  //     });

  //     it("ログインに成功したと表示される", async () => {
  //       render(
  //         <>
  //           <SignInForm />
  //           <Toaster />
  //         </>,
  //       );
  //       await validSubmit();
  //       expect(view.getByText("ログインに成功しました")).toBeInTheDocument();
  //     });

  //     it("ダッシュボードページへ遷移している", async () => {
  //       render(<SignInForm />);
  //       await validSubmit();
  //       expect(mockRouter.asPath).toBe("/dashboard");
  //     });
  //   });
  // });

  // it("新規登録ページへ遷移するボタンをクリックした時、新規登録ページへ遷移している", async () => {
  //   render(<SignInForm />, { wrapper: MemoryRouterProvider });
  //   await user.click(view.getByRole("link", { name: "新規登録" }));
  //   expect(mockRouter.asPath).toBe("/sign-up");
  // });
});

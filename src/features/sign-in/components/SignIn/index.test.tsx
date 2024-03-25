import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as firebaseAuth from "firebase/auth";
import { type UserCredential } from "firebase/auth";
import mockRouter from "next-router-mock";
import { act } from "react-dom/test-utils";

import * as stories from "./index.stories";

import { getSessionHandler } from "@/features/sign-in/services/api/session/mock";
import { defineMockCookie } from "@/tests/defineMockCookie";
import { uidCookieMock } from "@/tests/mocks/mockCookies";
import { serializeCookie } from "@/tests/serializeCookie";
import { setupMockServer } from "@/tests/setupMockServer";

const { ServerError, SucceedSubmit } = composeStories(stories);
const server = setupMockServer();
const idToken = "id-token";

jest.mock("firebase/auth");
const authMock = jest.spyOn(firebaseAuth, "signInWithEmailAndPassword");
beforeEach(() => {
  authMock.mockReset().mockResolvedValue({
    user: {
      getIdToken: jest.fn().mockResolvedValue(idToken),
      uid: uidCookieMock.value,
    },
  } as unknown as UserCredential);
});

beforeEach(() => {
  defineMockCookie();
});

const authError = () => screen.findByText("認証に失敗しました。もう一度入力してください。");

describe("SignIn", () => {
  it("signInWithEmailAndPasswordがエラーを返したとき、認証に失敗したことを知らせる", async () => {
    authMock.mockRejectedValueOnce(new Error());
    const { container } = render(<ServerError />);
    await act(async () => {
      await ServerError.play?.({ canvasElement: container });
    });
    expect(await authError()).toBeInTheDocument();
  });

  it("sessionを作成するするクエリがネットワークエラーを出したとき、認証に失敗したことを知らせる", async () => {
    server.use(
      getSessionHandler({
        isNetworkError: true,
      }),
    );
    const { container } = render(<ServerError />);
    await act(async () => {
      await ServerError.play?.({ canvasElement: container });
    });
    expect(await authError()).toBeInTheDocument();
  });

  it("sessionを作成するクエリのレスポンスが ok でないとき、認証に失敗したことを知らせる", async () => {
    server.use(
      getSessionHandler({
        error: {
          message: "セッションの作成に失敗しました。",
          status: 401,
        },
      }),
    );
    const { container } = render(<ServerError />);
    await act(async () => {
      await ServerError.play?.({ canvasElement: container });
    });
    expect(await authError()).toBeInTheDocument();
  });

  it("成功時、クッキーが作成してから認証の成功を知らせたのち、ページ遷移する", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    server.use(...SucceedSubmit.parameters.msw.handlers);
    const { container } = render(<SucceedSubmit />);
    await act(async () => {
      await SucceedSubmit.play?.({ canvasElement: container });
    });
    expect(document.cookie).toContain(serializeCookie(uidCookieMock));
    expect(screen.getByText("ログインに成功しました")).toBeInTheDocument();
    expect(mockRouter.asPath).toBe("/dashboard");
  });
});

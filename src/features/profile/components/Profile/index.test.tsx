/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

import { defineMockCookie } from "@/tests/utils/defineMockCookie";
import { setupMockServer } from "@/tests/utils/setupMockServer";

const { Error, NetworkError, SucceedSubmit, Unauthorized } = composeStories(stories);
const server = setupMockServer();

window.URL.createObjectURL = jest.fn().mockReturnValue("blob:hello");

beforeEach(() => {
  defineMockCookie();
});

describe("Profile", () => {
  it("更新に成功した場合、成功したことを知らせる", async () => {
    server.use(...SucceedSubmit.parameters.msw.handlers);
    const { container } = render(<SucceedSubmit />);
    await act(async () => {
      await SucceedSubmit.play?.({ canvasElement: container });
    });
    expect(await screen.findByText("プロフィールを更新しました。")).toBeInTheDocument();
  });

  it("未ログイン時、ログインしていないことを知らせる", async () => {
    const { container } = render(<Unauthorized />);
    await act(async () => {
      await SucceedSubmit.play?.({ canvasElement: container });
    });
    expect(screen.getByText("ログインできていません")).toBeInTheDocument();
  });

  it("エラー時、更新に失敗したことを知らせる", async () => {
    server.use(...Error.parameters.msw.handlers);
    const { container } = render(<Error />);
    await act(async () => {
      await Error.play?.({ canvasElement: container });
    });
    expect(screen.getByText("プロフィールの更新に失敗しました。")).toBeInTheDocument();
  });

  it("ネットワークエラー時、サーバー側でエラーが発生したことを知らせる", async () => {
    server.use(...NetworkError.parameters.msw.handlers);
    const { container } = render(<NetworkError />);
    await act(async () => {
      await NetworkError.play?.({ canvasElement: container });
    });
    expect(screen.getByText("サーバー側で問題が発生しました。")).toBeInTheDocument();
  });
});

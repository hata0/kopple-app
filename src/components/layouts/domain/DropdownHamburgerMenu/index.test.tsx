/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import * as stories from "./index.stories";

import { setupMockServer } from "@/tests/utils/setupMockServer";

const { Default, Error, NetworkError, Success } = composeStories(stories);
const server = setupMockServer();

describe("DropdownHamburgerMenu", () => {
  it("プロフィールを編集をクリックした時、プロフィールページへ移動", async () => {
    render(<Default />, { wrapper: MemoryRouterProvider });
    await userEvent.click(screen.getByRole("button", { name: "メニューを表示" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "プロフィールを編集" }));
    expect(mockRouter.asPath).toBe("/profile");
  });

  describe("ログアウトをクリックした時", () => {
    const clickLogout = async () => {
      await userEvent.click(screen.getByRole("button", { name: "メニューを表示" }));
      await userEvent.click(screen.getByRole("menuitem", { name: "ログアウト" }));
    };

    it("ネットワークエラー時、失敗を知らせる", async () => {
      server.use(...NetworkError.parameters.msw.handlers);
      render(<NetworkError />);
      await clickLogout();
      expect(screen.getByText("ログアウトに失敗しました。")).toBeInTheDocument();
    });

    it("エラーの時、失敗を知らせる", async () => {
      server.use(...Error.parameters.msw.handlers);
      render(<Error />);
      await clickLogout();
      expect(screen.getByText("ログアウトに失敗しました。")).toBeInTheDocument();
    });

    it("成功した時、成功を知らせて、トップページへ移動", async () => {
      mockRouter.setCurrentUrl("/dashboard");
      server.use(...Success.parameters.msw.handlers);
      render(<Success />);
      await clickLogout();
      expect(screen.getByText("ログアウトしました。")).toBeInTheDocument();
      expect(mockRouter.asPath).toBe("/");
    });
  });
});

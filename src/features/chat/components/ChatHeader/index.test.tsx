import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import * as stories from "./index.stories";

const { Default } = composeStories(stories);

describe("ChatHeader", () => {
  it("戻るボタンをクリックしたとき、チャットリストへ遷移", async () => {
    render(<Default />, { wrapper: MemoryRouterProvider });
    await userEvent.click(screen.getByRole("link", { name: "チャットリストへ" }));
    expect(mockRouter.asPath).toBe("/chats");
  });

  it("名前を受け取ったデータから表示できる", () => {
    mockRouter.query = { id: "id" };
    render(<Default />);
    expect(screen.getByText("山本 さくら")).toBeInTheDocument();
  });
});

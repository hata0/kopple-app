import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import * as stories from "./index.stories";

const { Default } = composeStories(stories);

describe("Custom404", () => {
  it("トップページへのリンクをクリックした時、トップページへ遷移", async () => {
    mockRouter.setCurrentUrl("/dashboard");
    render(<Default />, { wrapper: MemoryRouterProvider });
    await userEvent.click(screen.getByRole("link", { name: "トップページへ" }));
    expect(mockRouter.asPath).toBe("/");
  });
});

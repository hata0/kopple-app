import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

import * as stories from "./index.stories";

import { defineMockCookie } from "@/tests/defineMockCookie";

const { Default, HasSession } = composeStories(stories);
beforeEach(() => {
  defineMockCookie();
});

describe("PreLoginHeader", () => {
  it("トップページでトップページへのリンクが強調され、カレントになっている", () => {
    mockRouter.setCurrentUrl("/");
    render(<Default />);
    expect(screen.getByRole("link", { name: "Kopple" })).toHaveAttribute("aria-current", "page");
  });

  it("セッションがある場合、ダッシュボードへのリンクが表示される", () => {
    render(<HasSession />);
    expect(document.cookie).toContain("session=session-value");
    expect(screen.getByRole("link", { name: "ダッシュボード" })).toBeInTheDocument();
  });
});

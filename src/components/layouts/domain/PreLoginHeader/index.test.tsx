import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

import * as stories from "./index.stories";

import { uidCookieMock } from "@/tests/mocks/mockCookies";
import { defineMockCookie } from "@/tests/utils/defineMockCookie";
import { serializeCookie } from "@/tests/utils/serializeCookie";

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
    expect(document.cookie).toContain(serializeCookie(uidCookieMock));
    expect(screen.getByRole("link", { name: "ダッシュボード" })).toBeInTheDocument();
  });
});

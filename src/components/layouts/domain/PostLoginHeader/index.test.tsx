import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

import * as stories from "./index.stories";

const { Default } = composeStories(stories);

describe("PostLoginHeader", () => {
  it("ダッシュボードページにいるとき、ダッシュボードへのリンクはカレントである", () => {
    mockRouter.setCurrentUrl("/dashboard");
    render(<Default />);
    expect(screen.getByRole("link", { name: "Kopple" })).toHaveAttribute("aria-current", "page");
  });
});

import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

const { Active, Default } = composeStories(stories);

describe("NavLinkButton", () => {
  it("hrefが現在のパスでないの場合はカレントでない", () => {
    render(<Default />);
    expect(screen.getByRole("link", { name: "リンク" })).not.toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("hrefが現在のパスの場合はカレントである", () => {
    render(<Active />);
    expect(screen.getByRole("link", { name: "リンク" })).toHaveAttribute("aria-current", "page");
  });
});

import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

const { Default } = composeStories(stories);

describe("MyChatContent", () => {
  it("Date型が時間にフォーマットされて表示される", () => {
    render(<Default />);
    expect(screen.getByText("9:32")).toBeInTheDocument();
  });
});

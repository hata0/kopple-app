import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

const { Default } = composeStories(stories);

describe("MyChatContent", () => {
  it("時間とメッセージが表示される", () => {
    render(<Default />);
    expect(screen.getByText("9:32")).toBeInTheDocument();
    expect(screen.getByText("こんにちは")).toBeInTheDocument();
  });
});

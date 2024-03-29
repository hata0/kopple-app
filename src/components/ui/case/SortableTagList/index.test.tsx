import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

const { EmptyList } = composeStories(stories);

describe("SortableTagList", () => {
  it("タグがない場合設定されていないことを知らせる", () => {
    render(<EmptyList />);
    expect(screen.getByText("現在、タグは設定されていません")).toBeInTheDocument();
  });
});

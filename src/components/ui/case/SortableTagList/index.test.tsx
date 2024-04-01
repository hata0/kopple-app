import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import * as stories from "./index.stories";

const { DeleteClick, EmptyList } = composeStories(stories);

describe("SortableTagList", () => {
  it("タグがない場合設定されていないことを知らせる", () => {
    render(<EmptyList />);
    expect(screen.getByText("現在、タグは設定されていません")).toBeInTheDocument();
  });

  it("削除ボタンをクリックした時、indexを引数にもつ関数が呼ばれる", async () => {
    const { container } = render(<DeleteClick />);
    await act(async () => {
      await DeleteClick.play?.({ canvasElement: container });
    });
    expect(stories.default.args.onDeleteTag).toHaveBeenCalledWith(0);
  });
});

import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

const { DeleteClick, HideDelete } = composeStories(stories);

describe("Tag", () => {
  it("削除ボタンをクリックした時、onDeleteTagが適切に実行", async () => {
    const { container } = render(<DeleteClick />);
    await act(async () => {
      await DeleteClick.play?.({ canvasElement: container });
    });
    expect(DeleteClick.args.deleteProps?.onClick).toHaveBeenCalled();
  });

  it("hideDeleteが設定されているとき、削除ボタンは表示されない", () => {
    render(<HideDelete />);
    expect(
      screen.queryByRole("button", { name: `「${HideDelete.args.value?.name}」を削除` }),
    ).not.toBeInTheDocument();
  });
});

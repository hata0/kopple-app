import { composeStories } from "@storybook/react";
import { act, render } from "@testing-library/react";

import * as stories from "./index.stories";

const { DeleteClick } = composeStories(stories);

describe("Tag", () => {
  it("削除ボタンをクリックした時、onDeleteTagが適切に実行", async () => {
    const { container } = render(<DeleteClick />);
    await act(async () => {
      await DeleteClick.play?.({ canvasElement: container });
    });
    expect(DeleteClick.args.onDeleteTag).toHaveBeenCalledWith(DeleteClick.args.id);
  });
});

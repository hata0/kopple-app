import { composeStories } from "@storybook/react";
import { act, render } from "@testing-library/react";

import * as stories from "./index.stories";

const { Mock, SelectFile } = composeStories(stories);

describe("DroppableFileInput", () => {
  it("各関数に適切な引数が渡される", () => {
    render(<Mock />);
    const dropState = {
      isDragActive: false,
    };
    expect(Mock.args.className).toHaveBeenCalledWith(dropState);
    expect(Mock.args.render).toHaveBeenCalledWith(dropState);
  });

  it("ファイルが選択された時、関数が呼ばれる", async () => {
    const { container } = render(<SelectFile />);
    await act(async () => {
      await SelectFile.play?.({ canvasElement: container });
    });
    expect(stories.default.args.dropOptions.onDrop).toHaveBeenLastCalledWith(
      [expect.any(File)],
      [],
      expect.any(Object),
    );
  });
});

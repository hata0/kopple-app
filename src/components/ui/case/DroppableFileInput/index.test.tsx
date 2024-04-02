import { composeStories } from "@storybook/react";
import { act, render } from "@testing-library/react";

import * as stories from "./index.stories";

const { RenderMock, SelectFile } = composeStories(stories);

describe("DroppableFileInput", () => {
  it("renderに適切な引数が渡される", () => {
    render(<RenderMock />);
    expect(RenderMock.args.render).toHaveBeenCalledWith({
      isDragActive: false,
    });
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

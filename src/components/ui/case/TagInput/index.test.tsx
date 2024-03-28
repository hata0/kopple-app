import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

const { AddSameTag, AddTag, DeleteTag } = composeStories(stories);

describe("TagInput", () => {
  it("タグを作成できる", async () => {
    const { container } = render(<AddTag />);
    await act(async () => {
      await AddTag.play?.({ canvasElement: container });
    });
    expect(screen.getByText("tag name")).toBeInTheDocument();
  });

  it("同名のタグを作成したときにエラーが表示", async () => {
    const { container } = render(<AddSameTag />);
    await act(async () => {
      await AddSameTag.play?.({ canvasElement: container });
    });
    expect(screen.getByText("同じ名前のタグは設定できません")).toBeInTheDocument();
  });

  it("タグを削除できる", async () => {
    const { container } = render(<DeleteTag />);
    await act(async () => {
      await DeleteTag.play?.({ canvasElement: container });
    });
    expect(screen.queryByText(DeleteTag.args.tags![0].name)).not.toBeInTheDocument();
  });
});

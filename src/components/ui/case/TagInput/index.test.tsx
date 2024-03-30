import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

const { AddSameTag, AddTag, DeleteTag } = composeStories(stories);

describe("TagInput", () => {
  it("タグを作成する関数が呼ばれる", async () => {
    const { container } = render(<AddTag />);
    await act(async () => {
      await AddTag.play?.({ canvasElement: container });
    });
    expect(AddTag.args.onAddTag).toHaveBeenCalledWith({
      isSameTagName: false,
      text: "tag name",
    });
  });

  it("同名のタグを作成したときにエラーが表示され、関数が呼ばれる", async () => {
    const { container } = render(<AddSameTag />);
    await act(async () => {
      await AddSameTag.play?.({ canvasElement: container });
    });
    expect(AddSameTag.args.onAddTag).toHaveBeenCalledWith({
      isSameTagName: true,
      text: "tag name",
    });
    expect(screen.getByText("同じ名前のタグは設定できません")).toBeInTheDocument();
  });

  it("タグを削除する関数が呼ばれる", async () => {
    const { container } = render(<DeleteTag />);
    await act(async () => {
      await DeleteTag.play?.({ canvasElement: container });
    });
    expect(DeleteTag.args.onDeleteTag).toHaveBeenCalledWith(DeleteTag.args.tags![0].id);
  });
});

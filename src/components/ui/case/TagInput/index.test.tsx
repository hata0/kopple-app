import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

import { deleteAllToast } from "@/components/shadcn/ui/use-toast";

const { AddSameTag, AddTag, Default, DeleteTag, DisableSameNameError, OptionalInput } =
  composeStories(stories);

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
    expect(DeleteTag.args.onDeleteTag).toHaveBeenCalledWith(0);
  });

  it("DisableSameNameErrorを設定したとき、エラーは表示されず関数が呼ばれる", async () => {
    deleteAllToast();
    const { container } = render(<DisableSameNameError />);
    await act(async () => {
      await DisableSameNameError.play?.({ canvasElement: container });
    });
    expect(DisableSameNameError.args.onAddTag).toHaveBeenCalledWith({
      isSameTagName: true,
      text: "tag name",
    });
    expect(screen.queryByText("同じ名前のタグは設定できません")).not.toBeInTheDocument();
  });

  it("render関数に適切な引数が渡される", () => {
    render(<Default />);
    expect(stories.default.args.render).toHaveBeenLastCalledWith({
      className: "w-40",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.any(Function),
      placeholder: "タグを追加する",
      value: "",
    });
  });

  it("render関数がundefinedを返したとき、デフォルトのInputが表示", () => {
    render(<Default />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("render関数がReactNodeを返したとき、表示", () => {
    render(<OptionalInput />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});

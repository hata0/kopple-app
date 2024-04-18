import { composeStories } from "@storybook/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import * as stories from "./index.stories";

import { createDtWithFiles } from "@/tests/dropzone/createDtWithFiles";
import { createFile } from "@/tests/dropzone/createFile";

const { Default, HasImageUrl } = composeStories(stories);

describe("PortraitInput", () => {
  it("空の場合、フォールバックが表示", () => {
    render(<Default />);
    expect(screen.getByLabelText("ポートレイトは設定されていません")).toBeInTheDocument();
  });

  it("空でない場合、画像が表示", () => {
    render(<HasImageUrl />);
    expect(screen.getByAltText("ポートレイト")).toBeInTheDocument();
  });

  it("ファイルが画像でないとき、エラーが表示", async () => {
    render(<Default />);
    fireEvent.drop(
      screen.getByTestId("drop-container"),
      createDtWithFiles([createFile("hello.txt", 1000, "text/plain")]),
    );
    await waitFor(() => {
      expect(screen.getByText("ファイルは画像である必要があります")).toBeInTheDocument();
    });
  });

  it("ファイルが画像の時、setValueが呼ばれる", async () => {
    render(<Default />);
    fireEvent.drop(
      screen.getByTestId("drop-container"),
      createDtWithFiles([createFile("hello.png", 1000, "image/png")]),
    );
    await waitFor(() => {
      expect(stories.default.args.setValue).toHaveBeenCalledWith("image", expect.any(File));
    });
  });
});

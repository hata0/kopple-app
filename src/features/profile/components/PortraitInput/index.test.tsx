import { composeStories } from "@storybook/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import * as stories from "./index.stories";

const { Default, HasImageUrl } = composeStories(stories);

const createDtWithFiles = (files: File[] = []) => {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        getAsFile: () => file,
        kind: "file",
        size: file.size,
        type: file.type,
      })),
      types: ["Files"],
    },
  };
};
const createFile = (name: string, size: number, type: string) => {
  const file = new File([], name, { type });
  Object.defineProperty(file, "size", {
    get() {
      return size;
    },
  });
  return file;
};

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

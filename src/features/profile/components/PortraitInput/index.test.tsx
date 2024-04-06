import { composeStories } from "@storybook/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import * as stories from "./index.stories";

const { Default } = composeStories(stories);

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
});

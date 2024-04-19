import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

const { Default, HasValue } = composeStories(stories);

describe("BirthdayPicker", () => {
  it("日付が未設定の時、誕生日を選択と表示", () => {
    render(<Default />);
    expect(screen.getByText("誕生日を選択")).toBeInTheDocument();
  });

  it("日付が設定されているとき、誕生日を表示", () => {
    render(<HasValue />);
    expect(screen.getByText("2020年02月02日")).toBeInTheDocument();
  });
});

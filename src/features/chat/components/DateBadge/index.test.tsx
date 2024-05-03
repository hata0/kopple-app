import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import MockDate from "mockdate";

import * as stories from "./index.stories";

const { BeforeThisYear, ThisYear, Today, Yesterday } = composeStories(stories);

describe("DateBadge", () => {
  afterAll(() => {
    MockDate.reset();
  });

  it("Dateが今日の時、今日と表示", () => {
    render(<Today />);
    expect(screen.getByText("今日")).toBeInTheDocument();
  });

  it("Dateが昨日の時、昨日と表示", () => {
    render(<Yesterday />);
    expect(screen.getByText("昨日")).toBeInTheDocument();
  });

  it("Dateが今年の時、月/日(曜日)の形式で表示", () => {
    render(<ThisYear />);
    expect(screen.getByText("1/3(水)")).toBeInTheDocument();
  });

  it("Dateが今年以前の時、年/月/日(曜日)の形式で表示", () => {
    render(<BeforeThisYear />);
    expect(screen.getByText("2023/12/3(日)")).toBeInTheDocument();
  });
});

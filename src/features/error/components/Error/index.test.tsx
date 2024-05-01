import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

import * as stories from "./index.stories";

const { Default, Error401 } = composeStories(stories);

describe("Error", () => {
  it("401エラーの時、未ログインであることを知らせてサインインページへ遷移", () => {
    render(<Error401 />);
    expect(screen.getByText("再度ログインしてください")).toBeInTheDocument();
    expect(mockRouter.asPath).toBe("/sign-in");
  });

  it("条件を満たさないエラーのとき、500を返す", () => {
    render(<Default />);
    expect(screen.getByText("500")).toBeInTheDocument();
  });
});

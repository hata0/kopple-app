import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";

import * as stories from "./index.stories";

const { HidePassword, ShowPassword } = composeStories(stories);

describe("RevealPasswordInput", () => {
  it("パスワードを表示するとき、適切なラベルが設定され、type=textになる", async () => {
    ShowPassword.args.render = jest.fn();
    const { container } = render(<ShowPassword />);
    await act(async () => {
      await ShowPassword.play?.({ canvasElement: container });
    });
    expect(screen.getByRole("button", { name: "パスワードを隠す" })).toBeInTheDocument();
    expect(ShowPassword.args.render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "text",
      }),
    );
  });

  it("パスワードを隠すとき、適切なラベルが設定され、type=passwordになる", async () => {
    HidePassword.args.render = jest.fn();
    const { container } = render(<HidePassword />);
    await act(async () => {
      await HidePassword.play?.({ canvasElement: container });
    });
    expect(screen.getByRole("button", { name: "パスワードを表示" })).toBeInTheDocument();
    expect(HidePassword.args.render).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "password",
      }),
    );
  });
});

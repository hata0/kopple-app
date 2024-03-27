import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { type DayPickerSingleProps } from "react-day-picker";

import * as stories from "./index.stories";

import { createFromDate, createToDate } from ".";

import { MockPointerEvent } from "@/tests/utils/MockPointerEvent";
import { MockResizeObserver } from "@/tests/utils/MockResizeObserver";

const { PickDate } = composeStories(stories);
const user = userEvent.setup();

window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();
window.ResizeObserver = MockResizeObserver;

describe("DropdownCalendar", () => {
  describe("createFromDate, createToDate", () => {
    it("year のみ", () => {
      expect(createFromDate({ year: 2000 })).toEqual(new Date(2000, 0, 1));
      expect(createToDate({ year: 2025 })).toEqual(new Date(2025, 11, 31));
    });
    it("year, month のみ", () => {
      expect(createFromDate({ month: 5, year: 2000 })).toEqual(new Date(2000, 4, 1));
      expect(createToDate({ month: 2, year: 2025 })).toEqual(new Date(2025, 1, 28));
    });
    it("全て指定", () => {
      expect(createFromDate({ date: 20, month: 5, year: 2000 })).toEqual(new Date(2000, 4, 20));
      expect(createToDate({ date: 12, month: 2, year: 2025 })).toEqual(new Date(2025, 1, 12));
    });
    it("任意の Date クラス", () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2022, 0, 1, 1, 0, 0));
      expect(createFromDate(new Date())).toEqual(new Date());
      expect(createToDate(new Date())).toEqual(new Date());
      jest.useRealTimers();
    });
  });

  it("2000/7/12を選択できる", async () => {
    render(<PickDate />);
    await user.click(screen.getByRole("combobox", { name: "months" }));
    await user.click(screen.getByRole("option", { name: "7月" }));
    await user.click(screen.getByRole("combobox", { name: "years" }));
    await user.click(screen.getByRole("option", { name: "2000" }));
    await user.click(screen.getByRole("gridcell", { name: "12" }));
    expect((PickDate.args as DayPickerSingleProps).onSelect).toHaveBeenCalledWith(
      new Date(2000, 6, 12),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );
  });
});

import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Link from "next/link";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { useFormGuard } from ".";

jest.spyOn(window, "addEventListener");
jest.spyOn(window, "removeEventListener");
const confirmMock = jest.spyOn(window, "confirm");

describe("useFormGuard", () => {
  it("リスナーが登録、削除される", () => {
    const { unmount } = renderHook(() => useFormGuard(true));

    expect(window.addEventListener).toHaveBeenCalledWith("beforeunload", expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith("click", expect.any(Function), true);

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith("beforeunload", expect.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith("click", expect.any(Function), true);
  });

  it("isDirty が true で confirm をキャンセルしたときページ遷移しない", async () => {
    render(<Link href="/profile">プロフィール</Link>, { wrapper: MemoryRouterProvider });
    renderHook(() => useFormGuard(true));
    confirmMock.mockReturnValueOnce(false);
    await userEvent.click(screen.getByRole("link", { name: "プロフィール" }));
    expect(mockRouter.asPath).toBe("/");
  });

  it("isDirty が false の場合、ページ遷移する", async () => {
    render(<Link href="/profile">プロフィール</Link>, { wrapper: MemoryRouterProvider });
    renderHook(() => useFormGuard(false));
    await userEvent.click(screen.getByRole("link", { name: "プロフィール" }));
    expect(mockRouter.asPath).toBe("/profile");
  });

  it('aタグがtarget="_blank"を持つ場合、preventDefaultが実行されない', () => {
    renderHook(() => useFormGuard(true));
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "target", { value: link, writable: false });
    fireEvent(document, event);
    expect(event.defaultPrevented).toBe(false);
  });

  it("isDirty が true でページを閉じるとき、確認ダイアログを表示", () => {
    renderHook(() => useFormGuard(true));
    const event = new Event("beforeunload", { cancelable: true });
    fireEvent(window, event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("isDirty が false でページを閉じるとき、確認ダイアログは表示されない", () => {
    renderHook(() => useFormGuard(false));
    const event = new Event("beforeunload", { cancelable: true });
    fireEvent(window, event);
    expect(event.defaultPrevented).toBe(false);
  });
});

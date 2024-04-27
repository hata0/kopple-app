import { renderHook } from "@testing-library/react";
import { setCookie } from "nookies";

import { useIsHasUid } from ".";

import { uidCookieMock } from "@/tests/mocks/mockCookies";
import { defineMockCookie } from "@/tests/utils/defineMockCookie";

beforeEach(() => {
  defineMockCookie();
});

describe("useIsHasUid", () => {
  it("uid クッキーがあるとき、isHasUid は true", () => {
    const { name, value } = uidCookieMock;
    setCookie(null, name, value, {
      maxAge: 60 * 60 * 24 * 5,
      path: "/",
      sameSite: "lax",
      secure: true,
    });
    const { result } = renderHook(() => useIsHasUid());
    expect(result.current.isHasUid).toBe(true);
  });

  it("uid クッキーがないとき、isHasUid は false", () => {
    const { result } = renderHook(() => useIsHasUid());
    expect(result.current.isHasUid).toBe(false);
  });
});

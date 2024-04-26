import { renderHook } from "@testing-library/react";

import { useIsClient } from ".";

describe("useIsClient", () => {
  it("マウント時、setIsClient は true になる", () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current.isClient).toBe(true);
  });
});

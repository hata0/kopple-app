import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { setCookie } from "nookies";

import Page, { getServerSideProps } from "./profile.page";

import { getProfileHandler } from "@/services/backend/profiles/[id]/mock";
import { uidCookieMock } from "@/tests/mocks/mockCookies";
import { assertHasProps } from "@/tests/utils/assertHasProps";
import { defineMockCookie } from "@/tests/utils/defineMockCookie";
import { gsspCtx } from "@/tests/utils/gsspCtx";
import { setupMockServer } from "@/tests/utils/setupMockServer";

beforeEach(() => {
  defineMockCookie();
});
const setUidCookie = () => {
  const { name, value } = uidCookieMock;
  setCookie(null, name, value, {
    maxAge: 60 * 60 * 24 * 5,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
};

describe("pages/profile", () => {
  describe("getServerSideProps", () => {
    const server = setupMockServer(getProfileHandler());
    it("401:クッキーが存在しない", async () => {
      const res = await getServerSideProps(gsspCtx());
      assertHasProps(res);
      render(<Page {...res.props} />);
      expect(mockRouter.asPath).toBe("/sign-in");
    });

    it("500:ネットワークエラー", async () => {
      server.use(getProfileHandler({ isNetworkError: true }));
      setUidCookie();
      await expect(getServerSideProps(gsspCtx())).rejects.toThrow();
    });

    it("500:サーバー側でのエラー", async () => {
      server.use(
        getProfileHandler({
          error: {
            message: "サーバー側でエラーが発生しました",
            status: 500,
          },
        }),
      );
      setUidCookie();
      const res = await getServerSideProps(gsspCtx());
      assertHasProps(res);
      render(<Page {...res.props} />);
      expect(screen.getByText("500")).toBeInTheDocument();
    });

    it("200", async () => {
      setUidCookie();
      const res = await getServerSideProps(gsspCtx());
      assertHasProps(res);
      render(<Page {...res.props} />);
      expect(screen.getByText("プロフィールを編集")).toBeInTheDocument();
    });
  });
});

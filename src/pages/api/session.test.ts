/**
 * @jest-environment node
 */

import { Auth } from "firebase-admin/auth";

import handler from "./session.api";

import { firebaseAdmin } from "@/lib/firebase/admin";
import { sessionCookieMock, uidCookieMock } from "@/tests/mocks/mockCookies";
import { serializeCookie } from "@/tests/utils/serializeCookie";
import { testApiHandler } from "@/tests/utils/testApiHandler";

const createSessionMock = jest.fn();
const verifySessionMock = jest.fn();
const revokeMock = jest.fn();
jest.mock("firebase-admin", () => ({
  apps: [{ auth: () => {} }],
}));
jest.spyOn(firebaseAdmin, "auth").mockReturnValue({
  createSessionCookie: createSessionMock,
  revokeRefreshTokens: revokeMock,
  verifySessionCookie: verifySessionMock,
} as unknown as Auth);

describe("session", () => {
  describe("GET", () => {
    it("200", async () => {
      const idToken = "idToken";
      createSessionMock.mockResolvedValueOnce(sessionCookieMock.value);
      const { res } = await testApiHandler(
        handler,
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        },
        false,
      );
      expect(res.statusCode).toBe(200);
      expect(createSessionMock).toHaveBeenCalledWith(idToken, {
        expiresIn: 60 * 60 * 24 * 5 * 1000,
      });
      const cookies = res.getHeader("set-cookie");
      expect(cookies).toBeDefined();
      expect(cookies).toEqual(
        expect.arrayContaining([expect.stringContaining(serializeCookie(sessionCookieMock))]),
      );
      expect(res._getJSONData()).toEqual({
        message: "セッションを作成しました",
      });
    });

    it("401", async () => {
      createSessionMock.mockReset().mockRejectedValueOnce(new Error());
      const { res } = await testApiHandler(handler, undefined, false);
      expect(res.statusCode).toBe(401);
      expect(res.getHeader("set-cookie")).toBeUndefined();
      expect(res._getJSONData()).toEqual({
        error: "セッションの作成に失敗しました。",
      });
    });
  });

  describe("DELETE", () => {
    it("200", async () => {
      const decodedIdToken = {
        sub: "sub-value",
      };
      verifySessionMock.mockResolvedValueOnce(decodedIdToken);
      const { res } = await testApiHandler(
        handler,
        {
          method: "DELETE",
        },
        true,
        [uidCookieMock],
      );
      expect(res.statusCode).toBe(200);
      expect(verifySessionMock).toHaveBeenCalledWith(sessionCookieMock.value);
      expect(revokeMock).toHaveBeenCalledWith(decodedIdToken.sub);
      const cookies = res.getHeader("set-cookie");
      expect(cookies).toBeDefined();
      expect(cookies).toEqual(
        expect.arrayContaining([
          expect.stringContaining(serializeCookie({ ...sessionCookieMock, value: "" })),
        ]),
      );
      expect(cookies).toEqual(
        expect.arrayContaining([
          expect.stringContaining(serializeCookie({ ...uidCookieMock, value: "" })),
        ]),
      );
      expect(res._getJSONData()).toEqual({
        message: "セッションの削除に成功しました。",
      });
    });

    it("401", async () => {
      verifySessionMock.mockReset().mockRejectedValueOnce(new Error());
      const { res } = await testApiHandler(
        handler,
        {
          method: "DELETE",
        },
        true,
        [uidCookieMock],
      );
      expect(res.statusCode).toBe(401);
      expect(res.getHeader("set-cookie")).toBeUndefined();
      expect(res._getJSONData()).toEqual({
        error: "セッションの削除に失敗しました",
      });
    });
  });

  it("405", async () => {
    const { res } = await testApiHandler(handler, { method: "POST" });
    expect(res.statusCode).toBe(405);
    expect(res._getJSONData()).toEqual({
      error: "Method not allowed",
    });
  });
});

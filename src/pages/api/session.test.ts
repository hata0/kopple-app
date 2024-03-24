import { Auth } from "firebase-admin/auth";

import handler from "./session.api";

import { firebaseAdmin } from "@/lib/firebase/admin";
import { testApiHandler } from "@/tests/testApiHandler";

const createSessionMock = jest.fn();
jest.spyOn(firebaseAdmin, "auth").mockReturnValue({
  createSessionCookie: createSessionMock,
} as unknown as Auth);
// jest.mock("@/lib/firebase/admin", () => ({
//   firebaseAdmin: {
//     auth: jest.fn().mockReturnValue({
//       createSessionCookie: createSessionMock,
//     }),
//   },
// }));

describe("session", () => {
  describe("GET", () => {
    it("200", async () => {
      const idToken = "idToken";
      const sessionValue = "session-value";
      createSessionMock.mockResolvedValue(sessionValue);
      const { json, res, status } = await testApiHandler(
        handler,
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        },
        false,
      );
      expect(createSessionMock).toHaveBeenCalledWith(idToken, {
        expiresIn: 60 * 60 * 24 * 5 * 1000,
      });
      const cookies = res.getHeader("Set-Cookie");
      expect(cookies).toBeDefined();
      expect(cookies).toEqual(
        expect.arrayContaining([expect.stringContaining(`session=${sessionValue}`)]),
      );
      expect(status).toBe(200);
      expect(json).toEqual({
        message: "セッションを作成しました",
      });
    });
  });
});

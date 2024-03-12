import { NextApiHandler } from "next";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import { firebaseAdmin } from "@/lib/firebase/admin";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        // 5日
        const expiresIn = 60 * 60 * 24 * 5 * 1000;

        const idToken = req.headers.authorization?.split(" ")[1] ?? "";
        const sessionCookie = await firebaseAdmin
          .auth()
          .createSessionCookie(idToken, { expiresIn });

        const options: Omit<ResponseCookie, "name" | "value"> = {
          maxAge: expiresIn,
          path: "/",
          sameSite: "lax",
          secure: true,
        };

        setCookie({ res }, "session", sessionCookie, options);
        res.status(200).send({
          message: "セッションを作成しました",
        });
      } catch (e) {
        res.status(401).send({
          error: "セッションの作成に失敗しました。",
        });
      }
      break;
    case "DELETE":
      try {
        const auth = firebaseAdmin.auth();
        const session = parseCookies({ req }).session ?? "";
        console.log(session);
        const decodedIdToken = await auth.verifySessionCookie(session);

        if (decodedIdToken) {
          await auth.revokeRefreshTokens(decodedIdToken.sub);
        }

        destroyCookie({ res }, "session", { path: "/" });
        res.status(200).send({
          message: "セッションの削除に成功しました。",
        });
      } catch (e) {
        res.status(401).send({
          error: "セッションの削除に失敗しました",
        });
      }
      break;
    default:
      res.status(405).send({
        error: "Method not allowed",
      });
  }
};
export default handler;

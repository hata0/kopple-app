import { NextApiHandler } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import { firebaseAdmin } from "@/lib/firebase/admin";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const idToken = req.headers.authorization?.split(" ")[1] ?? "";
        const sessionCookie = await firebaseAdmin.auth().createSessionCookie(idToken, {
          // 5日
          expiresIn: 60 * 60 * 24 * 5 * 1000,
        });

        setCookie({ res }, "session", sessionCookie, {
          // 5日
          maxAge: 60 * 60 * 24 * 5,
          path: "/",
          sameSite: "lax",
          secure: true,
        });
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
        const decodedIdToken = await auth.verifySessionCookie(session);

        if (decodedIdToken) {
          await auth.revokeRefreshTokens(decodedIdToken.sub);
        }

        destroyCookie({ res }, "session", { path: "/" });
        destroyCookie({ res }, "uid", { path: "/" });
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

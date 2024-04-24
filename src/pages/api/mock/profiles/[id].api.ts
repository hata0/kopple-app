import { NextApiHandler } from "next";

import { profileContent } from "@/mocks/profileContent";
import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await delay(1000);
      res.status(200).json(profileContent());
      break;
    case "POST":
      await delay(1000);
      res.status(200).json({
        message: "プロフィールを更新しました",
      });
      break;
    default:
      res.status(404).json({
        error: "Method not allowed",
      });
  }
};
export default handler;

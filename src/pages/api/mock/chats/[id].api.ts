import { NextApiHandler } from "next";

import { chatContents } from "@/mocks/chatContents";
import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    await delay(1000);
    res.status(200).json(chatContents());
  } else if (req.method === "DELETE") {
    await delay(1000);
    res.status(200).json({
      message: "削除に成功しました。",
    });
  } else {
    res.status(404).json({
      error: "Method not allowed",
    });
  }
};
export default handler;

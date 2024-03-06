import { NextApiHandler } from "next";

import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "DELETE") {
    await delay(1000);
    res.status(200).send({
      message: "削除に成功しました。",
    });
  } else {
    res.status(404).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

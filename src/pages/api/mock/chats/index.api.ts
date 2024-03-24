import { NextApiHandler } from "next";

import { chatCards } from "@/mocks/chatCards";
import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    await delay(1000);
    res.status(200).json(chatCards());
  } else {
    res.status(405).json({
      error: "Method not allowed",
    });
  }
};
export default handler;

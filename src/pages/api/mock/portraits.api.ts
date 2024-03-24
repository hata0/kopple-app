import { NextApiHandler } from "next";

import { portraitCards } from "@/mocks/portraitCards";
import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    await delay(1000);
    res.status(200).json(portraitCards());
  } else {
    res.status(405).json({
      error: "Method not allowed",
    });
  }
};
export default handler;

import { NextApiHandler } from "next";

import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    await delay(1000);
    res.status(200).json(null);
  } else {
    res.status(404).json({
      error: "Method not allowed",
    });
  }
};
export default handler;

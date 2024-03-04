import { NextApiHandler } from "next";

import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    await delay(1000);
    res.status(200).send(null);
  } else {
    res.status(404).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

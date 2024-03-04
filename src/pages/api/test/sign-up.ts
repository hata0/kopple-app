import { NextApiHandler } from "next";

import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    await delay(1000);
    res.status(200).send({
      message: "Sign up successful",
    });
  } else {
    res.status(404).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

import { NextApiHandler } from "next";

import { portraitCards } from "@/mocks/portraitCards";
import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    await delay(1000);
    res.status(200).send(portraitCards());
  } else {
    res.status(405).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

import { NextApiHandler } from "next";

import { PERSON } from "@/mocks/profile";
import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    await delay(1000);
    res.status(200).send(PERSON);
  } else {
    res.status(404).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

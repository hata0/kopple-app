import { NextApiHandler } from "next";

import { profileContent } from "@/mocks/profileContent";
import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    await delay(1000);
    res.status(200).json(profileContent());
  } else {
    res.status(404).json({
      error: "Method not allowed",
    });
  }
};
export default handler;

import { NextApiHandler } from "next";

import { Portraits } from "@/features/dashboard/types/Portraits";
import { PORTRAITS } from "@/mocks/portraits";
import { ErrorResponse } from "@/types/ErrorResponse";
import { delay } from "@/utils/delay";

const handler: NextApiHandler<Portraits | ErrorResponse> = async (req, res) => {
  if (req.method === "GET") {
    await delay(1000);
    res.status(200).send(PORTRAITS);
  } else {
    res.status(405).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

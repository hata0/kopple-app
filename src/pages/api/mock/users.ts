import { NextApiHandler } from "next";

import { Users } from "@/features/dashboard/types/Users";
import { USERS } from "@/mocks/users";
import { ErrorResponse } from "@/types/ErrorResponse";
import { delay } from "@/utils/delay";

const handler: NextApiHandler<Users | ErrorResponse> = async (req, res) => {
  if (req.method === "GET") {
    await delay(1000);
    res.status(200).send(USERS);
  } else {
    res.status(405).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

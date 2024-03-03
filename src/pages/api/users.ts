import { NextApiHandler } from "next";

import { Users } from "@/features/dashboard/types/Users";
import { users } from "@/mocks/users";
import { ErrorResponse } from "@/types/ErrorResponse";

const handler: NextApiHandler<Users | ErrorResponse> = (req, res) => {
  if (req.method === "GET") {
    res.status(200).send(users);
  } else {
    res.status(405).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

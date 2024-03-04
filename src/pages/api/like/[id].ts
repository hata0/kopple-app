import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  if (req.method === "PUT") {
    res.status(200).send(null);
  } else {
    res.status(404).send({
      error: "Method not allowed",
    });
  }
};
export default handler;
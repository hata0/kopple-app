import { NextApiHandler } from "next";

import { CreateMessageRequest } from "@/features/chat/types/CreateMessage";
import { message as generateMessage } from "@/mocks/message";
import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { message } = req.body as CreateMessageRequest;
    await delay(1000);
    res.status(200).send(generateMessage(message));
  } else {
    res.status(404).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

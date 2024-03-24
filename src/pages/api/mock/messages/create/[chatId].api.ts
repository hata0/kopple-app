import { NextApiHandler } from "next";

import { CreateMessageRequest } from "@/features/chat/types/CreateMessage";
import { message as generateMessage } from "@/mocks/message";
import { delay } from "@/utils/delay";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { message } = req.body as CreateMessageRequest;
    await delay(1000);
    res.status(200).json(generateMessage(message));
  } else {
    res.status(404).json({
      error: "Method not allowed",
    });
  }
};
export default handler;

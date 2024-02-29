import { NextApiHandler } from "next";

import { Users } from "@/features/dashboard/types/Users";
import { ErrorResponse } from "@/types/ErrorResponse";

const handler: NextApiHandler<Users | ErrorResponse> = (req, res) => {
  if (req.method === "GET") {
    res.status(200).send({
      isLikes: [null],
      portraitCards: [
        {
          age: 20,
          hashtag: "ハッシュタグ",
          imageUrl: "/portrait1.png",
          message: "ひとこと",
          name: "名前",
        },
      ],
    });
  } else {
    res.status(405).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

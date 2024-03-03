import { NextApiHandler } from "next";

import { Account } from "@/features/sign-in/types/SignIn";

const user: Account = {
  email: "user@example.com",
  password: "password1",
};

const handler: NextApiHandler = (req, res) => {
  const data = req.body as Account;

  if (req.method === "POST") {
    if (user.email === data.email && user.password === data.password) {
      return res.status(200).send({
        message: "Login successful",
      });
    } else {
      return res.status(401).send({
        error: "Unauthorized",
      });
    }
  } else {
    res.status(404).send({
      error: "Method not allowed",
    });
  }
};
export default handler;

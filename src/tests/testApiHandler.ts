import { NextApiHandler } from "next";
import { RequestOptions } from "node-mocks-http";

import { apiHandlerArgs } from "./apiHandlerArgs";

export async function testApiHandler(
  handler: NextApiHandler,
  reqOptions?: RequestOptions,
  loggedIn = true,
) {
  const [req, res] = apiHandlerArgs({
    reqOptions: {
      ...(loggedIn && {
        cookies: {
          session: "session-value",
        },
      }),
      ...reqOptions,
    },
  });
  await handler(req, res);
  const status = res.statusCode;
  const json = res._getJSONData() as unknown;
  return { json, req, res, status } as const;
}

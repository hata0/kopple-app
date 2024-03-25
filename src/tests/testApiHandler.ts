import { NextApiHandler } from "next";
import { RequestOptions } from "node-mocks-http";

import { apiHandlerArgs } from "./apiHandlerArgs";
import { serializeCookie as serialize } from "./serializeCookie";
import { Cookie } from "./types/Cookie";

export const sessionMock: Cookie = { name: "session", value: "session-value" };

export async function testApiHandler(
  handler: NextApiHandler,
  reqOptions?: RequestOptions,
  loggedIn = true,
  cookies?: Cookie[],
) {
  const cookie = cookies?.reduce(
    (acc, cookie) => {
      return acc === "" ? serialize(cookie) : `${acc}; ${serialize(cookie)}`;
    },
    loggedIn ? serialize(sessionMock) : "",
  );

  const [req, res] = apiHandlerArgs({
    reqOptions: {
      ...reqOptions,
      headers: {
        ...reqOptions?.headers,
        cookie,
      },
    },
  });
  await handler(req, res);
  return { req, res } as const;
}

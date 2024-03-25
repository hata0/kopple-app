import { NextApiHandler } from "next";
import { RequestOptions } from "node-mocks-http";

import { sessionCookieMock } from "../mocks/mockCookies";
import { Cookie } from "../types/Cookie";

import { apiHandlerArgs } from "./apiHandlerArgs";
import { serializeCookie as serialize } from "./serializeCookie";

export const testApiHandler = async (
  handler: NextApiHandler,
  reqOptions?: RequestOptions,
  loggedIn = true,
  cookies?: Cookie[],
) => {
  const cookie = cookies?.reduce(
    (acc, cookie) => {
      return acc === "" ? serialize(cookie) : `${acc}; ${serialize(cookie)}`;
    },
    loggedIn ? serialize(sessionCookieMock) : "",
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
};

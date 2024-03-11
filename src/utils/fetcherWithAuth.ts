import { ParsedUrlQuery } from "querystring";

import { GetServerSidePropsContext, PreviewData } from "next";
import nookies, { parseCookies } from "nookies";

import { Init } from "./fetcher";

export const fetcherWithAuth = async <T extends object>(
  input: RequestInfo | URL,
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  { body, headers, ...restInit }: Init<T> = {},
) => {
  let res;
  let error;
  let cookies;

  if (ctx) {
    cookies = nookies.get(ctx);
  } else {
    cookies = parseCookies();
  }

  const session = cookies.session as string | undefined;

  try {
    res = await fetch(input, {
      ...restInit,
      body: body && JSON.stringify(body),
      headers: {
        Authorization: session ? `Bearer ${session}` : "",
        "Content-Type": "application/json",
        ...headers,
      },
    });
  } catch (e) {
    error = e;
  }

  return { error, res };
};

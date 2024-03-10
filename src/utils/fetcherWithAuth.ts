import { Init } from "./fetcher";

import { auth } from "@/lib/firebase/auth";

export const fetcherWithAuth = async <T extends object>(
  input: RequestInfo | URL,
  { body, headers, ...restInit }: Init<T> = {},
) => {
  let res;
  let error;

  const idToken = await auth.currentUser?.getIdToken();

  try {
    res = await fetch(input, {
      ...restInit,
      body: body && JSON.stringify(body),
      headers: {
        Authorization: idToken ? `Bearer ${idToken}` : "",
        "Content-Type": "application/json",
        ...headers,
      },
    });
  } catch (e) {
    error = e;
  }

  return { error, res };
};

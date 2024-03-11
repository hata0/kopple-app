import { Init } from "./fetcher";

import { firebaseClient } from "@/lib/firebase/client";

export const fetcherWithAuth = async <T extends object>(
  input: RequestInfo | URL,
  { body, headers, ...restInit }: Init<T> = {},
) => {
  let res;
  let error;

  const idToken = await firebaseClient.currentUser?.getIdToken();

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

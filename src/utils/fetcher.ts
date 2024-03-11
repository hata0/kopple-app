export type Init<T> = Omit<RequestInit, "body"> & {
  body?: T;
};

export const fetcher = async <T extends object>(
  input: RequestInfo | URL,
  { body, headers, ...restInit }: Init<T> = {},
) => {
  let res;
  let error;

  try {
    res = await fetch(input, {
      ...restInit,
      body: body && JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  } catch (e) {
    error = e;
  }

  return { error, res };
};

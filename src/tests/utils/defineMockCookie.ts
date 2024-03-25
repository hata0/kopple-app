export const defineMockCookie = () => {
  type Cookies = {
    [key: string]: string;
  };
  const cookies: Cookies = {};

  Object.defineProperty(global.document, "cookie", {
    configurable: true,
    get: () => {
      return Object.entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join("; ");
    },
    set: (value: string) => {
      const [cookieName, cookieValue] = value.split(/[=;]/);
      cookies[cookieName] = cookieValue;
    },
  });
};

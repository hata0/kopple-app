import { http, HttpResponse } from "msw";

import { signInResolver } from "./resolvers/signInResolver";
import { signUpResolver } from "./resolvers/signUpResolver";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const networkErrorResolver = () => HttpResponse.error();

export const handlers = [
  http.post("https://my.backend/sign-in", signInResolver),
  // http.post("https://my.backend/sign-in", networkErrorResolver),
  http.post("https://my.backend/sign-up", signUpResolver),
  // http.post("https://my.backend/sign-up", networkErrorResolver),
];
